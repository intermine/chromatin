import { createColor } from './color'

describe('Testing styles/utils/create-color', () => {
    test('Testing createColor', () => {
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
    })
})
