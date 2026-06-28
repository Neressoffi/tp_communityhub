import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PageHeader from '../components/layout/PageHeader';

export default function DashboardPage() {
  const { user } = useSelector((state) => state.auth);

  const shortcuts = [
    { title: 'Événements', text: 'Voir les prochains événements', link: '/events' },
    { title: 'Contacts', text: 'Gérer votre réseau', link: '/contacts' },
    { title: 'Messages', text: 'Lire vos messages', link: '/messages' },
    { title: 'Premium', text: 'Gérer votre abonnement', link: '/premium' },
  ];

  return (
    <div>
      <PageHeader
        title={`Bonjour, ${user?.pseudo || user?.firstname || 'membre'}`}
        subtitle="Retrouvez ici un accès rapide aux principales sections de CommunityHub."
      />

      <Row className="g-4">
        {shortcuts.map((item) => (
          <Col key={item.title} sm={6} lg={3}>
            <Card className="feature-card h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="text-muted flex-grow-1">{item.text}</Card.Text>
                <Button as={Link} to={item.link} variant="outline-primary" size="sm">
                  Accéder
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
