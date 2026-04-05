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
            <strong>1.</strong> Select the Course Name and Module Name from the
            lists.
            <br />
            <strong>2.</strong> Select the Batch Month and Year.
            <br />
            <strong>3.</strong> Select or type a Faculty Name (you can add a new
            name if not in the list).
            <br />
            <strong>4.</strong> Select the Module Coordinator from the list.
            <br />
            <strong>5.</strong> Upload the CSV feedback file (must have column
            headers).
            <br />
            <strong>6.</strong> Click <em>Upload</em>. A preview of the CSV is
            shown — review the detected column types and adjust if needed, then
            click <em>Confirm &amp; Continue</em>.
            <br />
            <strong>7.</strong> Click <em>Generate Chart</em> to process and
            display the charts and comments on screen.
            <br />
            <strong>8.</strong> Click <em>Prepare PDF</em> to capture the
            charts, then click <em>Download PDF</em> to save the report directly
            — no print dialog required.
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
