import { hex2rgba, hex2rgbArray } from './convert'

describe('Testing styles/utils/convert', () => {
    test('Testing hex2rgbArray', () => {
        expect(hex2rgbArray('123zzz')).toEqual([0, 0, 0])
        expect(hex2rgbArray('ff0000')).toEqual([255, 0, 0])
        expect(hex2rgbArray('f00')).toEqual([255, 0, 0])
        expect(hex2rgbArray('fff')).toEqual([255, 255, 255])
    })

    test('Testing hex2rgba', () => {
        // All falsy test
        expect(hex2rgba('2323')).toEqual({
            r: 0,
            g: 0,
            b: 0,
            alpha: 0,
            rgb: '',
            rgba: '',
            hex: '',
        })

        // All truthy test
        expect(hex2rgba('#f00')).toEqual({
            r: 255,
            g: 0,
            b: 0,
            alpha: 1,
            rgb: 'rgb(255, 0, 0)',
            rgba: 'rgba(255, 0, 0, 1)',
            hex: '#f00',
        })

        expect(hex2rgba('#f00', 0.4)).toEqual({
            r: 255,
            g: 0,
            b: 0,
            alpha: 0.4,
            rgb: 'rgb(255, 0, 0)',
            rgba: 'rgba(255, 0, 0, 0.4)',
            hex: '#f00',
        })

        const colorObject = hex2rgba('#ddd', 0.5)

        expect(hex2rgba('#ddd', 0.5).getRGBA(0.6)).toEqual(
            'rgba(221, 221, 221, 0.6)'
        )

        expect(hex2rgba('#ddd', 0.5).getRGBA(10)).toEqual(
            'rgba(221, 221, 221, 1)'
        )
    })
})
