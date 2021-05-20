import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography
} from '@material-ui/core';
import React, {useCallback, useMemo, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const VersionTypography = ({version}) => {
    return (
        <>
            <Typography
                color="textSecondary"
                component="span"
            >
                {'Version: '}
            </Typography>
            <Typography
                component="span"
                variant="body2"
            >
                {version}
            </Typography>
        </>
    );
};

const DescriptionTypography = ({description}) => {
    return (
        <>
            <Typography color="textSecondary">
                Description:
            </Typography>
            <Typography
                component="p"
                variant="body2"
            >
                {description}
            </Typography>
        </>
    );
};

const CitationDialog = ({references, onToggle, open}) => {
    return (
        <Dialog
            fullWidth
            maxWidth="md"
            onBackdropClick={onToggle}
            open={open}
        >
            <DialogTitle>
                Citation
            </DialogTitle>
            <DialogContent>
                {references.map((reference) => <pre key={btoa(reference)}>
                    <code>
                        {reference}
                    </code>
                </pre>)}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onToggle}
                    size="small"
                >
                    Close Citation
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const HelpText = ({helpText}) => {
    return (
        <Card>
            <CardContent>
                <Typography
                    component="h2"
                    gutterBottom
                    variant="h5"
                >
                    Help text
                </Typography>
                <ReactMarkdown plugins={[gfm]}>
                    {helpText}
                </ReactMarkdown>
            </CardContent>
        </Card>
    );
};

const ToolOverview = ({references, version, description, helpText}) => {
    const [openCitation, setOpenCitation] = useState(false);

    const handleToggleCitation = useCallback(() => {
        setOpenCitation(!openCitation);
    }, [openCitation]);

    const renderedVersion = useMemo(() => {
        return version && <VersionTypography version={version} />;
    }, [version]);

    const renderedDescription = useMemo(() => {
        return description && <DescriptionTypography description={description} />;
    }, [description]);

    const renderedShowCitation = useMemo(() => {
        return (
            references &&
                <Button
                    onClick={handleToggleCitation}
                    size="small"
                >
                    Show Citation
                </Button>

        );
    }, [handleToggleCitation, references]);

    const renderedCitation = useMemo(() => {
        return references && <CitationDialog
            onToggle={handleToggleCitation}
            open={openCitation}
            references={references}
        />;
    }, [handleToggleCitation, openCitation, references]);

    const renderedHelpText = useMemo(() => {
        return helpText && <HelpText helpText={helpText} />;
    }, [helpText]);

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
                            component="h2"
                            gutterBottom
                            variant="h5"
                        >
                            General information
                        </Typography>
                        {renderedVersion}
                        {renderedDescription}
                    </CardContent>
                    <CardActions>
                        {renderedShowCitation}
                        {renderedCitation}
                    </CardActions>
                </Card>
            </Grid>
            <Grid item>
                {renderedHelpText}
            </Grid>
        </Grid>
    );
};

export {ToolOverview};
