import {makeStyles} from '@material-ui/core';

export const useUploadDialogStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.default,
        maxWidth: '61.8vw',
        minWidth: '256px',
        width: '100%'
    }
}));

export const useUploadItemStyles = makeStyles((theme) => {
    const itemSpacing = 2;
    return {root: {'&:not(:last-child)': {marginBottom: theme.spacing(itemSpacing)}}};
});
