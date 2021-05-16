import React from "react"
import { Row, Col, Container } from "react-bootstrap"

const FormContainer = ({ children }) => {
  return (
    <Container className='py-4'>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
