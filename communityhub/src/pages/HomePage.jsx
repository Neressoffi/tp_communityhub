import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const features = [
  {
    icon: '📅',
    title: 'Événements',
    text: 'Découvrez et participez à des événements près de chez vous ou en ligne.',
    link: '/events',
    label: 'Voir les événements',
  },
  {
    icon: '⭐',
    title: 'Premium',
    text: 'Passez premium pour créer vos propres événements et proposer vos compétences.',
    link: '/premium',
    label: 'Devenir premium',
  },
  {
    icon: '🤝',
    title: 'Réseau',
    text: 'Échangez avec la communauté via les contacts et les messages privés.',
    link: '/contacts',
    label: 'Développer mon réseau',
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="hero-section">
        <h1>Bienvenue sur CommunityHub</h1>
        <p>
          La plateforme communautaire pour créer des événements, partager vos
          compétences et développer votre réseau.
        </p>
        <div className="d-flex flex-wrap gap-2">
          <Button as={Link} to="/register" variant="primary" size="lg">
            Rejoindre la communauté
          </Button>
          <Button as={Link} to="/events" variant="outline-primary" size="lg">
            Explorer les événements
          </Button>
        </div>
      </section>

      <Row className="g-4">
        {features.map((feature) => (
          <Col key={feature.title} md={4}>
            <Card className="feature-card">
              <Card.Body>
                <span className="feature-icon">{feature.icon}</span>
                <Card.Title>{feature.title}</Card.Title>
                <Card.Text className="text-muted">{feature.text}</Card.Text>
                <Button as={Link} to={feature.link} variant="outline-primary" size="sm">
                  {feature.label}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
