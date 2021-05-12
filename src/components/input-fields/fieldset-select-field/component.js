import {withStyles} from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import {ExpandMore} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, {useCallback, useMemo, useRef} from 'react';
import {useFormContext, useWatch} from 'react-hook-form';

import {EnrichedRadio} from '../enriched-radio/component';
import {EnrichedRadioGroup} from '../enriched-radio-group/component';

const Accordion = withStyles({
    expanded: {},
    root: {
        '&$expanded': {margin: 'auto 0'},
        '&:before': {display: 'none'},
        '&:not(:last-child)': {borderBottom: 0},
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none'
    }
})(MuiAccordion);

const AccordionSummary = withStyles({
    content: {'&$expanded': {margin: '12px 0'}},
    expanded: {},
    root: {
        '&$expanded': {minHeight: 56},
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56
    }
})(MuiAccordionSummary);

const AccordionDetails = withStyles({root: {padding: 20}})(MuiAccordionDetails);

const SelectableAccordion = ({defaultValue, name, label, value, children}) => {
    const inputRef = useRef();
    const {control, setValue} = useFormContext();
    const selectedValue = useWatch({
        control,
        defaultValue,
        name
    });

    const handleSummaryClick = useCallback(
        (clickEvent) => {
            if (inputRef?.current !== clickEvent.target) {
                clickEvent.preventDefault();
                setValue(name, value, {shouldValidate: true});
            }
        },
        [name, setValue, value]
    );

    const renderedDetails = useMemo(() => {
        if (children) {
            return <AccordionDetails>
                {children}
            </AccordionDetails>;
        }
        return undefined;
    }, [children]);

    const renderedExpandIcon = useMemo(() => {
        if (children) {
            return <ExpandMore />;
        }
        return undefined;
    }, [children]);

    return (
        <Accordion
            TransitionProps={{unmountOnExit: true}}
            expanded={selectedValue === value}
        >
            <AccordionSummary
                expandIcon={renderedExpandIcon}
                onClick={handleSummaryClick}
            >
                <EnrichedRadio
                    inputRef={inputRef}
                    label={label}
                    value={value}
                />
            </AccordionSummary>
            {renderedDetails}
        </Accordion>
    );
};

const FieldsetSelectField = ({helperText, label, name, defaultValue, options, required}) => {
    const renderedOptions = useMemo(() => {
        return (
            options?.map(({label: optionLabel, value, content}) => {
                return (
                    <SelectableAccordion
                        defaultValue={defaultValue}
                        key={value}
                        label={optionLabel}
                        name={name}
                        value={value}
                    >
                        {content}
                    </SelectableAccordion>
                );
            }) || []
        );
    }, [defaultValue, name, options]);

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

FieldsetSelectField.propTypes = {
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

FieldsetSelectField.defaultProps = {
    defaultValue: '',
    helperText: '',
    label: '',
    options: [],
    required: false
};

export {FieldsetSelectField};
