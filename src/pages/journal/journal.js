import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Button, Form, Col } from "react-bootstrap";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import LoginModal from "../../component/modals/login/login";
import { modalActions } from "../../store/slices/modal-state-slice";
import JournalCard from "../../component/cards/journal-card/journal_card";
import "./journal.scss";

const Journal = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const journalNameRef = useRef("");
  const journalStratRef = useRef("");
  const [displayJournalForm, setDisplayJournalForm] = useState(false);

  useEffect(() => {
    console.log("in journal ue");
    setDisplayJournalForm(false);
    return () => {
      setDisplayJournalForm(false);
    }
  }, [isLoggedIn, currentUser])

  const newJournal = () => {
    if (isLoggedIn) {
      setDisplayJournalForm(true);
    } else {
      dispatch(modalActions.showLoginModal({ modalState: true }));
    }
  };

  const closeJournalForm = (e) => {
    e.preventDefault()
    setDisplayJournalForm(false);
  }

  const addJournal = () => {
    setDoc(
      doc(db, "users", currentUser, "journals", journalNameRef.current.value),
      {
        name: journalNameRef.current.value,
        winPercentage: 0,
        strategy: journalStratRef.current.value,
      }
    );
    setDisplayJournalForm(false);
  };

  const journalForm = (
    <Form className="journal-form">
      <Row className="journal-form-header">
        <Col>
          <p>
            Add a <span> NEW</span> Journal!{" "}
          </p>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button onClick={closeJournalForm}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
            </svg>
          </Button>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Journal Name</Form.Label>
        <Form.Control
          ref={journalNameRef}
          type="text"
          placeholder="name@example.com"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Journal Strategy</Form.Label>
        <Form.Control ref={journalStratRef} as="textarea" />
      </Form.Group>
      <Form.Group className="d-flex justify-content-end">
        <Button onClick={addJournal} variant="secondary">Add Journal</Button>
      </Form.Group>
    </Form>
  );

  return (
    <div className="journal_container d-flex flex-column">
      <div className="journal-container-header">
        <h3>
          My Journals{" "}
          <Button variant="success" onClick={newJournal}>
            New Journal
          </Button>{" "}
        </h3>
      </div>
      <section className="d-flex flex-column justify-content-center mt-3 h-100">
        {displayJournalForm ? journalForm : <LoginModal />}
        {!displayJournalForm && <JournalCard />}
      </section>
    </div>
  );
};

export default Journal;
