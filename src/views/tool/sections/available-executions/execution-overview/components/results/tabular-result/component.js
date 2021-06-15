import '@inovua/reactdatagrid-community/base.css';
import '@inovua/reactdatagrid-community/theme/default-light.css';
import '@inovua/reactdatagrid-community/theme/default-dark.css';

import ReactDataGrid from '@inovua/reactdatagrid-community';
import {CircularProgress, IconButton} from '@material-ui/core';
import {GetApp} from '@material-ui/icons';
import {saveAs} from 'file-saver';
import Papa from 'papaparse';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import {selectPaletteType} from '../../../../../../../../api/theme/selectors';
import {useSaveStyles} from './styles';

const TabularResult = ({className, fileURL}) => {
    const [columns, setColumns] = useState();
    const [filters, setFilters] = useState();
    const [dataSource, setDataSource] = useState();
    const paletteType = useSelector(selectPaletteType);
    const classes = useSaveStyles();

    const theme = useMemo(() => {
        return `default-${paletteType}`;
    }, [paletteType]);

    const fileName = useMemo(() => {
        const filePathParts = fileURL?.split('/') || [];
        return filePathParts[filePathParts.length - 1];
    }, [fileURL]);

    const fileExt = useMemo(() => {
        const fileParts = fileName?.split('.') || [];
        return fileParts[fileParts.length - 1]?.toLowerCase();
    }, [fileName]);

    const tabularDelimiiter = useMemo(() => {
        if (fileExt === 'tsv') {
            return '\t';
        }
        if (fileExt === 'csv') {
            return ',';
        }
        return ',';
    }, [fileExt]);

    const renderedDataGrid = useMemo(() => {
        if (!columns || !dataSource || !filters) {
            return undefined;
        }

        return (
            <ReactDataGrid
                className={className}
                columns={columns}
                dataSource={dataSource}
                defaultFilterValue={filters}
                defaultLimit={15}
                pagination="local"
                theme={theme}
            />
        );
    }, [className, columns, dataSource, filters, theme]);

    const renderedLoading = useMemo(() => {
        if (!columns || !dataSource || !filters) {
            return <CircularProgress />;
        }
        return undefined;
    }, [columns, dataSource, filters]);

    const handleSaveClick = useCallback(() => {
        saveAs(fileURL, fileName);
    }, [fileName, fileURL]);

    useEffect(() => {
        if (!fileURL || !tabularDelimiiter) {
            return;
        }

        Papa.parse(fileURL, {
            delimiter: tabularDelimiiter,
            download: true,
            header: true,
            step ({errors, meta: {fields}}, parser) {
                if (errors.length > 0) {
                    setColumns([]);
                    setFilters([]);
                }

                const readedColumns = [];
                const defaultFilters = [];
                fields.forEach((field) => {
                    defaultFilters.push({
                        name: field,
                        operator: 'contains',
                        type: 'string'
                    });
                    readedColumns.push({
                        defaultFlex: 1,
                        header: field,
                        minWidth: 150,
                        name: field,
                        type: 'string'
                    });
                });
                setColumns(readedColumns);
                setFilters(defaultFilters);
                parser.abort();
            },
            worker: true
        });
    }, [fileURL, tabularDelimiiter]);

    useEffect(() => {
        if (!fileURL || !tabularDelimiiter) {
            return;
        }

        Papa.parse(fileURL, {
            complete ({data, errors}) {
                if (errors?.length > 0) {
                    setDataSource([]);
                } else {
                    setDataSource(data);
                }
            },
            delimiter: tabularDelimiiter,
            download: true,
            header: true,
            skipEmptyLines: tabularDelimiiter,
            worker: true
        });
    }, [fileURL, tabularDelimiiter]);

    return (
        <>
            {renderedLoading}
            {renderedDataGrid}
            <IconButton
                className={classes.root}
                onClick={handleSaveClick}
            >
                <GetApp />
            </IconButton>
        </>
    );
};

TabularResult.propTypes = {
    className: PropTypes.string,
    fileURL: PropTypes.string.isRequired
};

TabularResult.defaultProps = {className: ''};

export {TabularResult};
