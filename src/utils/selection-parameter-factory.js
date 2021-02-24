/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/jsx-no-bind */
import {ErrorMessage} from '@hookform/error-message';
import {Grid} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React, {useCallback, useRef} from 'react';
import {Controller} from 'react-hook-form';

import {createParameterInput} from './parameter-factory';

const getSpaceLessIdentifier = (identifier) => identifier.replace(/ /gu, '_');

const queryObject = (object, path) => path
    .split('.')
    .reduce((currentObject, key) => (currentObject && currentObject[key] ? currentObject[key] : undefined), object);

const FieldSetSelectionItem = ({fieldSet, expanded, index, register, selectionListName}) => {
    console.log('FieldSetSelectionItem', expanded);
    const radioRef = useRef(null);

    const handleAccordionSummaryClick = useCallback(() => {
        radioRef.current.click();
        radioRef.current.focus();
    }, [radioRef]);

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
                    control={<Radio />}
                    inputRef={radioRef}
                    label={fieldSet.name}
                    value={fieldSet.name}
                />

                <input
                    name={`${selectionListName}.selected`}
                    ref={register({valueAsNumber: true})}
                    type="hidden"
                    value={index}
                />
            </AccordionSummary>

            <AccordionDetails>
                {fieldSet.content}
            </AccordionDetails>
        </Accordion>
    );
};

FieldSetSelectionItem.propTypes = {
    expanded: PropTypes.bool,
    fieldSet: PropTypes.shape().isRequired,
    index: PropTypes.number.isRequired,
    register: PropTypes.func.isRequired,
    selectionListName: PropTypes.string.isRequired
};

FieldSetSelectionItem.defaultProps = {expanded: false};

const createFieldsetSelectionList = ({fieldSets, value, register, selectionListName}) => {
    console.log('createFieldsetSelectionList', value);
    const fieldsetSelectionList =
        fieldSets &&
        fieldSets.map((fieldSet, index) => <FieldSetSelectionItem
            expanded={value === fieldSet.name}
            fieldSet={fieldSet}
            index={index}
            key={fieldSet.name}
            register={register}
            selectionListName={selectionListName}
        />);
    return fieldsetSelectionList;
};

const createRadioGroupChangedHandler = (onChange) => (changeEvent) => {
    console.log('createRadioGroupChangedHandler', typeof changeEvent.target.value);
    return onChange(changeEvent.target.value);
};

const renderRadioGroup = ({fieldSets, register, selectionListName}) => ({onChange, value}) => {
    const handleCheckedChange = createRadioGroupChangedHandler(onChange);
    const radioGroup =
        <RadioGroup
            onChange={handleCheckedChange}
            value={value}
        >
            {createFieldsetSelectionList({
                fieldSets,
                register,
                selectionListName,
                value
            })}
        </RadioGroup>;
    return radioGroup;
};

const fieldsetSelectionInput = ({
    control,
    selectedName,
    className,
    fieldSets,
    label,
    helperText,
    name,
    error,
    register,
    selectionListName
}) => {
    console.log('fieldsetSelectionInput', selectedName);
    const selectionInput =
        <FormControl
            className={className}
            error={error}
        >
            <FormLabel required>
                {label}
            </FormLabel>

            <Controller
                control={control}
                defaultValue={selectedName}
                name={name}
                render={renderRadioGroup({
                    fieldSets,
                    register,
                    selectionListName
                })}
                rules={{required: true}}
            />

            <FormHelperText>
                {helperText}
            </FormHelperText>
        </FormControl>;
    return selectionInput;
};

const createParameterInputFields = ({selectionName, parameters, inputItemClasses, register, control, errors}) => parameters &&
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
        const fieldId = getSpaceLessIdentifier(parameter.name);
        const fieldName = `${selectionName}.${fieldId}`;
        return (
            <Grid
                item
                key={fieldName}
                lg={gritItemProps.lg}
                sm={gritItemProps.sm}
                xs={gritItemProps.xs}
            >
                {createParameterInput({
                    ...parameter,
                    control,
                    errors,
                    fieldName,
                    inputItemClasses,
                    register
                })}
            </Grid>
        );
    });

const createExtendedSelectionField = ({parametersInCollection, name, control, errors, register, inputItemClasses}) => {
    const selectionParameters = parametersInCollection && parametersInCollection.parameters || [];
    const selectionName = getSpaceLessIdentifier(name);
    return selectionParameters.map((selectionParameter, index) => {
        const fieldSetName = selectionParameter.name;
        const {parameters} = selectionParameter.value;
        return {
            content:
    <Grid
        alignContent="flex-start"
        container
        justify="center"
        spacing={3}
    >
        {createParameterInputFields({
            control,
            errors,
            inputItemClasses,
            parameters,
            register,
            selectionName
        })}
    </Grid>,
            name: fieldSetName
        };
    });
};

export const createSelectionForParameterSet = ({
    control,
    errors,
    name,
    inputItemClasses,
    selectedName,
    fieldSets,
    label,
    helperText,
    register
}) => {
    const fieldSelectionInput =
        <>
            <ErrorMessage
                as="span"
                errors={errors}
                name={`${name}.selected`}
                style={{color: '#f44336'}}
            />

            {fieldsetSelectionInput({
                className: inputItemClasses,
                control,
                error: Boolean(queryObject(errors, `${name}.selectedName`)),
                fieldSets,
                helperText,
                label,
                name: `${name}.selectedName`,
                register,
                selectedName,
                selectionListName: name
            })}
        </>;
    return fieldSelectionInput;
};

export const createSelectionParameterInput = ({
    dataType,
    parametersInCollection,
    inputItemClasses,
    name,
    errors,
    register,
    selectedName,
    control,
    ...otherProps
}) => {
    const testArgs = {
        fieldSets: createExtendedSelectionField({
            control,
            errors,
            inputItemClasses,
            name,
            parametersInCollection,
            register,
            ...otherProps
        }),
        helperText: 'Some fancy helper text',
        label: 'Some  fancy label'
    };

    switch (dataType) {
    case 'PARAMETERSET':
        return createSelectionForParameterSet({
            control,
            errors,
            inputItemClasses,
            name,
            register,
            selectedName,
            ...testArgs
        });
    default:
        return undefined;
    }
};
