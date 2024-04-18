import { Button, Container, Form, FormControlProps } from "react-bootstrap";
import MainSection from "../component/mainSection";
import { Link } from "react-router-dom";
import { FormEventHandler, useState } from "react";

export default function Login() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
    }
  };
  return (
    <MainSection>
      <Container className="position-relative w-100">
        <h1 className="text-center d-block">Football club manager</h1>
        <h2>Créer un compte</h2>
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
            <Form.Label>Nom d'utilisateur</Form.Label>
            <Form.Control
              type="text"
              name="usermane"
              placeholder="Entrez votre pseudo"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="text"
              name="password"
              placeholder="Entrez votre mot de passe"
            />
            <Form.Control
              type="text"
              name="reapeatPassword"
              placeholder="Vérifiez votre mot de passe"
              className="mt-2"
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
          to="/login"
          className="position-absolute bottom-0 start-50 translate-middle-x p-4"
        >
          Deja inscrit ?
        </Link>
      </Container>
    </MainSection>
  );
}
