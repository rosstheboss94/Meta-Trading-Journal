import { Fragment, useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import "./TradeDetailForm.scss";
import { Button, Row, Col, Offcanvas } from "react-bootstrap";
import { journalActions } from "../../store/slices/journal_slice";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebase/firebase";
import { doc, setDoc, collection } from "firebase/firestore";

const TradeDetailForm = () => {
  const [selectedChartPatterns, setSelectedChartPatterns] = useState([]);
  const [selectedChartIndicators, setSelectedChartIndicators] = useState([]);
  const marketRef = useRef("");
  const tickerRef = useRef("");
  const tradeTargetRef = useRef();
  const enterTrade = useSelector((state) => state.journal.enterTrade);
  const selectedJournal = useSelector((state) => state.journal.selectedJournal);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  console.log(tradeTargetRef);

  useEffect(() => {
    console.log(selectedChartPatterns.join(" "));
  }, [selectedChartIndicators, selectedChartPatterns]);

  const ChartPatterns = [
    "Head and shoulders",
    "Double top",
    "Double bottom",
    "Rounding bottom",
    "Cup and handle",
    "Wedge",
    "Pennant",
    "Flag",
    "Ascending triangle",
    "Descending triangle",
    "Symmetrical triangle",
  ].map((pattern, idx) => {
    return (
      <Dropdown.Item key={idx} eventKey={pattern}>
        {pattern}
      </Dropdown.Item>
    );
  });

  const ChartIndicators = [
    "Moving average (MA)",
    "Exponential moving average (EMA)",
    "Stochastic oscillator",
    "Moving average convergence divergence (MACD)",
    "Bollinger bands",
    "Relative strength index (RSI)",
    "Fibonacci retracement",
    "Ichimoku cloud",
  ].map((pattern, idx) => {
    return (
      <Dropdown.Item key={idx} eventKey={pattern}>
        {pattern}
      </Dropdown.Item>
    );
  });

  const addChartPattern = (chartPattern) => {
    if (!selectedChartPatterns.includes(chartPattern)) {
      setSelectedChartPatterns((ps) => {
        return [...ps, chartPattern];
      });
    }
  };

  const addChartIndicators = (chartIndicator) => {
    if (!selectedChartIndicators.includes(chartIndicator)) {
      setSelectedChartIndicators((ps) => {
        return [...ps, chartIndicator];
      });
    }
  };

  const addTrade = (e) => {
    e.preventDefault();
    const tradeDocRef = doc(
      collection(
        db,
        "users",
        currentUser,
        "journals",
        selectedJournal,
        "trades"
      )
    );

    setDoc(
      tradeDocRef,
      {
        Market: marketRef.current.value,
        Ticker: tickerRef.current.value,
        //"Chart Patterns": selectedChartPatterns.join(" "),
        //"Chart indicators": selectedChartIndicators.join(" "),
        "Take Profit": tradeTargetRef.current.childNodes[0].children[1].value,
        Entry: tradeTargetRef.current.childNodes[1].children[1].value,
        "Stop Loss": tradeTargetRef.current.childNodes[1].children[1].value,
      },
      { merge: true }
    );

    dispatch(journalActions.goToTradeForm({ enterTrade: false }))
  };

  return (
    <Fragment>
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

            {/*<Form.Group className="chart_patterns">
              <Form.Label>
                Chart Patterns:{" "}
                <Dropdown
                  className="d-inline mx-2"
                  onSelect={addChartPattern}
                  autoClose={false}
                >
                  <Dropdown.Toggle id="dropdown-autoclose-false"></Dropdown.Toggle>
                  <Dropdown.Menu>{ChartPatterns}</Dropdown.Menu>
                </Dropdown>
              </Form.Label>

              <Form.Control
                as="textarea"
                rows="3"
                value={selectedChartPatterns.join(" ")}
              />
            </Form.Group>

            <Form.Group className="chart_indicators">
              <Form.Label>
                Chart Indicators:{" "}
                <Dropdown
                  className="d-inline mx-2"
                  onSelect={addChartIndicators}
                  autoClose={false}
                >
                  <Dropdown.Toggle id="dropdown-autoclose-false"></Dropdown.Toggle>
                  <Dropdown.Menu>{ChartIndicators}</Dropdown.Menu>
                </Dropdown>
              </Form.Label>

              <Form.Control
                as="textarea"
                rows="3"
                value={selectedChartIndicators.join(" ")}
              />
      </Form.Group>*/}

            <Row ref={tradeTargetRef} className="trade_targets">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Take Profit:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={() => {
                    console.log(
                      tradeTargetRef.current.childNodes[0].children[1].value
                    );
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Entry:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={() => {
                    console.log(
                      tradeTargetRef.current.childNodes[1].children[1].value
                    );
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Stop Loss:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={() => {
                    console.log(
                      tradeTargetRef.current.childNodes[2].children[1].value
                    );
                  }}
                />
              </Form.Group>
            </Row>

            <Form.Group className="d-flex justify-content-center">
              <Button
                className="btn btn-success"
                type="submit"
                onClick={addTrade}
              >
                Add Trade
              </Button>
            </Form.Group>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </Fragment>
  );
};

export default TradeDetailForm;
