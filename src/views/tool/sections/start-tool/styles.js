import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(() => ({
    additionalActions: {'&spacing > :not(:first-child)': {marginLeft: 'auto'}},
    form: {},
    formField: {},
    formItem: {},
    inputItem: {width: '100%'}
}));

export const cardActionStyles = makeStyles(() => ({
    additionalActions: {},
    root: {'&.MuiCardActions-spacing > .makeStyles-additionalActions-14:not(:last-child)': {marginLeft: 'auto'}}
}));
