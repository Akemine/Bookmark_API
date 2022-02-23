"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookmark_api_1 = require("../API/bookmark/bookmark_api");
// Init l'objet Router d'express
const router = express_1.default.Router();
router.get('/bookmark', bookmark_api_1.getBookmark); // Affiche les bookmarks
router.post('/bookmark', bookmark_api_1.addBookmark); // Ajoute un Bookmark
router.put('/bookmark', bookmark_api_1.updateBookmark); // Modifie un bookmark par un autre
router.delete('/bookmark', bookmark_api_1.deleteBookmark); // Supprime un Bookmark
exports.default = router;
