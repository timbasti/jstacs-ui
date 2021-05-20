import {RadioGroup} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import {useController, useFormContext} from 'react-hook-form';

const UncontrolledRadioGroup = ({name, defaultValue, children, required}) => {
    const {control} = useFormContext();

    const {field: {...fieldProps}} = useController({
        control,
        defaultValue,
        name: `${name}.selected`,
        rules: {required}
    });

    return <RadioGroup {...fieldProps}>
        {children}
    </RadioGroup>;
};

UncontrolledRadioGroup.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    defaultValue: PropTypes.string,
    name: PropTypes.string.isRequired,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

UncontrolledRadioGroup.defaultProps = {
    defaultValue: '',
    required: false
};

export {UncontrolledRadioGroup};
