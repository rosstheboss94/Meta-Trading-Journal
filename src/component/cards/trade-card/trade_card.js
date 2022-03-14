import { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import ChartImgModal from "../../modals/chartImg/chart-img-modal";
import { getAllTradesController } from "../../../controllers/trade/trade-controllers";
import { setWinOrLossController } from "../../../controllers/trade/trade-controllers";
import { updateReturnController } from "../../../controllers/trade/trade-controllers";
import { modalActions } from "../../../store/slices/modal-state-slice";

import {
  Card,
  Col,
  Pagination,
  Row,
  Button,
  Popover,
  OverlayTrigger,
  Form,
  FormControl,
} from "react-bootstrap";
import { FcDocument } from "react-icons/fc";
import "./trade_card.scss";

const TradeCard = () => {
  const selectedJournal = useSelector((state) => state.journal.selectedJournal);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [currentPage, setCurrentPage] = useState(1);
  const [tradesPerPage, setTradesPerPage] = useState(10);
  const [updatedWinOrLoss, setUpdatedWinOrLoss] = useState(false);
  const [tradesLoaded, setTradesLoaded] = useState(false);
  const trades = useRef([]);
  const currentTrades = useRef([]);
  const returnRef = useRef("$0.00");
  const dispatch = useDispatch();
  const imgUrlRef = useRef("");

  useEffect(() => {
    callTradeController("GET-TRADES");

    return () => {
      trades.current = [];
    };
  }, [updatedWinOrLoss]);

  console.log(imgUrlRef.current.value);

  const callTradeController = async (action, data) => {
    switch (action) {
      case "GET-TRADES":
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
        setUpdatedWinOrLoss((ps) => !ps);
        break;
      case "RETURN":
        updateReturnController(
          currentUser,
          selectedJournal,
          data.tradeId,
          data.tradeReturn
        );
        setUpdatedWinOrLoss((ps) => !ps);
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

        //console.log("in currentTrades");
        //console.log(data.id);

        console.log(data.tradeData.Url);

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

        return (
          <Card
            className={`trade-card-container ${bgColorClass}`}
            key={data.id}
          >
            <Card.Body className="trade-card">
              <div className="trade-data">
                <Col>
                  <p>{data.tradeData.Market}</p>
                </Col>
                <Col>
                  <p>{data.tradeData.Ticker}</p>
                </Col>
                <Col>
                  <p>{data.tradeData.Entry}</p>
                </Col>
                <Col>
                  <p>{data.tradeData["Take Profit"]}</p>
                </Col>
                <Col>
                  <p>{data.tradeData["Stop Loss"]}</p>
                </Col>
                <Col>
                  <OverlayTrigger
                    trigger="click"
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Popover id={`popover-positioned-bottom}`}>
                        <Popover.Header as="h3">Return</Popover.Header>
                        <Popover.Body className="d-flex flex-column align-items-center">
                          <FormControl
                            className="mb-2"
                            ref={returnRef}
                            type="text"
                          />
                          <Button
                            onClick={() => {
                              callTradeController("RETURN", {
                                tradeId: data.id,
                                tradeReturn: returnRef.current.value,
                              });
                            }}
                          >
                            Update
                          </Button>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <Button variant="secondary" className="notes-button">
                      {data.tradeData.Return}
                    </Button>
                  </OverlayTrigger>
                </Col>
                <Col>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={
                      <Popover id={`popover-positioned-bottom`}>
                        <Popover.Body className="d-flex flex-column">
                          <Button
                            className="mb-2"
                            onClick={() =>
                              callTradeController("SET-WIN-OR-LOSS", {
                                tradeId: data.id,
                                tradeResult: "WIN",
                              })
                            }
                          >
                            Win
                          </Button>
                          <Button
                            onClick={() =>
                              callTradeController("SET-WIN-OR-LOSS", {
                                tradeId: data.id,
                                tradeResult: "LOSS",
                              })
                            }
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
                <Col>
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
                      <FcDocument />
                    </Button>
                  </OverlayTrigger>
                </Col>
                <Col>
                  <Button
                    variant="outline-dark"
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
