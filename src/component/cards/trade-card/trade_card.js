import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Col, Pagination, Row } from "react-bootstrap";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import "./trade_card.scss";

const TradeCard = () => {
  const selectedJournal = useSelector((state) => state.journal.selectedJournal);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [trades, setTrades] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tradesPerPage, setTradesPerPage] = useState(6);

  useEffect(() => {
    getTrades();
  }, []);

  const getTrades = async () => {
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
      setTrades((ps) => {
        return [...ps, doc.data()];
      });
    });
  };

  const indexOfLastTrade = currentPage * tradesPerPage;
  const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;

  const currentTrades = (trades.map((data, idx) => {
    let borderClass;
    if (data.WinOrLoss == "Win") {
      borderClass = "trade-win";
    } else if (data.WinOrLoss == "Loss") {
      borderClass = "trade-loss";
    }

    return (
      <Card className={`${borderClass} mb-2`} key={idx}>
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
            <Col>${data.Entry}</Col>
            <Col>${data["Take Profit"]}</Col>
            <Col>${data["Stop Loss"]}</Col>
            <Col>{data.WinOrLoss}</Col>
          </Row>
        </Card.Body>
      </Card>
    );
  })).slice(indexOfFirstTrade,indexOfLastTrade)

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(trades.length / tradesPerPage); i++) {
    pageNumbers.push(i);
  }

  const setPage = (number) => {
    setCurrentPage(number);
  };

  const pagination = pageNumbers.map((number, idx) => {
    return (
      <Pagination.Item
        className="page-number"
        onClick={() => {
          setPage(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  });

  return <Fragment>
    {currentTrades}
    <Pagination className="mt-auto justify-content-center">{pagination}</Pagination>
  </Fragment>;
};

export default TradeCard;
