import { useEffect } from "react";
import { useUser } from "../UserProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Logout() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    }
  });

  return <Link to="/login">Redirection</Link>;
}
