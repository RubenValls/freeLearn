export interface Course {
    id?: string;
    name: string;
    description: string;   
    instructorId: string[]; 
    imageUrl: string;
    techs: string[];
    lessons: Lesson[];
}

interface Lesson {
    id?: string;
    name: string;       
    videoUrl: string;                   
}
