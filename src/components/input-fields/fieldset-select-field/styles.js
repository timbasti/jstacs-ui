import {makeStyles} from '@material-ui/core';

export const useAccordionStyles = makeStyles({
    root: {
        '&$expanded': {margin: 'auto 0'},
        '&:before': {display: 'none'},
        '&:not(:last-child)': {borderBottom: 0},
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none'
    }
});

export const useAccordionSummaryStyles = makeStyles({
    content: {'&$expanded': {margin: '12px 0'}},
    root: {
        '&$expanded': {minHeight: 56},
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56
    }
});

export const useAccordionDetailsStyles = makeStyles({root: {padding: 20}});
