import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import {ControlledSimpleSelect} from '../components/simple-select/controlled-component';
import {readFile} from '../helpers/file-helpers';
import {useFileItemContext} from '../utils/file-context';

const DataColumnSelect = ({dataRef, name, label, defaultSelected, helperText, className}) => {
    const {fileItems} = useFileItemContext();
    const [dataFile, setDataFile] = useState();
    const [dataColumns, setDataColumns] = useState([]);
    const {control} = useFormContext();

    useEffect(() => {
        const newDataFile = fileItems[dataRef];
        if (newDataFile) {
            setDataFile(newDataFile);
        }
    }, [dataRef, fileItems, setDataFile]);

    useEffect(() => {
        if (!dataFile) {
            return;
        }
        readFile(dataFile, (fileContent) => {
            const header = fileContent.split('\n')[0];
            const columns = header.split('\t');
            const readedColumns = columns.map((column, index) => ({
                key: index,
                value: column
            }));
            setDataColumns(readedColumns);
        });
    }, [dataFile, setDataColumns]);

    const renderSelect = useCallback(
        ({value, onChange}) => {
            const createChangeHandle = (handleChange) => (changeEvent) => handleChange(changeEvent.target.value);
            const selected = dataColumns && dataColumns.length > value ? value : '';
            return (
                <ControlledSimpleSelect
                    className={className}
                    helperText={helperText}
                    label={label}
                    name={name}
                    onChange={createChangeHandle(onChange)}
                    options={dataColumns}
                    selected={selected}
                />
            );
        },
        [className, dataColumns, helperText, label, name]
    );

    return <Controller
        control={control}
        defaultValue={defaultSelected}
        name={name}
        render={renderSelect}
    />;
};

export const createDataColumnParameter = (parameter, inputItemClasses) => <DataColumnSelect
    className={inputItemClasses}
    dataRef={parameter.dataRef}
    defaultSelected={parameter.value || ''}
    helperText={parameter.comment}
    label={parameter.name}
    name={parameter.name}
/>;

