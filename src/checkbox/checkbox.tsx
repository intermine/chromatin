import cx from 'clsx'

import { IconButton } from '../icon-button'
import { InputBase } from '../input-base'
import DefaultCheckedIcon from '../icons/System/checkbox-fill'
import DefaultUncheckedIcon from '../icons/System/checkbox-blank-line'
// eslint-disable-next-line max-len
import DefaultIndeterminateIcon from '../icons/System/checkbox-indeterminate-fill'

import { ReactElement, ThemeCSSStyles } from '../styles'
import { CHECKBOX } from '../constants/component-ids'

import { attachSignatureToComponent, getId, Ref } from '../utils'

export interface CheckboxProps
    extends Omit<
        React.HTMLProps<HTMLInputElement | HTMLTextAreaElement>,
        'as' | 'ref' | 'color' | 'size' | 'label'
    > {
    /**
     * Checkbox checked state.
     *
     * @default false
     */
    checked?: boolean
    /**
     * Whether checkbox is in indeterminate state
     * or not. If true then it will override checked
     * state and render indeterminate state. Also,
     * indeterminate means checkbox is not checked.
     */
    isIndeterminate?: boolean
    type?: 'checkbox' | 'radio'
    /**
     * Ref to container
     */
    innerRef?: Ref
    /**
     * Ref to input base
     */
    inputRef?: Ref
    /**
     * To extend the styles applied to the components
     */

    // Icon Button Props
    size?: 'small' | 'regular' | 'large'
    /**
     * @default 'squircle'
     */
    borderStyle?: 'circle' | 'squircle' | 'square-circle'
    /**
     * @default false
     */
    isDense?: boolean
    /**
     * @default false
     */
    isLoading?: boolean
    variant?: 'normal' | 'outlined' | 'ghost'
    color?: string
    /**
     * This is not applicable for ghost and outlined variant
     * @default true
     */
    hasElevation?: boolean
    /**
     * @default true
     */
    hasHighlightOnFocus?: boolean
    /**
     * Whether to have hover effect applicable
     * when the element is focused.
     * @default false
     */
    hasHoverEffectOnFocus?: boolean
    /**
     * To activate hover style
     */
    isHovered?: boolean
    /**
     * To activate focus style
     */
    isFocused?: boolean
    /**
     * To activate active style
     */
    isActive?: boolean

    classes?: {
        /**
         * Applied to root component
         */
        root?: string
    }
    CheckedIcon?: ReactElement
    UncheckedIcon?: ReactElement
    IndeterminateIcon?: ReactElement
    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Applied to root component
         */
        root?: ThemeCSSStyles
    }
}

export const Checkbox = (props: CheckboxProps): JSX.Element => {
    const {
        classes = {},
        className,
        checked = false,
        isIndeterminate = false,
        CheckedIcon = <DefaultCheckedIcon />,
        UncheckedIcon = <DefaultUncheckedIcon />,
        IndeterminateIcon = <DefaultIndeterminateIcon />,
        type = 'checkbox',
        innerRef,
        inputRef,
        id: idProps,
        disabled,
        ...rest
    } = props

    const getIconToRender = (): ReactElement => {
        if (isIndeterminate) return IndeterminateIcon
        if (checked) return CheckedIcon
        return UncheckedIcon
    }

    const {
        size,
        borderStyle,
        isDense,
        isLoading,
        variant = 'ghost',
        color = 'primary',
        hasElevation,
        hasHighlightOnFocus,
        hasHoverEffectOnFocus,
        isHovered,
        isFocused,
        isActive,
        csx,
        ...inputProps
    } = rest

    const iconButtonProps = {
        disabled,
        size,
        borderStyle,
        isDense,
        isLoading,
        variant,
        color,
        hasElevation,
        hasHighlightOnFocus,
        hasHoverEffectOnFocus,
        isHovered,
        isFocused,
        isActive,
        csx,
    }

    const id = idProps ?? getId()

    return (
        <>
            <InputBase
                disabled={disabled}
                type={type}
                id={id}
                checked={isIndeterminate ? false : checked}
                isHidden={true}
                innerRef={inputRef}
                {...inputProps}
            />
            <IconButton
                htmlFor={id}
                className={cx(className, classes.root)}
                Component="label"
                Icon={getIconToRender()}
                innerRef={innerRef}
                {...iconButtonProps}
            />
        </>
    )
}

attachSignatureToComponent(Checkbox, CHECKBOX)
