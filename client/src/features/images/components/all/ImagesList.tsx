import { ListItemIcon } from "@mui/material"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"

import Cloudflare from "cloudflare-images"
import { isBlank } from "@app/lib"

export interface ImagesListProps {
    images: Cloudflare.Images.Image[]
}

export const ImagesList = ({ images }: ImagesListProps): JSX.Element => {

    if (isBlank(images)) {
        return null
    }

    const listItems = images.map(x => <Image key={x.id} image={x} />)

    return (
        <List>
            {listItems}
        </List>
    )
}

// =============================================================================
// List Item
// =============================================================================

export interface ImageProps {
    image: Cloudflare.Images.Image
}

export const Image = ({ image }: ImageProps): JSX.Element => {

    if (!image) {
        return null
    }

    return (
        <ListItem alignItems="flex-start">
            {/* <ListItemIcon>

            </ListItemIcon> */}
            <ListItemText
                primary={image.id}
                secondary={image.filename}
            />

        </ListItem>
    )
}

// {
//     "id": "icons/resistance",
//     "filename": "Resistance.png",
//     "uploaded": "2022-07-17T21:41:04.717Z",
//     "requireSignedURLs": false,
//     "variants": [
//         "https://imagedelivery.net/tIYDWdG54zSW0jZ2i4FVmQ/icons/resistance/public",
//         "https://imagedelivery.net/tIYDWdG54zSW0jZ2i4FVmQ/icons/resistance/1024",
//         "https://imagedelivery.net/tIYDWdG54zSW0jZ2i4FVmQ/icons/resistance/128",
//         "https://imagedelivery.net/tIYDWdG54zSW0jZ2i4FVmQ/icons/resistance/512",
//         "https://imagedelivery.net/tIYDWdG54zSW0jZ2i4FVmQ/icons/resistance/256",
//         "https://imagedelivery.net/tIYDWdG54zSW0jZ2i4FVmQ/icons/resistance/72",
//     ],
// },
