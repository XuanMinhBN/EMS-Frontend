import React, { useEffect, useState } from "react";
import {Button, Table} from "react-bootstrap";
import {deleteEmployee, listEmployees} from "../services/EmployeeService";
import {useNavigate} from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees(){
    listEmployees()
        .then((response) => {
          setEmployees(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  }

  function addNewEmployee(){
    navigator('/add-employee');
  }

  function updateEmployee(id){
    navigator(`/update-employee/${id}`);
  }

  function removeEmployee(id){
    const flag = confirm('Do you want to delete employee?');
    if(flag){
      deleteEmployee(id).then((response) => {
        alert(response.data);
        getAllEmployees();
      }).catch(error => console.log(error));
    }else{
      getAllEmployees();
    }
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Employees</h2>
      <Button className="mb-2" variant={"primary"} onClick={addNewEmployee}>Add Employee</Button>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <Button className="m-2" variant={"info"} onClick={() => updateEmployee(employee.id)}>Update</Button>
                  <Button variant={"danger"} onClick={() => removeEmployee(employee.id)}>Delete</Button>
                </td>
              </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListEmployeeComponent;
