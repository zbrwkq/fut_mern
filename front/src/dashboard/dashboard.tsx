import { Link } from "react-router-dom";
import { useUser } from "../UserProvider";
import { Button } from "react-bootstrap";

export default function Dashboard() {
  const { user } = useUser();
  return (
    <>
      hallo {user?.name}{" "}
      <Link to="/logout">
        <Button variant="outline-primary">Déconnexion</Button>
      </Link>
    </>
  );
}
