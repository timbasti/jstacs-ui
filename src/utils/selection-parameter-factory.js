import {ErrorMessage} from '@hookform/error-message';
import {makeStyles, MenuItem, TextField, withStyles} from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoIcon from '@material-ui/icons/Info';
import PropTypes from 'prop-types';
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import {createParameterInput} from './parameter-factory';

const RadioGroupContext = React.createContext();

const queryObject = (object, path) => path
    .split('.')
    .reduce((currentObject, key) => (currentObject && currentObject[key] ? currentObject[key] : undefined), object);

const HiddenInput = ({name, value}) => {
    const {register} = useFormContext();

    return <input
        name={name}
        ref={register({valueAsNumber: true})}
        type="hidden"
        value={value}
    />;
};

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

const RadioControlledAccordion = ({radioLabel, radioValue, children}) => {
    const radioRef = useRef(null);
    const [expanded, expand] = useState(false);
    const currentSelectedValue = useContext(RadioGroupContext);

    useEffect(() => {
        const istSelected = radioValue === currentSelectedValue;
        expand(istSelected);
    }, [currentSelectedValue, expand, radioValue]);

    const handleAccordionSummaryClick = useCallback(
        (clickEvent) => {
            radioRef.current.click();
            radioRef.current.focus();
            clickEvent.stopPropagation();
            clickEvent.preventDefault();
        },
        [radioRef]
    );

    const handleRadioChanged = useCallback(() => {
        expand(radioRef.current.checked);
    }, [expand, radioRef]);

    return (
        <Accordion
            TransitionProps={{unmountOnExit: true}}
            expanded={expanded}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="additional-actions1-header"
                onClick={handleAccordionSummaryClick}
            >
                <FormControlLabel
                    control={<Radio onChange={handleRadioChanged} />}
                    inputRef={radioRef}
                    label={radioLabel}
                    value={radioValue}
                />
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

RadioControlledAccordion.propTypes = {
    children: PropTypes.node.isRequired,
    radioLabel: PropTypes.string.isRequired,
    radioValue: PropTypes.string.isRequired
};

const RadioGroup = withStyles({root: {display: 'block'}})(MuiRadioGroup);

const UncontrolledRadioGroup = ({children, defaultSelected, name}) => {
    const {control} = useFormContext();

    const renderRadioGroup = () => ({onChange, value}) => {
        const createChangeHanlder = (handleChange) => (changeEvent) => handleChange(changeEvent.target.value);
        const radioGroup =
            <RadioGroupContext.Provider value={value}>
                <RadioGroup
                    onChange={createChangeHanlder(onChange)}
                    value={value}
                >
                    {children}
                </RadioGroup>
            </RadioGroupContext.Provider>;
        return radioGroup;
    };

    return (
        <Controller
            control={control}
            defaultValue={defaultSelected}
            name={name}
            render={renderRadioGroup()}
            rules={{required: true}}
        />
    );
};

const createFieldsetSelectionList = (inputSets, listName) => {
    const fieldsetSelectionList =
        inputSets &&
        inputSets.map((inputSet, index) => <RadioControlledAccordion
            key={inputSet.name}
            radioLabel={inputSet.name}
            radioValue={inputSet.name}
        >
            {inputSet.content}
        </RadioControlledAccordion>);
    return fieldsetSelectionList;
};

const useSetSelectionStyles = makeStyles((theme) => ({
    SetSelectionHint: {padding: '0 16px'},
    SetSelectionLabel: {fontSize: '12px'}
}));

const InputSetSelection = ({defaultSelected, className, inputSets, label, helperText, name}) => {
    const {errors} = useFormContext();
    const hasError = Boolean(queryObject(errors, name));
    const classes = useSetSelectionStyles();

    return (
        <FormControl
            className={className}
            error={hasError}
        >
            <ErrorMessage
                as="span"
                errors={errors}
                name={name}
                style={{color: '#f44336'}}
            />
            <FormLabel
                className={`${classes.SetSelectionHint} ${classes.SetSelectionLabel}`}
                required
            >
                {label}
            </FormLabel>
            <UncontrolledRadioGroup
                defaultSelected={defaultSelected}
                name={name}
            >
                {createFieldsetSelectionList(inputSets)}
            </UncontrolledRadioGroup>
            <FormHelperText className={classes.SetSelectionHint}>
                {helperText}
            </FormHelperText>
        </FormControl>
    );
};

const createParameterInputFields = ({selectionName, parameters, inputItemClasses}) => {
    // TODO: Calculate grid properties
    // eslint-disable-next-line no-unused-vars
    const numberOfParameters = 0;
    const parentPath = `${selectionName}.parameterSetValues`;
    return (
        parameters &&
        parameters.map((parameter) => {
            const gritItemProps =
                parameter.dataType === 'PARAMETERSET'
                    ? {
                        lg: 9,
                        sm: 12,
                        xs: 12
                    }
                    : {
                        lg: 4,
                        sm: 6,
                        xs: 12
                    };
            const fieldId = parameter.name;
            const fieldName = `${selectionName}.${fieldId}`;
            return (
                <Grid
                    item
                    key={fieldName}
                    lg={gritItemProps.lg}
                    sm={gritItemProps.sm}
                    xs={gritItemProps.xs}
                >
                    {createParameterInput(parameter, inputItemClasses, parentPath)}
                </Grid>
            );
        })
    );
};

const createExtendedSelectionField = ({parametersInCollection, name}, inputItemClasses) => {
    const selectionParameters = parametersInCollection && parametersInCollection.parameters || [];
    const selectionName = name;
    return selectionParameters.map((selectionParameter) => {
        const fieldSetName = selectionParameter.name;
        const {parameters} = selectionParameter.value;
        return {
            content:
    <Grid
        alignContent="flex-start"
        container
        justify="center"
        spacing={5}
    >
        {createParameterInputFields({
            inputItemClasses,
            parameters,
            selectionName
        })}
    </Grid>,
            name: fieldSetName
        };
    });
};

export const createSelectionForParameterSets = (parameter, inputItemClasses) => {
    const inputSets = createExtendedSelectionField(parameter, inputItemClasses);
    const setSelectionName = `${parameter.name}.selectedName`;
    const inputSetSelection =
        <InputSetSelection
            className={inputItemClasses}
            defaultSelected={parameter.selectedName}
            helperText={parameter.comment}
            inputSets={inputSets}
            label={parameter.name}
            name={setSelectionName}
        />;
    return inputSetSelection;
};

const UncontrolledSimpleSelect = ({className, defaultSelected, helperText, label, name, options}) => {
    const {control} = useFormContext();

    const renderOptions = useCallback(
        () => options.map(({key}) => <MenuItem
            key={key}
            value={key}
        >
            {key}
        </MenuItem>),
        [options]
    );

    const renderOptionsDescription = useCallback(
        () => options.map(({key, value}) => <Typography
            component="div"
            key={key}
            variant="caption"
        >
            {key === value ? key : `${key}: ${value}`}
        </Typography>),
        [options]
    );

    const renderSelect = useCallback(
        ({onChange, value}) => {
            const createChangeHanlder = (handleChange) => (changeEvent) => handleChange(changeEvent.target.value);
            return (
                <TextField
                    className={className}
                    helperText={
                        <>
                            <Typography
                                style={{
                                    marginRight: 5,
                                    verticalAlign: 'middle'
                                }}
                                variant="caption"
                            >
                                {helperText}
                            </Typography>
                            <Tooltip
                                enterTouchDelay={0}
                                title={
                                    <>
                                        <Typography>
                                            The following options are available.
                                        </Typography>
                                        {renderOptionsDescription()}
                                    </>
                                }
                            >
                                <InfoIcon
                                    style={{
                                        fontSize: 15,
                                        verticalAlign: 'middle'
                                    }}
                                />
                            </Tooltip>
                        </>
                    }
                    label={label}
                    onChange={createChangeHanlder(onChange)}
                    select
                    value={value}
                    variant="filled"
                >
                    {renderOptions()}
                </TextField>
            );
        },
        [className, helperText, label, renderOptions, renderOptionsDescription]
    );

    return <Controller
        control={control}
        defaultValue={defaultSelected}
        name={name}
        render={renderSelect}
    />;
};

const createSimpleParameterSelection = (parameter, inputItemClasses) => {
    const {
        comment,
        name,
        parametersInCollection: {parameters},
        selectedName
    } = parameter;

    const selectionName = `${name}.selectedName`;

    const options = parameters.map(({name: optionName, value}) => ({
        key: optionName,
        value
    }));

    return (
        <UncontrolledSimpleSelect
            className={inputItemClasses}
            defaultSelected={selectedName}
            helperText={comment}
            label={name}
            name={selectionName}
            options={options}
        />
    );
};

export const createSelectionParameterInput = (parameter, inputItemClasses) => {
    switch (parameter.dataType) {
    case 'PARAMETERSET':
        return createSelectionForParameterSets(parameter, inputItemClasses);
    default:
        return createSimpleParameterSelection(parameter, inputItemClasses);
    }
};
