import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useFormContext, useWatch} from 'react-hook-form';

import {readFile} from '../../../helpers/file-helpers';
import {EnrichedSelectField} from '../enriched-select-field/component';

const DataColumnField = ({name, defaultValue, fileFieldName, label, required, placeholder, helperText}) => {
    const [options, setOptions] = useState();
    const {control, setValue} = useFormContext();
    const selectedFile = useWatch({
        control,
        name: fileFieldName
    });

    useEffect(() => {
        if (!selectedFile) {
            return;
        }

        readFile(selectedFile, (fileContent) => {
            const header = fileContent.split('\n')[0];
            const columns = header.split('\t');
            const readColumns = columns.map((column, index) => ({
                label: column,
                value: index
            }));
            setOptions(readColumns);
            setValue(name, defaultValue, {shouldValidate: true});
        });
    }, [defaultValue, name, selectedFile, setValue]);

    return (
        <EnrichedSelectField
            helperText={helperText}
            label={label}
            name={name}
            options={options}
            placeholder={placeholder}
            required={required}
            showEnrichedHelperText
        />
    );
};

DataColumnField.propTypes = {
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fileFieldName: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

DataColumnField.defaultProps = {
    defaultValue: '',
    helperText: '',
    placeholder: '',
    required: false
};

export {DataColumnField};
