import { Container, Button } from "react-bootstrap";
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

  return (
    <Container className="trades_container d-flex flex-column">
      <div className="d-flex w-100 justify-content-center">
        <div className="trades-header">
          <h3 onClick={closeJournal}>{selectedJournal.toUpperCase()}</h3><p>Trades</p> <Button variant="success" onClick={addTrade}>Add Trade</Button>{" "}
        </div>
      </div>
      <section className="d-flex flex-column h-100">
      <TradeCard />
      </section>
  
    </Container>
  );
};

export default Trades;
