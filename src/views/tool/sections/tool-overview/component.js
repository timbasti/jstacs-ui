import {
    Box,
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

import {useCitationDialogStyles} from './styles';

const VersionTypography = ({version}) => {
    return (
        <Box>
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
        </Box>
    );
};

const DescriptionTypography = ({description}) => {
    return (
        <Grid
            alignItems="baseline"
            container
            spacing={1}
        >
            <Typography
                color="textSecondary"
                component={Grid}
                item
            >
                Description:
            </Typography>
            <Grid item>
                <Typography
                    component="pre"
                    variant="body2"
                >
                    {description}
                </Typography>
            </Grid>
        </Grid>
    );
};

const CitationDialog = ({references, onToggle, open}) => {
    const classes = useCitationDialogStyles();

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
                <Box
                    className={classes.content}
                    p={1}
                >
                    {references.map((reference) => <pre key={btoa(reference)}>
                        <code>
                            {reference}
                        </code>
                    </pre>)}
                </Box>
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

const GeneralInformation = ({description, references, version}) => {
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
            references.length > 0 &&
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

    return (
        <Card>
            <CardContent>
                <Typography
                    component="h2"
                    gutterBottom
                    variant="h6"
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
    );
};

const HelpText = ({helpText}) => {
    const cleanedHelpText = useMemo(() => {
        const regex = /^\.\.\s+_(?<linkKey>.*?)\s*:\s*(?<linkTarget>.*)$/gmu;
        let newHelpText = helpText;
        let linkDef = null;
        while ((linkDef = regex.exec(newHelpText)) !== null) {
            const {0: line, groups: {linkKey, linkTarget}} = linkDef;
            newHelpText = newHelpText.replace(`${linkKey}_`, `[${linkKey}](${linkTarget})`);
            newHelpText = newHelpText.replace(line, '');
        }

        const quoteRegex = /\\\\/gmu;
        let quoteDef = null;
        console.log('test');
        while ((quoteDef = quoteRegex.exec(newHelpText)) !== null) {
            console.log(quoteDef);
            const {0: line, groups: {linkKey, linkTarget}} = quoteDef;
            newHelpText = newHelpText.replace(`${linkKey}_`, `[${linkKey}](${linkTarget})`);
            newHelpText = newHelpText.replace(line, '');
        }

        return newHelpText;
    }, [helpText]);

    return (
        <Card>
            <CardContent>
                <Typography
                    component="h2"
                    gutterBottom
                    variant="h6"
                >
                    Help text
                </Typography>
                <ReactMarkdown remarkPlugins={[gfm]}>
                    {cleanedHelpText}
                </ReactMarkdown>
            </CardContent>
        </Card>
    );
};

const ToolOverview = ({description, helpText, references, version}) => {
    const renderedGeneralInformation = useMemo(() => {
        return <GeneralInformation
            description={description}
            references={references}
            version={version}
        />;
    }, [description, references, version]);

    const renderedHelpText = useMemo(() => {
        return helpText && <HelpText helpText={helpText} />;
    }, [helpText]);

    return (
        <Box
            p={3}
            width="100%"
        >
            <Grid
                container
                direction="column"
                spacing={3}
            >
                <Grid item>
                    {renderedGeneralInformation}
                </Grid>
                <Grid item>
                    {renderedHelpText}
                </Grid>
            </Grid>
        </Box>
    );
};

export {ToolOverview};
