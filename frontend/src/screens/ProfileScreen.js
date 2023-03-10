import React, { useState, useEffect } from "react";
import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { getUser, login, update } from "../store/actions/userAction";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [search] = useSearchParams();
  const nav = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [updated, setUpdated] = useState(false);
  const { loading, user, error } = useSelector((state) => state.userDetails);
  console.log(user);

  useEffect(() => {
    setUpdated(false);
    if (!userInfo) {
      nav("/login");
    } else {
      if (!user.name) {
        dispatch(getUser("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
    console.log(user);
  }, [user]);

  {
    console.log(search);
  }

  //   const redirect = (search && search.split("=")[1]) || "/";

  const submitForm = (e) => {
    e.preventDefault();
    // disptach login
    try {
      if (password !== confirmpassword && name && email) {
        return;
      }

      dispatch(update(email, name));
      setUpdated(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h1>Update Profile</h1>
        {error && <Message variant={"danger"}>{error}</Message>}
        {loading && <Loading />}
        {updated && (
          <Message variant={"success"}>
            {"Profile Updated Successfully!"}
          </Message>
        )}
        <Form onSubmit={submitForm}>
          <Form.Group controlId="name" className="py-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter you Name"
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="py-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="test@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="py-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmpassword" className="py-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update Profile{" "}
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h1>My Orders</h1>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
