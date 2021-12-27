import { Fragment } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./journal.css";

const journal = () => {
  return (
    <Container className="journal_container d-flex flex-column">
      <Row>
        <h1>My Journals</h1>
      </Row>
      <section className="d-flex flex-column justify-content-center h-100">
        <div>
          <Button variant="success">Add a Journal</Button>
        </div>
      </section>
    </Container>
  );
};

export default journal;
