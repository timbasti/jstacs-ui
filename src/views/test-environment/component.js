import {Box, Button, Grid} from '@material-ui/core';
import React, {useCallback, useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import {setRouteData} from '../../api/route/slice';
import {
    DataColumnField,
    EnrichedCheckbox,
    EnrichedFileInput,
    EnrichedNumberField,
    EnrichedSelectField,
    EnrichedTextField,
    FieldsetSelectField,
    SimpleEnrichedRadioGroup
} from '../../components/input-fields';
import {requiredValueErrorMessage} from '../../utils/error-messages';

const TestEnvironmentView = ({className}) => {
    const {handleSubmit, ...formProperties} = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRouteData({view: 'Test-Environment'}));
    }, [dispatch]);

    const onSubmit = useCallback((formData) => {
        console.log(formData);
    }, []);

    return (
        <Box
            className={className}
            p={10}
        >
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
                                        assignment: 3.14,
                                        label: 'Hello World',
                                        value: 0
                                    },
                                    {
                                        assignment: 2,
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
                            <SimpleEnrichedRadioGroup
                                defaultValue="female"
                                helperText="Some helper text"
                                label="Radio Group Field"
                                name="radiogroupfield"
                                options={[
                                    {
                                        label: 'Male',
                                        value: 'male'
                                    },
                                    {
                                        label: 'Female',
                                        value: 'female'
                                    }
                                ]}
                                required={requiredValueErrorMessage}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <FieldsetSelectField
                                helperText="Some helper text"
                                label="Fieldset Select Field"
                                name="fieldsetselectfield"
                                options={[
                                    {
                                        content:
    <EnrichedTextField
        defaultValue="Hello New World"
        helperText="Some helper text"
        label="Text Field"
        name="fieldsetselectfield.textfield"
        placeholder="Enter a text"
        required={requiredValueErrorMessage}
    />,
                                        label: 'Male',
                                        value: 'male'
                                    },
                                    {
                                        label: 'Female',
                                        value: 'female'
                                    }
                                ]}
                                required={requiredValueErrorMessage}
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
