import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PageHeader from '../components/layout/PageHeader';
import SkillCard from '../components/skills/SkillCard';
import { fetchSkills } from '../features/skills/skillsSlice';

function isPremiumUser(user) {
  return user?.user_status_id === 2 || user?.is_premium === true;
}

export default function SkillsPage() {
  const dispatch = useDispatch();
  const { skills, loading, error } = useSelector((state) => state.skills);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        title="Compétences"
        subtitle="Découvrez les compétences proposées par les membres premium."
        action={
          isAuthenticated && isPremiumUser(user) ? (
            <Button as={Link} to="/skills/my" variant="success">
              Ma compétence
            </Button>
          ) : null
        }
      />

      {loading && <LoadingSpinner />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && skills.length === 0 && (
        <EmptyState message="Aucune compétence pour le moment." />
      )}

      <Row className="g-4">
        {skills.map((skill) => (
          <Col key={skill.id} md={6} lg={4}>
            <SkillCard skill={skill} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
