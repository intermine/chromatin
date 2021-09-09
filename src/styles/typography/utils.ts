export const getFontSizeInRem = (scale: number, order: number): string => {
    const fontSize = Math.pow(scale, order)

    return `${fontSize.toFixed(3)}rem`
}
