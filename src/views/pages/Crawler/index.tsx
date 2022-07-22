import { Card, Col, Row } from "reactstrap";
import BaseTable from "./components/BaseTable";

const Crawler = () => {
  return (
    <>
      <Row>
        <Col sm="12">
          <Card title="Basic" code="BaseTable" noBody>
            <BaseTable />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Crawler;
