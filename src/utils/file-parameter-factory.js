import React from 'react';
import {Controller} from 'react-hook-form';
import {FileInput} from '../components/file-input/component';

function getSpaceLessIdentifier(identifier) {
    return identifier.replace(/ /g, '_');
}

function FileInputController({
    name,
    fileContents,
    comment,
    control,
    rules,
    required,
    inputItemClasses
}) {
    const spaceLessIdentifier = getSpaceLessIdentifier(name);

    return (
        <Controller
            as={FileInput}
            control={control}
            name={spaceLessIdentifier}
            label={name}
            comment={comment}
            defaultValue={fileContents.fileName ? fileContents.fileName : ''}
            required={required}
            className={inputItemClasses}
            rules={rules}
        />
    );
}

export function fileParameterFactory({required, ...props}) {
    return (
        <FileInputController
            required={required}
            rules={{required: true}}
            {...props}
        />
    );
}
