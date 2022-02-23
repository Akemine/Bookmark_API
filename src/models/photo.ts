export default class Photo {
    // 1. Typage des propriétés d'une photo
    width?: number
    height?: number
    // 2. Définition des valeurs par défaut des propriétés d'une photo
    constructor(
        width: number,
        height: number
        ) 
        {
            // 3. Initialisation des propiétés d'une photo
            this.width = width;
            this.height = height;
        }
    }