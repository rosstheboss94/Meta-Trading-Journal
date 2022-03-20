import { Container, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { journalActions } from "../../store/slices/journal_slice";
import TradeCard from "../../component/cards/trade-card/trade_card";
import { FcPicture } from "react-icons/fc";
import { BsJournalText } from "react-icons/bs";
import "./trades.scss";
import { Fragment } from "react";

const Trades = () => {
  const selectedJournal = useSelector((state) => state.journal.selectedJournal);
  const dispatch = useDispatch();

  const addTrade = (e) => {
    e.preventDefault();
    dispatch(journalActions.goToTradeForm({ enterTrade: true }));
  };

  const closeJournal = (e) => {
    e.preventDefault();
    dispatch(journalActions.goTojournal({ enterJournal: false }));
  };

  const targetsDesktop = (
    <Fragment>
      <Col xs={2} className="d-flex justify-content-center align-items-center">
        <p>Entry</p>
      </Col>
      <Col xs={1} className="d-flex justify-content-center align-items-center">
        <p>TP</p>
      </Col>
      <Col xs={1} className="d-flex justify-content-center align-items-center">
        <p>SL</p>
      </Col>
    </Fragment>
  );

  const targetsMobile = (
    <Fragment>
      <Col xs={2} className="d-flex justify-content-center align-items-center">
        <p>Targets</p>
      </Col>
    </Fragment>
  );

  return (
    <Container className="trades_container d-flex flex-column">
      <div className="d-flex w-100 justify-content-center">
        <div className="main-headers">
          <h3 onClick={closeJournal}>{selectedJournal.toUpperCase()}</h3>
          <Button variant="success" onClick={addTrade}>
            Add Trade
          </Button>{" "}
        </div>
      </div>
      <section className="trade-section">
        <div className="trades-headers">
          <Col xs={2} className="d-flex justify-content-center align-items-center">
            <p>Market</p>
          </Col>
          <Col xs={2} className="d-flex justify-content-center align-items-center">
            <p>Ticker</p>
          </Col>
          {window.screen.width < 576 ? targetsMobile : targetsDesktop}
          <Col xs={1} className="d-flex justify-content-center align-items-center">
            <p>R/R</p>
          </Col>
          <Col xs={2} className="d-flex justify-content-center align-items-center">
            <p>W/L</p>
          </Col>
          <Col xs={1} className="d-flex justify-content-center align-items-center">
            <BsJournalText />
          </Col>
          <Col xs={2} className="d-flex justify-content-center align-items-center">
            <FcPicture />
          </Col>
        </div>
        <TradeCard />
      </section>
    </Container>
  );
};

export default Trades;
