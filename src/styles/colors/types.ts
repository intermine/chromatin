export type BasicColor = {
    10: string
    20: string
    30: string
    40: string
    50: string
    60: string
    70: string
    80: string
    90: string
}

export type ThemeType = 'dark' | 'light'

export type CreateColorOptions = {
    tintFactor?: number
    shadeFactor?: number
    themeType?: ThemeType
}
