import type { SxProps, BoxProps } from "@mui/material"
import clsx from "clsx"
import Box from "@mui/material/Box"
import Fab from "@mui/material/Fab"
import Typography from "@mui/material/Typography"
import DeleteIcon from "@mui/icons-material/Delete"

import { FileObject } from "./types"

type GetPreviewIconFunc = (
    fileObject: FileObject,
    classes: PreviewListProps["classes"],
) => JSX.Element

export interface PreviewListPropsClasses {
    image?: string
    imageContainer?: string
    removeButton?: string
    root?: string
}

export interface PreviewListProps {
    classes?: PreviewListPropsClasses
    fileObjects: FileObject[]
    getPreviewIcon: GetPreviewIconFunc
    handleRemove: (index: number) => React.EventHandler<any>
    previewGridClasses?: { container?: string,   item?: string }
    previewGridProps?:   { container?: BoxProps, item?: BoxProps }
    showFileNames?: boolean
}

export const PreviewList = (props: PreviewListProps): JSX.Element => {
    const {
        fileObjects,
        previewGridClasses,
        previewGridProps,
        classes,
    } = props

    const boxProps: BoxProps = {
        sx: sxGridContainer,
        ...previewGridProps?.container,
        className: clsx(classes?.root, previewGridClasses?.container),
    }

    const $items = fileObjects.map((fileObject, i) => {
        const itemProps = {
            ...props,
            fileObject,
            index: i,
        }
        return (<PreviewListItem key={i} {...itemProps}/>)
    })

    return (
        <Box {...boxProps}>
            {$items}
        </Box>
    )
}

// =============================================================================

interface PreviewListItemProps extends Omit<PreviewListProps, "fileObjects"> {
    index: number
    fileObject: FileObject
}

const PreviewListItem = (props: PreviewListItemProps): JSX.Element => {
    const {
        index,
        fileObject,
        handleRemove,
        showFileNames,
        previewGridClasses,
        previewGridProps,
        classes,
        getPreviewIcon,
    } = props

    return (
        <Box
            {...previewGridProps?.item}
            sx={sxImageContainer}
            className={clsx(classes?.imageContainer, previewGridClasses?.item)}
        >
            {getPreviewIcon(fileObject, classes)}

            {showFileNames && <Typography component="p">{fileObject.file.name}</Typography>}

            <Fab
                onClick={handleRemove(index)}
                aria-label="Delete"
                sx={sxRemoveButton}
                className={classes?.removeButton}
            >
                <DeleteIcon />
            </Fab>
        </Box>
    )
}

// =============================================================================

const sxGridContainer: SxProps = {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    gap: 8,
}

const sxRemoveButton: SxProps = {
    transition: ".5s ease",
    position: "absolute",
    opacity: 0,
    top: -16,
    right: -16,
    width: 40,
    height: 40,
    "&:focus": {
        opacity: 1,
    },
}

const sxImageContainer: SxProps = {
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    "& img": {
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
    },
    "&:hover svg": {
        opacity: 0.3,
    },
    "&:hover button": {
        opacity: 1,
    },
}
