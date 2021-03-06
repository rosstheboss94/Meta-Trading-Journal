import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import JournalCard from "../../component/cards/journal-card/journal_card";
import JournalForm from "../../component/forms/journal-form/journal-form";
import LoginModal from "../../component/modals/login/login";

import { modalActions } from "../../store/slices/modal-state-slice";
import { addJournalController } from "../../controllers/journal/journal-controllers";

import { Button, Col } from "react-bootstrap";
import "./journal.scss";

const Journal = () => {
  const [displayJournalForm, setDisplayJournalForm] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const journalNameRef = useRef("");
  const journalStratRef = useRef("");
  const dispatch = useDispatch();

  useEffect(() => {
    setDisplayJournalForm(false);
    return () => {
      setDisplayJournalForm(false);
    };
  }, [isLoggedIn, currentUser]);

  const newJournal = () => {
    if (isLoggedIn) {
      setDisplayJournalForm(true);
    } else {
      dispatch(modalActions.showLoginModal({ modalState: true }));
    }
  };

  const callJournalController = () => {
    const data = {
      name: journalNameRef.current.value,
      winPercentage: 0,
      strategy: journalStratRef.current.value,
    };

    addJournalController(currentUser, journalNameRef.current.value, data);
    setDisplayJournalForm(false);
  };

  return (
    <div className="journal_container d-flex flex-column">
      <div className="journal-container-header">
        <Col>
          <h3>My Journals </h3>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="success" onClick={newJournal}>
            New Journal
          </Button>{" "}
        </Col>
      </div>
      <section className="d-flex flex-column justify-content-center h-100">
        {displayJournalForm ? (
          <JournalForm
            addJournal={callJournalController}
            closeForm={() => {
              setDisplayJournalForm(false);
            }}
            nameRef={journalNameRef}
            stratRef={journalStratRef}
          />
        ) : (
          <LoginModal />
        )}
        {!displayJournalForm && <JournalCard />}
      </section>
    </div>
  );
};

export default Journal;
