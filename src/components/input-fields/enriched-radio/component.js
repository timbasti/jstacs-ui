import {FormControlLabel, Radio} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const EnrichedRadio = ({inputRef, label, value, onChange}) => {
    return (
        <FormControlLabel
            control={<Radio />}
            inputRef={inputRef}
            label={label}
            onChange={onChange}
            value={value}
        />
    );
};

EnrichedRadio.propTypes = {
    inputRef: PropTypes.shape({current: PropTypes.instanceOf(Element)}),
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired
};

EnrichedRadio.defaultProps = {
    inputRef: undefined,
    label: '',
    onChange: () => {}
};

export {EnrichedRadio};
