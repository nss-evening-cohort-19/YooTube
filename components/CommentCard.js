import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../utils/context/authContext';

function CommentCard() {
  const { user } = useAuth();
  return (
    <Card style={{ width: '36rem' }}>
      <Card.Img src={user.photoURL} />
      <Card.Body>
        <Card.Title>{ user.displayName }e</Card.Title>
        <Card.Text>
          { user.commentText }
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default CommentCard;
