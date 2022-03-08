import { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { journalActions } from "../../../store/slices/journal_slice";
import LoginButton from "../../buttons/login_button/login_button";
import { getJournalsController } from "../../../controllers/journal/journal-controllers";

import { Card, Col } from "react-bootstrap";
import JournalIcon from "../../../assets/journal-icon.png";
import "./journal_card.scss";

const JournalCard = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [journalsloaded, setJournalsLoaded] = useState(false);
  const dispatch = useDispatch();
  const journalLayoutRef = useRef();

  useEffect(() => {
    if (currentUser != " " && isLoggedIn == true) {
      callJournalController();
    }
  
    return () => { 
      journalLayoutRef.current = undefined;
      setJournalsLoaded(false);
    };
  }, [currentUser]);

  const openJournal = (e, journalName) => {
    e.preventDefault();
    dispatch(
      journalActions.goTojournal({
        selectedJournal: journalName,
        enterJournal: true,
      })
    );
  };

  const callJournalController = async () => {
    const journalsFromDb = await getJournalsController(currentUser)
    
    journalLayoutRef.current = journalsFromDb.map(
      (journal) => {
        let key = Object.keys(journal);
        return (
          <Card key={key} className="mb-3">
            <Card.Body className="journal-card">
              <Col md lg={1}>
                <img
                  src={JournalIcon}
                  onClick={(e) => {
                    openJournal(e,journal[key].name);
                  }}
                />
              </Col>
              <Col md lg={3} className="journal-name">
                {isLoggedIn ? journal[key].name : "name"}
              </Col>
              <Col>
                <textarea
                  className="journal-notes"
                  value={
                    isLoggedIn ? journal[key].strategy : "test strategy"
                  }
                ></textarea>
              </Col>
            </Card.Body>
          </Card>
        );
      }
    );

    setJournalsLoaded(true);           
  };

  return (
    <Fragment>
      {isLoggedIn ? journalLayoutRef.current : <div className="d-flex justify-content-center align-items-center">Sign In To Start Tracking Your Trades Now! <LoginButton /></div>}
    </Fragment>
  );
};

export default JournalCard;
