import {FormControl, FormHelperText, FormLabel} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useRef} from 'react';

import {ErrorNotification} from '../../notifications';
import {UncontrolledRadioGroup} from '../uncontrolled-radio-group/component';
import {useEnrichedRadioGroupStyles} from './styles';

const EnrichedRadioGroup = ({helperText, label, name, defaultValue, children, required}) => {
    const rootRef = useRef();
    const classes = useEnrichedRadioGroupStyles();

    return (
        <FormControl
            component="fieldset"
            fullWidth
            ref={rootRef}
        >
            <ErrorNotification
                anchorEl={rootRef?.current}
                name={name}
            />
            <FormLabel
                className={classes.label}
                component="legend"
            >
                {label}
            </FormLabel>
            <UncontrolledRadioGroup
                defaultValue={defaultValue}
                name={name}
                required={required}
            >
                {children}
            </UncontrolledRadioGroup>
            <FormHelperText variant="outlined">
                {helperText}
            </FormHelperText>
        </FormControl>
    );
};

EnrichedRadioGroup.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    defaultValue: PropTypes.string,
    helperText: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

EnrichedRadioGroup.defaultProps = {
    defaultValue: '',
    helperText: '',
    label: '',
    required: false
};

export {EnrichedRadioGroup};
