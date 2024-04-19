import { Button, Container, Form, Spinner } from "react-bootstrap";
import MainSection from "../component/mainSection/mainSection";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../UserProvider";

export default function Login() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [valid, setValid] = useState(false);
  const [form, setForm] = useState({
    email: {
      value: "",
      valid: false,
      error: "",
    },
    name: {
      value: "",
      valid: false,
      error: "",
    },
    password: {
      value: "",
      valid: false,
      error: "",
    },
    confirmPassword: {
      value: "",
      valid: false,
      error: "",
    },
    team: {
      value: "",
      valid: false,
      error: "",
    },
  });
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);
    const formEl = event.currentTarget;
    validateForm(formEl);
    setLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axios.post("/user/register", {
          email: form.email.value,
          password: form.password.value,
          name: form.name.value,
          team: form.team.value
        });
        setUser(data.user);
        navigate("/");
      } catch (error: any) {
        setLoading(false);
        console.error(error);
        if (error.response && error.response.status === 400) {
          setForm({
            ...form,
            email: {
              ...form.email,
              valid: false,
              error: "Cet email est déjà enregistré",
            },
          });
        }
      }
    };
    fetchData();
  };

  const handleChange = () => {
    validateForm(document.querySelector("form")!);
  };

  const validateForm = (formEl: HTMLFormElement) => {
    let emailObj = {} as { value: string; valid: boolean; error: string };
    const email = formEl.querySelector<HTMLInputElement>(
      'input[name="email"]'
    )!.value;
    if (!email) {
      emailObj = {
        value: email,
        valid: false,
        error: "Veuillez renseigner votre email",
      };
    } else {
      emailObj = {
        value: email,
        valid: true,
        error: "",
      };
    }
    let nameObj = {} as { value: string; valid: boolean; error: string };
    const name =
      formEl.querySelector<HTMLInputElement>('input[name="name"]')!.value;
    if (!name) {
      nameObj = {
        value: name,
        valid: false,
        error: "Veuillez renseigner un pseudonyme",
      };
    } else {
      nameObj = {
        value: name,
        valid: true,
        error: "",
      };
    }
    let passwordObj = {} as { value: string; valid: boolean; error: string };
    const password = formEl.querySelector<HTMLInputElement>(
      'input[name="password"]'
    )!.value;
    if (!password) {
      passwordObj = {
        value: password,
        valid: false,
        error: "Veuillez renseigner un mot de passe",
      };
    } else if (password.length < 8) {
      passwordObj = {
        value: password,
        valid: false,
        error: "Le mot de passe doit contenir au moins 8 caractères",
      };
    } else if (password.length > 20) {
      passwordObj = {
        value: password,
        valid: false,
        error: "Le mot de passe doit contenir moins de 20 caractères",
      };
    } else {
      passwordObj = {
        value: password,
        valid: true,
        error: "",
      };
    }
    let confirmPasswordObj = {} as {
      value: string;
      valid: boolean;
      error: string;
    };
    const confirmPassword = formEl.querySelector<HTMLInputElement>(
      'input[name="confirmPassword"]'
    )!.value;
    if (!confirmPassword) {
      confirmPasswordObj = {
        value: confirmPassword,
        valid: false,
        error: "Veuillez renseigner un mot de passe",
      };
    } else if (confirmPassword !== password) {
      confirmPasswordObj = {
        value: confirmPassword,
        valid: false,
        error: "Mots de passe différents",
      };
    } else {
      confirmPasswordObj = {
        value: confirmPassword,
        valid: true,
        error: "",
      };
    }

    let teamObj = {} as { value: string; valid: boolean; error: string };
    const team = formEl.querySelector<HTMLInputElement>(
      'input[name="team"]'
    )!.value;
    if (!team) {
      teamObj = {
        value: team,
        valid: false,
        error: "Veuillez renseigner votre team",
      };
    } else {
      teamObj = {
        value: team,
        valid: true,
        error: "",
      };
    }

    if (
      emailObj.valid &&
      nameObj.valid &&
      passwordObj.valid &&
      confirmPasswordObj.valid &&
      teamObj.valid
    ) {
      setValid(true);
    }
    setForm({
      email: emailObj,
      name: nameObj,
      password: passwordObj,
      confirmPassword: confirmPasswordObj,
      team: teamObj,
    });
  };

  useEffect(() => {
    if (valid) {
    }
  }, [valid]);

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
        <Form noValidate onSubmit={(e) => handleSubmit(e)}>
          <Form.Group>
            <Form.Label>Adresse Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Entrez votre email"
              isValid={validated && form.email.valid}
              isInvalid={validated && !form.email.valid}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {form.email.error}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Nom d'utilisateur</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Entrez votre pseudo"
              isValid={validated && form.name.valid}
              isInvalid={validated && !form.name.valid}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {form.name.error}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              isValid={validated && form.password.valid}
              isInvalid={validated && !form.password.valid}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {form.password.error}
            </Form.Control.Feedback>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Vérifiez votre mot de passe"
              className="mt-2"
              isValid={validated && form.confirmPassword.valid}
              isInvalid={validated && !form.confirmPassword.valid}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {form.confirmPassword.error}
            </Form.Control.Feedback>
            <Form.Label>Nom de l'équipe</Form.Label>
            <Form.Control
              type="text"
              name="team"
              placeholder="Entrez le nom de votre équipe"
              className="mt-2"
              isValid={validated && form.team.valid}
              isInvalid={validated && !form.team.valid}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {form.confirmPassword.error}
            </Form.Control.Feedback>
          </Form.Group>
          <RegisterButton />
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
