export interface Course {
    id?: string;
    name: string;
    description: string;   
    instructorId: Instructor[]; 
    imageUrl: string;
    techs: Tech[];
    lessons: Lesson[];
    rating: Rating[];
    introductionURL: string;
}

export interface Lesson {
    id?: string;
    name: string;       
    videoUrl: string;                   
}

export interface Rating {
    userId: string;
    rating: number;
}

export interface Tech {
    id: string,
    name: string,
}


export interface Instructor {
    id: string,
    name: string,
}