import { defaultTheme } from './default-theme'
import { getThemeCSSObject } from './theme-css'

describe('Testing css', () => {
    test('Testing css', () => {
        expect(getThemeCSSObject()).toEqual({})

        expect(getThemeCSSObject({})).toEqual({})
        expect(
            getThemeCSSObject({
                background: 'red',
            })
        ).toEqual({
            background: 'red',
        })

        expect(
            getThemeCSSObject((t) => ({ background: t.palette.primary.main }))
        ).toEqual({})

        expect(
            getThemeCSSObject(
                (t) => ({ background: t.palette.primary.main }),
                defaultTheme
            )
        ).toEqual({ background: '#23704a' })
    })
})
