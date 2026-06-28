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
import { fetchUsers } from '../features/contacts/contactsSlice';
import {
  clearSendError,
  fetchMessages,
  sendMessage,
} from '../features/messages/messagesSlice';

export default function MessagesPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.contacts);
  const { messages, loading, error, sendLoading, sendError } = useSelector(
    (state) => state.messages,
  );
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchMessages());
    dispatch(fetchUsers());
    return () => dispatch(clearSendError());
  }, [dispatch]);

  const availableUsers = users.filter((u) => u.id !== user?.id);

  const onSubmit = async (data) => {
    const result = await dispatch(
      sendMessage({
        receiver_id: Number(data.receiver_id),
        message: data.message,
      }),
    );

    if (sendMessage.fulfilled.match(result)) {
      setSuccess(true);
      reset();
      dispatch(fetchMessages());
    }
  };

  return (
    <div>
      <PageHeader
        title="Messages"
        subtitle="Consultez et envoyez vos messages privés."
      />

      <div className="form-card mx-auto mb-4">
        {sendError && <Alert variant="danger">{sendError}</Alert>}
        {success && <Alert variant="success">Message envoyé.</Alert>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="receiver_id">
            <Form.Label>Destinataire</Form.Label>
            <Form.Select
              {...register('receiver_id', { required: 'Destinataire requis' })}
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

          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register('message', { required: 'Message requis' })}
              isInvalid={!!errors.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.message?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" disabled={sendLoading}>
            {sendLoading ? 'Envoi...' : 'Envoyer'}
          </Button>
        </Form>
      </div>

      <div className="content-card">
        <h2 className="h5 mb-3">Mes messages</h2>
        {loading && <LoadingSpinner />}
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading && messages.length === 0 && (
          <EmptyState message="Aucun message pour le moment." />
        )}
        <ListGroup>
          {messages.map((msg) => (
            <ListGroup.Item key={msg.id}>
              <strong>{msg.sender_pseudo || msg.sender_id}</strong>
              {' → '}
              <strong>{msg.receiver_pseudo || msg.receiver_id}</strong>
              <p className="mb-0 mt-1">{msg.message || msg.content}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
