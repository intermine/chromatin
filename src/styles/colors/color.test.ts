import {
    createColor,
    getTintOrShade,
    getLuminous,
    getContrastRatio,
} from './color'
import { hex2rgba } from './convert'

describe('Testing styles/utils/create-color', () => {
    test('Testing getTintOrShade', () => {
        expect(getTintOrShade('')).toBe('')
        expect(getTintOrShade('#222', true)).toEqual(expect.any(String))
        expect(getTintOrShade(hex2rgba('#222'), false)).toEqual(
            getTintOrShade('#222222', false)
        )

        // If factor is not in range then same color is returned
        expect(getTintOrShade('#222', true, 5)).toBe('#222')
    })

    test('Testing createColor', () => {
        // @ts-expect-error
        expect(createColor()).toBeUndefined()
        expect(createColor({} as any)).toBeUndefined()

        expect(createColor('#23704a')).toEqual({
            '10': '#d3e2da',
            '20': '#a7c5b6',
            '30': '#7ba992',
            '40': '#4f8c6e',
            '50': '#23704a',
            '60': '#1c593b',
            '70': '#15432c',
            '80': '#0d2c1d',
            '90': '#06160e',
        })

        expect(createColor('#23704a', { mode: 'dark' })).toEqual({
            '90': '#d3e2da',
            '80': '#a7c5b6',
            '70': '#7ba992',
            '60': '#4f8c6e',
            '50': '#23704a',
            '40': '#1c593b',
            '30': '#15432c',
            '20': '#0d2c1d',
            '10': '#06160e',
        })

        expect(
            createColor('#23704a', {
                mode: 'light',
                tintFactor: 5,
                shadeFactor: 4,
            })
        ).toEqual({
            '10': '#23704a',
            '20': '#23704a',
            '30': '#23704a',
            '40': '#23704a',
            '50': '#23704a',
            '60': '#23704a',
            '70': '#23704a',
            '80': '#23704a',
            '90': '#23704a',
        })
    })

    test('Testing getLuminous', () => {
        expect(getLuminous(hex2rgba('#fff'))).toBe(1)
        expect(getLuminous(hex2rgba('#000'))).toBe(0)
        expect(getLuminous('dks' as any)).toBe(0)
    })

    test('Testing getContrastRation', () => {
        expect(getContrastRatio('sdjkf', 'skdf')).toBe(-1)
        expect(getContrastRatio('#000', '#fff')).toBe(21)
        expect(getContrastRatio('#fff', '#000')).toBe(21)
        expect(getContrastRatio('#fff', '#00f').toFixed(2)).toBe('8.59')
    })
})
