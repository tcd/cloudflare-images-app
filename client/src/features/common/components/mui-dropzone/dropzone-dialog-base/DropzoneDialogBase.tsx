import React, { PureComponent } from "react"
import { Breakpoint } from "@mui/material"
import Button, { ButtonProps } from "@mui/material/Button"
import Dialog, { DialogProps } from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"

import { ThemedDropzoneAreaBase, DropzoneAreaBaseProps } from "../dropzone-area-base"

export type DropzoneDialogBaseProps = DropzoneAreaBaseProps & {
  /** Cancel button text in dialog. */
  cancelButtonText?: string;
  /**
   * Props to pass to the Material-UI Dialog components.
   * @see See [Material-UI Dialog](https://material-ui.com/api/dialog/#props) for available values.
   */
  dialogProps?: DialogProps;
  /** The Dialog title. */
  dialogTitle?: string | JSX.Element;
  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   */
  fullWidth?: boolean;
  /**
   * Determine the max-width of the dialog. The dialog width grows with the size of the screen.
   *
   * Set to `false` to disable `maxWidth`.
   */
  maxWidth?: Breakpoint;
  /**
   * Fired when the modal is closed.
   *
   * @param {SyntheticEvent} event The react `SyntheticEvent`
   */
  onClose?: DialogProps["onClose"];
  /**
   * Fired when the user clicks the Submit button.
   *
   * @param {SyntheticEvent} event The react `SyntheticEvent`
   */
  onSave?: (event: React.SyntheticEvent) => void;
  /** Sets whether the dialog is open or closed. */
  open?: boolean;
  /**
   * Shows previews **BELOW** the dropzone.
   *
   * **Note:** By default previews show up under in the Dialog and inside in the standalone.
   */
  showPreviews?: boolean;
  /** Submit button text in dialog. */
  submitButtonText?: string;
};

// Split props related to DropzoneDialog from DropzoneArea ones
function splitDropzoneDialogProps(allProps: DropzoneDialogBaseProps) {
    const defaults = DropzoneDialogBase.defaultProps

    const {
        cancelButtonText = defaults.cancelButtonText,
        dialogProps = defaults.dialogProps,
        dialogTitle = defaults.dialogTitle,
        fullWidth = defaults.fullWidth,
        maxWidth = defaults.maxWidth,
        onClose,
        onSave,
        open = defaults.open,
        submitButtonText = defaults.submitButtonText,
        ...dropzoneAreaProps
    } = allProps

    const dropzoneDialogProps = {
        cancelButtonText,
        dialogProps,
        dialogTitle,
        fullWidth,
        maxWidth,
        onClose,
        onSave,
        open,
        submitButtonText,
    }

    const splitProps = [dropzoneDialogProps, dropzoneAreaProps] as [
        typeof dropzoneDialogProps,
        typeof dropzoneAreaProps
    ]
    return splitProps
}

/**
 * This component provides the DropzoneArea inside of a Material-UI Dialog.
 *
 * It supports all the Props and Methods from `DropzoneAreaBase`.
 */
export class DropzoneDialogBase extends PureComponent<DropzoneDialogBaseProps> {

    public static defaultProps: Partial<DropzoneDialogBaseProps> = {
        open: false,
        dialogTitle: "Upload file",
        dialogProps: {} as NonNullable<DropzoneDialogBaseProps["dialogProps"]>,
        fullWidth: true,
        maxWidth: "sm" as NonNullable<DropzoneDialogBaseProps["maxWidth"]>,
        cancelButtonText: "Cancel",
        submitButtonText: "Submit",
        showPreviews: true,
        showPreviewsInDropzone: false,
        showFileNamesInPreview: true,
    }

    private handlePressClose: ButtonProps["onClick"] = (e) => {
        const { onClose } = this.props
        onClose?.(e, "backdropClick")
    }

    public render() {
        const [dropzoneDialogProps, dropzoneAreaProps] = splitDropzoneDialogProps(
            this.props,
        )
        const {
            cancelButtonText,
            dialogProps,
            dialogTitle,
            fullWidth,
            maxWidth,
            onClose,
            onSave,
            open,
            submitButtonText,
        } = dropzoneDialogProps

        // Submit button state
        const submitDisabled = dropzoneAreaProps.fileObjects.length === 0

        return (
            <Dialog
                {...dialogProps}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                onClose={onClose}
                open={open}
            >
                <DialogTitle>{dialogTitle}</DialogTitle>

                <DialogContent>
                    <ThemedDropzoneAreaBase {...dropzoneAreaProps} />
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.handlePressClose}>{cancelButtonText}</Button>

                    <Button
                        variant="contained"
                        disabled={submitDisabled}
                        onClick={onSave}
                    >
                        {submitButtonText}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
