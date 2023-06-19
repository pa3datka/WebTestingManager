export const useStringHelpers = () => {

    const dotsString = (length: number, text: string): string => {
        return text.length > length ? text.slice(0, (length - 3)) + '...' : text;
    }

    return { dotsString };
}