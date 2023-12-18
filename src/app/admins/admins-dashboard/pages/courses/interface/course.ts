export interface Course {
    uid: string;
    name: string;
    description: string;   
    imageUrl: string;
    techs: [];
    lessons: [
        {
            id: string;
            name: string;       
            videoUrl: string;                   
        }
    ];   
}    