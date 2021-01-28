import React from 'react';
import {Controller} from 'react-hook-form';
import {FileInput} from '../components/file-input/component';

function getSpaceLessIdentifier(identifier) {
    return identifier.replace(/ /g, '_');
}

function createFileInput({name, fileContents, comment, control, inputItemClasses}) {
    const spaceLessIdentifier = getSpaceLessIdentifier(name);

    return (
        <Controller
            control={control}
            name={spaceLessIdentifier}
            defaultValue={{name: fileContents.fileName}}
            render={({onChange, value}) => (
                <FileInput
                    name={spaceLessIdentifier}
                    onChange={(file) => onChange(file)}
                    value={value}
                    label={name}
                    comment={comment}
                    className={inputItemClasses}
                />
            )}
        />
    );
}

export function createFileParameterInput(props) {
    return createFileInput(props);
}
