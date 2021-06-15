import {RadioGroup} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react';

const UncontrolledRadioGroup = ({children, defaultValue, onChange}) => {
    const [value, setValue] = React.useState(defaultValue);

    const handleChange = useCallback(
        (event) => {
            setValue(event.target.value);
            onChange(event);
        },
        [onChange]
    );

    return (
        <RadioGroup
            onChange={handleChange}
            value={value}
        >
            {children}
        </RadioGroup>
    );
};

UncontrolledRadioGroup.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func
};

UncontrolledRadioGroup.defaultProps = {
    defaultValue: '',
    onChange: () => {}
};

export {UncontrolledRadioGroup};
