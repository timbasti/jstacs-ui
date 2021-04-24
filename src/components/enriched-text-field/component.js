import {TextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import {useFormContext} from 'react-hook-form';

const EnrichedTextField = ({helperText, label, name, placeholder, required}) => {
    const {register} = useFormContext();

    const inputRegistration = useMemo(() => {
        return register(name, {required});
    }, [name, register, required]);

    return (
        <TextField
            fullWidth
            helperText={helperText}
            inputRef={inputRegistration}
            label={label}
            placeholder={placeholder}
            required
            variant="filled"
        />
    );
};

EnrichedTextField.propTypes = {
    helperText: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool
};

EnrichedTextField.defaultProps = {
    helperText: '',
    placeholder: '',
    required: false
};

export {EnrichedTextField};
