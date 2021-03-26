import React, {useCallback, useEffect} from 'react';
import {useFormContext} from 'react-hook-form';

import {FileInput} from '../components/file-input/component';
import {requiredValueErrorMessage} from './error-messages';

const UncontrolledFileInput = ({name, label, defaultFile, helperText, className, required}) => {
    const {register, setValue} = useFormContext();

    useEffect(() => {
        register(name, {validate: (file) => Boolean(file && file.name) || requiredValueErrorMessage()});
    }, [name, register]);

    const handleFileChange = useCallback(
        (file) => {
            setValue(name, file);
        },
        [name, setValue]
    );

    return (
        <FileInput
            className={className}
            defaultFile={defaultFile}
            helperText={helperText}
            label={label}
            name={name}
            onChange={handleFileChange}
            required={required}
        />
    );
};

export const createFileParameterInput = (parameter, inputItemClasses) => <UncontrolledFileInput
    className={inputItemClasses}
    defaultFile={parameter.fileContents}
    helperText={parameter.comment}
    label={parameter.name}
    name={parameter.name}
    required={parameter.required}
/>;

