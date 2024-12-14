import React, { useEffect, useState } from "react";
import {Button, Table} from "react-bootstrap";
import { listEmployees } from "../services/EmployeeService";
import {useNavigate} from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function addNewEmployee(){
    navigator('/add-employee');
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
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListEmployeeComponent;
