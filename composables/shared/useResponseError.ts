export const useResponseError = () => {

    const getErrors = (data: any): string[]|[] => {
        let messages = [];
        if (!(data.errors ?? null)) {
            return ['server.error']
        }

        typeof data.errors === 'object' && Object.values(data.errors).forEach(err => {
            Array.isArray(err) && err.forEach((message: string) => messages.push(message));
        });

        Array.isArray(data.errors) && data.errors.forEach((message: string) => messages.push(message));
        typeof data.errors === 'string' && messages.push(data.errors);

        return messages;
    };

    return { getErrors };
};