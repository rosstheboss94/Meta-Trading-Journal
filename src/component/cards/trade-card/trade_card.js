import { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllTradesController } from "../../../controllers/trade/trade-controllers";
import { setWinOrLossController } from "../../../controllers/trade/trade-controllers";

import { modalActions } from "../../../store/slices/modal-state-slice";

import {
  Card,
  Col,
  Pagination,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { FcDocument } from "react-icons/fc";
import { BsThreeDots } from "react-icons/bs";
import { IconContext } from "react-icons";
import "./trade_card.scss";

const TradeCard = () => {
  const selectedJournal = useSelector((state) => state.journal.selectedJournal);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [currentPage, setCurrentPage] = useState(1);
  const [tradesPerPage, setTradesPerPage] = useState(10);
  const [updatedWinOrLoss, setUpdatedWinOrLoss] = useState(false);
  const [tradesLoaded, setTradesLoaded] = useState(false);
  const updatedWinLoss = useRef(false);
  const trades = useRef([]);
  const currentTrades = useRef([]);
  const dispatch = useDispatch();
  const imgUrlRef = useRef("");

  useEffect(() => {
    callTradeController("GET-TRADES");

    return () => {
      trades.current = [];
    };
  }, []);

  const callTradeController = async (action, data) => {
    switch (action) {
      case "GET-TRADES":
        setTradesLoaded(false);
        const allTrades = await getAllTradesController(
          currentUser,
          selectedJournal
        );
        trades.current = allTrades;
        setTradesLoaded(true);
        break;
      case "SET-WIN-OR-LOSS":
        setWinOrLossController(
          currentUser,
          selectedJournal,
          data.tradeId,
          data.tradeResult
        );
        updatedWinLoss.current = true;
        break;
      default:
    }
  };

  const indexOfLastTrade = currentPage * tradesPerPage;
  const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;


  if (tradesLoaded) {
    currentTrades.current = trades.current
      .map((data, idx) => {
        let bgColorClass;
        let winlossButton;

        if (idx % 2 == 0) {
          bgColorClass = "bg-even";
        } else {
          bgColorClass = "bg-odd";
        }

        if (data.tradeData.WinOrLoss === "WIN") {
          winlossButton = "wl-button-win";
        } else if (data.tradeData.WinOrLoss === "LOSS") {
          winlossButton = "wl-button-loss";
        } else {
          winlossButton = "wl-button-default";
        }

        const targetsDataDesktop = (
          <Fragment>
            <Col xs={2}>
              <p>{data.tradeData.Entry}</p>
            </Col>
            <Col xs={1}>
              <p>{data.tradeData["Take Profit"]}</p>
            </Col>
            <Col xs={1}>
              <p>{data.tradeData["Stop Loss"]}</p>
            </Col>
          </Fragment>
        );

        const targetsDataMobile = (
          <Fragment>
            <Col
              xs={2}
              className="d-flex justify-content-center align-items-center h-100"
            >
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={
                  <Popover id={`popover-positioned-bottom`}>
                    <Popover.Header as="h3">Targets</Popover.Header>
                    <Popover.Body>
                      <Col>
                        <div>
                          <p>{`Entry: ${data.tradeData.Entry}`}</p>
                        </div>
                        <div>
                          <p>{`Take Profits: ${data.tradeData["Take Profit"]}`}</p>
                        </div>
                        <div>
                          <p>{`Stop Loss: ${data.tradeData["Stop Loss"]}`}</p>
                        </div>
                      </Col>
                    </Popover.Body>
                  </Popover>
                }
              >
                <Button variant="secondary">
                  <BsThreeDots />
                </Button>
              </OverlayTrigger>
            </Col>
          </Fragment>
        );

        return (
          <Card
            className={`trade-card-container ${bgColorClass}`}
            key={data.id}
          >
            <Card.Body className="trade-card">
              <div className="trade-data">
                <Col
                  xs={2}
                  className="d-flex justify-content-center align-items-center h-100"
                >
                  <p>{data.tradeData.Market}</p>
                </Col>
                <Col
                  xs={2}
                  className="d-flex justify-content-center align-items-center h-100"
                >
                  <p>{data.tradeData.Ticker}</p>
                </Col>
                {window.screen.width < 992
                  ? targetsDataMobile
                  : targetsDataDesktop}
                <Col
                  xs={1}
                  className="d-flex justify-content-center align-items-center h-100"
                >
                  <p>{data.tradeData.RiskReward}</p>
                </Col>
                <Col
                  xs={2}
                  className="d-flex justify-content-center align-items-center h-100"
                >
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    onToggle={() => {
                      if(updatedWinLoss.current === true){
                        callTradeController("GET-TRADES")
                      }
                    }}
                    overlay={
                      <Popover
                        id={`popover-positioned-bottom`}
                        className="test-arrow"
                      >
                        <Popover.Body className="d-flex flex-column bg-dark">
                          <Button
                            className="win-button mb-2"
                            onClick={() => {
                              callTradeController("SET-WIN-OR-LOSS", {
                                tradeId: data.id,
                                tradeResult: "WIN",
                              });
                            }}
                          >
                            Win
                          </Button>
                          <Button
                            className="loss-button"
                            onClick={() => {
                              callTradeController("SET-WIN-OR-LOSS", {
                                tradeId: data.id,
                                tradeResult: "LOSS",
                              });
                            }}
                          >
                            Loss
                          </Button>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <Button className={`${winlossButton}`} variant="secondary">
                      {data.tradeData.WinOrLoss}
                    </Button>
                  </OverlayTrigger>
                </Col>
                <Col
                  xs={1}
                  className="d-flex justify-content-center align-items-center h-100"
                >
                  <OverlayTrigger
                    trigger="click"
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Popover id={`popover-positioned-bottom}`}>
                        <Popover.Header as="h3">Notes</Popover.Header>
                        <Popover.Body>
                          <p>{data.tradeData.Notes}</p>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <Button variant="secondary" className="notes-button">
                      <IconContext.Provider value={{ className: "note-icon" }}>
                        <div className="h-100">
                          <FcDocument />
                        </div>
                      </IconContext.Provider>
                    </Button>
                  </OverlayTrigger>
                </Col>
                <Col
                  xs={2}
                  className="d-flex justify-content-center align-items-center h-100"
                >
                  <Button
                    variant="dark"
                    className="chart-button"
                    onClick={(e) => {
                      e.preventDefault();
                      imgUrlRef.current = data.tradeData.Url;
                      dispatch(
                        modalActions.showChartModal({
                          modalState: true,
                          imgUrl: data.tradeData.Url,
                        })
                      );
                    }}
                  >
                    Show
                  </Button>
                </Col>
              </div>
            </Card.Body>
          </Card>
        );
      })
      .slice(indexOfFirstTrade, indexOfLastTrade);
  }

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(trades.current.length / tradesPerPage); i++) {
    pageNumbers.push(i);
  }

  const setPage = (number) => {
    setCurrentPage(number);
  };

  const pagination = pageNumbers.map((number, idx) => {
    return (
      <Pagination.Item
        key={idx}
        onClick={() => {
          setPage(number);
        }}
      >
        <p className="text-muted mb-0">{number}</p>
      </Pagination.Item>
    );
  });

  return (
    <Fragment>
      {currentTrades.current}
      <Pagination className="mt-auto  testing justify-content-center">
        {pagination}
      </Pagination>
    </Fragment>
  );
};

export default TradeCard;
