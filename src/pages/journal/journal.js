import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Button, Form } from "react-bootstrap";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import LoginModal from "../../component/modals/login/login";
import { modalActions } from "../../store/slices/modal-state-slice";
import "./journal.scss";

const Journal = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch()
  const journalNameRef = useRef("");
  const journalStratRef = useRef("");
  const [displayJournalForm, setDisplayJournalForm] = useState(false)

  const newJournal = () => {
    if(isLoggedIn){
      setDisplayJournalForm(true)
    }
    else{
      dispatch(modalActions.showLoginModal({modalState: true }))
    }
  }

  const addJournal = () => {
    setDoc(doc(db, "users", currentUser, "journals", journalNameRef.current.value), {
      name: journalNameRef.current.value,
      winPercentage: 0,
      strategy: journalStratRef.current.value
    });
    setDisplayJournalForm(false)
  }

  
  const journalForm = (
    <Form>
      <h3>Add a NEW Journal!</h3>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Journal Name</Form.Label>
        <Form.Control ref={journalNameRef} type="text" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Journal Strategy</Form.Label>
        <Form.Control ref={journalStratRef} as="textarea" />
      </Form.Group>
      <Form.Group>
        <Button onClick={addJournal}>Add Journal</Button>
      </Form.Group>
    </Form>
  );

  return (
    <Container className="journal_container d-flex flex-column">
      <Row>
        <h1>
          My Journals{" "}
          <Button variant="success" onClick={newJournal}>
            New Journal
          </Button>{" "}
        </h1>
      </Row>
      <section className="d-flex flex-column justify-content-center h-100">
        {displayJournalForm ? journalForm : <LoginModal />}
      </section>
    </Container>
  );
};

export default Journal;
