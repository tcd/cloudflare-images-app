export const CLOUDFLARE_COLORS = {
    orange: "#F6821F",
    blue:   "#0051C3",
    // green:  "##12A244",
    green: "#72c594", // https://www.cloudflare.com/partners/peering-portal/
    logo: {
        darkOrange: "#F38020",
        lightOrange: "#FAAE40",
        gray: "#404041",
        white: "#FFFFFF",
    },
    scraped: {
        cssVariables: {
            main:  "#1372EC",
            light: "#399FFE",
            dark:  "#1A50AD",
        },
        buttonColors: {
            orange: "#CE3F00",
            blue:   "#0051C3",
        },
        link: {
            inactiveFg: "#222222",
            // activeFg: "#0045A6",
            activeFg: "#0051C3",
        },
        icons: "#0055DC",
        footer: {
            bg: "#222222",
            links: "#6ECCE5",
        },
        bannerBg: "#003682", // https://www.cloudflare.com/cloudflare-one/#resources
        typography: {
            titleFg: "#000000", // https://blog.cloudflare.com/tag/developers/
            captionFg: "##92979B", // https://blog.cloudflare.com/platform-week-2022-wrap-up/
            // same as body?
            subtitleFg: "#36393A", // https://blog.cloudflare.com/when-the-window-is-not-fully-open-your-tcp-stack-is-doing-more-than-you-think/
            bodyFg: "#36393A", // https://blog.cloudflare.com/platform-week-2022-wrap-up/
        },
        signupForm: {
            darkGreen: "#196535",
            lightGreen: "#e3f8eb",
        },
    },
    light: {
        buttonOrange: {
            bg: "#F6821F",
            activeBg: "#D86300",
            disabled: "#F69259", // https://blog.cloudflare.com/
        },
        buttonBlue: {
            bg:       "#0051C3", // https://www.cloudflare.com/logo/
            activeBg: "#0045A6", // https://www.cloudflare.com/logo/

        },
        header: {
            bg: "#F8FBFB",
            hamburger: "#4E5255",
        },
    },
    dark: {
        header: {
            bg: "#242628",
        },
        // https://developers.cloudflare.com/images/
        sideNav: {
            bg: "#191B1D",
            fg: "#FFFFFF",
            activeBefore: "#F38020",
            activeFg: "#FBA056",
            activeBg: "#2E2720",
            inactiveIcon: "#757677",
        },
        // https://developers.cloudflare.com/images/
        body: {
            bg: "#1D1F20",
            fg: "##D5D7D8",
        },
    },
} as const
