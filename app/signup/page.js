"use client"

import axios from 'axios';
import styles from '../login/page.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation'


import React from 'react';



function Signup() {
  const router = useRouter()

  const [first_name, setFirstName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatepassword, setRepeatePassword] = React.useState('');
  const [isseller, setIsseller] = React.useState(false);



  const submitdetails = () => {
    if (password == repeatepassword) {
      
      axios.post('http://localhost:3000/users', {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        isseller: isseller
      
      })
      .then((response) => {
        console.log(response);
        alert('user created')
        router.push('/login')
      }, (error) => {
        console.log(error);
      });
    }else{
      alert('passwords are not matching')
    };
  }
  return(
    <div className={styles.wrapper}>
      
    <Form onSubmit={submitdetails} className={styles.form}>
    <Form.Label className={styles.form_input_heading} ><h1>  <center> Sign Up </center></h1> </Form.Label>


    <InputGroup className="mb-3">
      <InputGroup.Text>First and last name</InputGroup.Text>
      <Form.Control value={first_name} onChange={(e) => setFirstName(e.target.value)} aria-label="First name" placeholder='First name' />
      <Form.Control value={last_name} onChange={(e) => setLastName(e.target.value)} aria-label="Last name" placeholder='Last name'/>
    </InputGroup>

   <Form.Group className="mb-3" controlId="formBasicEmail">
     <Form.Label>Email address</Form.Label>
     <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Enter email" />
     <Form.Text className="text-muted">
       We'll never share your email with anyone else.
     </Form.Text>
   </Form.Group>


   <Form.Group className="mb-3" controlId="formBasicPassword">
     <Form.Label>Password</Form.Label>
     <Form.Control value={password} onChange={(e)=> setPassword(e.target.value)} required type="password" placeholder="Password" />
   </Form.Group>

   <Form.Group className="mb-3" controlId="formBasicPassword">
     <Form.Label>Repeate-Password</Form.Label>
     <Form.Control value={repeatepassword} onChange={(e)=> setRepeatePassword(e.target.value)} required type="password" placeholder="Repeate-Password" />
   </Form.Group>
   
      <Form.Check checked={isseller} onChange={(e) => setIsseller(e.target.checked)} type="switch" id="custom-switch" label="check this switch if your are a seller" /> <br/>
<p>Already have an account? <a href="/login">Login</a></p>

   <Button className={styles.btn_grad} variant="primary"  type="submit"> Submit </Button>
 </Form>
 </div>
  )


}
export default Signup;

