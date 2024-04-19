import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Pagination, Row, Table, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useUser } from "../UserProvider";
import { Team } from '../../../back/src/models/Team';
import { Player } from "../interfaces/Player";

export default function Market() {
    const [players, setPlayers] = useState([]);
    const [page, setPage] = useState(0);
    const [playersCount, setPlayersCount] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    const { user, setUser } = useUser();

    useEffect(() => {
        getNextPlayers(page);
        updatePlayersCountAndMaxPage();
    }, [])

    
    if (!user) {
        return <Navigate to="/login" />;
    }

    console.log(user)


    async function updatePlayersCountAndMaxPage() {
        try {
            const response = await axios.get('/player/count');
            const counter = parseInt(JSON.stringify(response.data.count));
            setPlayersCount(counter);
            setMaxPage(Math.ceil(counter / 20));
        } catch (error) {
            console.error(error);
        }
    }

    async function getNextPlayers(page: number) {
        try {
            setPage(page);
            const response = await axios.get(`/player?page=${page}&available=true`);
            setPlayers(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function buyPlayer(playerId: string) {
        try {
            // griser les boutons d'achats
            document.getElementById("buy-btn-" + playerId)?.setAttribute("disabled", "disabled");

            // Requete pour récupérer le joueur
            const player: Player = await axios.get(`/player/${playerId}`);

            // requete pour acheter le joueur (changer le status available)
            await axios.put(`/player/${playerId}/`, { available: false });

            // requete pour récupérer l'id de la team avec l'id utilisateur
            const userData = await axios.get(`/user/${user?._id}`);
            console.log(userData)
            const teamId = parseInt(userData.data.team.id);

            // requete pour récupérer les joueurs de la team
            const teamData: Team = await axios.get(`/team/${teamId}`);
            let teamPlayers = teamData.players;
            teamPlayers.push(player);

            // requete pour ajouter le joueur dans la team de l'utilisateur
            await axios.put(`/team/${teamId}`, { players: teamPlayers });

            // enlever le player de la liste
            setPlayers(players.filter(player => player["id"] !== playerId));

            document.getElementById("buy-btn-" + playerId)?.removeAttribute("disabled");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        // get all players that are available & take page 1

        // pagination -> load 20 others players

        <>
            <h1 className="text-center mt-3 mb-5">Market</h1>

            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Nation</th>
                            <th>Skill Moves</th>
                            <th>Attack</th>
                            <th>Defense</th>
                            <th>Rating</th>
                            <th>Rating Average</th>
                            <th>Achat</th>
                        </tr>
                    </thead>

                    {players.map((player, index) => (
                    <tbody className="mb-2">
                        <tr key={index}>
                            <td>{player["name"]}</td>
                            <td>{player["age"]}</td>
                            <td>{player["nation"]}</td>
                            <td>{player["skillMoves"]}</td>
                            <td>{player["attackWorkRate"]}</td>
                            <td>{player["defenseWorkRate"]}</td>
                            <td>{player["rating"]}</td>
                            <td>{player["ratingAverage"]}</td>
                            <td>
                                <Button id={"buy-btn-" + player['id']} onClick={() => buyPlayer(player["id"])}>Acheter</Button>
                            </td>
                        </tr>
                    </tbody>
                    ))}
                </Table>

                <Pagination className="d-flex justify-content-center">
                    <Pagination.First onClick={() => getNextPlayers(0)} />

                    { page >= 2 && 
                        <Pagination.Item onClick={() => getNextPlayers(page-2)}>{page-2}</Pagination.Item>}
                    
                    { page >= 1 &&
                        <Pagination.Item onClick={() => getNextPlayers(page-1)}>{page-1}</Pagination.Item>}
                    
                    <Pagination.Item active>{page}</Pagination.Item>
                    
                    { page < (maxPage - 1) &&
                        <Pagination.Item onClick={() => getNextPlayers(page+1)}>{page+1}</Pagination.Item>}

                    { page < (maxPage - 2) &&
                        <Pagination.Item onClick={() => getNextPlayers(page+2)}>{page+2}</Pagination.Item>}

                    <Pagination.Last onClick={() => getNextPlayers(maxPage)} />
                </Pagination>
            </Container>
        </>
    )
}