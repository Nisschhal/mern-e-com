import React, { useState, useEffect } from "react"
import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom"
import { Form, Row, Col, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Message from "../components/Message"
import Loading from "../components/Loading"
import FormContainer from "../components/FormContainer"
import { login } from "../store/actions/userAction"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [search] = useSearchParams()
  const nav = useNavigate()

  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const { loading, userInfo, error } = useSelector((state) => state.userLogin)

  {
    console.log(search)
  }

  //   const redirect = (search && search.split("=")[1]) || "/";

  const submitForm = (e) => {
    e.preventDefault()
    // disptach login
    try {
      dispatch(login(email, password))
      nav("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant={"danger"}>{error}</Message>}
      {loading && <Loading />}
      <Form onSubmit={submitForm}>
        <Form.Group controlId="email" className="py-2">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="test@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="py-3">
          <Form.Label>Password Address</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>New Customer?</Col>
        <Link
          //   to={(redirect && `/register?redirect=${redirect}`) || "/register"}
          to={"/signup"}
        >
          Register
        </Link>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
