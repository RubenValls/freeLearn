export interface Course {
    id?: string;
    name: string;
    description: string;   
    instructor: string;
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