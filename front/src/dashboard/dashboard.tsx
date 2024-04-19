import "./dashboard.scss";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useUser } from "../UserProvider";
import React, { useState, useEffect } from "react";
import MainSection from "../component/mainSection/mainSection";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  team: Team;
};

type Team = {
  name: string;
  victory: number;
  defeat: number;
  draw: number;
  point: number;
  budget: number;
  players: Player[];
};

type Player = {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  height: number;
  weight: number;
  gender: string;
  birthDate: Date;
  age: number;
  league: number;
  nation: number;
  club: number;
  rarity: number;
  position: string;
  skillMoves: number;
  weakFoot: number;
  foot: string;
  attackWorkRate: string;
  defenseWorkRate: string;
  totalStats: number;
  totalStatsInGame: number;
  color: string;
  rating: number;
  ratingAverage: number;
  available: boolean;
};

export default function Dashboard() {
  const [userData, setUserData] = useState<User | null>(null);
  const { user, setUser } = useUser();

  useEffect(() => {
    async function fetchTeamData() {
      try {
        if (!user) {
          return <Navigate to="/login" />;
        }

        try {
          const response = await axios.get(`/user/${user._id}`);

          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    }

    // Appel de la fonction pour récupérer les données lors du montage du composant
    fetchTeamData();
  }, []);

  return (
    <div>
      {userData ? (
        <>
          <div className="sidebar-left">
            <div className="titre text-center">
              <h1>{userData.team.name}</h1>

              <h2 className="mt-5">
                V-{userData.team.victory} D-{userData.team.defeat} N-
                {userData.team.draw}{" "}
              </h2>

              <h2 className="mt-5">Point de la saison</h2>
              <h2 className="">{userData.team.point}</h2>

              <h2 className="mt-5">Budget</h2>
              <h2 className="">{userData.team.budget} €</h2>
            </div>
          </div>
          <div className="sidebar-right">
            <div className="mt-5 titre text-center">
              <h1>Evènement à venir</h1>
            </div>
          </div>
          <div className="main-content text-center">
            <MainSection>
              <Container className="position-relative w-100">
                <h1 className="text-center">Football club manager</h1>
                <h2>Joueurs</h2>
                <div className="d-flex flex-wrap mt-5">
                  {userData.team.players.map((player, index) => (
                    <Card key={index} className="col-4 mb-3">
                      <Card.Body>
                        <ul>
                          <li>
                            <strong>Nom:</strong> {player.name}
                          </li>
                          <li>
                            <strong>Genre:</strong> {player.gender}
                          </li>
                          <li>
                            <strong>Poste:</strong> {player.position}
                          </li>
                          <li>
                            <strong>Note:</strong> {player.rating}
                          </li>
                          <li>
                            <strong>Pays:</strong> {player.nation}
                          </li>
                        </ul>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
                <ul>
                  <li>
                    <Link to="market">
                      <Button>Accéder au marché</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="logout">
                      <Button>Déconnexion</Button>
                    </Link>
                  </li>
                  {user?.role.name == "Administrateur" && (
                    <li>
                      <Link to="admin">
                        <Button>Accéder à l'administration</Button>
                      </Link>
                    </li>
                  )}
                </ul>
              </Container>
            </MainSection>
          </div>
        </>
      ) : (
        <p>Chargement des données de l'utilisateur...</p>
      )}
    </div>
  );
}
