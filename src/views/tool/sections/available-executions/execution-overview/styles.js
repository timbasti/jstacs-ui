import {makeStyles} from '@material-ui/core/styles';

export const useExecutionOverviewStyles = makeStyles((theme) => ({root: {backgroundColor: theme.palette.background.default}}));

export const useTitleBarStyles = makeStyles((theme) => ({
    appBar: {position: 'relative'},
    title: {
        flex: 1,
        marginLeft: theme.spacing(2)
    }
}));

export const useProtocolDialogStyles = makeStyles((theme) => ({content: {backgroundColor: theme.palette.background.default}}));

export const useResultsAreaStyles = makeStyles((theme) => ({
    heading: {
        // eslint-disable-next-line no-magic-numbers
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
    root: {backgroundColor: theme.palette.background.default}
}));

export const useResultStyles = makeStyles((theme) => ({
    content: {
        height: '66vh',
        width: '100%'
    }
}));
