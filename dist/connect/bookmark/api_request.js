"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookmark = exports.updateBookmark = exports.addBookmark = exports.getBookmark = void 0;
// Import de la connection pgsql
const pg_1 = __importDefault(require("../pg"));
// Import de l'objet extract qui permet de parser oembed
const oembed_parser_1 = require("oembed-parser");
// Import de mes objets
const commonField_1 = __importDefault(require("../../models/commonField"));
const video_1 = __importDefault(require("../../models/video"));
const photo_1 = __importDefault(require("../../models/photo"));
// Init du tableau qu'on rempli avec les données
let content = [];
// Init de mes objets
let commonField = new commonField_1.default("", "", "", "", "", "");
let videoField = new photo_1.default(0, 0);
let photoField = new video_1.default(0, 0, 0);
// Fonction de test permettant de voir ce que renvoie l'URL avant entrée en BDD.
// export function getBookmarkFromURL(req:Request, res:Response) {
//     // Retourne toutes les informations du bookmark
//     if (req.query.url){
//         const data: string = req.query.url as string
//         extract(data)
//         .then((oembed) => { 
//             res.json(oembed)
//         }).catch((err) => {
//             console.trace(err)
//         })
//     }
//     else {
//         res.json({'Message': "Pas d'url en paramètre"})
//     }
// }
// Affiche tous les bookmarks déjà enregistrés en BDD
function getBookmark(req, res) {
    let sql = 'SELECT * FROM public.media_content';
    pg_1.default.connect((err, client, release) => {
        client.query(sql, [], (err, result) => {
            release();
            if (err) {
                throw err;
            }
            res.json(result.rows);
        });
    });
}
exports.getBookmark = getBookmark;
// Permet d'ajouter toutes les informations d'un bookmark via son URL
// Passer l'URL voulu pour récupérer les données.
function addBookmark(req, res) {
    const data = req.query.url;
    content = []; // Reset du tableau pour ne pas accumuler
    // Methode qui va extraire les données d'un tableau
    (0, oembed_parser_1.extract)(data)
        .then((oembed) => {
        // Push les informations communes à mes deux sources
        commonField.title = oembed.title;
        commonField.author_name = oembed.author_name;
        commonField.upload_date = oembed.upload_date;
        commonField.content_type = oembed.type;
        //Push les informations pour les photos (venant de Flickr)
        if (oembed.type === "photo") {
            commonField.url = oembed.web_page;
            photoField.width = oembed.width;
            photoField.height = oembed.height;
            content.push({
                'content_type': commonField.content_type,
                'url': commonField.url,
                'title': commonField.title,
                'author_name': commonField.author_name,
                'upload_date': null,
                'publication_date': null,
                'width': photoField.width,
                'height': photoField.height,
                'duration': null // n'existe pas pour les photos
            });
        }
        // Push les informations pour les vidéos (venant de Vimeo)
        else if (oembed.type === "video") {
            commonField.url = oembed.provider_url + '' + oembed.video_id;
            videoField.width = oembed.width;
            videoField.height = oembed.height;
            videoField.duration = oembed.duration;
            content.push({
                'content_type': commonField.content_type,
                'url': commonField.url,
                'title': commonField.title,
                'author_name': commonField.author_name,
                'upload_date': commonField.upload_date,
                'publication_date': commonField.upload_date,
                'width': videoField.width,
                'height': videoField.height,
                'duration': videoField.duration
            });
        }
        let sql = `INSERT INTO public.media_content (
        content_type,
        url, 
        title, 
        author_name, 
        upload_date, 
        publication_date, 
        width, 
        height, 
        duration)`;
        sql += `VALUES ('` + content[0].content_type + `',
         '` + content[0].url + `',
         '` + content[0].title + `',
         '` + content[0].author_name + `',
         '` + content[0].upload_date + `',
         '` + content[0].publication_date + `', 
         ` + content[0].width + `, 
         ` + content[0].height + `, 
         ` + content[0].duration + `)`;
        pg_1.default.connect((err, client, release) => {
            client.query(sql, [], (err, result) => {
                release();
                if (err) {
                    throw err;
                }
                res.json(result.rows);
            });
        });
    }).catch((err) => {
        console.trace(err);
    });
}
exports.addBookmark = addBookmark;
// La fonction permet d'upload une ligne de la BDD par une autre.
// Par exemple, si on donne l'URL de celle qu'on souhaite modifier et qu'on donne aussi la nouvelle URL
// Toutes les données sont updates avec la nouvelle vidéo.
// Warning : L'ancienne vidéo/photo/autre disparaît complètement
function updateBookmark(req, res) {
    const oldData = req.query.oldUrl;
    const newData = req.query.newUrl;
    // Methode qui va extraire les données d'un tableau
    (0, oembed_parser_1.extract)(newData)
        .then((oembed) => {
        // Push les informations communes à mes deux sources
        commonField.title = oembed.title;
        commonField.author_name = oembed.author_name;
        commonField.upload_date = oembed.upload_date;
        commonField.content_type = oembed.type;
        //Push les informations pour les photos (venant de Flickr)
        if (oembed.type === "photo") {
            commonField.url = oembed.web_page;
            photoField.width = oembed.width;
            photoField.height = oembed.height;
            content.push({
                'content_type': commonField.content_type,
                'url': commonField.url,
                'title': commonField.title,
                'author_name': commonField.author_name,
                'upload_date': null,
                'publication_date': null,
                'width': photoField.width,
                'height': photoField.height,
                'duration': null // n'existe pas pour les photos
            });
        }
        // Push les informations pour les vidéos (venant de Vimeo)
        else if (oembed.type === "video") {
            commonField.url = oembed.provider_url + '' + oembed.video_id;
            videoField.width = oembed.width;
            videoField.height = oembed.height;
            videoField.duration = oembed.duration;
            content.push({
                'content_type': commonField.content_type,
                'url': commonField.url,
                'title': commonField.title,
                'author_name': commonField.author_name,
                'upload_date': commonField.upload_date,
                'publication_date': commonField.upload_date,
                'width': videoField.width,
                'height': videoField.height,
                'duration': videoField.duration
            });
        }
        let sql = "UPDATE public.media_content SET ";
        sql += "content_type = '" + content[0].content_type + "', ";
        sql += "url = '" + content[0].url + "', ";
        sql += "title = '" + content[0].title + "', ";
        sql += "author_name = '" + content[0].author_name + "', ";
        sql += "upload_date = '" + content[0].upload_date + "', ";
        sql += "publication_date = '" + content[0].upload_date + "', ";
        sql += "width = '" + content[0].width + "', ";
        sql += "height = '" + content[0].height + "', ";
        sql += "duration = '" + content[0].duration + "' ";
        sql += "WHERE url = '" + oldData + "'";
        pg_1.default.connect((err, client, release) => {
            client.query(sql, [], (err, result) => {
                release();
                if (err) {
                    throw err;
                }
                res.json(result.rows);
            });
        });
    }).catch((err) => {
        console.trace(err);
    });
}
exports.updateBookmark = updateBookmark;
// Delete un bookmark via l'url passé en paramètre
function deleteBookmark(req, res) {
    const url = req.query.url;
    let sql = "DELETE FROM public.media_content WHERE url = '" + url + "'";
    pg_1.default.connect((err, client, release) => {
        client.query(sql, [], (err, result) => {
            release();
            if (err) {
                throw err;
            }
            res.json(result.rows);
        });
    });
}
exports.deleteBookmark = deleteBookmark;
