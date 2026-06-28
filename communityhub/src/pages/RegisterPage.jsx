import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { clearError, registerUser } from '../features/auth/authSlice';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data) => {
    try {
      await dispatch(
        registerUser({
          pseudo: data.pseudo,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          password: data.password,
          birthdate: data.birthdate,
          address: data.address,
          postal_code: data.postal_code,
          city: data.city,
          phone: data.phone || '',
          avatar: data.avatar || 'avatar.png',
          user_status_id: 1,
        }),
      ).unwrap();

      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch {
      // L'erreur s'affiche déjà via {error && <Alert>}
    }
  };

  return (
    <div className="form-card mx-auto" style={{ maxWidth: '560px' }}>
      <h1 className="h3 mb-3">Inscription</h1>
      <p className="text-muted mb-4">
        Créez votre compte pour rejoindre la communauté.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">
          Compte créé avec succès. Redirection vers la connexion...
        </Alert>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="pseudo">
          <Form.Label>Pseudo</Form.Label>
          <Form.Control
            type="text"
            {...register('pseudo', { required: 'Pseudo requis' })}
            isInvalid={!!errors.pseudo}
          />
          <Form.Control.Feedback type="invalid">
            {errors.pseudo?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="firstname">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            {...register('firstname', { required: 'Prénom requis' })}
            isInvalid={!!errors.firstname}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstname?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastname">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            {...register('lastname', { required: 'Nom requis' })}
            isInvalid={!!errors.lastname}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastname?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            {...register('email', { required: 'Email requis' })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="birthdate">
          <Form.Label>Date de naissance</Form.Label>
          <Form.Control
            type="date"
            {...register('birthdate', { required: 'Date de naissance requise' })}
            isInvalid={!!errors.birthdate}
          />
          <Form.Control.Feedback type="invalid">
            {errors.birthdate?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Adresse</Form.Label>
          <Form.Control
            type="text"
            {...register('address', { required: 'Adresse requise' })}
            isInvalid={!!errors.address}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="postal_code">
          <Form.Label>Code postal</Form.Label>
          <Form.Control
            type="text"
            {...register('postal_code', { required: 'Code postal requis' })}
            isInvalid={!!errors.postal_code}
          />
          <Form.Control.Feedback type="invalid">
            {errors.postal_code?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="city">
          <Form.Label>Ville</Form.Label>
          <Form.Control
            type="text"
            {...register('city', { required: 'Ville requise' })}
            isInvalid={!!errors.city}
          />
          <Form.Control.Feedback type="invalid">
            {errors.city?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Téléphone (optionnel)</Form.Label>
          <Form.Control type="text" {...register('phone')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            {...register('password', {
              required: 'Mot de passe requis',
              minLength: { value: 6, message: 'Minimum 6 caractères' },
            })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirmer le mot de passe</Form.Label>
          <Form.Control
            type="password"
            {...register('confirmPassword', {
              required: 'Confirmation requise',
              validate: (value) =>
                value === password || 'Les mots de passe ne correspondent pas',
            })}
            isInvalid={!!errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={loading || success}>
          {loading ? 'Inscription...' : "S'inscrire"}
        </Button>
      </Form>

      <p className="mt-3">
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  );
}