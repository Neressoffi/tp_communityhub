import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function NotFoundPage() {
  return (
    <div className="content-card text-center mx-auto" style={{ maxWidth: '520px' }}>
      <h1 className="display-4 mb-3">404</h1>
      <p className="text-muted mb-4">La page que vous cherchez n&apos;existe pas.</p>
      <Button as={Link} to="/" variant="primary">
        Retour à l&apos;accueil
      </Button>
    </div>
  );
}
