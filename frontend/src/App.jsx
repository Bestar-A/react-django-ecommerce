import { Container } from "react-bootstrap"
import Header from "./components/Header"

const App = () => {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          Welcome Proshop
        </Container>
      </main>
    </div>
  )
}

export default App