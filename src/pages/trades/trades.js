import { Container, Row, Button } from "react-bootstrap";
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

  return (
    <Container className="trades_container d-flex flex-column">
      <Row>
        <h1>
          {selectedJournal.toUpperCase()}<p>Trades</p> <Button variant="success" onClick={addTrade}>Add Trade</Button>{" "}
        </h1>
      </Row>
      <section className="d-flex flex-column h-100">
      <TradeCard />
      </section>
  
    </Container>
  );
};

export default Trades;
