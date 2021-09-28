import { Checkbox, CheckboxProps } from '../checkbox'
import { createStyledComponent } from '../styles'
import { useRadioGroup } from '../radio-group'
import RadioUnchecked from '../icons/System/checkbox-blank-circle-line'
import RadioChecked from '../icons/System/radio-button-line'
import contrastLine from '../icons/Design/contrast-line'

export type RadioProps = CheckboxProps

const CheckboxRoot = createStyledComponent(Checkbox, (theme, props) => {
    const { themeVars, ...themePropsForThemeVarFn } = theme

    return {
        ...themeVars.radio(themePropsForThemeVarFn, props),
    }
})

export const Radio = (props: RadioProps): JSX.Element => {
    const context = useRadioGroup()

    const { checked, name, value, onChange, ...rest } = props

    const getCheckedStatus = (): boolean => {
        if (typeof checked !== 'undefined') return checked
        return value === context?.value
    }

    const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        context?.onChange(event)
        if (onChange) {
            onChange(event)
        }
    }

    return (
        <CheckboxRoot
            type="radio"
            onChange={handleOnChange}
            checked={getCheckedStatus()}
            name={name ?? context?.name}
            value={value}
            CheckedIcon={<RadioChecked />}
            UncheckedIcon={<RadioUnchecked />}
            {...rest}
        />
    )
}
