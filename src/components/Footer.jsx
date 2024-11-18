import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <>
    <footer className="bg-dark text-light py-3 fixed-bottom">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 Task Management App. All Rights Reserved.</p>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#privacy" className="text-light text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#terms" className="text-light text-decoration-none">
                  Terms of Service
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#contact" className="text-light text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>

    </>
  )
}

export default Footer