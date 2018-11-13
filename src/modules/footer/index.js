import React from 'react'
import { Col,Row,Container } from 'reactstrap'

const Footer = () => {
    return(
    <div className='container' >
    <br/>
        <footer className="footer">
        <Container fluid className="text-center text-md-left">
    <Row>
      <Col md="6">
      <h5 className="title">SUSHI NGAI</h5>
      <p>
        This website is project for software engineering of computer science KMITL.
      </p>
      </Col>
      <Col md="6">
      <h5 className="title">นโยบาย</h5><br/>
      <ul>
        <li className="list-unstyled">
        คำถามที่พบบ่อย
        </li>
        <li className="list-unstyled">
        บริการลูกค้า
        </li>
        <li className="list-unstyled">
        นโยบายความเป็นส่วนตัว
        </li>
        <li className="list-unstyled">
        เงื่อนไขการใช้บริการ
        </li>
      </ul>
      </Col>
    </Row>
  </Container>
  <div className="footer-copyright text-center py-3">
    <Container fluid>
      &copy; {new Date().getFullYear()} Copyright:{" "} SushiNgai.com 
    </Container>
  </div>
  </footer></div>
    )
}

export default Footer
