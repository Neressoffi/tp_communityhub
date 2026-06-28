import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { clearSelectedEvent, fetchEventById } from '../features/events/eventsSlice';

export default function EventDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedEvent, detailLoading, detailError } = useSelector(
    (state) => state.events,
  );

  useEffect(() => {
    dispatch(fetchEventById(id));
    return () => dispatch(clearSelectedEvent());
  }, [dispatch, id]);

  if (detailLoading) {
    return <LoadingSpinner />;
  }

  if (detailError) {
    return (
      <div className="content-card">
        <Alert variant="danger">{detailError}</Alert>
        <Button as={Link} to="/events" variant="secondary">
          Retour aux événements
        </Button>
      </div>
    );
  }

  if (!selectedEvent) {
    return (
      <div className="content-card">
        <p className="mb-3">Événement introuvable.</p>
        <Button as={Link} to="/events" variant="primary">
          Retour aux événements
        </Button>
      </div>
    );
  }

  const title = selectedEvent.name || selectedEvent.title;
  const startDate = selectedEvent.start_date || selectedEvent.event_date;
  const endDate = selectedEvent.end_date;
  const description = selectedEvent.introduction || selectedEvent.description;

  return (
    <div className="content-card-wide">
      <Button as={Link} to="/events" variant="outline-secondary" className="mb-4">
        ← Retour aux événements
      </Button>

      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        <h1 className="h2 mb-0">{title}</h1>
        {selectedEvent.price_type && (
          <Badge bg={selectedEvent.price_type === 'gratuit' ? 'success' : 'primary'}>
            {selectedEvent.price_type}
          </Badge>
        )}
        {selectedEvent.event_type && (
          <Badge bg="secondary">{selectedEvent.event_type}</Badge>
        )}
      </div>

      {startDate && <p className="event-meta mb-1">📅 Début : {startDate}</p>}
      {endDate && <p className="event-meta mb-1">📅 Fin : {endDate}</p>}
      {selectedEvent.location && <p className="event-meta mb-1">📍 {selectedEvent.location}</p>}
      {selectedEvent.category_name && (
        <p className="event-meta mb-3">🏷️ {selectedEvent.category_name}</p>
      )}
      {description && <p className="mb-0">{description}</p>}
    </div>
  );
}
