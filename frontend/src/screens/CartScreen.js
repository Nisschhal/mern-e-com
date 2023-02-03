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
import { addToCart } from "../store/actions/cartAction";
const CartScreen = () => {
  const { id } = useParams();
  const [search] = useSearchParams();
  const qty = search ? search.get("qty") : 1;
  console.log(qty);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(addToCart(id, qty));
  }, [dispatch, id, qty]);
  return <div>CartScreen</div>;
};

export default CartScreen;
