import { createTheme } from '.'
import { getColorNameAndKey, getThemeColorUsingKey } from './utils'

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
        expect(getColorNameAndKey('grey')).toEqual(['grey', 50])
        expect(getColorNameAndKey('grey.60')).toEqual(['grey', '60'])
        expect(getColorNameAndKey('darkGrey')).toEqual(['darkGrey', 50])
        expect(getColorNameAndKey('common.white')).toEqual(['common', 'white'])
        expect(getColorNameAndKey('common.black')).toEqual(['common', 'black'])

        expect(getColorNameAndKey('abc.90')).toBeUndefined()
        expect(getColorNameAndKey('primary.19')).toBeUndefined()
        expect(getColorNameAndKey('grey.mainDarkShade')).toBeUndefined()
        expect(getColorNameAndKey('darkGrey.mainLightShade')).toBeUndefined()
        expect(getColorNameAndKey('common.main')).toBeUndefined()
        expect(getColorNameAndKey('common.90')).toBeUndefined()
    })
    test('Testing getThemeColorUsingKey', () => {
        const theme = createTheme()

        expect(
            getThemeColorUsingKey(getColorNameAndKey('primary.90'), theme)
        ).toEqual(expect.any(String))

        expect(
            getThemeColorUsingKey(getColorNameAndKey('common.black'), theme)
        ).toEqual('#000')
    })
})