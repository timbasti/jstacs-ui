/* eslint-disable no-magic-numbers */

import {Box, Button, Card, CardActions, CardContent, CardHeader, Grid} from '@material-ui/core';
import React, {useCallback, useMemo} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';

import {selectAvailableApplications} from '../../../../api/applications/selectors';
import {EnrichedTextField} from '../../../../components/enriched-text-field/component';
import {UncontrolledSimpleSelect} from '../../../../components/simple-select/uncontrolled-component';
import {TransferList} from '../../../../components/transfer-list/component';

export const ApplicationsSection = () => {
    const {handleSubmit, ...formProperties} = useForm();
    const availableApplications = useSelector(selectAvailableApplications);
    const selectableOptions = useMemo(() => {
        const defaultOption = {
            label: 'New Application',
            value: -1
        };
        const options = availableApplications.map(({id, type}) => ({
            label: type,
            value: id
        }));
        return [defaultOption, ...options];
    }, [availableApplications]);

    const onSubmit = useCallback((values) => console.log(values), []);
    const onError = useCallback((errors) => console.log(errors), []);

    const handleFormSubmit = useMemo(() => {
        return handleSubmit(onSubmit, onError);
    }, [handleSubmit, onSubmit, onError]);

    return (
        <Box p={3}>
            <FormProvider
                handleSubmit={handleSubmit}
                {...formProperties}
            >
                <form onSubmit={handleFormSubmit}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            xs={12}
                        >
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
                                            <UncontrolledSimpleSelect
                                                defaultSelected={-1}
                                                helperText={`
                                                Select an application type to change its name and/or assigned tools below.
                                                You can also delete a selected application type.
                                                But you have to confirm this operation with a second click.
                                            `}
                                                label="Application type"
                                                name="application-type"
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
                                                name="application-name"
                                                placeholder="Enter application name"
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        color="secondary"
                                        disabled
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <TransferList
                                defaultChoices={[
                                    {
                                        key: 1,
                                        value: 1
                                    }
                                ]}
                                defaultChosen={[
                                    {
                                        key: 2,
                                        value: 2
                                    }
                                ]}
                                titleChoices="Available Tools"
                                titleChosen="Assigned Tools"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Button
                                color="secondary"
                                type="submit"
                                variant="contained"
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </Box>
    );
};
