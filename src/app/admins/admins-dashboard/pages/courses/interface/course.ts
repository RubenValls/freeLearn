export interface Course {
    id?: string;
    name: string;
    description: string;   
    instructorId: string[]; 
    imageUrl: string;
    techs: string[];
    lessons: Lesson[];
    rating: Rating[];
    introductionURL: string;
}

interface Lesson {
    id?: string;
    name: string;       
    videoUrl: string;                   
}

interface Rating {
    userId: string;
    rating: number;
}
