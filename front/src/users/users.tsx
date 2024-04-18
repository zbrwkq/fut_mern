import React, { useState, useEffect } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import MainSection from "../component/mainSection";
import axios from "axios";

interface Role {
    name: string;
}

interface User {
    _id: string;
    name: string;
    email: string;
    role: Role;
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [editedUser, setEditedUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<User[]>(
                    "http://localhost:3000/api/users"
                );
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId: string) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${userId}`);
            setUsers(users.filter((user) => user._id !== userId));
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setEditedUser({ ...user });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editedUser) {
            setEditedUser({
                ...editedUser,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async () => {
        if (editedUser) {
            try {
                await axios.put(
                    `http://localhost:3000/api/users/${editedUser._id}`,
                    editedUser
                );
                setUsers(
                    users.map((user) =>
                        user._id === editedUser._id ? editedUser : user
                    )
                );
                setSelectedUser(null);
                setEditedUser(null);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <MainSection>
            <Container className="position-relative w-100">
                <h1 className="text-center d-block">Football club manager</h1>
                <h2>Utilisateurs</h2>
                {users.map((user, index) => (
                    <Card key={index}>
                        <Card.Body>
                            <ul>
                                <li>
                                    <strong>Nom:</strong> {user.name}
                                </li>
                                <li>
                                    <strong>Email:</strong> {user.email}
                                </li>
                                <li>
                                    <strong>Rôle:</strong> {user.role?.name}
                                </li>
                                <li>
                                    <strong>Actions:</strong>
                                    <Button
                                        variant="danger"
                                        onClick={() =>
                                            handleDeleteUser(user._id)
                                        }
                                    >
                                        Supprimer
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleEditUser(user)}
                                    >
                                        Modifier
                                    </Button>
                                </li>
                            </ul>
                        </Card.Body>
                    </Card>
                ))}
                {selectedUser && (
                    <Card>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formName">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={editedUser?.name || ""}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={editedUser?.email || ""}
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
            </Container>
        </MainSection>
    );
}
