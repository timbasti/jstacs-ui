import React from 'react';
import {Grid} from '@material-ui/core';
import {ErrorMessage} from '@hookform/error-message';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiFormLabel from '@material-ui/core/FormLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {createParameterInput} from './parameter-factory';
import {requiredSelectionErrorMessage} from './error-messages';
import {withStyles} from '@material-ui/core/styles';

function getSpaceLessIdentifier(identifier) {
    return identifier.replace(/ /g, '_');
}

const queryObject = (object, path) =>
    path
        .split('.')
        .reduce((currentObject, key) => (currentObject && currentObject[key] ? currentObject[key] : undefined), object);

const FormLabel = withStyles({
    root: {
        marginLeft: 14,
        marginRight: 14,
        marginBottom: 3,
        fontSize: 12
    }
})(MuiFormLabel);

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0
        },
        '&:before': {
            display: 'none'
        },
        '&$expanded': {
            marginTop: 'auto',
            marginBottom: 'auto'
        }
    },
    expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56
        }
    },
    content: {
        '&$expanded': {
            margin: '12px 0'
        }
    },
    expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiAccordionDetails);

function FieldsetSelectionInput({selected, className, fieldSets, label, helperText, name, register, error}) {
    const [value, setValue] = React.useState(selected);

    const handleAccordionChange = (newValue) => (event, isExpanded) => {
        setValue(isExpanded ? newValue : null);
    };

    const handleRadioControlClick = (event) => {
        // console.log(event.currentTarget, event.relatedTarget);
        //event.stopPropagation();
        // event.preventDefault();
        // setValue(value !== newValue ? newValue : null);
    };

    const handleRadioChange = (event) => {
        // console.log(event.target.value);
    };

    const handleAccordionSummaryClick = (event) => {
        //console.log(event.preventDefault());
        event.preventDefault();
    };

    return (
        <FormControl className={className} variant="outlined" error={error}>
            <FormLabel required>{label}</FormLabel>
            <RadioGroup name={`${name}.selection`} value={value} onChange={handleRadioChange}>
                {fieldSets &&
                    fieldSets.map((fieldSet) => {
                        return (
                            <Accordion
                                color="red"
                                key={fieldSet.key}
                                TransitionProps={{unmountOnExit: true}}
                                expanded={value === fieldSet.key}
                                onChange={handleAccordionChange(fieldSet.key)}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    id="additional-actions1-header"
                                    onClick={handleAccordionSummaryClick}
                                >
                                    <FormControlLabel
                                        inputRef={register({required: requiredSelectionErrorMessage(), valueAsNumber: true})}
                                        value={fieldSet.key}
                                        control={<Radio />}
                                        label={`selection-${fieldSet.key}`}
                                        onClick={handleRadioControlClick}
                                    />
                                </AccordionSummary>
                                <AccordionDetails>{fieldSet.content}</AccordionDetails>
                            </Accordion>
                        );
                    })}
            </RadioGroup>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
}

function createExtendedSelectionField({parametersInCollection, name, ...otherProps}) {
    const fieldSetName = getSpaceLessIdentifier(name);
    return (
        parametersInCollection &&
        parametersInCollection.map((parameterSet, index) => {
            const parameters = parameterSet.parameters;
            return {
                fieldSetName,
                key: index,
                content: (
                    <Grid container spacing={3} alignContent="flex-start" justify="center">
                        {parameters &&
                            parameters.map((parameter) => {
                                const gritItemProps =
                                    parameter.dataType === 'PARAMETERSET' ? {xs: 12, sm: 12, lg: 9} : {xs: 12, sm: 6, lg: 4};
                                const fieldId = getSpaceLessIdentifier(parameter.name);
                                const fieldName = `${fieldSetName}.${fieldId}`;
                                return (
                                    <Grid item {...gritItemProps} key={fieldName}>
                                        {createParameterInput({
                                            ...parameter,
                                            ...otherProps,
                                            fieldName
                                        })}
                                    </Grid>
                                );
                            })}
                    </Grid>
                )
            };
        })
    );
}

export function createSelectionParameterInput({dataType, parametersInCollection, inputItemClasses, name, errors, ...otherProps}) {
    const testArgs = {
        label: 'Some  fancy label',
        fieldSets: createExtendedSelectionField({
            parametersInCollection,
            inputItemClasses,
            name,
            errors,
            ...otherProps
        }),
        helperText: 'Some fancy helper text'
    };

    switch (dataType) {
        case 'PARAMETERSET':
            return (
                <React.Fragment>
                    <ErrorMessage style={{color: '#f44336'}} name={`${name}.selection`} errors={errors} as="span" />
                    <FieldsetSelectionInput
                        {...testArgs}
                        {...otherProps}
                        className={inputItemClasses}
                        name={name}
                        error={!!queryObject(errors, `${name}.selection`)}
                    />
                </React.Fragment>
            );
        default:
            break;
    }
}
