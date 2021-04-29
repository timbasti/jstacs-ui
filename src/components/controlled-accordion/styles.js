import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => {
    const fontSize = 15;
    return {
        heading: {
            flexBasis: '33.33%',
            flexShrink: 0,
            fontSize: theme.typography.pxToRem(fontSize)
        },
        root: {width: '100%'},
        secondaryHeading: {
            color: theme.palette.text.secondary,
            fontSize: theme.typography.pxToRem(fontSize)
        }
    };
});
