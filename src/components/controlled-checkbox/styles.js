import {makeStyles} from '@material-ui/core';

export const useCheckboxStyles = makeStyles((theme) => {
    console.log(theme);
    const borderColor =
        theme.palette.type === 'light'
            ? 'rgba(0, 0, 0, 0.23)'
            : 'rgba(255, 255, 255, 0.23)';
    return {
        label: {
            height: 56,
            margin: 0,
            borderRadius: theme.shape.borderRadius,
            borderColor,
            borderWidth: 1,
            borderStyle: 'solid',
            '&:hover': {
                backgroundColor: theme.palette.action.hover
            }
        }
    };
});
