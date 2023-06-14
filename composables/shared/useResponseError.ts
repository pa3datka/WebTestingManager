export const useResponseError = () => {

    const questName = RegExp(/^questions\.([0-9]).*?$/, 'g');
    const getResponseErrors = (error: any) => {
        let errors = <any> {};
        if (error.data?.errors) {
            Object.keys(error.data.errors).forEach(err => {
                const errName = replaceErrorName(err);
                !errors[errName] && (errors[errName] = []);

                error.data.errors[err].forEach((message: string) => {
                    errors[errName].push(message)

                });
            });
        }

        if (!error.data?.errors) {
            errors = { error: error.data?.message };
        }

        return errors;
    };

    const replaceErrorName = (name: string) => {
        const reg = questName;
        const resultQuestions = RegExp(/^questions\.([0-9]).*?$/, 'g').exec(`${name}`);
        if (resultQuestions) {
            return 'question ' + (Number(resultQuestions[1]) + 1);
        }
        console.log(name)
        return name;

    };

    return { getResponseErrors };
};