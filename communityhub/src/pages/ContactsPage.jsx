import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PageHeader from '../components/layout/PageHeader';
import {
  acceptContact,
  clearActionError,
  fetchContacts,
  fetchUsers,
  sendContactRequest,
} from '../features/contacts/contactsSlice';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    contacts,
    users,
    loading,
    error,
    actionLoading,
    actionError,
  } = useSelector((state) => state.contacts);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(fetchUsers());
    return () => dispatch(clearActionError());
  }, [dispatch]);

  const availableUsers = users.filter((u) => u.id !== user?.id);

  const onSubmit = async (data) => {
    const result = await dispatch(sendContactRequest(data.receiver_id));

    if (sendContactRequest.fulfilled.match(result)) {
      setSuccess(true);
      reset();
      dispatch(fetchContacts());
    }
  };

  const handleAccept = async (contactId) => {
    const result = await dispatch(acceptContact(contactId));

    if (acceptContact.fulfilled.match(result)) {
      dispatch(fetchContacts());
    }
  };

  return (
    <div>
      <PageHeader
        title="Contacts"
        subtitle="Gérez vos demandes de contact et développez votre réseau."
      />

      <div className="form-card mx-auto mb-4">
        {actionError && <Alert variant="danger">{actionError}</Alert>}
        {success && (
          <Alert variant="success">Demande de contact envoyée.</Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="receiver_id">
            <Form.Label>Ajouter un contact</Form.Label>
            <Form.Select
              {...register('receiver_id', { required: 'Utilisateur requis' })}
              isInvalid={!!errors.receiver_id}
            >
              <option value="">Choisir un utilisateur</option>
              {availableUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.pseudo || u.email}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.receiver_id?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" disabled={actionLoading}>
            {actionLoading ? 'Envoi...' : 'Envoyer la demande'}
          </Button>
        </Form>
      </div>

      <div className="content-card">
        <h2 className="h5 mb-3">Mes contacts</h2>
        {loading && <LoadingSpinner />}
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading && contacts.length === 0 && (
          <EmptyState message="Aucun contact pour le moment." />
        )}
        <ListGroup>
          {contacts.map((contact) => (
            <ListGroup.Item
              key={contact.id}
              className="d-flex justify-content-between align-items-center"
            >
              <span>
                {contact.pseudo || contact.email || `Contact #${contact.id}`}
                {contact.status && ` — ${contact.status}`}
              </span>
              {contact.status === 'pending' && contact.receiver_id === user?.id && (
                <Button
                  size="sm"
                  variant="success"
                  disabled={actionLoading}
                  onClick={() => handleAccept(contact.id)}
                >
                  Accepter
                </Button>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
