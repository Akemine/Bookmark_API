"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSQL = void 0;
const pgsql = __importStar(require("pg"));
const pool = new pgsql.Pool({
    database: 'bookmark',
    user: 'postgres',
    password: 'root',
    port: 5432,
    ssl: false,
    max: 20,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 4000, // retourne une erreur après 4s si pas de connexion
});
// Fonction qui run le SQL en fonction du string envoyé et renvoie la réponse sous JSON si nécessaire.
function runSQL(sql, res) {
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
exports.runSQL = runSQL;
