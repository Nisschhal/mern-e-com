import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
// import Rating from "./Rating";
const Product = ({ product }) => {
  return (
    <>
      {/* PRODUCT CARD  */}
      <Card className="my-3 p-3">
        {/* IMAGE */}
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>

        {/* PRODUCT BODY */}
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          {/* PRODUCT RATING and no. of ratings*/}
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          {/* PRODUCT PRICE */}
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
