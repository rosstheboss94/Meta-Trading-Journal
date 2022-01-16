import { Fragment } from "react";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebaseApp from "../../../firebase/firebase";
import { Button } from "react-bootstrap";
import LoginModal from "../../modals/login/login";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/slices/modal-state-slice";
import "./login_button.scss";

const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

const LoginButton = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <span className="user-email">{currentUser}</span>
      <Button
        className="btn btn-success"
        onClick={(e) => {
          e.preventDefault();
          dispatch(modalActions.showLoginModal({ modalState: true }));
        }}
      >
        {isLoggedIn ? "Sign Out" : "Log In"}
      </Button>
      {!isLoggedIn && <LoginModal />}
    </Fragment>
  );
};

export default LoginButton;

