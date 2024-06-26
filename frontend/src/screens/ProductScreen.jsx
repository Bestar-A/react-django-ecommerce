import { Link, useParams } from "react-router-dom"
import { Badge, Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap"
import Rating from "../components/Rating"
import { useEffect, useState } from "react"
import axios from "axios"
import { useGetProductByIdQuery } from "../store/slices/productsApiSlice"

const ProductScreen = () => {
    const {id} = useParams()
    
    const {data: product, isLoading, error} = useGetProductByIdQuery(id)

    console.log(error)
    console.log(product)

    return (
        <>
        { isLoading ? <h2>isLoading...</h2> 
        : error ? <h3>Error...</h3>
        : (
            <div>
                <Link to='/' className="btn btn-light my-3">Go Back</Link>
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid className="rounded" />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={product.numReviews} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>{product.price}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            <Badge className={`rounded-pill p-2 px-3 ${product.countInStock > 0 ? 'bg-success' : 'bg-danger'}`}>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Badge>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button className="btn btn-block w-100" variant="dark"
                                        disabled={product.countInStock <= 0}>Add to Cart</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>
        )}
        </>
    )
}

export default ProductScreen