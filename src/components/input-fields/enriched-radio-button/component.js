import {FormControl, FormControlLabel, Radio} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import {useController, useFormContext} from 'react-hook-form';

const UncontrolledRadioButton = ({name, defaultChecked}) => {
    const {control} = useFormContext();

    const {field: {ref, ...fieldProps}} = useController({
        control,
        defaultValue: defaultChecked,
        name
    });

    return <Radio
        inputRef={ref}
        {...fieldProps}
    />;
};

UncontrolledRadioButton.propTypes = {
    defaultChecked: PropTypes.bool,
    name: PropTypes.string.isRequired
};

UncontrolledRadioButton.defaultProps = {defaultChecked: false};

const EnrichedRadioButton = ({label, name, defaultChecked}) => {
    const formControl = useMemo(() => {
        return <UncontrolledRadioButton
            defaultChecked={defaultChecked}
            name={name}
        />;
    }, [defaultChecked, name]);

    return (
        <FormControl fullWidth>
            <FormControlLabel
                control={formControl}
                label={label}
            />
        </FormControl>
    );
};

EnrichedRadioButton.propTypes = {
    defaultChecked: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string.isRequired
};

EnrichedRadioButton.defaultProps = {
    defaultChecked: false,
    label: ''
};

export {EnrichedRadioButton};
