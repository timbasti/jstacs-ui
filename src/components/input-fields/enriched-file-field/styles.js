import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles({
    fileAction: {
        '& button:first-child': {
            borderBottomLeftRadius: 0,
            borderLeft: 'none',
            borderTopLeftRadius: 0
        },
        borderBottomLeftRadius: 0,
        borderLeft: 'none',
        borderTopLeftRadius: 0,
        height: '56px',
        width: '32px'
    },
    fileComment: {},
    fileDisplay: {
        '& fieldset': {borderRightStyle: 'dashed'},
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        flex: 1,
        height: '56px'
    },
    input: {
        display: 'flex',
        flexDirection: 'row'
    },
    nameInput: {cursor: 'pointer'},
    root: {}
});
