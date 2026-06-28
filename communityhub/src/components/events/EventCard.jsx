import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function EventCard({ event }) {
  const title = event.name || event.title;
  const date = event.start_date || event.event_date;
  const description = event.introduction || event.description;
  const location = event.event_type === 'distanciel' ? 'En ligne' : event.location;

  return (
    <Card className="event-card mb-3">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <Card.Title className="mb-0">{title}</Card.Title>
          {event.price_type && (
            <Badge bg={event.price_type === 'gratuit' ? 'success' : 'primary'}>
              {event.price_type}
            </Badge>
          )}
        </div>
        {date && <Card.Text className="event-meta mb-1">📅 {date}</Card.Text>}
        {location && <Card.Text className="event-meta mb-2">📍 {location}</Card.Text>}
        {description && (
          <Card.Text className="flex-grow-1">
            {description.length > 120
              ? `${description.slice(0, 120)}...`
              : description}
          </Card.Text>
        )}
        <Button
          as={Link}
          to={`/events/${event.id}`}
          variant="primary"
          size="sm"
          className="align-self-start mt-2"
        >
          Voir le détail
        </Button>
      </Card.Body>
    </Card>
  );
}
