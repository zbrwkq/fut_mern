import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Pagination, Row, Table } from "react-bootstrap";

export default function Market() {
    const [players, setPlayers] = useState([]);
    const [page, setPage] = useState(0);
    const [playersCount, setPlayersCount] = useState(0);
    const [maxPage, setMaxPage] = useState(0);

    useEffect(() => {
        getNextPlayers(page);
        updatePlayersCountAndMaxPage();
    }, [])

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