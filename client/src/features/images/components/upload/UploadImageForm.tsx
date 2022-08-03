import Box from "@mui/material/Box"

export const UploadImageForm = (_props: unknown): JSX.Element => {
    return (
        <Box>
            <iframe name="hiddenFrame" style={{ display: "none", border: 0, width: 0, height: 0 }}></iframe>
            <form
                action="http://localhost:3000/api/cloudflare/images/create"
                method="post"
                encType="multipart/form-data"
                target="hiddenFrame"
            >
                <label htmlFor="firstName">First name:</label>
                <br/>
                <input type="text" id="firstName" name="firstName" value="John" />
                <br/>
                <label htmlFor="lastName">Last name:</label>
                <br/>
                <input type="text" id="lastName" name="lastName" value="Smith" />
                <br/>
                <hr/>
                <br/>
                <button type="submit">submit</button>
            </form>
        </Box>
    )
}
