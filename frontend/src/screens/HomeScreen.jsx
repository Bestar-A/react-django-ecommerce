import { Col, Row } from "react-bootstrap"
import Product from "../components/Product"
import { useGetProductsQuery } from "../store/slices/productsApiSlice"

const HomeScreen = () => {
  const {data:products, isLoading, error} = useGetProductsQuery()

  return (
    <div>
        <h1>Latest Products</h1>
        {isLoading ? <h1>Loading...</h1> : 
        error ? <h1>Error</h1>:
        (
          <Row>
            {products.map(product => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <Product product={product} />
                </Col>
            ))}
          </Row>
        )}
    </div>
  )
}

export default HomeScreen