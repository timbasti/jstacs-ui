import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    makeStyles,
    Box,
    TextField,
    FormHelperText,
    FormControl,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';
import {selectToolName, selectParameters} from '../../api/test/selectors';
import {getToolParameterSet} from '../../api/test/thunks';

function simpleParameterFactory({name, value, comment, dataType, required}) {
    switch (dataType) {
        case 'CHAR':
        case 'STRING':
            return (
                <TextField
                    label={name}
                    defaultValue={value}
                    helperText={comment}
                    type="text"
                    required={required}
                />
            );
        case 'LONG':
        case 'INT':
        case 'BYTE':
        case 'SHORT':
            return (
                <TextField
                    label={name}
                    defaultValue={value}
                    helperText={comment}
                    type="number"
                    required={required}
                    InputProps={{
                        step: 1
                    }}
                />
            );
        case 'FLOAT':
        case 'DOUBLE':
            return (
                <TextField
                    label={name}
                    defaultValue={value}
                    helperText={comment}
                    type="number"
                    required={required}
                    InputProps={{
                        step: 'any'
                    }}
                />
            );
        case 'BOOLEAN':
            const spaceLessIdentifier = name.replace(/ /g, '');
            return (
                <FormControl>
                    <FormControlLabel
                        label={name}
                        control={
                            <Checkbox
                                defaultChecked={value}
                                name={spaceLessIdentifier}
                                id={spaceLessIdentifier}
                            />
                        }
                    />
                    <FormHelperText>{comment}</FormHelperText>
                </FormControl>
            );
        default:
            break;
    }
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    },
    formItem: {
        marginTop: '20px'
    }
}));

function parameterFactory({type, ...properties}) {
    const parameterType = type.split('.').pop();
    switch (parameterType) {
        case 'SimpleParameter':
            return simpleParameterFactory(properties);
        default:
            break;
    }
}

export function TestEnvironmentView() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const toolName = useSelector(selectToolName);
    const parameters = useSelector(selectParameters);

    useEffect(() => {
        if (!toolName) {
            dispatch(getToolParameterSet());
        }
    });

    return (
        <Box>
            <Box component="p">Dies ist eine Ansicht für Testzwecke</Box>
            <Box component="p">
                Es wurden Daten für folgendes Tool geladen: {toolName}
            </Box>
            <form className={classes.form}>
                {parameters &&
                    parameters.map((parameter) => {
                        return (
                            <Box className={classes.formItem} key={parameter.name}>
                                {parameterFactory(parameter)}
                            </Box>
                        );
                    })}
            </form>
        </Box>
    );
}
