import Spinner from 'react-bootstrap/Spinner';

export default function LoadingSpinner({ label = 'Chargement...' }) {
  return (
    <div className="d-flex align-items-center gap-2 text-muted py-4">
      <Spinner animation="border" size="sm" role="status" />
      <span>{label}</span>
    </div>
  );
}
