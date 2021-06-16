import {withStyles} from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import {ExpandMore} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useFormContext, useWatch} from 'react-hook-form';

import {EnrichedRadio} from '../enriched-radio/component';
import {EnrichedRadioGroup} from '../enriched-radio-group/component';

const Accordion = withStyles({
    expanded: {},
    root: {
        '&$expanded': {margin: 'auto'},
        '&:before': {display: 'none'},
        '&:not(:last-child)': {borderBottom: 0},
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        width: '100%'
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

const AccordionDetails = withStyles((theme) => ({root: {padding: theme.spacing(2)}}))(MuiAccordionDetails);

const SelectableAccordion = ({expanded, label, value, children, onChange}) => {
    const radioRef = useRef();

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

    const handleChange = useCallback(() => {
        onChange(value);
    }, [onChange, value]);

    const handleSummaryClick = useCallback((clickEvent) => {
        clickEvent.preventDefault();
        if (clickEvent.target !== radioRef.current) {
            radioRef.current.click();
        }
    }, []);

    return (
        <Accordion
            TransitionProps={{unmountOnExit: true}}
            expanded={expanded}
        >
            <AccordionSummary
                expandIcon={renderedExpandIcon}
                onClick={handleSummaryClick}
            >
                <EnrichedRadio
                    inputRef={radioRef}
                    label={label}
                    onChange={handleChange}
                    value={value}
                />
            </AccordionSummary>
            {renderedDetails}
        </Accordion>
    );
};

const FieldsetSelectField = ({helperText, label, name, defaultValue, options, required}) => {
    const [selected, setSelected] = useState(defaultValue);

    const handleRadioChange = useCallback((changeEvent) => {
        setSelected(changeEvent.target.value);
    }, []);

    const handleAccordionChange = useCallback((newSelectedValue) => {
        setSelected(newSelectedValue);
    }, []);

    const renderedOptions = useMemo(() => {
        return (
            options?.map(({label: optionLabel, value, content}) => {
                return (
                    <SelectableAccordion
                        expanded={selected === value}
                        key={value}
                        label={optionLabel}
                        onChange={handleAccordionChange}
                        value={value}
                    >
                        {content}
                    </SelectableAccordion>
                );
            }) || []
        );
    }, [handleAccordionChange, options, selected]);

    return (
        <EnrichedRadioGroup
            defaultValue={defaultValue}
            helperText={helperText}
            label={label}
            name={name}
            onChange={handleRadioChange}
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
        content: PropTypes.any,
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
