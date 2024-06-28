import { BiTrash } from "react-icons/bi"; 
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import { Link, useNavigate } from "react-router-dom"
import { addToCart } from "../store/slices/cartSlice"

const CartScreen = () => {
    const { cartItems } = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const removeFromCartHandler = (item) => {
        console.log(item)
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    return (
        <Row>
            <h1 className="mb-5">Shopping Cart</h1>
            <Col md={8}>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map(item => (
                            <ListGroup.Item key={item._id}>
                                <Row className="align-items-center">
                                    <Col md={2}>
                                        <Image src={item.image} fluid className="rounded"/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item._id}`} className="text-black">{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control as='select'
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart({...item, qty: Number(e.target.value)}))}
                                        >
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button type="button" variant="light"
                                            onClick={() => removeFromCartHandler(item)}>
                                            <BiTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>SUBTOTAL</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="d-flex justify-content-between align-items-center fs-5 py-3">
                            <span>{cartItems.reduce((acc, x) => acc + x.qty, 0)} items</span>
                            ${Math.round(cartItems.reduce((acc, x) => acc + x.qty * x.price, 0) * 100) / 100}
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button className="btn btn-block w-100 my-3" variant="dark"
                            onClick={checkoutHandler}>
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    )
}

export default CartScreen