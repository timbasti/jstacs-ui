import {makeStyles} from '@material-ui/core';

export const useCheckboxStyles = makeStyles((theme) => {
    const borderColor = theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
        label: {
            '&:hover': {backgroundColor: theme.palette.action.hover},
            borderColor,
            borderRadius: theme.shape.borderRadius,
            borderStyle: 'solid',
            borderWidth: 1,
            height: 56,
            margin: 0
        }
    };
});
