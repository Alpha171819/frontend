"use client"

import React, { use } from 'react';
import axios from 'axios';
import styles from '../login/page.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/navigation'
import { UserContext } from '@/providers/userProvider';
function Login() {
  const router = useRouter()
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {setUser} = React.useContext(UserContext);
  const submitdetails = (e) => {
      e.preventDefault();

    axios.post('http://localhost:3000/users/verify',{
      email: email,
      password: password
    })
    .then((response) => {
      console.log(response);
      if(response.data == 'invalid user'){
        alert('invalid user')
      }else{
        setUser(response.data)
        router.push('/dashboard')
      }
    }, (error) => {
      console.log(error);
    });
  }

  return (
    <div className={styles.wrapper}>

    <Form onSubmit={submitdetails}  className={styles.form}>
    <Form.Label className={styles.form_input_heading} ><h1>  <center> Sign In </center></h1> </Form.Label>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Enter email" />
        <Form.Text className="text-muted"> </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Password" />
      </Form.Group>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
      
     <Button className={styles.btn_grad} type="submit"> Sign In </Button>
    </Form>
    </div>
  );
}

export default Login;