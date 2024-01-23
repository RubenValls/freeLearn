export const randomArray = (array: any[], n: number) => {
    const shuffledArray = array.sort(() => 0.5 - Math.random()); 
    return shuffledArray.slice(0, n);
};