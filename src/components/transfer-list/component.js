import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useFormContext} from 'react-hook-form';

import {intersection, not, union} from '../../helpers/data-helpers';
import {useCustomListStyles, useTransferListStyles} from './styles';

const CustomList = ({title, items, checked, onChange}) => {
    const classes = useCustomListStyles();

    const numberOfChecked = useCallback(() => intersection(checked, items).length, [checked, items]);

    const createToggleHandler = useCallback(
        (selectedItem) => () => {
            const currentIndex = checked.indexOf(selectedItem);
            const newChecked = [...checked];

            if (currentIndex === -1) {
                newChecked.push(selectedItem);
            } else {
                newChecked.splice(currentIndex, 1);
            }

            onChange(newChecked);
        },
        [checked, onChange]
    );

    const handleToggleAll = useCallback(() => {
        if (numberOfChecked(items) === items.length) {
            onChange(not(checked, items));
        } else {
            onChange(union(checked, items));
        }
    }, [checked, items, numberOfChecked, onChange]);

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Checkbox
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        disabled={items.length === 0}
                        indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                        inputProps={{'aria-label': 'all items selected'}}
                        onClick={handleToggleAll}
                    />
                }
                className={classes.cardHeader}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
                title={title}
            />
            <Divider />
            <List
                className={classes.list}
                component="div"
                dense
                role="list"
            >
                {items.map((item) => <ListItem
                    button
                    key={item.value}
                    onClick={createToggleHandler(item)}
                    role="listitem"
                >
                    <ListItemIcon>
                        <Checkbox
                            checked={checked.indexOf(item) !== -1}
                            disableRipple
                            tabIndex={-1}
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={item.title}
                        secondary={item.hint}
                    />
                </ListItem>)}
                <ListItem />
            </List>
        </Card>
    );
};

CustomList.propTypes = {
    checked: PropTypes.arrayOf(PropTypes.shape({
        hint: PropTypes.any,
        title: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired
    })),
    items: PropTypes.arrayOf(PropTypes.shape({
        hint: PropTypes.any,
        title: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired
    })),
    onChange: PropTypes.func,
    title: PropTypes.string.isRequired
};

CustomList.defaultProps = {
    checked: [],
    items: [],
    onChange: () => {}
};

export const TransferList = ({options, defaultValue, name, titleOptions, titleSelections, required, onChange}) => {
    const classes = useTransferListStyles();
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);

    const {register, setValue} = useFormContext();

    const {...registrationProps} = useMemo(() => {
        return register(name, {required});
    }, [name, register, required]);

    useEffect(() => {
        const selectedOptions = defaultValue.map((dValue) => options.find(({value}) => value === dValue));
        const availableOptions = not(options, selectedOptions);
        setLeft(availableOptions);
        setRight(selectedOptions);
    }, [defaultValue, options]);

    useEffect(() => {
        const selectedValues = right.map(({value}) => value);
        onChange(selectedValues);
        setValue(name, selectedValues);
    }, [name, onChange, right, setValue]);

    const leftChecked = useMemo(() => intersection(checked, left), [checked, left]);
    const rightChecked = useMemo(() => intersection(checked, right), [checked, right]);

    const handleCheckedRight = useCallback(() => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    }, [checked, left, right, leftChecked]);

    const handleCheckedLeft = useCallback(() => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    }, [checked, left, right, rightChecked]);

    const handleCheckedRightUp = useCallback(() => {
        const indexOfChecked = right.indexOf(rightChecked[0]);
        const copy = right.slice();
        copy.splice(indexOfChecked - 1, 0, copy.splice(indexOfChecked, 1)[0]);
        setRight(copy);
    }, [right, rightChecked, setRight]);

    const handleCheckedRightDown = useCallback(() => {
        const indexOfChecked = right.indexOf(rightChecked[0]);
        const copy = right.slice();
        copy.splice(indexOfChecked + 1, 0, copy.splice(indexOfChecked, 1)[0]);
        setRight(copy);
    }, [right, rightChecked, setRight]);

    return (
        <Grid
            alignItems="center"
            className={classes.root}
            container
        >
            <Grid
                className={classes.list}
                item
                xs
            >
                <CustomList
                    checked={checked}
                    items={left}
                    onChange={setChecked}
                    title={titleOptions}
                />
            </Grid>
            <Grid
                item
                lg={1}
                xs={2}
            >
                <Grid
                    alignItems="center"
                    container
                    direction="column"
                >
                    <Button
                        aria-label="move selected right"
                        className={classes.button}
                        disabled={leftChecked.length === 0}
                        onClick={handleCheckedRight}
                        size="small"
                        variant="outlined"
                    >
                        <KeyboardArrowRightIcon />
                    </Button>
                    <Button
                        aria-label="move selected left"
                        className={classes.button}
                        disabled={rightChecked.length === 0}
                        onClick={handleCheckedLeft}
                        size="small"
                        variant="outlined"
                    >
                        <KeyboardArrowLeftIcon />
                    </Button>
                    <Button
                        aria-label="move selected right"
                        className={classes.button}
                        disabled={rightChecked.length !== 1 || rightChecked[0] === right[0]}
                        onClick={handleCheckedRightUp}
                        size="small"
                        variant="outlined"
                    >
                        <KeyboardArrowUpIcon />
                    </Button>
                    <Button
                        aria-label="move selected left"
                        className={classes.button}
                        disabled={rightChecked.length !== 1 || rightChecked[0] === right[right.length - 1]}
                        onClick={handleCheckedRightDown}
                        size="small"
                        variant="outlined"
                    >
                        <KeyboardArrowDownIcon />
                    </Button>
                    <input
                        type="hidden"
                        {...registrationProps}
                    />
                </Grid>
            </Grid>
            <Grid
                className={classes.list}
                item
                xs
            >
                <CustomList
                    checked={checked}
                    items={right}
                    onChange={setChecked}
                    title={titleSelections}
                />
            </Grid>
        </Grid>
    );
};

TransferList.propTypes = {
    defaultValue: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])),
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        hint: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    })),
    required: PropTypes.bool,
    titleOptions: PropTypes.string,
    titleSelections: PropTypes.string
};

TransferList.defaultProps = {
    defaultValue: [],
    onChange: () => {},
    options: [],
    required: false,
    titleOptions: 'Choices',
    titleSelections: 'Chosen'
};
