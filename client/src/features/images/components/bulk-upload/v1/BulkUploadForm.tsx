import CodeMirror, { ReactCodeMirrorRef, useCodeMirror } from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { syntaxHighlighting } from "@codemirror/language"
import { ViewUpdate } from "@codemirror/view"
import { useHotkeys } from "react-hotkeys-hook"
import { EditorSelection, EditorState } from "@codemirror/state"


import { useCallback, useEffect, useRef, useState } from "react"
import Box from "@mui/material/Box"
import LoadingButton from "@mui/lab/LoadingButton"
import InputLabel, { InputLabelProps } from "@mui/material/InputLabel"


import { Card, FormikInput, FormikFileInput, FormikSwitch } from "@feature/common"
import { Actions } from "@app/state"
import { ImageForm, isBlank } from "@app/lib"
import { editorHighlighting, editorTheme } from "./code-mirror-theme"

const inputLabelProps: InputLabelProps = {
    htmlFor: "trans-input",
    sx: {
        mb: 2,
    },
}

export const BulkUploadForm = (_props: unknown): JSX.Element => {

    const editor = useRef()
    const codeMirrorRef = useRef<ReactCodeMirrorRef>()
    const [codeValue, setCodeValue] = useState("")

    const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
        // console.log("value:", value)
        setCodeValue(value)
    }, [setCodeValue])

    const { setContainer } = useCodeMirror({
        autoFocus: true,
        height: "200px",
        // selection: EditorSelection.cursor(5),
        container: editor.current,
        extensions: [
            javascript({ jsx: false }),
            syntaxHighlighting(editorHighlighting),
        ],
        value: codeValue,
        theme: editorTheme,
        onChange: onChange,
    })

    useHotkeys("ctrl+a", () => {
        if (codeMirrorRef.current) {
            // codeMirrorRef.current.view.setState()
        }
    })

    const handleSubmitClick = () => {
        console.log(codeValue)
    }

    useEffect(() => {
        if (editor.current) {
            setContainer(editor.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor.current])


    return (
        <Card>
            <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
                <Box>
                    <InputLabel {...inputLabelProps}>Transformation</InputLabel>
                    {/* <CodeMirror
                        editable={true}
                        ref={codeMirrorRef}
                        // id="trans-input"
                        value={codeValue}
                    /> */}
                    <div id="editor" ref={editor} />
                </Box>
                <Box sx={{ mt: 3 }}>
                    <LoadingButton
                        variant="contained"
                        // loading={formik.isSubmitting}
                        // disabled={!formik.isValid}
                        onClick={handleSubmitClick}
                    >
                        Submit
                    </LoadingButton>
                </Box>
            </Box>
        </Card>
    )
}
