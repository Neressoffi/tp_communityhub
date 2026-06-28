import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PageHeader from '../components/layout/PageHeader';
import {
    clearCreateError,
    createEvent,
    fetchCategories,
}   from '../features/events/eventsSlice';

 function isPremiumUser(user) {
  return user?.is_premium === true || user?.is_premium === 1;
}

function toApiDateTime(value) {
  if (!value) return '';
  return `${value.replace('T', ' ')}:00`;
}

export default function CreateEventPage() {

const dispatch = useDispatch();

   const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.auth);
  const { categories, createLoading, createError } = useSelector(
    (state) => state.events,
  );
  const  [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
     watch,
    formState: { errors },
  } =  useForm({
    defaultValues: {
      event_type: 'presentiel',
      price_type: 'gratuit',
       price: 0,
      max_participants: 10,
      image: '',
    },
  });

  const priceType = watch('price_type');
  const startDate = watch('start_date');

  useEffect(() => {
    dispatch(fetchCategories());
    return () => 
      dispatch(clearCreateError());
  }, [dispatch]);

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (!isPremiumUser(user)) {
    return (
      <div>
        <PageHeader
          title="Créerr un évenement"
          subtitle="Cette fonctionnalité est réservée aux membres premium."
        />
        <div className="content-card">
          <Alert variant="warning" className="mb-3">
                Seuls les membres premium peuvent créer un événement.
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
      createEvent({
         event_category_id: Number(data.event_category_id),
        name: data.name,
        event_type: data.event_type,
          price_type: data.price_type,
        price: data.price_type === 'payant' ? Number(data.price) : 0,
        max_participants: Number(data.max_participants),
         start_date: toApiDateTime(data.start_date),
        end_date: toApiDateTime(data.end_date),
         image: data.image?.trim() || 'event.jpg',
        introduction: data.introduction,
      }),
    );

    if (createEvent.fulfilled.match(result)) {
      setSuccess(true);
      setTimeout(() => navigate('/events'), 2000);
    }
  };

  return (
    <div>
      <PageHeader
        title="Créer un événement"
        subtitle="Publie un nouvel évenement pour la communauté."
      />
      <div className="form-card mx-auto">
        {createError && <Alert variant="danger">{createError}</Alert>}
        {success && (
          <Alert variant="success">
            Événement créé avec succès. Redirection...
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              {...register('name', { required: 'Nom requis' })}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="introduction">
            <Form.Label>Introduction</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              {...register('intoduction..', 
                { required: 'Introduction requise' })}
                  isInvalid={!!errors.introduction}
            />
            <Form.Control.Feedback type="invalid">
              {errors.introduction?.message}
                 </Form.Control.Feedback>
            </Form.Group>

          <Form.Group className="mb-3" controlId="event_category_id">
            <Form.Label>Catégorie</Form.Label>
            <Form.Select
                 {...register('event_category_id', { required: 'Categorie requise' })}
              isInvalid={!!errors.event_category_id}
            >
              <option value="">Choisir une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
                     <Form.Control.Feedback type="invalid">
              {errors.event_category_id?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="event_type">
            <Form.Label>Type</Form.Label>
            <Form.Select
              {...register('event_type', { required: 'Type requis' })}
              isInvalid={!!errors.event_type}
            > 
              <option value="presentiel">Présentiel</option>
               <option value="distanciel">Distanciel</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                 {errors.event_type?.message}
            </Form.Control.Feedback>
           </Form.Group>

          <Form.Group className="mb-3" controlId="price_type">
            <Form.Label>Tarif</Form.Label>
            <Form.Select
                           {...register('price_type', { required: 'Tarif réquis' })}
                isInvalid={!!errors.price_type}
            >
               <option value="gratuit">Gratuit</option>
              <option value="payant">Payant</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.price_type?.message}
            </Form.Control.Feedback>
          </Form.Group>

            {priceType === 'payant' && (
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Prix (€)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                {...register('price', {
                  required: 'Prix requis',
                  min: { value: 0.01, message: 'Prix invalide' },
                })}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price?.message}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="max_participants">
            <Form.Label>Participants max</Form.Label>
            <Form.Control
              type="number"
              {...register('max_participants', {
                  required: 'Nombre requis',  
                 min: { value: 1, message: 'Minimum 1' },
              })}
              isInvalid={!!errors.max_participants}
            />
            <Form.Control.Feedback type="invalid">
              {errors.max_participants?.message}
            </Form.Control.Feedback>
            </Form.Group>

          <Form.Group className="mb-3" controlId="start_date">
            <Form.Label>Date de début</Form.Label>
              <Form.Control
              type="datetime-local"
              {...register('start_date', { required: 'Date de début requise' })}
              isInvalid={!!errors.start_date}
               />
            <Form.Control.Feedback type="invalid">
              {errors.start_date?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="end_date">
            <Form.Label>Date de fin</Form.Label>
            <Form.Control
              type="datetime-local"
              {...register('end_date', {
                required: 'Date de fin requise',
                validate: (value) => {
                  if (!value || !startDate) return true;
                  if (
                    new Date(startDate).toDateString() ===
                    new Date(value).toDateString()
                  ) {
                    return 'La date de fin  doit être   un jour différent de la date de début';
                  }
                  return true;
                },
              })}
              isInvalid={!!errors.end_date}
            />
            <Form.Control.Feedback type="invalid">
              {errors.end_date?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image (optionnel)</Form.Label>
            <Form.Control
              type="text"
              placeholder="event.jpg"
              {...register('image')}
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">
               {errors.image?.message}
            </Form.Control.Feedback>
          </Form.Group>

            <Button
            type="submit"
             variant="primary"
            className="w-100"
             disabled={createLoading || success}
          >
            {createLoading ? 'Création...' : "Créer l'événement"}
          </Button>
          </Form>
         </div>
    </div>
  );
}