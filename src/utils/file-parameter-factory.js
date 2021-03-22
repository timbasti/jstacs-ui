import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import {FileInput} from '../components/file-input/component';

const UncontrolledFileInput = ({name, label, defaultFile, helperText, className}) => {
    const {control} = useFormContext();

    const renderInput = () => ({onChange, value}) => {
        const createChangeHandler = (handleChange) => (file) => handleChange(file);
        return (
            <FileInput
                className={className}
                file={value}
                helperText={helperText}
                label={label}
                name={name}
                onChange={createChangeHandler(onChange)}
            />
        );
    };

    return <Controller
        control={control}
        defaultValue={defaultFile}
        name={name}
        render={renderInput()}
    />;
};

export const createFileParameterInput = (parameter, inputItemClasses) => <UncontrolledFileInput
    className={inputItemClasses}
    defaultFile={parameter.fileContents}
    helperText={parameter.comment}
    label={parameter.name}
    name={parameter.name}
/>;
