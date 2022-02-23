export default class Video {
    // 1. Typage des propriétés d'une vidéo
    duration?: number
    width?: number
    height?: number
    
    // 2. Définition des valeurs par défaut des propriétés d'une vidéo
    constructor(
        duration: number,
        width: number,
        height: number
        ) {
            // 3. Initialisation des propiétés d'une vidéo
            this.duration = duration;
            this.width = width;
            this.height = height;
        }
    }