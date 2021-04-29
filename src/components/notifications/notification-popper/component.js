import {Box, Fade, Popper} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react';

const NotificationPopper = ({children, placement, anchorEl, type}) => {
    const renderAlert = useCallback(
        ({TransitionProps}) => {
            const maxWidth = anchorEl.offsetWidth;
            return (
                <Box maxWidth={maxWidth}>
                    <Fade
                        {...TransitionProps}
                        timeout={350}
                    >
                        <Alert
                            elevation={6}
                            severity={type}
                            variant="filled"
                        >
                            {children}
                        </Alert>
                    </Fade>
                </Box>
            );
        },
        [anchorEl, children, type]
    );

    return (
        <Popper
            anchorEl={anchorEl}
            open
            placement={placement}
            transition
        >
            {renderAlert}
        </Popper>
    );
};

NotificationPopper.propTypes = {
    anchorEl: PropTypes.shape(),
    children: PropTypes.any,
    placement: PropTypes.string,
    type: PropTypes.oneOf(['info', 'warning', 'success', 'error'])
};

NotificationPopper.defaultProps = {
    anchorEl: null,
    children: 'Error',
    placement: 'top-start',
    type: 'info'
};

export {NotificationPopper};
