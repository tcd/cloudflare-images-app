import Box from "@mui/material/Box"

export const UploadImageForm = (_props: unknown): JSX.Element => {

    const formProps: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> = {
        action: "http://localhost:3000/api/cloudflare/images/create",
        method: "post",
        encType: "multipart/form-data",
        target: "hiddenFrame",
    }

    return (
        <Box>
            <iframe name="hiddenFrame" style={{ display: "none", border: 0, width: 0, height: 0 }}></iframe>
            <form {...formProps}>

                <div>
                    <label htmlFor="firstName">First name:</label>
                    <br/>
                    <input type="text" name="firstName" value="John" />
                </div>

                <br/>

                <div>
                    <label htmlFor="lastName">Last name:</label>
                    <br/>
                    <input type="text" name="lastName" value="Smith" />
                </div>

                <br/>

                <div>
                    <label htmlFor="theFile">The File: </label>
                    <br/>
                    <input type="file" name="theFile" />
                </div>

                <br/>

                <div>
                    <hr/>
                    <br/>
                    <button type="submit">submit</button>
                </div>

            </form>
        </Box>
    )
}
