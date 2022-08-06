import merge from "lodash/merge"
import type { SxProps } from "@mui/material"
import Box from "@mui/material/Box"

import { CLOUDFLARE_COLORS } from "@app/lib"

export interface LogoProps {
    sx?: SxProps
    colors?: {
        left?: string
        right?: string
        center?: string
    }
}

export const Logo = (props: LogoProps): JSX.Element => {

    const { sx, colors } = merge(defaultProps, props)

    const $paths = PATHS.map(({ id, d }) => {
        return (
            <path key={id} d={d} style={{ fill: colors[id] }} />
        )
    })

    const svgSx: SxProps = {
        willChange: "filter",
        transition: "filter 0.05s ease-out",
        // "&:hover": {
        //     cursor: "pointer",
        //     /* drop-shadow(offset-x offset-y blur-radius color) */
        //     // filter: `drop-shadow(1px 1px 0.5px ${dropShadowColor})`,
        // },
    }

    return (
        <Box sx={sx}>
            {/* @ts-ignore: next-line */}
            <Box
                component="svg"
                sx={svgSx}
                {...svgProps}
            >
                {$paths}
            </Box>
        </Box>
    )
}


const defaultProps: Partial<LogoProps> = {
    sx: {
        height: "110px",
    },
    colors: {
        left:   CLOUDFLARE_COLORS.logo.darkOrange,
        right:  CLOUDFLARE_COLORS.logo.lightOrange,
        center: CLOUDFLARE_COLORS.logo.white,
    },
}

const PATHS = [
    { id: "center", d: "M283.3,170.2c-1.1,0-2.3,0-3.4,0.1c-0.2,0-0.4,0.1-0.5,0.1l-0.1,0l-7.1-3.1c0-0.3,0-0.6-0.1-0.9c-8.1-36.2-40.4-63.3-79-63.3c-35.6,0-65.8,23-76.7,54.9c-7-5.2-15.9-8-25.6-7.1c-17.1,1.7-30.8,15.4-32.5,32.5c-0.4,4.4-0.1,8.7,0.9,12.7C31.5,197,9.1,219.9,9.1,247.9c0,2.5,0.2,5,0.5,7.5c0.2,1.2,1.2,2.1,2.4,2.1l227.4,0c0,0,0,0,0.1,0l12.3,0c0,0,0,0,0.1,0h93.9c1.1,0,2.1-0.7,2.4-1.8c1.6-5.8,2.5-11.9,2.5-18.2C350.6,200.3,320.5,170.2,283.3,170.2z" },
    { id: "left",   d: "M242.3,255.4l1.7-6c2.1-7.2,1.3-13.8-2.2-18.7c-3.2-4.5-8.6-7.1-15.1-7.5l-123.2-1.6c-0.8,0-1.5-0.4-1.9-1c-0.4-0.6-0.5-1.4-0.3-2.2c0.4-1.2,1.6-2.1,2.9-2.2l124.3-1.6c14.7-0.7,30.7-12.6,36.3-27.2l7.1-18.5c0.2-0.5,0.3-1,0.3-1.6c0-0.3,0-0.6-0.1-0.9c-8.1-36.2-40.4-63.3-79-63.3c-35.6,0-65.8,23-76.7,54.9c-7-5.3-15.9-8-25.6-7.1c-17.1,1.7-30.8,15.4-32.5,32.5c-0.4,4.4-0.1,8.7,0.9,12.7C31.5,197,9.1,219.9,9.1,247.9c0,2.5,0.2,5,0.5,7.5c0.2,1.2,1.2,2.1,2.4,2.1l227.4,0c0,0,0,0,0.1,0C240.8,257.5,241.9,256.6,242.3,255.4z" },
    { id: "right",  d: "M283.3,170.2c-1.1,0-2.3,0-3.4,0.1c-0.2,0-0.4,0.1-0.5,0.1c-0.6,0.2-1.1,0.7-1.2,1.3l-4.8,16.7c-2.1,7.2-1.3,13.8,2.2,18.7c3.2,4.5,8.6,7.1,15.1,7.5l26.3,1.6c0.8,0,1.5,0.4,1.9,1c0.4,0.6,0.5,1.5,0.3,2.2c-0.4,1.2-1.6,2.1-2.9,2.2l-27.3,1.6c-14.8,0.7-30.8,12.6-36.4,27.2l-2,5.2c-0.4,0.9,0.3,1.9,1.3,2c0,0,0,0,0.1,0h93.9c1.1,0,2.1-0.7,2.4-1.8c1.6-5.8,2.5-11.9,2.5-18.2C350.6,200.3,320.5,170.2,283.3,170.2z" },
]

const svgProps: React.SVGProps<SVGSVGElement> = {
    id: "cf__svgLogo__content",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 360 360",
    x: 0,
    y: 0,
    width: "100%",
    height: "100%",
}
