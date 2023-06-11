interface Refs {
    value: any
}

export const useValidation = () => {
    const rules = {
        require: (v: string): boolean|string => !!v || 'required field',
        email: (v: string): boolean|string => /.+@.+/.test(v) || 'Enter valid "Email"',
        min8: (v: string): boolean|string => v.length >= 8 || 'The minimum field length is 8 characters',
        min2: (v: string): boolean|string => v.length >= 2 || 'The minimum field length is 2 characters',
        max50: (v: string): boolean|string => v.length < 50 || 'max.len.50',
        passConfirm: (val1: string, val2: string): boolean|string => val1 === val2 || 'no confirm password',
        isTrue: (val: boolean): boolean|string => val || 'not chosen',
        maxNumber10000: (val: number): boolean|string => val <= 10000 || 'max number 10.000',
        maxStringLength1000: (val: string): boolean|string => val.length <= 1000 || 'max text length 1000',
        maxStringLength250: (val: string): boolean|string => val.length <= 250 || 'max text length 250',
        maxStringLength100: (val: string): boolean|string => val.length <= 100 || 'max text length 100',
    }


    const validate = (refs: Refs): boolean => {
        let flag = true;
        refs.value?.rules === undefined && Object.values(refs.value).forEach((el) => {
            switch (true) {
                // @ts-ignore
                case el?.name === 'password_confirmation':
                    let res = passwordConfirmation(el, refs.value.password);
                    !res && (flag = false);
                    break;
                default :
                    !validField(el) && (flag = false);
                    break
            }
        });
        refs.value?.rules !== undefined && !validField(refs.value) && (flag = false);

        return flag;
    }
// @ts-ignore
    const validField = (el): boolean => {
        let flag = true;
        let message = ''
        // @ts-ignore
        el && el.rules && el.rules.forEach((rule) => {
            const value = el.type === 'text' || !el?.type ? (el.value ?? '') : el.value;
            let result = rule(value);
            if (result !== true) {
                message += message.length ? ', ' + result : result;
                el.errorMessage = message;
                flag = false;
            }
        });

        return flag;
    }
    const passwordConfirmation = (confirm: any, password: any): boolean => {
        let result = rules.passConfirm(confirm.value, password.value);
        result !== true && (confirm.errorMessage = result);
        return result === true;
    }

    const validateInput = (el: any) => {
        return validField(el);
    }

    return { validate, rules, validateInput }
}