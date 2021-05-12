import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, {useCallback, useState} from 'react';

import {useStyles} from './styles';

export const ControlledAccordions = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const createChangeHandler = useCallback((panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }, [setExpanded]);

    return (
        <div className={classes.root}>
            <Accordion
                TransitionProps={{unmountOnExit: true}}
                expanded={expanded === 'panel1'}
                onChange={createChangeHandler('panel1')}
            >
                <AccordionSummary
                    aria-controls="panel1bh-content"
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>
                        Select existing Application
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                        Use this to change an application name or to add/remove tools
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id
                        dignissim quam.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                TransitionProps={{unmountOnExit: true}}
                expanded={expanded === 'panel2'}
                onChange={createChangeHandler('panel2')}
            >
                <AccordionSummary
                    aria-controls="panel2bh-content"
                    expandIcon={<ExpandMoreIcon />}
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>
                        Create new Application
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                        Use this to create a new application with a selected set of tools
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit.
                        Pellentesque convallis laoreet laoreet.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
