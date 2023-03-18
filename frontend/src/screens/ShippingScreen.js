import React, { useState } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../components/Loading"
import Message from "../components/Message"
import { saveShippingAddress } from "../store/actions/shippingAction"
import CheckOutSteps from "../components/CheckOutSteps"
import { useNavigate } from "react-router-dom"

const ShippingScreen = () => {
  const nav = useNavigate()
  const defaultShippingFields = {
    address: "",
    city: "",
    postalCode: "",
    country: "",
  }
  const [shippingForm, setShippingForm] = useState(defaultShippingFields)

  const onChangeHandler = (e) => {
    e.preventDefault()
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value })
  }

  const { address, city, postalCode, country } = shippingForm

  // store , reducer, and actions

  const { error, loading, shippingInfo } = useSelector(
    (state) => state.shipping
  )

  const dispatch = useDispatch()
  // submit handler
  const submitForm = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress(address, city, postalCode, country))
  }

  return (
    <Row className="container">
      <Row className="justify-content-md-center">
        <Col md={6}>
          {error && <Message variant={"danger"}>{error}</Message>}
          {loading && <Loading />}
          {/* {updated && (
              <Message variant={"success"}>
                {"Profile Updated Successfully!"}
              </Message>
            )} */}
          <CheckOutSteps step1 step2 />
          <h1>Shipping</h1>
          <Form onSubmit={submitForm}>
            <Form.Group controlId="address" className="py-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                name="address"
                placeholder="Enter address"
                onChange={onChangeHandler}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="city" className="py-2">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={city}
                placeholder="Enter city"
                name="city"
                onChange={onChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode" className="py-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                value={postalCode}
                placeholder="Enter postal code"
                name="postalCode"
                onChange={onChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country" className="py-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                value={country}
                placeholder="Enter Country"
                name="country"
                onChange={onChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              onClick={() => nav("/payment")}
            >
              CONTINUE
            </Button>
          </Form>
        </Col>
      </Row>
    </Row>
  )
}

export default ShippingScreen
