import { useRef, useState } from "react"

export interface FileInputProps {
    label: string
}

const defaultProps: Partial<FileInputProps> = {

}

export const FileInput = (props: FileInputProps): JSX.Element => {

    props = { ...defaultProps, ...props }

    const fileInputRef = useRef<HTMLInputElement>()

    const [file, setFile] = useState<File>(null)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files[0])
    }

    if (fileInputRef.current) {
        console.log("got a ref")
    }

    return (
        <>
            <input
                ref={fileInputRef}
                style={{
                    display: "none",
                }}
                type="file"
                onChange={handleChange}
            />
        </>
    )
}
