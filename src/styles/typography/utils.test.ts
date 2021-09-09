import { getFontSizeInRem } from './utils'

describe('Testing typography/utils', () => {
    test('Testing getFontSizeInRem', () => {
        expect(getFontSizeInRem(1.618, 3)).toEqual('4.236rem')
        expect(getFontSizeInRem(1.618, -1)).toEqual('0.618rem')
    })
})
