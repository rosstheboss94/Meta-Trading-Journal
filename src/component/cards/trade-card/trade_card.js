import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import "./trade_card.scss";

const TradeCard = () => {
  const selectedJournal = useSelector((state) => state.journal.selectedJournal);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
  getTrades();
  }, []);

  const getTrades = async () => {
    //console.log(selectedJournal);
    //console.log(currentUser);
    const querySnapshot = await getDocs(
      collection(
        db,
        "users",
        currentUser,
        "journals",
        selectedJournal,
        "trades"
      )
    );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setTrades((ps) => {
        return [...ps, doc.data()];
      });
    });
    console.log(trades);
  };

  return (
    <Fragment>
      {trades.map((data, idx) => {
        return (
          <Card className="mb-3">
            <Card.Body className="trade-card">
              <Row className="trade-labels">
                <Col>Market:</Col>
                <Col>Ticker:</Col>
                <Col>Entry:</Col>
                <Col>Take Profits:</Col>
                <Col>Stop Loss:</Col>
                <Col>Win/Loss:</Col>
              </Row>
              <Row className="trade-data">
                <Col>{data.Market}</Col>
                <Col>{data.Ticker}</Col>
                <Col>{data.Entry}</Col>
                <Col>{data["Take Profit"]}</Col>
                <Col>{data["Stop Loss"]}</Col>
                <Col>{data.WinOrLoss}</Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </Fragment>
  );
};

export default TradeCard;
