import { isValidColorHex } from './check'

describe('Testing styles/utils/check', () => {
    test('Testing isValidColorHex', () => {
        // All falsy test
        expect(isValidColorHex('abc')).toBeFalsy()
        expect(isValidColorHex('123')).toBeFalsy()
        expect(isValidColorHex('rgba(255, 233, 222)')).toBeFalsy()
        expect(isValidColorHex(123 as any)).toBeFalsy()
        expect(isValidColorHex(null as any)).toBeFalsy()
        expect(isValidColorHex({} as any)).toBeFalsy()
        expect(isValidColorHex('1234567')).toBeFalsy()
        expect(isValidColorHex('123456')).toBeFalsy()
        expect(isValidColorHex('##123456')).toBeFalsy()
        expect(isValidColorHex('##12345')).toBeFalsy()

        // All truthy test
        expect(isValidColorHex('#abc')).toBeTruthy()
        expect(isValidColorHex('#abcdef')).toBeTruthy()
        expect(isValidColorHex('#ABCDEF')).toBeTruthy()
        expect(isValidColorHex('#AbcdEF')).toBeTruthy()
        expect(isValidColorHex('#A21dEF')).toBeTruthy()
        expect(isValidColorHex('#121dEF')).toBeTruthy()
        expect(isValidColorHex('#123456')).toBeTruthy()
    })
})
