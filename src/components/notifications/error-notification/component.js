import {ErrorMessage} from '@hookform/error-message';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react';

import {NotificationPopper} from '../notification-popper/component';

const ErrorNotification = ({name, anchorEl}) => {
    const handleRender = useCallback(
        (error) => {
            return (
                <NotificationPopper
                    anchorEl={anchorEl}
                    placement="top-start"
                    type="error"
                >
                    {error.message}
                </NotificationPopper>
            );
        },
        [anchorEl]
    );

    return <ErrorMessage
        name={name}
        render={handleRender}
    />;
};

ErrorNotification.propTypes = {
    anchorEl: PropTypes.shape(),
    name: PropTypes.string.isRequired
};

ErrorNotification.defaultProps = {anchorEl: null};

export {ErrorNotification};
