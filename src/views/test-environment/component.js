import {Box, Button, Grid} from '@material-ui/core';
import React, {useEffect, useMemo, useReducer} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';

import {selectParameters, selectToolName} from '../../api/test/selectors';
import {thunks as testThunks} from '../../api/test/thunks';
import {FileItemContext, fileItemReducer} from '../../utils/file-context';
import {createParameterInput} from '../../utils/parameter-factory';
import {useStyles} from './styles';

const createParameterInputFields = (parameters, inputItemClasses) => parameters &&
    parameters.map((parameter) => {
        const gritItemProps =
            parameter.dataType === 'PARAMETERSET'
                ? {
                    lg: 9,
                    sm: 12,
                    xs: 12
                }
                : {
                    lg: 3,
                    sm: 4,
                    xs: 12
                };
        return (
            <Grid
                item
                key={parameter.name}
                lg={gritItemProps.lg}
                sm={gritItemProps.sm}
                xs={gritItemProps.xs}
            >
                {createParameterInput(parameter, inputItemClasses)}
            </Grid>
        );
    });

export const TestEnvironmentView = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const toolName = useSelector(selectToolName);
    const parameters = useSelector(selectParameters);
    const {handleSubmit, ...formProperties} = useForm();

    const [fileItems, setFileItem] = useReducer(fileItemReducer, {});
    const fileContext = useMemo(
        () => ({
            fileItems,
            setFileItem
        }),
        [fileItems, setFileItem]
    );

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
            <Box component="p">
                Dies ist eine Ansicht für Testzwecke
            </Box>

            <Box component="p">
                Es wurden Daten für folgendes Tool geladen:
                {toolName}
            </Box>

            <FormProvider
                {...formProperties}
                handleSubmit={handleSubmit}
            >
                <FileItemContext.Provider value={fileContext}>
                    <form
                        className={classes.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid
                            alignContent="flex-start"
                            container
                            justify="center"
                            spacing={5}
                        >
                            {createParameterInputFields(parameters, classes.inputItem)}

                            <Grid
                                item
                                xs={12}
                            >
                                <Button
                                    color="primary"
                                    type="submit"
                                    variant="contained"
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </FileItemContext.Provider>
            </FormProvider>
        </Box>
    );
};
