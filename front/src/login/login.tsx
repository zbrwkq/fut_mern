import { Button, Container, Form } from "react-bootstrap";
import MainSection from "../component/mainSection";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <MainSection>
      <Container className="position-relative w-100">
        <h1 className="text-center d-block">Football club manager</h1>
        <h2>Connexion</h2>
        <Form>
          <Form.Group>
            <Form.Label>Adresse Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Entrez votre email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="text"
              name="password"
              placeholder="Entrez votre mot de passe"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mt-2 mx-auto d-block"
          >
            Confirmer
          </Button>
        </Form>

        <Link
          to="/register"
          className="position-absolute bottom-0 start-50 translate-middle-x p-4"
        >
          Pas encore inscrit ?
        </Link>
      </Container>
    </MainSection>
  );
}
