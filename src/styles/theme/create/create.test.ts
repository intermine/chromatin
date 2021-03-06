import { createThemeSpacing } from './spacing'
import { createThemeBreakingPoints } from './breaking-points'

describe('Testing Create', () => {
    test('Testing Spacing', () => {
        let fn = createThemeSpacing(0.25)
        expect(fn(1, 'auto', 4, 2)).toBe('0.25rem auto 1rem 0.5rem')

        fn = createThemeSpacing([
            '0.25rem',
            '0.5rem',
            '0.75rem',
            '1rem',
            '1.25rem',
        ])
        expect(fn(1, 'auto', 4, 2)).toBe('0.25rem auto 1rem 0.5rem')

        fn = createThemeSpacing((...args) => {
            const r: string[] = []
            for (const arg of args) {
                if (typeof arg === 'number') r.push(`${arg * 0.5}rem`)
                else r.push(arg)
            }

            return r.join(' ')
        })

        expect(fn(1, 'auto', 4, 2)).toBe('0.5rem auto 2rem 1rem')
    })

    test('Testing Breaking points', () => {
        let bp = createThemeBreakingPoints({})
        expect(bp.min('lg')).toBe(`@media (min-width: 75em)`)

        bp = createThemeBreakingPoints({ mobile: 656, sm: 569 })

        expect(bp.between('sm', 'mobile')).toBe(
            '@media (min-width: 35.5625em) and (max-width: 41em)'
        )
        expect(bp.min('lg')).toBe(`@media (min-width: 75em)`)

        expect(
            bp.mixin(
                {
                    sm: { fontSize: '200px' },
                    md: { fontSize: '300px' },
                    lg: { background: 'red' },
                },
                'max'
            )
        ).toEqual({
            '@media (max-width: 35.5625em)': { fontSize: '200px' },
            '@media (max-width: 56.25em)': { fontSize: '300px' },
            '@media (max-width: 75em)': { background: 'red' },
        })
    })
})
