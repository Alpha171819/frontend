"use client"

import axios from 'axios';
import styles from '../login/page.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import React from 'react';



function AddListings() {

  const [catogaory, setCatogaory] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [image, setImage] = React.useState('');





  const submitdetails = (e) => {
    e.preventDefault();

    console.log(title);
    console.log(description);
      
      axios.post('http://localhost:3000/addproduct', {
       category: catogaory,
        title: title,
        description: description,
        price: price,
        image: image
      
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
  }
  return(
    <div className={styles.wrapper}>
      
    <Form onSubmit={submitdetails} className={styles.form}>

    <Form.Label className= {styles.form_input_heading} >catogaory</Form.Label>
  
    <select name="catogaory" id="catogaory" variant="primary"  required value={catogaory} onChange={(e) => setCatogaory(e.target.value)}>
  <option value="men's clothing">men's clothing</option>
  <option value="jewelry">jewelry</option>
  <option value="electronics">electronics</option>
  <option value="women's clothing">women's clothing</option>
</select>

  
   <Form.Group className="mb-3" controlId="formBasicEmail" >
     <Form.Label className= {styles.form_input_heading} >TITLE</Form.Label>
     <Form.Control required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" />
   </Form.Group>

   <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className= {styles.form_input_heading}>Enter description</Form.Label>
        <Form.Control required value={description} onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} />
    </Form.Group>

    <Form.Label className= {styles.form_input_heading}>PRICE</Form.Label>
    <Form.Control  required value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Enter Price in Rupees" />


 <Form.Group className="mb-3" controlId="formBasicEmail">
     <Form.Label className= {styles.form_input_heading}>IMAGE</Form.Label>
     <Form.Control required value={image} onChange={(e) => setImage(e.target.value)} type="text" placeholder="Enter Image URL" />
   </Form.Group>



   <Button variant="primary"  type="submit"> Submit </Button>
 </Form>
 </div>
  )


}
export default AddListings;

