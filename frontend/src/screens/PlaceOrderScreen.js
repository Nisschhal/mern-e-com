import React from "react"
import { Link } from "react-router-dom"
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import CheckOutSteps from "../components/CheckOutSteps"
const PlaceOrderScreen = () => {
  const { shipping, payment, cart } = useSelector((state) => state)

  const addDecimals = (num) => {
    return num.toFixed(2)
  }

  // Calculate Price
  cart.itemPrice = cart.cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  )
  // cart.taxPrice = addDecimals(Number(0.15 * cart.itemPrice))

  // Shipping price
  cart.shippingPrice = addDecimals(cart.itemPrice > 100 ? 0 : 100)
  // Tax price
  cart.taxPrice = addDecimals(Number(0.15 * cart.itemPrice))

  // Total Price
  cart.totalPrice =
    Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  const placeOrderHandler = () => {}

  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {shipping.shippingInfo.address}{" "}
                {shipping.shippingInfo.city} {shipping.shippingInfo.postalCode}{" "}
                {shipping.shippingInfo.country}
              </p>
            </ListGroup.Item>
            {/* PAYMENT */}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {payment.paymentMethod}
            </ListGroup.Item>
            {/* ORDER ITEM */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty!</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rouded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Order summary */}
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
