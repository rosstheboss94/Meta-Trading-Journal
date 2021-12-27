import { Fragment, useRef } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import firebaseApp from "../../firebase/firebase";
import { Form, Button, Row, Modal } from "react-bootstrap";
import "./sign-up.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/slices/authenticationSlice";
import CreateUserModal from "../modals/create-user/create_user";


const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);



const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  const createUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    signInWithPopup(auth, provider)
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
  };
 
  const testfunction = () => {
    dispatch(authActions.userLoggingIn({userLoginStatus:true}))
  }
  return (
    <Fragment>
      <Button className="btn btn-success" onClick={testfunction}>Log In</Button>
    {isLoggedIn && <CreateUserModal />}
    </Fragment>
  );
    
    
};

export default SignUp;
