export const randomArray = (array: any[], n: number) => {
    const shuffledArray = array.sort(() => 0.5 - Math.random()); // Desordenar el array
    return shuffledArray.slice(0, n); // Tomar los primeros n elementos
};