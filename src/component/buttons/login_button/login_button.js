import { Fragment } from "react";
import { Button } from "react-bootstrap";
import LoginModal from "../../modals/login/login";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/slices/modal-state-slice";
import "./login_button.scss";

const LoginButton = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const buttonActions = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      dispatch(modalActions.showLoginModal({ modalState: true }));
    }
  };

  return (
    <Fragment>
      <span className="user-email">{currentUser}</span>
      <Button className="btn btn-success" onClick={buttonActions}>
        Log in
      </Button>
      {!isLoggedIn && <LoginModal />}
    </Fragment>
  );
};

export default LoginButton;
