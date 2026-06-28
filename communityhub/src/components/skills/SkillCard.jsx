import Card from 'react-bootstrap/Card';

export default function SkillCard({ skill }) {
  return (
    <Card className="event-card mb-3 h-100">
      <Card.Body>
        <Card.Title>{skill.title}</Card.Title>
        {skill.daily_price && (
          <Card.Text className="event-meta">{skill.daily_price} € / jour</Card.Text>
        )}
        {skill.description && <Card.Text>{skill.description}</Card.Text>}
      </Card.Body>
    </Card>
  );
}
