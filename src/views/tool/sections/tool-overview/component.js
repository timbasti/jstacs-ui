import {Button, Card, CardActions, CardContent, Grid, Typography} from '@material-ui/core';
import React from 'react';

const ToolOverview = ({tool}) => {
    return (
        <Grid
            container
            direction="column"
            spacing={3}
        >
            <Grid item>
                <Card>
                    <CardContent>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                        >
                            {tool.type}
                        </Typography>
                        <Typography color="textSecondary">
                            {'Version: '}
                            {tool.version}
                        </Typography>
                        <Typography
                            component="p"
                            variant="body2"
                        >
                            {tool.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {tool.helpText && <Button size="small">
                            Show Help Text
                        </Button>}
                        {tool.references && <Button size="small">
                            Show Citation
                        </Button>}
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};

export {ToolOverview};
