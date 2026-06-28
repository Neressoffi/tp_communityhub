import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { logoutUser } from '../../features/auth/authSlice';

function navClass({ isActive }) {
  return isActive ? 'nav-link active' : 'nav-link';
}

export default function MainNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const isAdmin =
    user?.role === 'admin' ||
    user?.is_admin === true ||
    user?.is_admin === 1 ||
    user?.user_status_id === 3;

  const isPremium = user?.user_status_id === 2 || user?.is_premium === true;

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="main-navbar mb-0" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          CommunityHub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className={navClass} end>
              Accueil
            </Nav.Link>
            <Nav.Link as={NavLink} to="/events" className={navClass}>
              Événements
            </Nav.Link>
            <Nav.Link as={NavLink} to="/skills" className={navClass}>
              Compétences
            </Nav.Link>
            {isAuthenticated && isPremium && (
              <Nav.Link as={NavLink} to="/events/create" className={navClass}>
                Créer événement
              </Nav.Link>
            )}
            {isAuthenticated && isAdmin && (
              <Nav.Link as={NavLink} to="/admin/categories" className={navClass}>
                Catégories
              </Nav.Link>
            )}
            {isAuthenticated && (
              <>
                <Nav.Link as={NavLink} to="/dashboard" className={navClass}>
                  Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} to="/contacts" className={navClass}>
                  Contacts
                </Nav.Link>
                <Nav.Link as={NavLink} to="/messages" className={navClass}>
                  Messages
                </Nav.Link>
                <Nav.Link as={NavLink} to="/premium" className={navClass}>
                  Premium
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="align-items-lg-center gap-lg-2">
            {isAuthenticated ? (
              <>
                <Navbar.Text className="d-flex align-items-center gap-2 me-lg-2">
                  <span>{user?.pseudo || user?.name || user?.email}</span>
                  {isPremium && <Badge className="badge-premium">Premium</Badge>}
                  {isAdmin && <Badge className="badge-admin">Admin</Badge>}
                </Navbar.Text>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" className={navClass}>
                  Connexion
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className={navClass}>
                  Inscription
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
