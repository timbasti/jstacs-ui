import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    popper: {
        zIndex: theme.zIndex.tooltip
    }
}));