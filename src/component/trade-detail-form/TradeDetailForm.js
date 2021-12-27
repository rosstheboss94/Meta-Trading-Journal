import { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import "./TradeDetailForm.scss";
import { Button, Row, Col } from "react-bootstrap";

const TradeDetailForm = () => {
  const [selectedChartPatterns, setSelectedChartPatterns] = useState([]);
  const [selectedChartIndicators, setSelectedChartIndicators] = useState([]);
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

  return (
    <Fragment>
      <Form className="trade_detail_container">
        <h1>Trade Detail</h1>
        <Form.Group className="trade_market">
          <Form.Label>Market:</Form.Label>
          <Form.Select>
            <option>Crypto</option>
            <option>Stocks</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="trade_ticker mb-3">
          <Form.Label>Ticker:</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="chart_patterns d-flex mb-3">
          <Form.Label>Indicators:</Form.Label>
          <Dropdown
            className="d-inline mx-2"
            onSelect={addChartPattern}
            autoClose={false}
          >
            <Dropdown.Toggle id="dropdown-autoclose-false"></Dropdown.Toggle>
            <Dropdown.Menu>{ChartPatterns}</Dropdown.Menu>
          </Dropdown>

          <Form.Control
            type="textarea"
            value={selectedChartPatterns.join(" ")}
          />
        </Form.Group>

        <Form.Group className="chart_indicators d-flex align-items-center mb-1">
          <Form.Label>Indicators:</Form.Label>
          <Dropdown
            className="d-inline mx-2"
            onSelect={addChartIndicators}
            autoClose={false}
          >
            <Dropdown.Toggle id="dropdown-autoclose-false"></Dropdown.Toggle>
            <Dropdown.Menu>{ChartIndicators}</Dropdown.Menu>
          </Dropdown>


        </Form.Group>

        <Form.Control
        className="mb-3"
            as="textarea"
            rows="5"
            value={selectedChartIndicators.join(" ")}
          />

        <Row className="trade_targets mb-3">
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
          <Button className="btn btn-success" type="submit">
            Add Trade
          </Button>
        </Form.Group>
      </Form>
    </Fragment>
  );
};

export default TradeDetailForm;
