import React from 'react';
import {Controller} from 'react-hook-form';

import {FileInput} from '../components/file-input/component';

const getSpaceLessIdentifier = (identifier) => identifier.replace(/ /gu, '_');

const handleFileChange = (onChange) => (file) => onChange(file);

const renderInput = ({comment, inputItemClasses, name, spaceLessIdentifier}) => ({onChange, value}) => <FileInput
    className={inputItemClasses}
    comment={comment}
    label={name}
    name={spaceLessIdentifier}
    onChange={handleFileChange(onChange)}
    value={value}
/>;

const createControlledFileInput = ({name, fileContents, comment, control, inputItemClasses}) => {
    const spaceLessIdentifier = getSpaceLessIdentifier(name);

    return (
        <Controller
            control={control}
            defaultValue={{name: fileContents.fileName}}
            name={spaceLessIdentifier}
            render={renderInput({
                comment,
                inputItemClasses,
                name,
                spaceLessIdentifier
            })}
        />
    );
};

export const createFileParameterInput = (props) => createControlledFileInput(props);
