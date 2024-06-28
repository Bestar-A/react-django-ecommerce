import { useEffect, useState } from "react"
import FormContainer from "../components/FormContainer"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useRegisterUserMutation } from "../store/slices/usersApiSlice"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"

const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const navigate = useNavigate()
    const {userInfo} = useSelector(state => state.auth)

    const [registerApi, {isLoading, error}] = useRegisterUserMutation()

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect'); 

    useEffect(() => {
        if(userInfo)
            redirect ? navigate(redirect) : navigate('/')
    }, [userInfo, redirect, navigate])
    
    const submitHandler = async (e) => {
        e.preventDefault();
        
        if(password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            await registerApi({name, email, password}).unwrap()
            navigate('/login')
        }
    }
    
    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error.data.detail}</Message>}
            <Form onSubmit={submitHandler} className="d-flex flex-column gap-3">
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} placeholder="Enter Name"
                        onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
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
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={confirmPassword} placeholder="Enter Password Again"
                        onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="dark" className="ms-auto px-4 fs-5 py-1 gap-2 d-flex align-items-center">
                    {isLoading && <Spinner size="sm" />}
                    Register
                </Button>
            </Form>
            <Row className="my-3 py-3 border-top">
                <Col className="text-center">
                    Already Registered ? <Link to={redirect? `login?redirect=${redirect}`:'/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen