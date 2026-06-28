import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PageHeader from '../components/layout/PageHeader';
import { clearCreateError, createSkill } from '../features/skills/skillsSlice';

function isPremiumUser(user) {
  return user?.user_status_id === 2 || user?.is_premium === true;
}

export default function MySkillPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { createLoading, createError } = useSelector((state) => state.skills);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    return () => dispatch(clearCreateError());
  }, [dispatch]);

  if (!isPremiumUser(user)) {
    return (
      <div>
        <PageHeader
          title="Ma compétence"
          subtitle="Cette fonctionnalité est réservée aux membres premium."
        />
        <div className="content-card">
          <Alert variant="warning" className="mb-3">
            Seuls les membres premium peuvent proposer une compétence.
          </Alert>
          <Button as={Link} to="/premium" variant="primary">
            Devenir premium
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = async (data) => {
    const result = await dispatch(
      createSkill({
        title: data.title,
        description: data.description,
        daily_price: Number(data.daily_price),
      }),
    );

    if (createSkill.fulfilled.match(result)) {
      setSuccess(true);
    }
  };

  return (
    <div>
      <PageHeader
        title="Ma compétence"
        subtitle="Proposez votre compétence à la communauté."
      />
      <div className="form-card mx-auto">
        {createError && <Alert variant="danger">{createError}</Alert>}
        {success && (
          <Alert variant="success">
            Compétence enregistrée avec succès.
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Titre</Form.Label>
            <Form.Control
              type="text"
              {...register('title', { required: 'Titre requis' })}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              {...register('description', { required: 'Description requise' })}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="daily_price">
            <Form.Label>Tarif journalier (€)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              {...register('daily_price', {
                required: 'Tarif requis',
                min: { value: 0, message: 'Tarif invalide' },
              })}
              isInvalid={!!errors.daily_price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.daily_price?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={createLoading || success}
          >
            {createLoading ? 'Enregistrement...' : 'Enregistrer ma compétence'}
          </Button>
        </Form>
      </div>
    </div>
  );
}
