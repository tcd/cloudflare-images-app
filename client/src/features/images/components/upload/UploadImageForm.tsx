import Box from "@mui/material/Box"

export const UploadImageForm = (_props: unknown): JSX.Element => {
    return (
        <Box>
            <form action="http://localhost:3000/api/cloudflare/images/create" method="post">
                <label htmlFor="fname">First name:</label>
                <br/>
                <input type="text" id="fname" name="fname"/>
                <br/>
                <label htmlFor="lname">Last name:</label>
                <br/>
                <input type="text" id="lname" name="lname"/>
                <br/>
                <hr/>
                <br/>
                <button type="submit">submit</button>
            </form>
        </Box>
    )
}
