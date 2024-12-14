import React, {useEffect, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {createEmployee, getEmployee, updateEmployee} from "../services/EmployeeService.js";
import {useNavigate, useParams} from "react-router-dom";

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const {id} = useParams();

    const [errors, setErrors] = useState({
        firstName: '', lastName: '', email: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => console.log(error));
        }
    }, [id])

    function saveOrUpdateEmployee(e){
        e.preventDefault();
        if(validateForm()){
            const employee = {firstName:firstName, lastName:lastName, email:email};
            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => console.log(error));
            }else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => console.log(error));
            }
        }
    }

    function validateForm(){
        let valid = true;
        const errorsCopy = {...errors}
        if(firstName.trim()){
            errorsCopy.firstName = 'OK!';
        }else{
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }
        if(lastName.trim()){
            errorsCopy.lastName = 'OK!';
        }else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }
        if(email.trim()){
            errorsCopy.email = 'OK!';
        }else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    return(
        <Container>
            <Row className="mt-5">
                <Card className="col-md-6 offset-md-3 offset-md-3">
                    {pageTitle()}
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-2">
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control className={`${errors.firstName ? 'is-invalid' : ''}`} type="text" placeholder='Enter employee first name' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                {errors.firstName && <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control className={`${errors.lastName ? 'is-invalid' : ''}`} type="text" placeholder='Enter employee last name' name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                {errors.lastName && <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control className={`${errors.email ? 'is-invalid' : ''}`} type="email" placeholder='Enter employee email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                {errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
                            </Form.Group>
                            <Button variant={"success"} onClick={saveOrUpdateEmployee}>Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}

export default EmployeeComponent;