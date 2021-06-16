import {Box, Button, Card, CardActions, CardContent, CardHeader, Grid} from '@material-ui/core';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FormProvider, useForm, useFormContext, useWatch} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';

import {selectAvailableApplications} from '../../../../api/applications/selectors';
import {createApplication, deleteApplication, listApplications, updateApplication} from '../../../../api/applications/thunks';
import {selectAvailableTools} from '../../../../api/tools/selectors';
import {listTools} from '../../../../api/tools/thunks';
import {EnrichedSelectField} from '../../../../components/input-fields/enriched-select-field/component';
import {EnrichedTextField} from '../../../../components/input-fields/enriched-text-field/component';
import {TransferList} from '../../../../components/transfer-list/component';
import {useApplicationsSectionStyles} from './styles';

const newApplicationName = 'New Application';
const newApplicationId = -1;

const ApplicationSelectionFieldSet = ({onChange}) => {
    const {setValue, control} = useFormContext();
    const selectedApplicationId = useWatch({
        control,
        defaultValue: newApplicationId,
        name: 'applicationId'
    });

    const dispatch = useDispatch();
    const availableApplications = useSelector(selectAvailableApplications);

    useEffect(() => {
        if (selectedApplicationId === undefined) {
            return;
        }

        if (selectedApplicationId === -1) {
            setValue('applicationName', '', {shouldValidate: false});
        } else {
            const selectedApplication = availableApplications?.find(({id}) => id === selectedApplicationId);
            const newSelectedApplicationName = selectedApplication?.name || newApplicationName;
            setValue('applicationName', newSelectedApplicationName, {shouldValidate: true});
        }

        onChange(selectedApplicationId);
    }, [availableApplications, onChange, setValue, selectedApplicationId]);

    const handleDeleteClick = useCallback(() => {
        if (selectedApplicationId >= 0) {
            setValue('applicationId', newApplicationId, {shouldValidate: true});
            dispatch(deleteApplication({id: selectedApplicationId}));
        }
    }, [dispatch, selectedApplicationId, setValue]);

    const selectableOptions = useMemo(() => {
        const defaultOption = {
            label: newApplicationName,
            value: newApplicationId
        };
        const options =
            availableApplications?.map(({id, name}) => ({
                label: name,
                value: id
            })) || [];
        return [defaultOption, ...options];
    }, [availableApplications]);

    return (
        <Card>
            <CardHeader title="Create or change an application" />
            <CardContent>
                <Grid
                    container
                    spacing={6}
                >
                    <Grid
                        item
                        xs={6}
                    >
                        <EnrichedSelectField
                            defaultValue={newApplicationId}
                            helperText={`
                                            Select an application to change its name and/or assigned tools below.
                                            You can also delete a selected application type.
                                        `}
                            label="Existing Application"
                            name="applicationId"
                            options={selectableOptions}
                            placeholder="Select an application"
                            required
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <EnrichedTextField
                            helperText="Enter a new name or change the one provided"
                            label="Application name"
                            name="applicationName"
                            placeholder="Enter application name"
                            required
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button
                    color="secondary"
                    disabled={selectedApplicationId === newApplicationId}
                    onClick={handleDeleteClick}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

const ToolSelectionFieldSet = ({selectedApplicationId, onChange}) => {
    const [toolOptions, setToolOptions] = useState([]);
    const [selectedTools, setSelectedTools] = useState([]);

    const dispatch = useDispatch();
    const availableApplications = useSelector(selectAvailableApplications);
    const allAvailableTools = useSelector(selectAvailableTools);

    useEffect(() => {
        if (!allAvailableTools || allAvailableTools.length === 0) {
            dispatch(listTools());
        } else {
            const newAvailableTools = allAvailableTools.map(({id, type, name}) => {
                return {
                    hint: type,
                    title: name,
                    value: id
                };
            });
            setToolOptions(newAvailableTools);
        }
    }, [dispatch, allAvailableTools]);

    useEffect(() => {
        if (availableApplications === null) {
            dispatch(listApplications());
        } else {
            const selectedApplication = availableApplications.find(({id}) => id === selectedApplicationId);
            const alreadySelectedTools = selectedApplication?.tools.map(({id}) => id) || [];
            setSelectedTools(alreadySelectedTools || []);
        }
    }, [dispatch, availableApplications, selectedApplicationId]);

    return (
        <TransferList
            defaultValue={selectedTools}
            name="assignedTools"
            onChange={onChange}
            options={toolOptions}
            titleOptions="Available Tools"
            titleSelections="Assigned Tools"
        />
    );
};

export const ApplicationsSection = () => {
    const [selectedApplicationId, setSelectedApplicationId] = useState();
    const dispatch = useDispatch();
    const {handleSubmit, ...formProperties} = useForm();
    const classes = useApplicationsSectionStyles();

    const doSubmit = useCallback(
        ({applicationId, applicationName, assignedTools}) => {
            if (applicationId === newApplicationId) {
                dispatch(createApplication({
                    name: applicationName,
                    toolIds: assignedTools
                }));
            } else {
                dispatch(updateApplication({
                    id: applicationId,
                    name: applicationName,
                    toolIds: assignedTools
                }));
            }
        },
        [dispatch]
    );

    const handleFormSubmit = useMemo(() => {
        return handleSubmit(doSubmit);
    }, [handleSubmit, doSubmit]);

    return (
        <FormProvider
            handleSubmit={handleSubmit}
            {...formProperties}
        >
            <Box
                className={classes.root}
                component="form"
                noValidate
                onSubmit={handleFormSubmit}
                paddingLeft={3}
                paddingRight={3}
                paddingTop={3}
            >
                <Grid
                    className={classes.gridContainer}
                    container
                    direction="column"
                    spacing={2}
                    wrap="nowrap"
                >
                    <Grid
                        className={classes.gridItem}
                        item
                    >
                        <ApplicationSelectionFieldSet onChange={setSelectedApplicationId} />
                    </Grid>
                    <Grid
                        className={classes.gridItem}
                        item
                        xs
                    >
                        <ToolSelectionFieldSet selectedApplicationId={selectedApplicationId} />
                    </Grid>
                    <Grid
                        className={classes.gridItem}
                        item
                    >
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                        >
                            {selectedApplicationId === newApplicationId ? 'Create' : 'Update'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </FormProvider>
    );
};
