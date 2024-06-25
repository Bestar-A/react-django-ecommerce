import  { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
                <Navbar.Brand>Proshop</Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar-menus'/>
                <Navbar.Collapse id="navbar-menus">
                    <Nav className='ms-auto'>
                        <Nav.Link href='/cart'>
                            Cart
                        </Nav.Link>
                        <Nav.Link href='/login'>
                            Login
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header