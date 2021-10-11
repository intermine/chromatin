import React, { useState } from 'react'
import { RadioGroupContextProps } from '.'
import { Box, BoxProps } from '../box'
import { createStyledComponent, getThemeCSSObject } from '../styles'
import { getId } from '../utils'
import { RadioGroupContext } from './radio-group-context'

export type RadioGroupProps = Omit<BoxProps<'div'>, 'Component'> &
    RadioGroupContextProps

const RadioGroupRoot = createStyledComponent<typeof Box, RadioGroupProps>(
    Box,
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { csx = {}, isExtendStyleFromThemeVars = true } = props

        return {
            ...(isExtendStyleFromThemeVars &&
                themeVars.radioGroup(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme),
        }
    },
    {
        isExtendStyleFromThemeVars: false,
    }
)

export const RadioGroup = (props: RadioGroupProps): JSX.Element => {
    const {
        children,
        innerRef,
        name: nameProps,
        value: valueProps,
        onChange: onChangeProps,
        ...rest
    } = props

    const [value, setValue] = useState(valueProps ?? '')

    const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
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
            <RadioGroupRoot innerRef={innerRef as any} {...rest}>
                {children}
            </RadioGroupRoot>
        </RadioGroupContext.Provider>
    )
}
