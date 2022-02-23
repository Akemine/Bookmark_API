import * as pgsql from "pg";

const pool = new pgsql.Pool({
  database: 'bookmark',
  user: 'postgres',
  password: 'root',
  port: 5432,
  ssl: false,
  max: 20, // Maximum de pool en parallèle
  idleTimeoutMillis: 10000, // Ferme les connexions après 10s sans activité
  connectionTimeoutMillis: 4000, // retourne une erreur après 4s si pas de connexion
});

// Permet de typer explicitement plutôt que de laisser express le faire implicitement
import {Response} from 'express'; 

// Fonction qui run le SQL en fonction du string envoyé et renvoie la réponse sous JSON si nécessaire.
export function runSQL(sql: string, res: Response){
  pool.connect((err, client, release) => {
    client.query(sql, [], (err, result) => {
        release();
        if (err) {
            throw err;
        }
        res.json(result.rows); // Non mandatory
    });
  });
}

