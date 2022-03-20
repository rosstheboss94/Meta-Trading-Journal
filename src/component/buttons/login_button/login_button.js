import { Fragment } from "react";
import { Stack, Button } from "react-bootstrap";
import LoginModal from "../../modals/login/login";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/slices/modal-state-slice";
import "./login_button.scss";

const LoginButton = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  let gap = 3;

  const buttonActions = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      dispatch(modalActions.showLoginModal({ modalState: true }));
    }
  };

  if(isLoggedIn) gap = 0;

  return (
    <Stack direction="horizontal" gap={gap}>
      <span className="text-white">{currentUser}</span>
      {!isLoggedIn && <Button className="btn btn-success" onClick={buttonActions}>Log in</Button>}
      {!isLoggedIn && <LoginModal />}
    </Stack>
  );
};

export default LoginButton;
