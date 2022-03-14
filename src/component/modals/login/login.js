import { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../../../store/slices/authenticationSlice";
import { modalActions } from "../../../store/slices/modal-state-slice";
import CreateUserModal from "../create-user/create_user";
import { signInController } from "../../../controllers/auth/auth-controller";

import { Form, Button, Modal } from "react-bootstrap";
import googleLogo from "../../../assets/google-logo.png";
import "./login.scss";

const LoginModal = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const showModal = useSelector((state) => state.modal.createUserModalState);
  const showLoginModal = useSelector((state) => state.modal.loginModalState);
  const dispatch = useDispatch();

  const callSignInController = async () => {
    const user = await signInController(emailRef.current.value, passwordRef.current.value)
    dispatch(
      authActions.userLoggingIn({
        userLoginStatus: true,
        currentUser: user.email,
      })
    );
    dispatch(modalActions.closeModal())
  };

  const showCreateUserModal = (e) => {
    e.preventDefault();
    dispatch(modalActions.showCreateUser({ modalState: true }));
  };

  return (
    <Fragment>
      {showModal && <CreateUserModal />}
      <Modal
        show={showLoginModal}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        className="create_user_modal"
        keyboard={true}
        onHide = {() => {dispatch(modalActions.closeModal())}}
        centered
      >
        <Modal.Header className="text-white border-bottom-0" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Login with
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
              <div className="d-flex align-items-center bg-danger w-75">
                <img src={googleLogo} className="google-logo-img p-2" />
                <p className="text-white m-0">Continue with Google</p>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center border-top-0">
          <Button
            className="w-75"
            variant="success"
            type="submit"
            onClick={callSignInController}
          >
            LOGIN
          </Button>
          <div>
            <span>Looking to</span>
            <span>
              {" "}
              <button
                onClick={showCreateUserModal}
                className="create_an_account_link"
              >
                create an account?
              </button>
            </span>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default LoginModal;
