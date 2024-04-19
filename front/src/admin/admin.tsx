import { Button, Card, Container } from "react-bootstrap";
import MainSection from "../component/mainSection/mainSection";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "../UserProvider";

export default function Admin() {
  const { user } = useUser();

  if (!user || user.role.name !== "Administrateur") {
    return <Navigate to="/login" />;
  }
  return (
    <MainSection>
      <Container>
        <h1 className="text-center d-block">Football club manager</h1>

        <h2>Administration</h2>
        <Card className="mb-3">
          <Card.Body className="d-flex justify-content-between">
            <Card.Title>Gestion des utilisateurs</Card.Title>
            <Link to="/admin/users">
              <Button variant="primary">Gérer</Button>
            </Link>
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Body className="d-flex justify-content-between">
            <Card.Title>Gestion des joueurs</Card.Title>
            <Link to="/admin/players">
              <Button variant="primary">Gérer</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </MainSection>
  );
}
