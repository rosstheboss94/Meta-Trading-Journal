import { Fragment } from "react";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebaseApp from "../../../firebase/firebase";
import { Button } from "react-bootstrap";
import LoginModal from "../../modals/login/login";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/slices/modal-state-slice";

const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

const LoginButton = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <span>{currentUser}</span>
      <Button
        className="btn btn-success"
        onClick={(e) => {
          e.preventDefault();
          dispatch(modalActions.showLoginModal({ modalState: true }));
        }}
      >
        Log In
      </Button>
      {!isLoggedIn && <LoginModal />}
    </Fragment>
  );
};

export default LoginButton;

/*const createUser = (e) => {
    e.preventDefault();
    
      testfunc();

    /*signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
        // ...
      });
  };*/
/*const showLoginModal = () => {
    setModalStatus((ps) => {
      return !ps;
    });
  };*/
