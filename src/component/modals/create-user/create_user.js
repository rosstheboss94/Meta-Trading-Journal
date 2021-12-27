import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Modal } from "react-bootstrap";
import googleLogo from "../../../assets/google-logo.png";
import { authActions } from "../../../store/slices/authenticationSlice";
import "./create_user.css";

const CreateUserModal = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <Modal
      show={isLoggedIn}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      className="create_user_modal"
      contentClassName="bg-dark"
      keyboard={true}
      onHide={() => {
        dispatch(authActions.userLoggingIn({ userLoginStatus: false }));
      }}
      centered
    >
      <Modal.Header className="text-white border-bottom-0" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-muted">EMAIL</Form.Label>
            <Form.Control ref={emailRef} className=" border-0" type="email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-muted">PASSWORD</Form.Label>
            <Form.Control
              ref={passwordRef}
              className=" border-0 "
              type="password"
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <p className="text-muted">or</p>
          </div>

          <Form.Group className="d-flex justify-content-center mb-3">
            <div className="d-flex align-items-center bg-danger w-50">
              <img src={googleLogo} className="google-logo-img p-2" />
              <p className="text-white m-0">Continue with Google</p>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center border-top-0">
        <Button className="w-75" variant="success" type="submit">
          Sign In
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserModal;
