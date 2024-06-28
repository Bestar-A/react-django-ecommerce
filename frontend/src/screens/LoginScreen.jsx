import { useEffect, useState } from "react"
import FormContainer from "../components/FormContainer"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useLoginUserMutation } from "../store/slices/usersApiSlice"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../store/slices/authSlice"
import Message from "../components/Message"

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userInfo} = useSelector(state => state.auth)

    const [loginApi, {isLoading, error}] = useLoginUserMutation();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect'); 

    useEffect(() => {
        if(userInfo)
            redirect ? navigate(redirect) : navigate('/')
    }, [userInfo, redirect, navigate])
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const user = await loginApi({username:email, password}).unwrap()
        dispatch(login({...user}))
    }
    
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error.data.detail}</Message>}
            <Form onSubmit={submitHandler} className="d-flex flex-column gap-3">
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="dark" className="ms-auto px-4 fs-5 py-1 gap-2 d-flex align-items-center">
                    {isLoading && <Spinner size="sm" />}
                    Sign In
                </Button>
            </Form>
            <Row className="my-3 py-3 border-top">
                <Col className="text-center">
                    New Customer ? <Link to={redirect? `register?redirect=${redirect}`:'/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen