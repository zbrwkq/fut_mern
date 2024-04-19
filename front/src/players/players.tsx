import React, { useState, useEffect } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import MainSection from "../component/mainSection/mainSection";
import axios from "axios";
import { useUser } from "../UserProvider";
import { Navigate } from "react-router-dom";

interface Player {
    _id: string;
    id: number;
    name: string;
    gender: string;
    position: string;
    rating: number;
    club: number;
    clubName: string;
}

export default function Players() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [editedPlayer, setEditedPlayer] = useState<Player | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { user, setUser } = useUser();

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get<Player[]>(
                    `http://localhost:3000/api/player?page=${currentPage}`
                );
                const playersWithClubNames = await Promise.all(
                    response.data.map(async (player) => {
                        const clubResponse = await axios.get(
                            `http://localhost:3000/api/club/${player.club}`
                        );
                        const clubName = clubResponse.data.name;
                        return { ...player, clubName };
                    })
                );
                setPlayers(playersWithClubNames);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPlayers();
    }, [currentPage]);

    const handleDeletePlayer = async (playerId: string) => {
        try {
            await axios.delete(`http://localhost:3000/api/player/${playerId}`);
            setPlayers(players.filter((player) => player._id !== playerId));
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditPlayer = (player: Player) => {
        setSelectedPlayer(player);
        setEditedPlayer({ ...player });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editedPlayer) {
            setEditedPlayer({
                ...editedPlayer,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async () => {
        if (editedPlayer) {
            try {
                await axios.put(
                    `http://localhost:3000/api/player/${editedPlayer._id}`,
                    editedPlayer
                );
                setPlayers(
                    players.map((player) =>
                        player._id === editedPlayer._id ? editedPlayer : player
                    )
                );
                setSelectedPlayer(null);
                setEditedPlayer(null);
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (!user || user.role.name !== "Administrateur") {
        return <Navigate to="/login" />;
    }

    return (
        <MainSection>
            <Container className="position-relative w-100">
                <h1 className="text-center d-block">Football club manager</h1>
                <h2>Joueurs</h2>
                <div className="d-flex flex-wrap">
                    {players.map((player, index) => (
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
                                        <strong>Club:</strong> {player.clubName}
                                    </li>
                                    <li>
                                        <strong>Poste:</strong>{" "}
                                        {player.position}
                                    </li>
                                    <li>
                                        <strong>Note:</strong> {player.rating}
                                    </li>
                                    <li>
                                        <strong>Actions:</strong>
                                        <Button
                                            variant="danger"
                                            onClick={() =>
                                                handleDeletePlayer(player._id)
                                            }
                                        >
                                            Supprimer
                                        </Button>
                                        <Button
                                            variant="primary"
                                            onClick={() =>
                                                handleEditPlayer(player)
                                            }
                                        >
                                            Modifier
                                        </Button>
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                {selectedPlayer && (
                    <Card>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formName">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={editedPlayer?.name || ""}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit}
                                >
                                    Enregistrer
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                )}
                <div className="d-flex justify-content-center mt-3">
                    <Button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Précédent
                    </Button>
                    <Button
                        className="mx-2"
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Suivant
                    </Button>
                </div>
            </Container>
        </MainSection>
    );
}
