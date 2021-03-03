import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react';

import {useStyles} from './styles';

const SplitButton = ({defaultSelected, className, options, onClick, onChange}) => {
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(defaultSelected === !undefined ? defaultSelected : 0);
    const anchorRef = React.useRef(null);
    const classes = useStyles();

    const handleClick = useCallback(() => {
        onClick && onClick(selectedIndex);
    }, [onClick, selectedIndex]);

    const createMenuItemClickHandler = (index) => () => {
        setSelectedIndex(index);
        setOpen(false);
        onChange && onChange(index);
    };

    const handleToggle = useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
    }, [setOpen]);

    const handleClose = useCallback(
        (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }

            setOpen(false);
        },
        [setOpen]
    );

    return (
        <>
            <ButtonGroup
                className={className}
                ref={anchorRef}
                variant="outlined"
            >
                <Button onClick={handleClick}>
                    {options[selectedIndex]}
                </Button>

                <Button
                    onClick={handleToggle}
                    size="small"
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>

            <Popper
                anchorEl={anchorRef.current}
                className={classes.popper}
                open={open}
                placement="bottom"
                role={undefined}
                transition
            >
                {({TransitionProps: {onEnter: handleEnter, onExited: handleExited, in: transitionIn}}) => <Grow
                    in={transitionIn}
                    onEnter={handleEnter}
                    onExited={handleExited}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="split-button-menu">
                                {options.map((option, index) => {
                                    const handleMenuItemClick = createMenuItemClickHandler(index);
                                    return (
                                        <MenuItem
                                            key={option}
                                            onClick={handleMenuItemClick}
                                            selected={index === selectedIndex}
                                        >
                                            {option}
                                        </MenuItem>
                                    );
                                })}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>}
            </Popper>
        </>
    );
};

SplitButton.propTypes = {
    className: PropTypes.string,
    defaultSelected: PropTypes.number,
    onChange: PropTypes.func,
    onClick: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired
};

SplitButton.defaultProps = {
    className: '',
    defaultSelected: 0,
    onChange: undefined
};

export {SplitButton};
