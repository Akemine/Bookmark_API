import express from 'express';
import { getBookmark, addBookmark, updateBookmark, deleteBookmark } from '../API/bookmark/bookmark_api';

// Init l'objet Router d'express
const router = express.Router();

router.get('/bookmark', getBookmark) // Affiche les bookmarks
router.post('/bookmark', addBookmark) // Ajoute un Bookmark
router.put('/bookmark', updateBookmark) // Modifie un bookmark par un autre
router.delete('/bookmark', deleteBookmark) // Supprime un Bookmark

export default router;