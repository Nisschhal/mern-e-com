import React, { useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { addToCart, removeFromCart } from "../store/actions/cartAction";
const CartScreen = () => {
  const { id } = useParams();
  const [search] = useSearchParams();
  const qty = search ? search.get("qty") : 1;
  console.log(qty);

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);

  useEffect(() => {
    if (id) dispatch(addToCart(id, qty));
  }, [dispatch, id, qty]);
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is Empty!!<Link to="/"> Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((q) => (
                        <option key={q + 1}>{q + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => dispatch(removeFromCart(item.product))}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>
              SubTotal: ({cartItems.reduce((acc, cur) => acc + cur.qty, 0)})
              items
            </h2>
            $
            {cartItems
              .reduce((acc, cur) => acc + cur.qty * cur.price, 0)
              .toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Button type="button" className="btn-block">
                Proceed To Checkout
              </Button>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default CartScreen;
