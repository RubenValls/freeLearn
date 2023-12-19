export interface Course {
    id?: string;
    name: string;
    description: string;   
    imageUrl: string;
    techs: [];
    lessons: [
        {
            id?: string;
            name: string;       
            videoUrl: string;                   
        }
    ];   
}    