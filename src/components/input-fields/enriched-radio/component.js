import {FormControlLabel, Radio} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const EnrichedRadio = ({label, value, inputRef}) => {
    return <FormControlLabel
        control={<Radio />}
        inputRef={inputRef}
        label={label}
        value={value}
    />;
};

EnrichedRadio.propTypes = {
    inputRef: PropTypes.shape({current: PropTypes.instanceOf(Element)}),
    label: PropTypes.string,
    value: PropTypes.string.isRequired
};

EnrichedRadio.defaultProps = {
    inputRef: undefined,
    label: ''
};

export {EnrichedRadio};
