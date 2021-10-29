export class RGBA {
    public r: number
    public g: number
    public b: number
    public alpha: number
    public rgb: string
    public rgba: string
    public hex: string
    constructor(
        r: number,
        g: number,
        b: number,
        alpha: number,
        rgb: string,
        rgba: string,
        hex: string
    ) {
        this.r = r
        this.g = g
        this.b = b
        this.alpha = alpha
        this.rgb = rgb
        this.rgba = rgba
        this.hex = hex
    }
    /**
     * This will return rgba string. There is an
     * option to get rgba colour with updated alpha value.
     *
     * @param alpha alpha value.
     * @returns {string} rgba string
     */
    getRGBA(alpha = this.alpha): string {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${
            alpha > 1 ? 1 : alpha < 0 ? 0 : alpha
        })`
    }
}
