import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {Box, Button, Grid} from '@material-ui/core';
import {selectToolName, selectParameters} from '../../api/test/selectors';
import {thunks as testThunks} from '../../api/test/thunks';
import {createParameterInput} from '../../utils/parameter-factory';
import {useStyles} from './styles';

function getSpaceLessIdentifier(identifier) {
    return identifier.replace(/ /g, '_');
}

export function TestEnvironmentView() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const toolName = useSelector(selectToolName);
    const parameters = useSelector(selectParameters);
    const {
        control,
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const onSubmit = (formData) => {
        if (Object.keys(formData).length > 0) {
            dispatch(testThunks.parameterSet.update(formData));
        }
    };

    useEffect(() => {
        if (!toolName) {
            dispatch(testThunks.parameterSet.fetch());
        }
    }, [toolName, dispatch]);

    return (
        <Box>
            <Box component="p">Dies ist eine Ansicht für Testzwecke</Box>
            <Box component="p">Es wurden Daten für folgendes Tool geladen: {toolName}</Box>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3} alignContent="flex-start" justify="center">
                    {parameters &&
                        parameters.map((parameter) => {
                            const inputItemClasses = classes.inputItem;
                            const gritItemProps =
                                parameter.dataType === 'PARAMETERSET' ? {xs: 12, sm: 12, lg: 9} : {xs: 12, sm: 4, lg: 3};
                            const fieldName = getSpaceLessIdentifier(parameter.name);
                            return (
                                <Grid item {...gritItemProps} key={fieldName}>
                                    {createParameterInput({
                                        ...parameter,
                                        fieldName,
                                        control,
                                        register,
                                        errors,
                                        inputItemClasses
                                    })}
                                </Grid>
                            );
                        })}
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
