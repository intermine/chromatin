import { useState, forwardRef } from 'react'
import { RadioGroupContextProps } from './radio-group-context'
import { Box, BoxBaseProps } from '../box'
import { createStyledComponent, getThemeCSSObject } from '../styles'
import { getId } from '../utils'
import { RadioGroupContext } from './radio-group-context'

export type RadioGroupProps = Omit<BoxBaseProps, 'onChange'> &
    RadioGroupContextProps

const RadioGroupRoot = createStyledComponent<typeof Box, RadioGroupProps>(
    Box,
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { csx = {}, isExtendStyleFromThemeVars = true } = props

        return {
            ...(isExtendStyleFromThemeVars &&
                themeVars.radioGroup(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    },
    {
        isExtendStyleFromThemeVars: false
    }
)

export const RadioGroup = forwardRef<any, RadioGroupProps>(
    (props, ref): JSX.Element => {
        const {
            children,
            name: nameProps,
            value: valueProps,
            onChange: onChangeProps,
            ...rest
        } = props

        const [value, setValue] = useState(valueProps ?? '')

        const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.currentTarget.value)
            if (onChangeProps) {
                onChangeProps(event)
            }
        }

        const name = nameProps ?? getId()

        return (
            <RadioGroupContext.Provider
                value={{ name, onChange: handleOnChange, value }}
            >
                <RadioGroupRoot ref={ref} {...rest}>
                    {children}
                </RadioGroupRoot>
            </RadioGroupContext.Provider>
        )
    }
)
