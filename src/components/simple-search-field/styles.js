import {fade, makeStyles} from '@material-ui/core/styles';

export const useSimpleSearchFieldStyles = makeStyles((theme) => {
    const fadeAlpha = 0.15;
    const fadeAlphaHover = 0.25;
    const leftSpacing = 4;
    return {
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(leftSpacing)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                '&:focus': {width: '20ch'},
                width: '12ch'
            }
        },
        inputRoot: {color: 'inherit'},
        search: {
            '&:hover': {backgroundColor: fade(theme.palette.common.white, fadeAlphaHover)},
            backgroundColor: fade(theme.palette.common.white, fadeAlpha),
            borderRadius: theme.shape.borderRadius,
            marginLeft: 12,
            marginRight: 12,
            position: 'relative',
            width: '100%',
            [theme.breakpoints.up('sm')]: {width: 'auto'}
        },
        searchIcon: {
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            padding: theme.spacing(0, 2),
            pointerEvents: 'none',
            position: 'absolute'
        }
    };
});
