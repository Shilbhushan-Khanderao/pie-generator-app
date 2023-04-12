import React from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

function Instructions() {
  return (
    <OverlayTrigger
      trigger="click"
      placement={"bottom"}
      overlay={
        <Popover id={`popover-positioned-left-end`}>
          <Popover.Header as="h3">{`Instructions.`}</Popover.Header>
          <Popover.Body>
            <strong>1.</strong> Select the Module name from the list.
            <br />
            <strong>2.</strong> Type the Batch name.
            <strong>
              <br />
              3.
            </strong>{" "}
            Select a Faculty name from the given list and second faculty in case
            of 2 faculties. (can create also, if not available in the list)
            <strong>
              <br />
              4.
            </strong>{" "}
            Select Module Coordinator from the list.
            <strong>
              <br />
              5.
            </strong>{" "}
            Upload the CSV file. (Only feedback CSV file which has columns
            Explanation of concepts, Pace of teaching, Interaction with
            students, Practical application knowledge, and Overall feedback)
            <strong>
              <br />
              6.
            </strong>{" "}
            Click on upload button and click on generate to generate piechart.
            <strong>
              <br />
              7.
            </strong>{" "}
            Click on download button to download pdf. On download window keep
            the page size "A4" and remove headers and footers.
          </Popover.Body>
        </Popover>
      }
    >
      <Button variant="success" className="mx-3">
        Instructions
      </Button>
    </OverlayTrigger>
  );
}

export default Instructions;
