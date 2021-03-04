import {Box, Button, Grid, MenuItem, TextField} from '@material-ui/core';
import React, {useCallback, useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';

import {selectAvailableTools, selectNumberOfTools, selectParameters, selectToolName} from '../../api/tools/selectors';
import {thunks as toolsThunks} from '../../api/tools/thunks';
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

export const ToolsView = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const availableTools = useSelector(selectAvailableTools);
    const numberOfAvailableTools = useSelector(selectNumberOfTools);
    const toolName = useSelector(selectToolName);
    const parameters = useSelector(selectParameters);
    const {handleSubmit, ...formProperties} = useForm();

    /* const onSubmit = (formData) => {
        console.log('onSubmit', formData);
        if (Object.keys(formData).length > 0) {
            dispatch(toolsThunks.parameterSet.update(formData));
        }
    }; */

    useEffect(() => {
        if (!availableTools) {
            dispatch(toolsThunks.tools.fetch());
        }
    }, [availableTools, dispatch]);

    /* useEffect(() => {
        if (numberOfAvailableTools > 0 && !toolName) {
            dispatch(toolsThunks.parameterSet.fetch());
        }
    }, [toolName, numberOfAvailableTools, dispatch]); */

    const handleToolSelectionChange = useCallback(
        (event) => {
            const selectedTool = event.target.value;
            dispatch(toolsThunks.parameterSet.fetch(selectedTool));
        },
        [dispatch]
    );

    return (
        <Box>
            <Box component="p">
                A view to show available tools and to load the parameters.
            </Box>

            <TextField
                helperText="Please select a tool"
                label="Tool Selection"
                onChange={handleToolSelectionChange}
                select
            >
                {availableTools &&
                    availableTools.map((tool) => <MenuItem
                        key={tool}
                        value={tool}
                    >
                        {tool}
                    </MenuItem>)}
            </TextField>

            <Box component="p">
                Es wurden Daten für folgendes Tool geladen:
                {toolName}
            </Box>

            <FormProvider
                {...formProperties}
                handleSubmit={handleSubmit}
            >
                <form
                    className={classes.form}
                    onSubmit={handleSubmit()}
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
            </FormProvider>
        </Box>
    );
};
