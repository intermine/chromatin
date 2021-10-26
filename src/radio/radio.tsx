import { forwardRef } from 'react'

import { Checkbox, CheckboxProps } from '../checkbox'
import { createStyledComponent, getThemeCSSObject } from '../styles'
import { useRadioGroup } from '../radio-group'
import RadioUnchecked from '../icons/System/checkbox-blank-circle-line'
import RadioChecked from '../icons/System/radio-button-line'
import { attachSignatureToComponent } from '../utils'
import { RADIO } from '../constants/component-ids'

export type RadioProps = CheckboxProps

const CheckboxRoot = createStyledComponent(
    Checkbox,
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { csx = {}, isExtendStyleFromThemeVars = true } = props
        return {
            ...(isExtendStyleFromThemeVars &&
                themeVars.radio(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    },
    {
        isExtendStyleFromThemeVars: false
    }
)

export const Radio = forwardRef<any, RadioProps>((props, ref): JSX.Element => {
    const context = useRadioGroup()

    const { isChecked, name, value, onChange, ...rest } = props

    const getCheckedStatus = (): boolean => {
        if (typeof isChecked !== 'undefined') return isChecked
        return value === context?.value
    }

    const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (context?.onChange) {
            context?.onChange(event)
        }

        if (onChange) {
            onChange(event)
        }
    }

    return (
        <CheckboxRoot
            type="radio"
            onChange={handleOnChange}
            isChecked={getCheckedStatus()}
            name={name ?? context?.name}
            value={value}
            CheckedIcon={<RadioChecked />}
            UncheckedIcon={<RadioUnchecked />}
            ref={ref}
            {...rest}
        />
    )
})

attachSignatureToComponent(Radio, RADIO)
