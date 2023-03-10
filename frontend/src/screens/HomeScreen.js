import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import { listproducts } from "../store/actions/productAction";
import Message from "../components/Message";
import Loading from "../components/Loading";
const HomeScreen = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    // const fetchProduct = async () => {
    //   const { data } = await axios.get("http://127.0.0.1:5000/api/products");
    //   setProducts(data);
    // };
    // fetchProduct();

    dispatch(listproducts());
  }, [dispatch]);

  // const products = [];

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
