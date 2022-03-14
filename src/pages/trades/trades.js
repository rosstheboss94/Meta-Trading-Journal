import { Container, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { journalActions } from "../../store/slices/journal_slice";
import TradeCard from "../../component/cards/trade-card/trade_card";
import "./trades.scss";

const Trades = () => {
  const selectedJournal = useSelector((state) => state.journal.selectedJournal);
  const dispatch = useDispatch();

  const addTrade = (e) => {
    e.preventDefault();
    dispatch(journalActions.goToTradeForm({enterTrade:true}))
  }

  const closeJournal = (e) =>{
    e.preventDefault();
    dispatch(journalActions.goTojournal({enterJournal: false}))
  }
  //console.log("trades rendering");
  return (
    <Container className="trades_container d-flex flex-column">
      <div className="d-flex w-100 justify-content-center">
        <div className="main-headers">
          <h3 onClick={closeJournal}>{selectedJournal.toUpperCase()}</h3>
          <Button variant="success" onClick={addTrade}>Add Trade</Button>{" "}
        </div>
      </div>
      <section className="trade-section">
      <div className="trades-headers">
        <Col><p>Market</p></Col>
        <Col><p>Ticker</p></Col>
        <Col><p>Entry</p></Col>
        <Col><p>Exit</p></Col>
        <Col><p>Stop Loss</p></Col>
        <Col><p>Return</p></Col>
        <Col><p>Win/Loss</p></Col>
        <Col><p>Notes</p></Col>
        <Col><p>Chart</p></Col>
      </div>
      <TradeCard />
      </section>
  
    </Container>
  );
};

export default Trades;
