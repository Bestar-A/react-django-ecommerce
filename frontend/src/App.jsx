import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"

const App = () => {
  return (
    <div>
      <Header />
      <main className="py-3" style={{minHeight: '80vh'}}>
        <Container>
          Welcome Proshop
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default App