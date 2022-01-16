import { Fragment } from "react";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../../../firebase/firebase";
import { Button } from "react-bootstrap";
import LoginModal from "../../modals/login/login";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/slices/modal-state-slice";
import { authActions } from "../../../store/slices/authenticationSlice"
import "./login_button.scss";

const LoginButton = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const auth = getAuth(firebaseApp);

  const buttonActions = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      dispatch(modalActions.showLoginModal({ modalState: true }));
    } else {
      console.log("in else");
      const auth = getAuth();
      signOut(auth).then(() => {
        dispatch(authActions.userLoggingIn({userLoginStatus:false, currentUser: " "}))
      }).catch((error) => {
        // An error happened.
      });
    }
  };

  return (
    <Fragment>
      <span className="user-email">{currentUser}</span>
      <Button
        className="btn btn-success"
        onClick={buttonActions}
      >
        {isLoggedIn ? "Sign Out" : "Log In"}
      </Button>
      {!isLoggedIn && <LoginModal />}
    </Fragment>
  );
};

export default LoginButton;
