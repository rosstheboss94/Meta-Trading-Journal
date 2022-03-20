import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Col } from "react-bootstrap";
import LoginButton from "../buttons/login_button/login_button";
import "./navigation.scss";

const navigation = () => {
  return (
    <Navbar className="nav-container">
      <Col xs={6}>
        <Navbar.Brand>Meta Trading Journal</Navbar.Brand>
      </Col>
      <Col>
        <Nav className="justify-content-end align-items-center w-100">
          <LoginButton />
        </Nav>
      </Col>
    </Navbar>
  );
};

export default navigation;
