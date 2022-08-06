import type {
    AlertColor,
    BoxProps,
    SnackbarOrigin,
    Theme,
    SxProps,
} from "@mui/material"
import { PureComponent } from "react"
import clsx from "clsx"
import Box from "@mui/material/Box"
import Snackbar from "@mui/material/Snackbar"
import Typography from "@mui/material/Typography"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import Dropzone, { DropzoneProps } from "react-dropzone"

// =============================================================================

import { convertBytesToMbsOrKbs, isImage, readFile } from "../helpers"
import { FileObject, GetPreviewIconFunc } from "../types"
import { DropzoneAreaBaseProps } from "./props"
import { withTheme } from "../with-theme"
import { PreviewList, PreviewListProps } from "../PreviewList"
import { SnackbarContentWrapper } from "../SnackbarContentWrapper"

// =============================================================================

const defaultSnackbarAnchorOrigin: SnackbarOrigin = {
    horizontal: "left",
    vertical: "bottom",
}

const defaultGetPreviewIcon: GetPreviewIconFunc = (fileObject, classes) => {
    const { data, file } = fileObject || {}
    if (isImage(file)) {
        const src = typeof data === "string" ? data : undefined
        return <img className={classes?.image} role="presentation" src={src} />
    }

    return (
        <AttachFileIcon
            sx={{
                height: 100,
                width: "initial",
                maxWidth: "100%",
                color: "text.primary",
                transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
                boxSizing: "border-box",
                boxShadow: "rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px",
                borderRadius: 1,
                zIndex: 5,
                opacity: 1,
            }}
            className={classes?.image}
        />
    )
}

type DropzoneAreaBaseState = {
    openSnackBar: boolean
    snackbarMessage: string
    snackbarVariant: AlertColor
}

type DefaultSx = {
    root: SxProps
    active: SxProps
    invalid: SxProps
    textContainer: SxProps
    text: SxProps
    icon: SxProps
}

const DEFAULT_PROPS: Partial<DropzoneAreaBaseProps> = {
    accept: {},
    filesLimit: 3,
    fileObjects: [] as FileObject[],
    maxFileSize: 3_000_000,
    dropzoneText: "Drag and drop a file here or click",
    previewText: "Preview:",
    disableRejectionFeedback: false,
    showPreviews: false, // By default previews show up under in the dialog and inside in the standalone
    showPreviewsInDropzone: true,
    showFileNames: false,
    showFileNamesInPreview: false,
    previewGridClasses: {},
    previewGridProps: {},
    showAlerts: true,
    alertSnackbarProps: {
        anchorOrigin: {
            horizontal: "left",
            vertical: "bottom",
        },
        autoHideDuration: 6000,
    },
    getFileLimitExceedMessage: (filesLimit: number): string => `Maximum allowed number of files exceeded. Only ${filesLimit} allowed`,
    getFileAddedMessage: ((fileName) => `File ${fileName} successfully added.`) as NonNullable<DropzoneAreaBaseProps["getFileAddedMessage"]>,
    getPreviewIcon: defaultGetPreviewIcon,
    getFileRemovedMessage: ((fileName) => `File ${fileName} removed.`) as NonNullable<DropzoneAreaBaseProps["getFileRemovedMessage"]>,
    getDropRejectMessage: ((rejectedFile, accept, maxFileSize): string => {
        let message = `File ${rejectedFile.file.name} was rejected. `
        if (!Object.values(accept).flat().includes(rejectedFile.file.type)) {
            message += "File type not supported. "
        }
        if (rejectedFile?.file.size > maxFileSize) {
            message += "File is too big. Size limit is " + convertBytesToMbsOrKbs(maxFileSize) + ". "
        }
        return message
    }) as NonNullable<DropzoneAreaBaseProps["getDropRejectMessage"]>,
}

// const DEFAULT_SX: DefaultSx = {
// }

/**
 * This components creates a Material-UI Dropzone, with previews and snackbar notifications.
 */
class DropzoneAreaBase extends PureComponent<
    DropzoneAreaBaseProps & { theme: Theme },
    DropzoneAreaBaseState
