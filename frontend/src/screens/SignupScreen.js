import React, { useState, useEffect } from "react";
import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { login, signpu, update } from "../store/actions/userAction";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [search] = useSearchParams();
  const nav = useNavigate();

  const dispatch = useDispatch();
  const { loading, userInfo, error } = useSelector((state) => state.userSignup);

  {
    console.log(search);
  }

  //   const redirect = (search && search.split("=")[1]) || "/";

  const submitForm = (e) => {
    e.preventDefault();
    // disptach login
    try {
      if (password !== confirmpassword) {
        return;
      }
      console.log(email, name, password);
      console.log(error);

      dispatch(signpu(email, name, password));
      nav("/");
    } catch (err) {
      console.log(err.Message);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={6} sm={12}>
        <h1>SIGN UP</h1>
        {error && <Message variant={"danger"}>{error}</Message>}
        {loading && <Loading />}
        <Form onSubmit={submitForm}>
          <Form.Group controlId="name" className="py-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter you Name"
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="py-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="test@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="py-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmpassword" className="py-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Register
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default SignupScreen;
