import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PropTypes from 'prop-types';
import React, {useCallback, useRef, useState} from 'react';

import {useStyles} from './styles';

const SimpleMenu = ({className, options, onClick}) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const classes = useStyles();

    const createMenuItemClickHandler = useCallback(
        (selectedOption) => () => {
            setOpen(false);
            onClick(selectedOption);
        },
        [onClick, setOpen]
    );

    const handleMenuOpenerClick = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    const handleMenuClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    return (
        <Box className={className}>
            <Button
                className={classes.MenuOpener}
                fullWidth
                onClick={handleMenuOpenerClick}
                ref={anchorRef}
                variant="outlined"
            >
                <ArrowDropDownIcon />
            </Button>
            <Menu
                anchorEl={anchorRef.current}
                keepMounted
                onClose={handleMenuClose}
                open={open}
            >
                {options.map(([key, value]) => {
                    const handleMenuItemClick = createMenuItemClickHandler(key);
                    return (
                        <MenuItem
                            key={key}
                            onClick={handleMenuItemClick}
                        >
                            {value}
                        </MenuItem>
                    );
                })}
            </Menu>
        </Box>
    );
};

SimpleMenu.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};

SimpleMenu.defaultProps = {
    className: '',
    onClick: () => {}
};

export {SimpleMenu};
