import express, { NextFunction } from 'express';
import {Request, Response} from 'express'; // Permet de typer explicitement plutôt que de laisser express le faire implicitement
const app = express();

// Permet de parser en json avec Express (anciennement Body parser)
app.use(express.json());

// Import des routes bookmarks
import bookmark from './routes/bookmark'

export default class Server {

    readonly port: number
    
    constructor (port: number){
        this.port = port
    }

    // Middleware qui s'occupe des droits
    headersInit(){
        
        app.use((req : Request, res : Response, next : NextFunction) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, PATCH, OPTIONS"
        );
        res.setHeader("Content-Type", "application/json");

        next();
        });
    }

    // Fonction qui boot le serveur
    start(){

        // Initialiase le header de la page HTML
        this.headersInit()

        // Permet de parser en json avec Express (anciennement Body parser)
        app.use(express.json());

        // Démarre le serveur
        app.listen(this.port, () => {
            console.log("Server started.");
        });
    }
}

app.use("/api", bookmark) // rejoins la route Bookmark dans './routes/bookmark' pour les chemins commençant par '/api'
