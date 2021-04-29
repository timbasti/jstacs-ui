import {makeStyles} from '@material-ui/core/styles';

export const useTransferListStyles = makeStyles((theme) => ({
    button: {margin: theme.spacing(1, 0)},
    list: {
        height: '100%',
        overflow: 'hidden'
    },
    root: {
        height: '100%',
        margin: 'auto',
        overflow: 'hidden'
    }
}));

export const useCustomListStyles = makeStyles((theme) => ({
    cardHeader: {padding: theme.spacing(1, 2)},
    list: {
        backgroundColor: theme.palette.background.paper,
        height: '100%',
        overflow: 'auto'
    },
    listItem: {width: 'fit-content'},
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    }
}));
