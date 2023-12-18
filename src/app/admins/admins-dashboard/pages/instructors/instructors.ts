export interface Instructor {
    name: string;
    socialMedia: {
        web: string | null,
        youtube: string | null,
        twitter: string | null,
        linkedin: string | null,
    };
    courses:[];
}