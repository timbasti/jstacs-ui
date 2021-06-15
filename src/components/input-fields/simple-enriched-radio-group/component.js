import PropTypes from 'prop-types';
import React, {useMemo} from 'react';

import {EnrichedRadio} from '../enriched-radio/component';
import {EnrichedRadioGroup} from '../enriched-radio-group/component';

const SimpleEnrichedRadioGroup = ({helperText, label, name, defaultValue, options, required}) => {
    const renderedOptions = useMemo(() => {
        return (
            options?.map(({label: optionLabel, value}) => {
                return <EnrichedRadio
                    key={value}
                    label={optionLabel}
                    name={name}
                    value={value}
                />;
            }) || []
        );
    }, [name, options]);

    return (
        <EnrichedRadioGroup
            defaultValue={defaultValue}
            helperText={helperText}
            label={label}
            name={name}
            required={required}
        >
            {renderedOptions}
        </EnrichedRadioGroup>
    );
};

SimpleEnrichedRadioGroup.propTypes = {
    defaultValue: PropTypes.string,
    helperText: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired
    })),
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

SimpleEnrichedRadioGroup.defaultProps = {
    defaultValue: '',
    helperText: '',
    label: '',
    options: [],
    required: false
};

export {SimpleEnrichedRadioGroup};
