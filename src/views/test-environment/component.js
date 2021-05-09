import {Box, Button, Grid} from '@material-ui/core';
import React, {useCallback} from 'react';
import {FormProvider, useForm} from 'react-hook-form';

import {
    DataColumnField,
    EnrichedCheckbox,
    EnrichedFileInput,
    EnrichedNumberField,
    EnrichedSelectField,
    EnrichedTextField
} from '../../components/input-fields';
import {EnrichedRadioButton} from '../../components/input-fields/enriched-radio-button/component';
import {requiredValueErrorMessage} from '../../utils/error-messages';

const TestEnvironmentView = () => {
    const {handleSubmit, ...formProperties} = useForm();

    const onSubmit = useCallback((formData) => {
        console.log(formData);
    }, []);

    return (
        <Box p={10}>
            <FormProvider
                {...formProperties}
                handleSubmit={handleSubmit}
            >
                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid
                        alignContent="flex-start"
                        container
                        justify="center"
                        spacing={5}
                    >
                        <Grid
                            item
                            xs={6}
                        >
                            <EnrichedCheckbox
                                defaultChecked
                                helperText="Some helper text"
                                label="Checkbox"
                                name="checkbox"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <EnrichedNumberField
                                defaultValue={5}
                                helperText="Some helper text"
                                label="Number Field"
                                name="numberfield"
                                placeholder="Enter a number"
                                required={requiredValueErrorMessage}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <EnrichedSelectField
                                defaultValue={1}
                                helperText="Some helper text"
                                label="Select Field"
                                name="selectfield"
                                options={[
                                    {
                                        label: 'Hello World',
                                        value: 0
                                    },
                                    {
                                        label: 'Foo bar',
                                        value: 1
                                    }
                                ]}
                                placeholder="Select a value"
                                required={requiredValueErrorMessage}
                                showEnrichedHelperText
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <EnrichedTextField
                                defaultValue="Hello World"
                                helperText="Some helper text"
                                label="Text Field"
                                name="textfield"
                                placeholder="Enter a text"
                                required={requiredValueErrorMessage}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <EnrichedFileInput
                                accept=".tsv,.tabular/*  */"
                                helperText="Some helper text"
                                label="File Field"
                                name="filefield"
                                required={requiredValueErrorMessage}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <DataColumnField
                                defaultValue={3}
                                fileFieldName="filefield"
                                helperText="Some helper text"
                                label="Data Column Field"
                                name="columnfield"
                                placeholder="Select a value"
                                required={requiredValueErrorMessage}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <EnrichedRadioButton
                                defaultChecked
                                label="Radio Button Field"
                                name="radiofield"
                            />
                        </Grid>
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

export default TestEnvironmentView;
