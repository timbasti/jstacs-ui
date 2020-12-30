import {makeStyles} from '@material-ui/core';

export const useUploadDialogStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.default,
        minWidth: '256px',
        maxWidth: '61.8vw',
        width: '100%'
    }
}));

export const useUploadItemStyles = makeStyles((theme) => ({
    root: {
        '&:not(:last-child)': {
            marginBottom: theme.spacing(2)
        }
    }
}));
