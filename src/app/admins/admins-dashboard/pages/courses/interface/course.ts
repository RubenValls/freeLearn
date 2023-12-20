export interface Course {
    id?: string;
    name: string;
    description: string;   
    instructorId: [];
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