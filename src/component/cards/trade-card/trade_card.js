import { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import ChartImgModal from "../../modals/chartImg/chart-img-modal";
import { getAllTradesController } from "../../../controllers/trade/trade-controllers";
import { setWinOrLossController } from "../../../controllers/trade/trade-controllers";
import { modalActions } from "../../../store/slices/modal-state-slice";

import {
  Card,
  Col,
  Pagination,
  Row,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import "./trade_card.scss";

const TradeCard = () => {
  const selectedJournal = useSelector((state) => state.journal.selectedJournal);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const showChart = useSelector((state) => state.modal.chartModalState);

  //const [trades, setTrades] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tradesPerPage, setTradesPerPage] = useState(6);
  const [updatedWinOrLoss, setUpdatedWinOrLoss] = useState(false);
  const [tradesLoaded, setTradesLoaded] = useState(false);
  //const tradesLoaded = useRef(false)
  const trades = useRef([]);
  const currentTrades = useRef([]);
  const dispatch = useDispatch();
  const imgUrlRef = useRef("");

  useEffect(() => {
    console.log("in trade_card ue");
    callTradeController("GET-TRADES");

    return () => {
      console.log("in trade_card clean up");
      trades.current = [];
    };
  }, [updatedWinOrLoss]);

  console.log("trade_card rendering");
  console.log(tradesLoaded);
  //console.log("after rendering ",trades.current);

  const callTradeController = async (action, data) => {
    console.log("in trade controller");
    switch (action) {
      case "GET-TRADES":
        const allTrades = await getAllTradesController(
          currentUser,
          selectedJournal
        );
        trades.current = allTrades;
        setTradesLoaded(true);
        console.log("after setting to true");
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
    }
  };

  const indexOfLastTrade = currentPage * tradesPerPage;
  const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;

  if (tradesLoaded) {
    currentTrades.current = trades.current.map((data, idx) => {
      let bgColorClass;
      let winlossButton;

      if(idx % 2 == 0){
        bgColorClass = "bg-even"
      }else{
        bgColorClass = "bg-odd"
      }

      if(data.tradeData.WinOrLoss === "WIN"){
        winlossButton = "wl-button-win"
      }else if(data.tradeData.WinOrLoss === "LOSS"){
        winlossButton = "wl-button-loss"
      }else{
        winlossButton = "wl-button-default"
      }

      return (
        <Card className={`trade-card-container ${bgColorClass}`} key={idx}>
          <Card.Body className="trade-card">
            <div className="trade-data">
              <Col><p>{data.tradeData.Market}</p></Col>
              <Col><p>{data.tradeData.Ticker}</p></Col>
              <Col><p>{data.tradeData.Entry}</p></Col>
              <Col><p>{data.tradeData["Take Profit"]}</p></Col>
              <Col><p>{data.tradeData["Stop Loss"]}</p></Col>
              <Col><p>ph</p></Col>
              <Col>
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={
                    <Popover id={`popover-positioned-bottom`}>
                      <Popover.Body className="d-flex flex-column">
                        <Button
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
              <Col><p>ph</p></Col>
              <Col>
                <Button
                className="chart-button"
                  onClick={(e) => {
                    e.preventDefault();
                    imgUrlRef.current = data.tradeData.Url;
                    dispatch(modalActions.showChartModal({ modalState: true }));
                  }}
                >
                  Show
                </Button>
              </Col>
            </div>
          </Card.Body>
        </Card>
      );
    });
  }

  /*const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(trades.length / tradesPerPage); i++) {
    pageNumbers.push(i);
  }

  const setPage = (number) => {
    setCurrentPage(number);
  };

  const pagination = pageNumbers.map((number, idx) => {
    return (
      <Pagination.Item
      key={idx}
        className="page-number"
        onClick={() => {
          setPage(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  });*/

  return (
    <Fragment>
      <ChartImgModal imgUrl={imgUrlRef.current} />
      {currentTrades.current}
      {/*<Pagination className="mt-auto justify-content-center">
        {pagination}
  </Pagination>*/}
    </Fragment>
  );
};

export default TradeCard;
