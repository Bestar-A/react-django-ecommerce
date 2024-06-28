import { useEffect, useState } from "react"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import { useGetProfileQuery, useUpdateProfileMutation } from "../store/slices/usersApiSlice"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import { login } from "../store/slices/authSlice"

const ProfileScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const {userInfo} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const {data: profile} = useGetProfileQuery(userInfo)
    const [updateProfileApi, {isLoading, error}] = useUpdateProfileMutation()

    useEffect(() => {
        if(profile){
            setName(profile.name)
            setEmail(profile.email)
        }
    }, [profile])
    
    const submitHandler = async (e) => {
        e.preventDefault()
        if(password != confirmPassword){
            setMessage('Passwords do not match')
            return;
        }
        const data = await updateProfileApi({access: userInfo.access, name, password, email}).unwrap()
        dispatch(login({...data, access:userInfo.access, refresh:userInfo.refresh}))
    }
    
    return (
        <Row>
            <Col md={4}>
                <h1>Update Profile</h1>
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
                        Update
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default ProfileScreen