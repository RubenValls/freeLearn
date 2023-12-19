export interface Instructor {
    id?: string;
    name: string;
    socialMedia: {
        web: string | null,
        youtube: string | null,
        twitter: string | null,
        linkedin: string | null,
    };
    courses:any[];
}