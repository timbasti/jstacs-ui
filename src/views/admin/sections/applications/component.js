/* eslint-disable no-magic-numbers */

import {Box, Button, Card, CardContent, CardHeader, Grid, Radio, TextField, Typography} from '@material-ui/core';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';

import {ControlledAccordions} from '../../../../components/controlled-accordion/component';
import {TransferList} from '../../../../components/transfer-list/component';

export const ApplicationsSection = () => {
    const {handleSubmit, ...formProperties} = useForm();

    return (
        <Box>
            <FormProvider
                handleSubmit={handleSubmit}
                {...formProperties}
            >
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <ControlledAccordions />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <Card>
                            <CardHeader
                                action={<Radio />}
                                subheader="Use this to change an application name or to add/remove tools."
                                title="Select existing Application"
                            />
                            <CardContent>
                                <TextField />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <Card>
                            <CardHeader
                                action={<Radio />}
                                subheader="Use this to create a new application with a selected set of tools."
                                title="Create new Application"
                            />
                            <CardContent>
                                <TextField />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <TransferList
                            defaultChoices={[1, 2, 3, 4]}
                            defaultChosen={[5, 6, 7, 8]}
                            titleChoices="Available Tools"
                            titleChosen="Selected Tools"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </FormProvider>
        </Box>
    );
};
