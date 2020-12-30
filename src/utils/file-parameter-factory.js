import React from 'react';
import {Controller} from 'react-hook-form';
import {FileInput} from '../components/file-input/component';

function getSpaceLessIdentifier(identifier) {
    return identifier.replace(/ /g, '_');
}

function createFileInput({
    name,
    fileContents,
    comment,
    control,
    rules,
    required,
    inputItemClasses
}) {
    const spaceLessIdentifier = getSpaceLessIdentifier(name);

    // TODO: Remove Controller if possible
    return (
        <Controller
            as={FileInput}
            control={control}
            name={spaceLessIdentifier}
            label={name}
            comment={comment}
            fileName={fileContents.fileName ? fileContents.fileName : ''}
            required={required}
            className={inputItemClasses}
            rules={rules}
        />
    );
}

export function createFileParameterInput({required, ...props}) {
    return createFileInput({
        required,
        rules: {required},
        ...props
    });
}
