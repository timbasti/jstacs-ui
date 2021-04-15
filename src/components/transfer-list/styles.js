import {makeStyles} from '@material-ui/core/styles';

export const useTransferListStyles = makeStyles((theme) => ({
    button: {margin: theme.spacing(1, 0)},
    root: {margin: 'auto'}
}));

export const useCustomListStyles = makeStyles((theme) => ({
    cardHeader: {padding: theme.spacing(1, 2)},
    list: {
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto'
    }
}));
