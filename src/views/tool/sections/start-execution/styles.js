import {makeStyles} from '@material-ui/core';

export const startExecutionStyles = makeStyles((theme) => {
    return {
        helpTextClose: {
            bottom: 0,
            margin: '0px 0px 18px 16px',
            position: 'absolute'
        },

        helpTextTrigger: {
            bottom: 0,
            position: 'fixed',
            right: 0
        },

        item: {overflow: 'auto'},

        root: {
            height: '100%',
            width: '100%'
        }
    };
});

export const helpTextDrawerStyles = makeStyles((theme) => {
    return {
        helpTextContent: {
            '& p:first-child': {marginTop: 0},
            '& p:last-child': {marginBottom: 0},
            flex: 1
        },

        root: {
            height: '100%',
            overflow: 'auto'
        }
    };
});

export const ExecutionInformationStyles = makeStyles((theme) => {
    return {
        title: {
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            width: 460,
            wordBreak: 'break-word'
        }
    };
});
