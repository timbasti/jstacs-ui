import {InputBase} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import React from 'react';

import {useSimpleSearchFieldStyles} from './styles';

const SimpleSearchField = ({onChange}) => {
    const classes = useSimpleSearchFieldStyles();

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                classes={{
                    input: classes.inputInput,
                    root: classes.inputRoot
                }}
                onChange={onChange}
                placeholder="Search…"
            />
        </div>
    );
};

SimpleSearchField.propTypes = {onChange: PropTypes.func.isRequired};

export {SimpleSearchField};
