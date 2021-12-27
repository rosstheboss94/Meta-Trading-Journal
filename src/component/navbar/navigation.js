import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav'
import { Container, Button } from "react-bootstrap";
import LoginButton from "../buttons/login_button/login_button";
import "./navigation.css"
const navigation = () => {
  
  return (
    <Navbar>
      
        <Navbar.Brand href="#home">MetaTrading</Navbar.Brand>
        <Nav className="justify-content-end w-100" variant="pills" defaultActiveKey="#home">
          <LoginButton />
        </Nav>
      
    </Navbar>
  );
};

export default navigation;
