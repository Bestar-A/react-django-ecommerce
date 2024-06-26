import { Spinner } from "react-bootstrap"

const Loader = () => {
  return (
    <Spinner
        animation="border"
        role="status"
        style={{
            height: '100px',
            width: '100px',
            margin: 'auto',
            display: 'block'
        }}>
        <div className="sr-only">Loading...</div>
    </Spinner>
  )
}

export default Loader