export default class commonField {
    // 1. Typage des propriétés 
    url?: string
    content_type?: string
    title?: string
    author_name?: string
    upload_date?: string
    publication_date?: string
    thumbnail_url?: string
    thumbnail_width?: number
    thumbnail_height?:  number
    // 2. Définition des valeurs par défaut des propriétés
    constructor(
        url: string ,
        content_type: string,
        title: string,
        author_name: string,
        upload_date: string,
        publication_date: string, 
        thumbnail_url: string,
        thumbnail_width: number,
        thumbnail_height: number,
        ) {
            // 3. Initialisation des propiétés
            this.url = url;
            this.content_type = content_type
            this.title = title;
            this.author_name = author_name;
            this.upload_date = upload_date;
            this.publication_date = publication_date;
            this.thumbnail_url = thumbnail_url;
            this.thumbnail_width = thumbnail_width;
            this.thumbnail_height = thumbnail_height;
        }
    }