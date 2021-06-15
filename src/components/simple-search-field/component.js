import {InputBase} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import React from 'react';

import {useSimpleSearchFieldStyles} from './styles';

const SimpleSearchField = ({className, onChange, placeholder}) => {
    const classes = useSimpleSearchFieldStyles();

    return (
        <div className={`${classes.search} ${className}`}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                classes={{
                    input: classes.inputInput,
                    root: classes.inputRoot
                }}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

SimpleSearchField.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

SimpleSearchField.defaultProps = {
    className: '',
    placeholder: 'Search…'
};

export {SimpleSearchField};
