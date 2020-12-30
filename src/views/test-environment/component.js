import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {Box, Button} from '@material-ui/core';
import {selectToolName, selectParameters} from '../../api/test/selectors';
import {thunks as testThunks} from '../../api/test/thunks';
import {createParameterInput} from '../../utils/parameter-factory';
import {useStyles} from './styles';

export function TestEnvironmentView() {
    const [formData, setFormData] = useState({});
    const classes = useStyles();
    const dispatch = useDispatch();
    const toolName = useSelector(selectToolName);
    const parameters = useSelector(selectParameters);
    const {control, register, handleSubmit} = useForm({
        defaultValues: {}
    });

    const onSubmit = (submitFormData) => {
        console.log(submitFormData);
        setFormData(submitFormData);
    };

    useEffect(() => {
        if (!toolName) {
            dispatch(testThunks.parameterSet.fetch());
        }
    }, [toolName, dispatch]);

    useEffect(() => {
        if (Object.keys(formData).length > 0) {
            dispatch(testThunks.parameterSet.update(formData));
        }
    }, [formData, dispatch]);

    return (
        <Box>
            <Box component="p">Dies ist eine Ansicht für Testzwecke</Box>
            <Box component="p">
                Es wurden Daten für folgendes Tool geladen: {toolName}
            </Box>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                {parameters &&
                    parameters.map((parameter) => {
                        const inputItemClasses = classes.inputItem;
                        const formItemFieldClasses = `${classes.formItem} ${classes.formField}`;
                        return (
                            <Box
                                className={formItemFieldClasses}
                                key={parameter.name}
                            >
                                {createParameterInput({
                                    ...parameter,
                                    control,
                                    register,
                                    inputItemClasses
                                })}
                            </Box>
                        );
                    })}
                <Button
                    className={classes.formItem}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Box>
    );
}
