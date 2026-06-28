import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { clearError, loginUser } from '../features/auth/authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(loginUser({ login: data.login, password: data.password }));
  };

  return (
    <div className="auth-card">
      <h1 className="h3 mb-3">Connexion</h1>
      <p className="text-muted mb-4">Accédez à votre espace CommunityHub.</p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="login">
          <Form.Label>Email ou pseudo</Form.Label>
          <Form.Control
            type="text"
            {...register('login', { required: 'Email ou pseudo requis' })}
            isInvalid={!!errors.login}
          />
          <Form.Control.Feedback type="invalid">
            {errors.login?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            {...register('password', { required: 'Mot de passe requis' })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </Button>
      </Form>

      <p className="mt-3 mb-0 text-center">
        Pas encore de compte ? <Link to="/register">S&apos;inscrire</Link>
      </p>
    </div>
  );
}
