import { Button, Container, Form, Spinner } from "react-bootstrap";
import MainSection from "../component/mainSection/mainSection";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../UserProvider";
import axios from "axios";

export default function Login() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const formEl = event.currentTarget;
    setValidated(true);
    const email = formEl.querySelector<HTMLInputElement>(
      'input[name="email"]'
    )!.value;
    const password = formEl.querySelector<HTMLInputElement>(
      'input[name="password"]'
    )!.value;
    setLoading(true);

    const fetchData = async () => {
      try {
        const { data } = await axios.post("/user/login", {
          email: email,
          password: password,
        });
        setUser(data.user);
        navigate("/");
      } catch (error: any) {
        setLoading(false);
        if (error.response.status === 404) {
          setError("Email ou mot de passe incorrect");
        }
        console.error(error);
      }
    };
    fetchData();
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
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              required
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
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
