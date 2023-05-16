interface Refs {
    value:any
}

export const useValidation = () => {
    const rules = {
        require: (v: string): boolean|string => !!v || 'required field',
        email: (v: string): boolean|string => /.+@.+/.test(v) || 'Enter valid "Email"',
        min8: (v: string): boolean|string => v.length >= 8 || 'The minimum field length is 8 characters',
        min2: (v: string): boolean|string => v.length >= 2 || 'The minimum field length is 2 characters',
        max50: (v: string): boolean|string => v.length < 50 || 'max.len.50',
        passConfirm: (val1: string, val2: string): boolean|string => val1 === val2 || 'no confirm password',
        isTrue: (val: boolean): boolean|string => val || 'not chosen'
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
        el.rules && el.rules.forEach((rule) => {

            let result = rule(el.value);
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

    return { validate, rules }
}