import { useState } from 'react';

export function useInput(inputValues) {

    const [values, setValues] = useState(inputValues);
    const onChange = (e) => {
        const {value, name} = e.target;
        setValues({...values, [name]: value});
    };

    return { values, setValues, onChange }
}


