import { BiUserCircle } from "react-icons/bi"; 
import { AiOutlineShoppingCart } from "react-icons/ai"; 
import  { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Header = () => {
    const { userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())

    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Proshop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='navbar-menus'/>
                    <Navbar.Collapse id="navbar-menus">
                        <Nav className='ms-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <div className="d-flex align-items-center gap-1 text-white">
                                        <AiOutlineShoppingCart />
                                        Cart
                                    </div>
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <div className="d-flex align-items-center gap-1 text-white">
                                            <BiUserCircle />
                                            Login
                                        </div>
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header