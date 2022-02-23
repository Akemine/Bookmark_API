"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class commonField {
    // 2. Définition des valeurs par défaut des propriétés
    constructor(url, content_type, title, author_name, upload_date, publication_date, thumbnail_url, thumbnail_width, thumbnail_height) {
        // 3. Initialisation des propiétés
        this.url = url;
        this.content_type = content_type;
        this.title = title;
        this.author_name = author_name;
        this.upload_date = upload_date;
        this.publication_date = publication_date;
        this.thumbnail_url = thumbnail_url;
        this.thumbnail_width = thumbnail_width;
        this.thumbnail_height = thumbnail_height;
    }
}
exports.default = commonField;
