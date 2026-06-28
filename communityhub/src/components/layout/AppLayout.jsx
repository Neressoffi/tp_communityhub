import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import MainNavbar from './MainNavbar';

export default function AppLayout() {
  return (
    <div className="app-shell">
      <MainNavbar />
      <main className="app-main">
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer className="app-footer">
        CommunityHub — Plateforme communautaire
      </footer>
    </div>
  );
}
