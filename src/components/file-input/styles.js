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
        flex: 0,
        height: '56px'
    },
    fileComment: {},
    fileDisplay: {
        '& fieldset': {borderRightStyle: 'dashed'},
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        flex: 1,
        height: '56px',
        minWidth: (props) => `${props.labelWidth}px`
    },
    input: {
        display: 'flex',
        flexDirection: 'row'
    },
    root: {}
});
