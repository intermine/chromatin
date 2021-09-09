export const getFontSizeInRem = (scale: number, order: number): string => {
    const fontSize =
        order >= 0 ? Math.pow(scale, order) : 1 / Math.pow(scale, order)

    return `${fontSize.toFixed(3)}rem`
}
