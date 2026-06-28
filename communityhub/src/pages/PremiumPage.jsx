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
import { setUser } from '../features/auth/authSlice';
import {
  clearSubscribeError,
  fetchPayments,
  subscribePremium,
} from '../features/payments/paymentsSlice';

function isPremiumUser(user) {
  return user?.user_status_id === 2 || user?.is_premium === true;
}

export default function PremiumPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { payments, loading, error, subscribeLoading, subscribeError } =
    useSelector((state) => state.payments);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      payment_method: 'stripe',
      amount: 19.99,
    },
  });

  useEffect(() => {
    dispatch(fetchPayments());
    return () => dispatch(clearSubscribeError());
  }, [dispatch]);

  const onSubmit = async (data) => {
    const result = await dispatch(
      subscribePremium({
        payment_method: data.payment_method,
        amount: Number(data.amount),
      }),
    );

    if (subscribePremium.fulfilled.match(result)) {
      setSuccess(true);
      if (result.payload?.user) {
        dispatch(setUser(result.payload.user));
      } else if (user) {
        dispatch(setUser({ ...user, user_status_id: 2 }));
      }
      dispatch(fetchPayments());
    }
  };

  const paymentList = (
    <div className="mt-4">
      <h2 className="h5 mb-3">Historique des paiements</h2>
      {loading && <LoadingSpinner />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && payments.length === 0 && (
        <EmptyState message="Aucun paiement enregistré." />
      )}
      <ListGroup>
        {payments.map((payment) => (
          <ListGroup.Item key={payment.id}>
            {payment.amount} € — {payment.payment_method} — {payment.created_at}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );

  if (isPremiumUser(user)) {
    return (
      <div>
        <PageHeader
          title="Abonnement Premium"
          subtitle="Vous profitez déjà de tous les avantages premium."
        />
        <div className="content-card">
          <Alert variant="success" className="mb-0">
            Vous êtes membre premium.
          </Alert>
          {paymentList}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Passer Premium"
        subtitle="Devenez membre premium pour créer des événements et proposer vos compétences."
      />

      <div className="form-card mx-auto">
        {subscribeError && <Alert variant="danger">{subscribeError}</Alert>}
        {success && (
          <Alert variant="success">
            Paiement réussi. Vous êtes maintenant membre premium.
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="payment_method">
            <Form.Label>Méthode de paiement</Form.Label>
            <Form.Select
              {...register('payment_method', { required: 'Méthode requise' })}
              isInvalid={!!errors.payment_method}
            >
              <option value="stripe">Stripe</option>
              <option value="cheque">Chèque</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.payment_method?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Montant (€)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              {...register('amount', {
                required: 'Montant requis',
                min: { value: 0.01, message: 'Montant invalide' },
              })}
              isInvalid={!!errors.amount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.amount?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={subscribeLoading || success}
          >
            {subscribeLoading ? 'Paiement...' : 'Payer et devenir premium'}
          </Button>
        </Form>

        {paymentList}
      </div>
    </div>
  );
}
