import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getAllTradesController } from "../../../controllers/trade/trade-controllers";
import { setWinOrLossController } from "../../../controllers/trade/trade-controllers";

import { Card, Col, Pagination, Row, Button, Popover, OverlayTrigger } from "react-bootstrap";
import "./trade_card.scss";


const TradeCard = () => {
  const selectedJournal = useSelector((state) => state.journal.selectedJournal);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [trades, setTrades] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tradesPerPage, setTradesPerPage] = useState(6);
  const [updatedWinOrLoss, setUpdatedWinOrLoss] = useState(false);

  useEffect(() => {
    callTradeController("GET-TRADES");

    return () => {
      setTrades([]);
    };
  }, [updatedWinOrLoss]);

  const callTradeController = async (action, data) => {
    switch (action) {
      case "GET-TRADES":
        const allTrades = await getAllTradesController(currentUser, selectedJournal);
        setTrades(allTrades);
        break;
      case "SET-WIN-OR-LOSS":
        setWinOrLossController(currentUser, selectedJournal, data.tradeId, data.tradeResult);
        setUpdatedWinOrLoss((ps) => !ps);
        break;
    }
  };

  const indexOfLastTrade = currentPage * tradesPerPage;
  const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;

  const currentTrades = trades
    .map((data, idx) => {
      let borderClass;

      if (data.tradeData.WinOrLoss == "WIN") {
        borderClass = "trade-win";
      } else if (data.tradeData.WinOrLoss == "LOSS") {
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
              <Col>{data.tradeData.Market}</Col>
              <Col>{data.tradeData.Ticker}</Col>
              <Col>{data.tradeData.Entry}</Col>
              <Col>{data.tradeData["Take Profit"]}</Col>
              <Col>{data.tradeData["Stop Loss"]}</Col>
              <Col>
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={
                    <Popover id={`popover-positioned-bottom`}>
                      <Popover.Body className="d-flex flex-column">
                        <Button onClick={() => callTradeController("SET-WIN-OR-LOSS", {tradeId: data.id, tradeResult: "WIN"})}>Win</Button>
                        <Button onClick={() => callTradeController("SET-WIN-OR-LOSS", {tradeId: data.id, tradeResult: "LOSS"})}>Loss</Button>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <Button variant="secondary">{data.tradeData.WinOrLoss}</Button>
                </OverlayTrigger>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      );
    })
    .slice(indexOfFirstTrade, indexOfLastTrade);

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

  return (
    <Fragment>
      {currentTrades}
      <Pagination className="mt-auto justify-content-center">
        {pagination}
      </Pagination>
    </Fragment>
  );
};

export default TradeCard;
