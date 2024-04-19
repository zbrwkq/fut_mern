import "./dashboard.scss";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useUser } from "../UserProvider";
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
    const [teamData, setTeamData] = useState(null);
    const { user, setUser } = useUser();

    useEffect(() => {
        async function fetchTeamData() {
          try {
            const response = await fetch('http://localhost:8000/api/user');
    
            if (!response.ok) {
              throw new Error('Failed to fetch team data');
            }
    
            const data = await response.json();
    
            setTeamData(data);

            console.log(data)
            console.log(user)
          } catch (error) {
            console.error('Error fetching team data:', error);
          }
        }
    
        // Appel de la fonction pour récupérer les données lors du montage du composant
        fetchTeamData();
    }, []);

    return (
        <div>
            <div className="sidebar-left">
                <div className="titre text-center">
                    <h1>Nom de la team</h1>

                    <h2 className="mt-5">V- D- N- </h2>

                    <h2 className="mt-5">Budget</h2>
                    <h2 className=""></h2>
                </div>  
                   
            </div>
            <div className="sidebar-right">

            </div>
            <div className="main-content">
                
            </div>     
        </div>
    )
}