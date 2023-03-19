import React, { useState } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../components/Loading"
import Message from "../components/Message"
import CheckOutSteps from "../components/CheckOutSteps"
import { useNavigate } from "react-router-dom"
import FormContainer from "../components/FormContainer"
import savePaymentMethod from "../store/actions/savePaymentMethodAction"

const PaymentScreen = () => {
  const nav = useNavigate()

  // store , reducer, and actions

  const { error, loading, shippingInfo } = useSelector(
    (state) => state.shipping
  )

  if (!shippingInfo) {
    nav("/shipping")
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal")

  const dispatch = useDispatch()
  // submit handler
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    nav("/placeorder")
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="PayPal"
              name="paymentmethod"
              value="Paypal"
              checked={paymentMethod === "Paypal"}
              onChange={(e) => {
                setPaymentMethod(e.target.value)
                console.log(e.target.value)
              }}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Stripe"
              id="stipe"
              name="paymentmethod"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => {
                setPaymentMethod(e.target.value)
                console.log(e.target.value)
              }}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button
          className="mt-3"
          type="submit"
          variant="primary"
          // onClick={() => nav("/payment")}
        >
          CONTINUE
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
