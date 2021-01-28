import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles({
    root: {},
    input: {
        display: 'flex',
        flexDirection: 'row'
    },
    fileDisplay: {
        flex: 1,
        height: '56px',
        minWidth: (props) => `${props.labelWidth}px`,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        '& fieldset': {
            borderRightStyle: 'dashed'
        }
    },
    fileAction: {
        flex: 0,
        height: '56px',
        borderLeft: 'none',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        '& button:first-child': {
            borderLeft: 'none',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
        }
    },
    fileComment: {}
});
