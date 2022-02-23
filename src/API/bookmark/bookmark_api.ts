// Permet de typer explicitement plutôt que de laisser express le faire implicitement
import {Request, Response} from 'express'; 

// Import de la connection pgsql
import { runSQL } from '../../connect/pg'

// Import de l'objet extract qui permet de parser oembed
import { extract, OembedData } from 'oembed-parser'

// Import de mes objets
import CommonField from '../../models/commonField'
import Video from '../../models/video';
import Photo from '../../models/photo';

// Init du tableau qu'on rempli avec les données d'oembed dans la fonction "extractDataFromOembed"
let content: any[] = []

// Init de mes objets vide
let commonField: CommonField
let videoField: Video
let photoField: Photo 


function resetData(): void{
    // Reset des objets à chaque instance pour éviter de garder en mémoire une valeur qui ne va pas changer (exemple : Duration)
    commonField = new CommonField("", "", "", "", "", "", "", 0, 0)
    videoField = new Video(0, 0, 0)
    photoField = new Photo(0, 0)

    content = [] // Reset du tableau pour ne pas accumuler
}

// Fonction qui extrait les données venant d'oembed
function extractDataFromOembed(oembed : OembedData): any[]{
    
    // Push les informations communes à mes deux sources
    commonField.title = oembed.title
    commonField.author_name = oembed.author_name
    commonField.upload_date = oembed.upload_date
    commonField.content_type = oembed.type
    commonField.thumbnail_url = oembed.thumbnail_url
    commonField.thumbnail_width = oembed.thumbnail_width
    commonField.thumbnail_height = oembed.thumbnail_height
    //Push les informations pour les photos (venant de Flickr)
    if(oembed.type === "photo"){
        commonField.url = oembed.web_page
        photoField.width = oembed.width
        photoField.height = oembed.height
    } 
    // Push les informations pour les vidéos (venant de Vimeo)
    else if (oembed.type === "video") {
        commonField.url = oembed.provider_url+ '' + oembed.video_id
        videoField.width = oembed.width
        videoField.height = oembed.height
        videoField.duration = oembed.duration
    }
    
    content.push({
        'content_type': commonField.content_type,
        'url': commonField.url,
        'title': commonField.title,
        'author_name': commonField.author_name,
        'upload_date': commonField.upload_date === undefined ? '': commonField.upload_date,
        'publication_date': commonField.upload_date === undefined ? '': commonField.upload_date,
        'thumbnail_url': commonField.thumbnail_url,
        'thumbnail_width': commonField.thumbnail_width,
        'thumbnail_height': commonField.thumbnail_height,
        'width': videoField.width === 0 ? photoField.width : videoField.width,
        'height': videoField.height === 0 ? photoField.height : videoField.height,
        'duration': videoField.duration === 0 ? 0 : videoField.duration
    })

    return content
}

// Affiche tous les bookmarks déjà enregistrés en BDD
export function getBookmark(req:Request, res:Response) {
    let sql =  'SELECT * FROM public.media_content'

    // Fonction qui run le SQL
    runSQL(sql, res)
}

// Permet d'ajouter toutes les informations d'un bookmark via son URL
// Passer l'URL voulu pour récupérer les données.
export function addBookmark(req:Request, res:Response) {
    
    // Recupère le getter
    const url: string = req.query.url as string
    
    // Reset les objets avant l'extract pour éviter tout problèmes de données persistantes.
    resetData()

    // Methode qui va extraire les données d'un tableau
    extract(url) 
    .then((oembed) => {  

        // Retourne un tableau contenant les données  
        const content = extractDataFromOembed(oembed)
        
        let sql =  `INSERT INTO public.media_content (
            content_type,
            url, 
            title, 
            author_name, 
            upload_date, 
            publication_date,
            thumbnail_url,
            thumbnail_width,
            thumbnail_height, 
            width, 
            height, 
            duration)`
        sql += ` VALUES ('` + content[0].content_type +`',
            '` + content[0].url +`',
            '` + content[0].title +`',
            '` + content[0].author_name +`',
            '` + content[0].upload_date +`',
            '` + content[0].publication_date +`', 
            '` + content[0].thumbnail_url +`',
            ` + content[0].thumbnail_width +`, 
            ` + content[0].thumbnail_height +`, 
            ` + content[0].width +`, 
            ` + content[0].height +`, 
            ` + content[0].duration +`)`
            
            // Fonction qui run le SQL
            runSQL(sql, res)

        }).catch((err) => {
            console.trace(err)
        })
        
}
    
// La fonction permet d'upload une ligne de la BDD par une autre.
// Par exemple, si on donne l'URL de celle qu'on souhaite modifier et qu'on donne aussi la nouvelle URL
// Toutes les données sont updates avec la nouvelle vidéo.
// Warning : L'ancienne vidéo/photo/autre disparaît complètement
export function updateBookmark(req:Request, res:Response) {
    
    // Recupère les getters
    const oldUrl: string = req.query.oldUrl as string // URL à effacer (qui existe en BDD)
    const newUrl: string = req.query.newUrl as string // URL à ajouter (n'existe pas en BDD)
    
    // Reset les objets avant l'extract pour éviter tout problèmes de données persistantes.
    resetData()

    // Methode qui va extraire les données d'un tableau
    extract(newUrl) 
    .then((oembed) => {    
        // Retourne un tableau contenant les données  
        const content = extractDataFromOembed(oembed)
        
        let sql = "UPDATE public.media_content SET "
        sql += "content_type = '"+      content[0].content_type+"', "
        sql += "url = '"+               content[0].url+"', "
        sql += "title = '"+             content[0].title+"', "
        sql += "author_name = '"+       content[0].author_name+"', "
        sql += "upload_date = '"+       content[0].upload_date+"', "
        sql += "publication_date = '"+  content[0].upload_date+"', "
        sql += "thumbnail_url = '"+     content[0].thumbnail_url+"', "
        sql += "thumbnail_width = '"+   content[0].thumbnail_width+"', "
        sql += "thumbnail_height = '"+  content[0].thumbnail_height+"', "
        sql += "width = '"+             content[0].width+"', "
        sql += "height = '"+            content[0].height+"', "
        sql += "duration = '"+          content[0].duration+"' "
        sql += "WHERE url = '"+         oldUrl+"'"

        // Fonction qui run le SQL
        runSQL(sql, res)
        
    }).catch((err) => {
        console.trace(err)
    })
    
}
    
// Delete un bookmark via l'url passé en paramètre
export function deleteBookmark(req:Request, res:Response) {
    
    // Recupère le getter
    const url: string = req.query.url as string
    
    let sql =  "DELETE FROM public.media_content WHERE url = '" + url + "'" // Se base sur l'URL car UNIQUE en BDD.
    
    // Fonction qui run le SQL
    runSQL(sql, res)
}
    
