export const updateObj = (oldObj, updatedProps) => ({
    ...oldObj,
    ...updatedProps
});

export const checkValidity = (val, rules) => {
    let isValid = true;
    if(rules.required){
        isValid = val.trim() !== '' && isValid ;
    }

    if(rules.minLength){
        isValid = val.length >= rules.minLength && isValid;
    }

    if(rules.maxLength){
        isValid = val.length <= rules.maxLength && isValid;
    }

    if(rules.isEmail){
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(val) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(val) && isValid
    }

    return isValid;
}