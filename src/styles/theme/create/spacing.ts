import type { ThemeSpacing, CreateThemeSpacingOptions } from './create'

export const createSpacing = (
    options: CreateThemeSpacingOptions
): ThemeSpacing => {
    if (typeof options === 'function') return options

    if (Array.isArray(options))
        return (...args) => {
            const r: string[] = []
            for (const arg of args) {
                if (typeof arg === 'number') r.push(options[arg - 1] ?? 0)
                else r.push(arg)
            }

            return r.join(' ')
        }

    return (...args) => {
        const r: string[] = []
        for (const arg of args) {
            if (typeof arg === 'number') r.push(`${arg * options}rem`)
            else r.push(arg)
        }

        return r.join(' ')
    }
}
