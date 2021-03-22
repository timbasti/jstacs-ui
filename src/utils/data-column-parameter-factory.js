import React, {useContext, useEffect, useState} from 'react';

import {UncontrolledSimpleSelect} from '../components/simple-select/uncontrolled-component';
import {readFile} from '../helpers/file-helpers';
import {FileItemContext} from '../utils/file-context';

const DataColumnSelect = ({dataRef, name, label, defaultSelected, helperText, className}) => {
    const {fileItems} = useContext(FileItemContext);
    const [dataColumns, setDataColumns] = useState([]);
    useEffect(() => {
        const dataFile = fileItems[dataRef];
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
    }, [fileItems, dataRef, setDataColumns]);

    return (
        <UncontrolledSimpleSelect
            className={className}
            defaultSelected={defaultSelected}
            helperText={helperText}
            label={label}
            name={name}
            options={dataColumns}
        />
    );
};

export const createDataColumnParameter = (parameter, inputItemClasses) => <DataColumnSelect
    className={inputItemClasses}
    dataRef={parameter.dataRef}
    defaultSelected={parameter.value}
    helperText={parameter.comment}
    label={parameter.name}
    name={parameter.name}
/>;

