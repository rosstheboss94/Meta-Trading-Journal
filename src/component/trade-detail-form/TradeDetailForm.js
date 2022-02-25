import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { journalActions } from "../../store/slices/journal_slice";
import { addTradeController } from "../../controllers/trade/trade-controllers";

import { Button, Row, Col, Offcanvas, Form } from "react-bootstrap";
import "./TradeDetailForm.scss";

const TradeDetailForm = () => {
  const marketRef = useRef("");
  const tickerRef = useRef("");
  const tradeTargetRef = useRef();
  const enterTrade = useSelector((state) => state.journal.enterTrade);
  const selectedJournal = useSelector((state) => state.journal.selectedJournal);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const callTradeController = (e) => {
    e.preventDefault();

    const data = {
      Market: marketRef.current.value,
      Ticker: tickerRef.current.value,
      "Take Profit": tradeTargetRef.current.childNodes[0].children[1].value,
      Entry: tradeTargetRef.current.childNodes[1].children[1].value,
      "Stop Loss": tradeTargetRef.current.childNodes[1].children[1].value,
    };

    addTradeController(currentUser, selectedJournal, data);
    dispatch(journalActions.goToTradeForm({ enterTrade: false }));
  };

  return (
    <>
      <Offcanvas
        show={enterTrade}
        onHide={() => {
          dispatch(journalActions.goToTradeForm({ enterTrade: false }));
        }}
        placement="end"
        classname="trade-canvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Trade Detail</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form className="trade_detail_container">
            <Form.Group className="trade_market">
              <Form.Label>Market:</Form.Label>
              <Form.Select ref={marketRef}>
                <option value="Crypto">Crypto</option>
                <option value="Stocks">Stocks</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="trade_ticker">
              <Form.Label>Ticker:</Form.Label>
              <Form.Control ref={tickerRef} type="text" />
            </Form.Group>

            <Row ref={tradeTargetRef} className="trade_targets">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Take Profit:</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Entry:</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Stop Loss:</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Row>

            <Form.Group className="d-flex justify-content-center">
              <Button
                className="btn btn-success"
                type="submit"
                onClick={(e) => {
                  callTradeController(e);
                }}
              >
                Add Trade
              </Button>
            </Form.Group>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default TradeDetailForm;
