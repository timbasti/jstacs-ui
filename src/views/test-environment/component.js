import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {Box, Button} from '@material-ui/core';
import {selectParameterSet, selectToolName, selectParameters} from '../../api/test/selectors';
import {thunks as testThunks} from '../../api/test/thunks';
import {parameterFactory} from '../../utils/parameter-factory';
import {useStyles} from './styles';

export function TestEnvironmentView() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const parameterSet = useSelector(selectParameterSet);
    const toolName = useSelector(selectToolName);
    const parameters = useSelector(selectParameters);
    const {control, handleSubmit} = useForm();

    const onSubmit = (data) => {
        console.log('onSubmit', data);
        const updatedParameters = parameters.map((parameter) => {
            const spaceLessIdentifier = parameter.name.replace(/ /g, '_');
            const parameterType = parameter.type.split('.').pop();
            switch (parameterType) {
                case 'SimpleParameter':
                    return {...parameter, value: data[spaceLessIdentifier]};
                case 'FileParameter':
                    return {...parameter, fileContents: data[spaceLessIdentifier]};
                default:
                    return {};
            }
        });
        const updatedParameterSet = {
            ...parameterSet,
            parameters: updatedParameters
        };
        dispatch(testThunks.parameterSet.post(updatedParameterSet));
    };

    useEffect(() => {
        if (!toolName) {
            dispatch(testThunks.parameterSet.fetch());
        }
    });

    return (
        <Box>
            <Box component="p">Dies ist eine Ansicht für Testzwecke</Box>
            <Box component="p">Es wurden Daten für folgendes Tool geladen: {toolName}</Box>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                {parameters &&
                    parameters.map((parameter) => {
                        const inputItemClasses = classes.inputItem;
                        const formItemFieldClasses = `${classes.formItem} ${classes.formField}`;
                        return (
                            <Box className={formItemFieldClasses} key={parameter.name}>
                                {parameterFactory({...parameter, control, inputItemClasses})}
                            </Box>
                        );
                    })}
                <Button className={classes.formItem} variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>
        </Box>
    );
}
