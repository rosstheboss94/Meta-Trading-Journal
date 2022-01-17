import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav'
import { Container, Button } from "react-bootstrap";
import LoginButton from "../buttons/login_button/login_button";
import "./navigation.scss"
const navigation = () => {
  
  return (
    <Navbar className="nav-container">
      
        <Navbar.Brand href="#home">Meta Trading Journal</Navbar.Brand>
        <Nav className="justify-content-end align-items-center w-100" variant="pills" defaultActiveKey="#home">
          <LoginButton />
        </Nav>
      
    </Navbar>
  );
};

export default navigation;
