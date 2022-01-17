import { Fragment, useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { Card, Col } from "react-bootstrap";
import { journalActions } from "../../../store/slices/journal_slice";
import { db } from "../../../firebase/firebase";
import JournalIcon from "../../../assets/journal-icon.png";
import LoginButton from "../../buttons/login_button/login_button";
import "./journal_card.scss";

const JournalCard = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [journalsloaded, setJournalsLoaded] = useState(false);
  const dispatch = useDispatch();
  const journalDataRef = useRef([]);
  const journalLayoutRef = useRef();
  const journalSnapshotRef = useRef({});

  useEffect(() => {

    console.log(currentUser + " " + isLoggedIn);

    if (currentUser != " " && isLoggedIn == true) {
 
      getJournals();
    }

    return () => {
      journalDataRef.current = [];
      journalLayoutRef.current = undefined;
      journalSnapshotRef.current = {};
    };
  }, [currentUser]);

  const getJournals = () => {
    getDocs(collection(db, "users", currentUser, "journals"))
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          journalSnapshotRef.current = {
            ...journalSnapshotRef.current,
            [doc.id]: doc.data(),
          };
        });
      })
      .then(() => {
        for (let journal in journalSnapshotRef.current) {
          journalDataRef.current.push({
            [journal]: journalSnapshotRef.current[journal],
          });
        }

        journalLayoutRef.current = journalDataRef.current.map(
          (journal, idx) => {
            let key = Object.keys(journal);
            return (
              <Card key={idx} className="mb-3">
                <Card.Body className="journal-card">
                  <Col md lg={1}>
                    <img
                      src={JournalIcon}
                      onClick={(e) => {
                        openJournal(e, journal[key].name);
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
      })
      .then(() => {
        setJournalsLoaded(true);
      });
  };

  const openJournal = (e, journalName) => {
    e.preventDefault();
    dispatch(
      journalActions.goTojournal({
        selectedJournal: journalName,
        enterJournal: true,
      })
    );
  };

  return (
    <Fragment>
      {isLoggedIn ? journalLayoutRef.current : <div className="d-flex justify-content-center align-items-center">Sign In To Start Tracking Your Trades Now! <LoginButton /></div>}
    </Fragment>
  );
};

export default JournalCard;
