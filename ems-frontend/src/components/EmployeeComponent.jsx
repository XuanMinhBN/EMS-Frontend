import React, {useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {createEmployee} from "../services/EmployeeService.js";
import {useNavigate} from "react-router-dom";

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({
        firstName: '', lastName: '', email: ''
    })

    const navigator = useNavigate();

    function saveEmployee(e){
        e.preventDefault();
        if(validateForm()){
            const employee = {firstName:firstName, lastName:lastName, email:email};
            createEmployee(employee).then((response) => {
                console.log(response.data);
                navigator('/employees')
            });
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

    return(
        <Container>
            <Row className="mt-5">
                <Card className="col-md-6 offset-md-3 offset-md-3">
                    <h2 className='text-center'>Add Employee</h2>
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
                            <Button variant={"success"} onClick={saveEmployee}>Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}

export default EmployeeComponent;