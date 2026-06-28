import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createCategory } from '../../features/events/eventsSlice';

export default function CategoryForm() {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError(null);
    setSuccess(false);
    const result = await dispatch(createCategory({ name: data.name }));

    if (createCategory.fulfilled.match(result)) {
      setSuccess(true);
      reset();
    } else {
      setError(result.payload);
    }
  };

  return (
    <div className="form-card">
      <h2 className="h4 mb-3">Créer une catégorie</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Catégorie créée avec succès</Alert>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="categoryName">
          <Form.Label>Nom de la catégorie</Form.Label>
          <Form.Control
            type="text"
            {...register('name', { required: 'Nom requis' })}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">
          Créer la catégorie
        </Button>
      </Form>
    </div>
  );
}
