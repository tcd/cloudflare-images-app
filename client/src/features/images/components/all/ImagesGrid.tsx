import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useConfirm } from "material-ui-confirm"
import { DateTime } from "luxon"
import type { SxProps } from "@mui/material"
import Box from "@mui/material/Box"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
// import Stack from "@mui/material/Stack"
// import Tooltip from "@mui/material/Tooltip"
// import IconButton from "@mui/material/IconButton"
// import EyeIcon from "@mui/icons-material/RemoveRedEye"
// import DeleteIcon from "@mui/icons-material/Delete"
// import EditIcon from "@mui/icons-material/Edit"
// import LaunchIcon from "@mui/icons-material/Launch"

import { ImageWithoutVariants, ImageWithoutVariantsWithSrc } from "@app/lib"
import { Actions, Selectors } from "@app/state"
import { DataTable, DataTableColumn  } from "@feature/common"

const boxSx: SxProps = {
    // width: 500,
    // height: 450,
    overflowY: "scroll",
}

export const ImagesGrid = (_props: unknown): JSX.Element => {

    const images = useSelector(Selectors.Images.all.filteredWithSrc)

    const $images = images.map(img => <Image key={img.id} image={img} />)

    return (
        <Box sx={boxSx}>
            <ImageList variant="masonry" cols={3} gap={8}>
                {$images}
            </ImageList>
        </Box>
    )
}

interface ImageProps {
    image: ImageWithoutVariantsWithSrc
}

const Image = ({ image }: ImageProps): JSX.Element => {

    if (!image) {
        return null
    }

    return (
        <ImageListItem>
            <img
                src={`${image.src}?w=248&fit=crop&auto=format`}
                // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={image.filename}
                loading="lazy"
            />
        </ImageListItem>
    )
}

const itemData = [
    {
        img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
        title: "Bed",
    },
    {
        img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
        title: "Books",
    },
    {
        img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
        title: "Sink",
    },
    {
        img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
        title: "Kitchen",
    },
    {
        img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
        title: "Blinds",
    },
    {
        img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
        title: "Chairs",
    },
    {
        img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
        title: "Laptop",
    },
    {
        img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
        title: "Doors",
    },
    {
        img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
        title: "Coffee",
    },
    {
        img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
        title: "Storage",
    },
    {
        img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
        title: "Candle",
    },
    {
        img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
        title: "Coffee table",
    },
]
