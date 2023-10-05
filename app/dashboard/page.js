"use client"

import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { use } from 'react';
import styles from '../login/page.module.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from '@/providers/userProvider';
import { useRouter } from 'next/navigation'


function Dashboard() {
  const router = useRouter()

  const [show, setShow] = useState(false);
  const {user} = React.useContext(UserContext);
  console.log(" users data", user);

  
   
   
      ( () => {
        if(user == null){
          router.push('/login')
        }
    } )();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [sliderVal, setSliderVal] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);
 
 
 



  function handleFilters() {
    const newItems = items.filter((item) => item.price <= sliderVal);
    setFilteredItems(newItems);
    setChooser(filteredItems)
  }

  function resetfilter() {
    setFilteredItems(items);
    setChooser(items)
  }

  
    const [items, setItems] = React.useState([]);
    const [chooser, setChooser] = React.useState(items);
    React.useEffect(() => {
        setChooser(items)
    },[items]);
    React.useEffect(() => {
    // write a axios request to get the data from the backend
        axios.get('http://localhost:3000/routes/products')
        .then((response) => {
      console.log(response.data);
      setItems(response.data);
        })
.catch((error) => {
    console.log(error);
})}


    ,[]);


    console.log(chooser === items);

  
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">PMT</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">lisings</Nav.Link>
            <Nav.Link href="#action2">Wallet</Nav.Link>
            <Nav.Link href="#action2">My Profile</Nav.Link>



          </Nav>

          <>
          <Button variant="primary-outline" onClick={resetfilter} > Clear Filters</Button>

      <Button variant="primary-outline" onClick={handleShow}>
        Apply Filters
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Apply Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              <Form.Label className= {styles.form_input_heading} >catogaory</Form.Label>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <select name="catogaory" id="catogaory" variant="primary" >
                <option value="men's clothing">men's clothing</option>
                <option value="jewelry">jewelry</option>
                 <option value="electronics">electronics</option>
                 <option value="women's clothing">women's clothing</option>
            </select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <>
      <Form.Label className= {styles.form_input_heading} >Price</Form.Label>
      <Form.Range max="200" step="1" onChange={(e) => {
        setSliderVal(e.target.value);
      }}/>
       <div className="d-flex justify-content-between">
            <p>Min: 0</p>  <p> {sliderVal}</p>  <p>Max: 200</p>
       </div>
     
    </>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            handleFilters();
            handleClose();
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>


          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <div>
            <Form.Label className= {styles.form_input_heading} > Hello {user?.first_name +" "+ user?.last_name}</Form.Label>
        </div>

     

    <Row xs={1} md={6} className="g-4">
      
      {chooser && chooser.map((item) => (
        <Col key={item.id}>
          <Card>
            <Card.Img  variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <ListGroup className="list-group-flush">
                    <ListGroup.Item>{item.category}</ListGroup.Item>
                    <ListGroup.Item>{item.price}</ListGroup.Item>
                    <ListGroup.Item><Card.Text> {Array.from(item.description).splice(0,40).join('')+'...'} </Card.Text></ListGroup.Item>
                    <Button variant="primary">Buy</Button>
                </ListGroup>

            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
 
    </div>
  );
}

export default Dashboard;

