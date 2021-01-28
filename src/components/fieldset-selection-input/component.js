import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiFormLabel from '@material-ui/core/FormLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const FormLabel = withStyles({
    root: {
        marginLeft: 14,
        marginRight: 14,
        marginBottom: 3,
        fontSize: 12
    }
})(MuiFormLabel);

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0
        },
        '&:before': {
            display: 'none'
        },
        '&$expanded': {
            marginTop: 'auto',
            marginBottom: 'auto'
        }
    },
    expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56
        }
    },
    content: {
        '&$expanded': {
            margin: '12px 0'
        }
    },
    expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiAccordionDetails);

export function FieldsetSelectionInput({
    className,
    fieldSets,
    label,
    helperText,
    name,
    register
}) {
    const [value, setValue] = React.useState(null);

    const handleAccordionChange = (newValue) => (event, isExpanded) => {
        setValue(isExpanded ? newValue : null);
    };

    const handleRadioControlClick = (newValue) => (event) => {
        event.stopPropagation();
        event.preventDefault();
        setValue(value !== newValue ? newValue : null);
    };

    return (
        <FormControl className={className} variant="outlined">
            <FormLabel required>{label}</FormLabel>
            <RadioGroup name={`${name}.selection`} value={value}>
                {fieldSets &&
                    fieldSets.map((fieldSet) => {
                        return (
                            <Accordion
                                key={fieldSet.key}
                                TransitionProps={{unmountOnExit: true}}
                                expanded={value === fieldSet.key}
                                onChange={handleAccordionChange(fieldSet.key)}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    id="additional-actions1-header"
                                >
                                    <FormControlLabel
                                        value={fieldSet.key}
                                        onClick={handleRadioControlClick(
                                            fieldSet.key
                                        )}
                                        control={<Radio inputRef={register({required: 'TODO: Change me'})} />}
                                        label={fieldSet.key}
                                    />
                                </AccordionSummary>
                                <AccordionDetails>
                                    {fieldSet.content}
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
            </RadioGroup>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
}
