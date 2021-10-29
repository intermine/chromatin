import { createTheme } from './create'
import { getColorNameAndKey, getThemeColorUsingKey } from './utils'

const theme = createTheme()

describe('Testing theme/utils', () => {
    test('Testing getColorNameAndKey', () => {
        // @ts-expect-error
        expect(getColorNameAndKey()).toBeUndefined()

        expect(getColorNameAndKey('primary')).toEqual(['primary', 'main'])
        expect(getColorNameAndKey('secondary.90')).toEqual(['secondary', '90'])
        expect(getColorNameAndKey('error.mainLightShade')).toEqual([
            'error',
            'mainLightShade',
        ])
        expect(getColorNameAndKey('primary')).toEqual(['primary', 'main'])
        expect(getColorNameAndKey('grey')).toEqual(['grey', 'main'])
        expect(getColorNameAndKey('grey.60')).toEqual(['grey', '60'])
        expect(getColorNameAndKey('darkGrey')).toEqual(['darkGrey', 'main'])

        expect(getColorNameAndKey('abc.90')).toBeUndefined()
        expect(getColorNameAndKey('primary.19')).toBeUndefined()
    })
    test('Testing getThemeColorUsingKey', () => {
        expect(
            getThemeColorUsingKey(getColorNameAndKey('primary.90'), theme)
        ).toEqual(expect.any(String))
    })
})
