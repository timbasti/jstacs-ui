import {makeStyles} from '@material-ui/core';

export const startExecutionStyles = makeStyles((theme) => {
    const headerHeight = theme.mixins.toolbar;
    return {
        helpText: {
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            width: 460,
            wordBreak: 'break-word'
        },

        helpTextClose: {
            bottom: 0,
            margin: '0px 0px 18px 16px',
            position: 'absolute'
        },

        helpTextContainer: {
            display: 'flex',
            flexFlow: 'column',
            height: 'inherit'
        },

        helpTextContent: {
            '& p:first-child': {marginTop: 0},
            flex: 1,
            overflow: 'auto'
        },

        helpTextTrigger: {
            bottom: 0,
            position: 'fixed',
            right: 0
        },

        root: {
            '&-withHelpText': {width: 'calc(100% - 460px)'},
            width: '100%'
        }
    };
});
