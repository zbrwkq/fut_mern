import { Button, Container, Form, Spinner } from "react-bootstrap";
import MainSection from "../component/mainSection/mainSection";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: {
      valid: false,
      error: "",
    },
    username: {
      valid: false,
      error: "",
    },
    password: {
      valid: false,
      error: "",
    },
    confirmPassword: {
      valid: false,
      error: "",
    },
    valid: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formEl = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);
    console.log(validated && !form.email.valid);
    if (form.valid) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const { data } = await axios.get("/register");
          console.log(data.results);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error(error);
        }
      };
      fetchData();
    }
  };

  const LoginButton = () => {
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
          />
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
              isValid={validated && form.email.valid}
              isInvalid={validated && !form.email.valid}
            />
            <Form.Control.Feedback type="invalid">
              {form.email.error}
            </Form.Control.Feedback>
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
              required
              min="6"
              max="24"
            />
            <Form.Control
              type="text"
              name="confirmPassword"
              placeholder="Vérifiez votre mot de passe"
              className="mt-2"
              required
              min="6"
              max="24"
            />
          </Form.Group>
          <LoginButton />
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
