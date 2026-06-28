import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EventCard from '../components/events/EventCard';
import PageHeader from '../components/layout/PageHeader';
import { fetchEvents } from '../features/events/eventsSlice';

function isPremiumUser(user) {
  return user?.user_status_id === 2 || user?.is_premium === true;
}

export default function EventsPage() {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        title="Événements"
        subtitle="Parcourez les événements de la communauté et rejoignez ceux qui vous intéressent."
        action={
          isAuthenticated && isPremiumUser(user) ? (
            <Button as={Link} to="/events/create" variant="success">
              Créer un événement
            </Button>
          ) : null
        }
      />

      {loading && <LoadingSpinner />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && events.length === 0 && (
        <EmptyState message="Aucun événement pour le moment." />
      )}

      <Row className="g-4">
        {events.map((event) => (
          <Col key={event.id} md={6} lg={4}>
            <EventCard event={event} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
