import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image, Row, Col, ListGroup, Form } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import axios from "axios";
import { listproductdetails } from "../store/actions/productAction";
import Loading from "../components/Loading";
import Message from "../components/Message";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, product, error } = productDetail;
  const { id } = useParams();
  const nav = useNavigate();
  // const [product, setProduct] = useState({});
  useEffect(() => {
    // const fetchProductById = async () => {
    //   const { data } = await axios.get(
    //     `http://127.0.0.1:5000/api/products/${id}`
    //   );
    //   setProduct(data);
    // };
    dispatch(listproductdetails(id));
    // fetchProductById();
  }, [dispatch, id]);

  const addToCartHandler = async () => {
    nav(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      <Link to="/" className="btn btn-light">
        Go Back
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message />
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>${product.price} </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Stock: </Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty:</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((q) => (
                          <option key={q + 1} value={q + 1}>
                            {q + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Row>
                  <Button
                    onClick={addToCartHandler}
                    className="btn btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
