import { Button, Container, Form, Spinner } from "react-bootstrap";
import MainSection from "../component/mainSection/mainSection";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
    }
    setLoading(!loading);
  };

  const RegisterButton = () => {
    if (loading) {
      return (
        <Button
          variant="primary"
          type="submit"
          className="mt-2 mx-auto d-block"
          disabled
        >
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />{" "}
          Chargement...
        </Button>
      );
    } else {
      return (
        <Button
          variant="primary"
          type="submit"
          className="mt-2 mx-auto d-block"
        >
          Confirmer
        </Button>
      );
    }
  };
  return (
    <MainSection>
      <Container className="position-relative w-100">
        <h1 className="text-center d-block">Football club manager</h1>
        <h2>Connexion</h2>
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => handleSubmit(e)}
        >
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
          <RegisterButton />
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
