import { Button, Form } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addShippingInfo } from "../store/slices/cartSlice"


const ShippingScreen = () => {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const dispatch = useDispatch()
    const {shippingAddress} = useSelector(state => state.cart)

    useEffect(() => {
        if(shippingAddress) {
            setAddress(shippingAddress?.address || '')
            setCity(shippingAddress?.city || '')
            setPostalCode(shippingAddress?.postalCode || '')
            setCountry(shippingAddress?.country || '')
        }
    }, [shippingAddress])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addShippingInfo({address, city, postalCode, country}))
    }
    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler} className="d-flex mt-3 gap-2 flex-column">
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={address} onChange={e => setAddress(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" value={city} onChange={e => setCity(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="address">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="address">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" value={country} onChange={e => setCountry(e.target.value)} />
                </Form.Group>
                <Button type="submit" className="btn btn-block btn-dark mt-3 ms-auto px-4 py-2">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen