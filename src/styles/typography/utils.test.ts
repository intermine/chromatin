import { getFontSizeInRem } from './utils'

describe('Testing typography/utils', () => {
    test('Testing getFontSizeInRem', () => {
        expect(getFontSizeInRem(1.618, 3)).toEqual('4.236rem')
    })
})