> {

    public static defaultProps: Partial<DropzoneAreaBaseProps> = DEFAULT_PROPS

    public state: DropzoneAreaBaseState = {
        openSnackBar: false,
        snackbarMessage: "",
        snackbarVariant: "success",
    }

    public notifyAlert() {
        const { onAlert } = this.props
        const { openSnackBar, snackbarMessage, snackbarVariant } = this.state
        if (openSnackBar && onAlert) {
            onAlert(snackbarMessage, snackbarVariant)
        }
    }

    public handleDropAccepted: DropzoneProps["onDropAccepted"] = async (acceptedFiles, evt) => {
        const {
            fileObjects,
            filesLimit = DEFAULT_PROPS.filesLimit,
            getFileAddedMessage = DEFAULT_PROPS.getFileAddedMessage,
            getFileLimitExceedMessage = DEFAULT_PROPS.getFileLimitExceedMessage,
            onAdd,
            onDrop,
        } = this.props

        if (filesLimit > 1 && fileObjects.length + acceptedFiles.length > filesLimit) {
            this.setState(
                {
                    openSnackBar: true,
                    snackbarMessage: getFileLimitExceedMessage(filesLimit),
                    snackbarVariant: "error",
                },
                this.notifyAlert,
            )
            return
        }

        // Notify Drop event
        if (onDrop) {
            onDrop(acceptedFiles, evt)
        }

        // Retrieve fileObjects data
        const fileObjs = await Promise.all(
            acceptedFiles.map(async (file) => {
                const data = await readFile(file)
                return {
                    file,
                    data,
                }
            }),
        )

        // Notify added files
        if (onAdd) {
            onAdd(fileObjs)
        }

        // Display message
        const message = fileObjs.reduce(
            (msg, fileObj) => msg + getFileAddedMessage(fileObj.file.name),
            "",
        )
        this.setState(
            {
                openSnackBar: true,
                snackbarMessage: message,
                snackbarVariant: "success",
            },
            this.notifyAlert,
        )
    }

    public handleDropRejected: DropzoneProps["onDropRejected"] = (rejectedFiles, evt) => {
        const {
            accept,
            filesLimit = DEFAULT_PROPS.filesLimit,
            fileObjects,
            getDropRejectMessage = DEFAULT_PROPS.getDropRejectMessage,
            getFileLimitExceedMessage = DEFAULT_PROPS.getFileLimitExceedMessage,
            maxFileSize = DEFAULT_PROPS.maxFileSize,
            onDropRejected,
        } = this.props

        let message = ""
        if (fileObjects.length + rejectedFiles.length > filesLimit) {
            message = getFileLimitExceedMessage(filesLimit)
        } else {
            rejectedFiles.forEach((rejectedFile) => {
                message = getDropRejectMessage(
                    rejectedFile,
                    accept,
                    maxFileSize,
                )
            })
        }

        if (onDropRejected) {
            onDropRejected(rejectedFiles, evt)
        }

        this.setState(
            {
                openSnackBar: true,
                snackbarMessage: message,
                snackbarVariant: "error",
            },
            this.notifyAlert,
        )
    }

    public handleRemove: PreviewListProps["handleRemove"] = (fileIndex) => (event) => {
        event.stopPropagation()

        const {
            fileObjects,
            getFileRemovedMessage = DEFAULT_PROPS.getFileRemovedMessage,
            onDelete,
        } = this.props

        // Find removed fileObject
        const removedFileObj = fileObjects[fileIndex]

        // Notify removed file
        if (onDelete) {
            onDelete(removedFileObj, fileIndex)
        }

        this.setState(
            {
                openSnackBar: true,
                snackbarMessage: getFileRemovedMessage(removedFileObj.file.name),
                snackbarVariant: "info",
            },
            this.notifyAlert,
        )
    }

    public handleCloseSnackbar = () => {
        this.setState({
            openSnackBar: false,
        })
    }

    public defaultSx: DefaultSx = {
        root: {
            "@keyframes progress": {
                "0%": {
                    backgroundPosition: "0 0",
                },
                "100%": {
                    backgroundPosition: "-70px 0",
                },
            },
            position: "relative",
            width: "100%",
            minHeight: "250px",
            backgroundColor: "background.paper",
            border: "dashed",
            borderColor: "divider",
            borderRadius: 1,
            boxSizing: "border-box",
            cursor: "pointer",
            overflow: "hidden",
        },
        active: {
            animation: "$progress 2s linear infinite !important",
            backgroundImage: `repeating-linear-gradient(-45deg, ${this.props.theme.palette.background.paper}, ${this.props.theme.palette.background.paper} 25px, ${this.props.theme.palette.divider} 25px, ${this.props.theme.palette.divider} 50px)`,
            backgroundSize: "150% 100%",
            border: "solid",
            borderColor: "primary.light",
        },
        invalid: {
            backgroundImage: `repeating-linear-gradient(-45deg, ${this.props.theme.palette.error.light}, ${this.props.theme.palette.error.light} 25px, ${this.props.theme.palette.error.dark} 25px, ${this.props.theme.palette.error.dark} 50px)`,
            borderColor: "error.main",
        },
        textContainer: {
            textAlign: "center",
        },
        text: {
            marginBottom: 3,
            marginTop: 3,
        },
        icon: {
            width: 51,
            height: 51,
            color: "text.primary",
        },
    }

    public render() {
        const {
            accept,
            alertSnackbarProps,
            classes = {},
            disableRejectionFeedback,
            dropzoneClass,
            dropzoneParagraphClass,
            dropzoneProps,
            dropzoneText,
            fileObjects,
            filesLimit = DEFAULT_PROPS.filesLimit,
            getPreviewIcon = DEFAULT_PROPS.getPreviewIcon,
            Icon,
            inputProps,
            maxFileSize,
            previewGridClasses,
            previewGridProps,
            previewText,
            showAlerts,
            showFileNames,
            showFileNamesInPreview,
            showPreviews,
            showPreviewsInDropzone,
        } = this.props
        const { openSnackBar, snackbarMessage, snackbarVariant } = this.state

        // const acceptFiles = acceptedFiles?.join(",")
        const isMultiple = filesLimit > 1
        const previewsVisible = showPreviews && fileObjects.length > 0
        const previewsInDropzoneVisible = showPreviewsInDropzone && fileObjects.length > 0

        return (
            <>
                <Dropzone
                    {...dropzoneProps}
                    accept={accept}
                    onDropAccepted={this.handleDropAccepted}
                    onDropRejected={this.handleDropRejected}
                    maxSize={maxFileSize}
                    multiple={isMultiple}
                >
                    {({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
                        const isActive = isDragActive
                        const isInvalid = !disableRejectionFeedback && isDragReject

                        return (
                            <Box
                                sx={
                  {
                      ...this.defaultSx.root,
                      ...(isActive ? this.defaultSx.active : {}),
                      ...(isInvalid ? this.defaultSx.invalid : {}),
                  } as BoxProps["sx"]
                                }
                                {...getRootProps({
                                    className: clsx(
                                        classes.root,
                                        dropzoneClass,
                                        isActive && classes.active,
                                        isInvalid && classes.invalid,
                                    ),
                                })}
                            >
                                <input {...getInputProps(inputProps)} />

                                <Box
                                    sx={this.defaultSx.textContainer}
                                    className={classes.textContainer}
                                >
                                    <Typography
                                        variant="h5"
                                        component="p"
                                        sx={this.defaultSx.text}
                                        className={clsx(classes.text, dropzoneParagraphClass)}
                                    >
                                        {dropzoneText}
                                    </Typography>
                                    {Icon ? (
                                        <Icon sx={this.defaultSx.icon} className={classes.icon} />
                                    ) : (
                                        <CloudUploadIcon
                                            sx={this.defaultSx.icon}
                                            className={classes.icon}
                                        />
                                    )}
                                </Box>

                                {previewsInDropzoneVisible ? (
                                    <PreviewList
                                        fileObjects={fileObjects}
                                        handleRemove={this.handleRemove}
                                        getPreviewIcon={getPreviewIcon}
                                        showFileNames={showFileNames}
                                        previewGridClasses={previewGridClasses}
                                        previewGridProps={previewGridProps}
                                    />
                                ) : null}
                            </Box>
                        )
                    }}
                </Dropzone>

                {previewsVisible ? (
                    <>
                        <Typography variant="subtitle1" component="span">
                            {previewText}
                        </Typography>

                        <PreviewList
                            fileObjects={fileObjects}
                            handleRemove={this.handleRemove}
                            getPreviewIcon={getPreviewIcon}
                            showFileNames={showFileNamesInPreview}
                            previewGridClasses={previewGridClasses}
                            previewGridProps={previewGridProps}
                        />
                    </>
                ) : null}

                {(typeof showAlerts === "boolean" && showAlerts) ||
                    (Array.isArray(showAlerts) && showAlerts.includes(snackbarVariant)) ? (
                        <Snackbar
                            anchorOrigin={defaultSnackbarAnchorOrigin}
                            autoHideDuration={6000}
                            {...alertSnackbarProps}
                            open={openSnackBar}
                            onClose={this.handleCloseSnackbar}
                        >
                            <SnackbarContentWrapper
                                onClose={this.handleCloseSnackbar}
                                variant={snackbarVariant}
                                message={snackbarMessage}
                            />
                        </Snackbar>
                    ) : null}
            </>
        )
    }
}

// @ts-expect-error
export const ThemedDropzoneAreaBase = withTheme<DropzoneAreaBaseProps>(DropzoneAreaBase)
