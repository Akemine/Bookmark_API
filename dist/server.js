"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// Permet de parser en json avec Express (anciennement Body parser)
app.use(express_1.default.json());
// Import des routes bookmarks
const bookmark_1 = __importDefault(require("./routes/bookmark"));
class Server {
    constructor(port) {
        this.port = port;
    }
    // Middleware qui s'occupe des droits
    headersInit() {
        app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
            res.setHeader("Content-Type", "application/json");
            next();
        });
    }
    // Fonction qui boot le serveur
    start() {
        // Initialiase le header de la page HTML
        this.headersInit();
        // Permet de parser en json avec Express (anciennement Body parser)
        app.use(express_1.default.json());
        // Démarre le serveur
        app.listen(this.port, () => {
            console.log("Server started.");
        });
    }
}
exports.default = Server;
app.use("/api", bookmark_1.default); // rejoins la route Bookmark dans './routes/bookmark' pour les chemins commençant par '/api'
