import { Row, Button, Form, Col } from "react-bootstrap";
import "./journal-form.scss";

const JournalForm = ({addJournal, closeForm, nameRef, stratRef}) => {
    return (
        <Form className="journal-form">
          <Row className="journal-form-header">
            <Col xs={10}>
              <p>
                Add a <span> NEW</span> Journal!{" "}
              </p>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button onClick={closeForm}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-x-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                </svg>
              </Button>
            </Col>
          </Row>
    
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Journal Name</Form.Label>
            <Form.Control
              ref={nameRef}
              type="text"
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Journal Strategy</Form.Label>
            <Form.Control ref={stratRef} as="textarea" />
          </Form.Group>
          <Form.Group className="d-flex justify-content-end">
            <Button onClick={addJournal} variant="secondary">Add Journal</Button>
          </Form.Group>
        </Form>
      );
}

export default JournalForm;