import { forwardRef } from 'react'
import cx from 'clsx'

import { IconButton } from '../icon-button'
import { InputBase } from '../input-base'
import {
    DefaultCheckedIcon,
    DefaultIndeterminateIcon,
    DefaultUncheckedIcon
} from '../constants/default-icons'

import {
    ReactElement,
    ThemeCSSStyles,
    createStyledComponent,
    getThemeCSSObject
} from '../styles'
import { CHECKBOX } from '../constants/component-ids'

import { attachSignatureToComponent } from '../utils'

export interface CheckboxContainerProps {
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
    isDisabled?: boolean
    classes?: {
        /**
         * Applied to root component
         */
        root?: string
        /**
         * Applied to inputBase component
         */
        inputBase?: string
    }
    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Applied to root component
         */
        root?: ThemeCSSStyles
        /**
         * Applied to inputBase component
         */
        inputBase?: ThemeCSSStyles
    }
}
export interface CheckboxProps
    extends Omit<
            React.HTMLProps<HTMLInputElement | HTMLTextAreaElement>,
            'as' | 'ref' | 'color' | 'size' | 'label'
        >,
        CheckboxContainerProps {
    /**
     * Checkbox checked state.
     *
     * @default false
     */
    isChecked?: boolean
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
    containerRef?: any
    CheckedIcon?: ReactElement
    UncheckedIcon?: ReactElement
    IndeterminateIcon?: ReactElement
}

const InputBaseRoot = createStyledComponent(
    InputBase,
    {},
    { isExtendStyleFromThemeVars: false }
)

const IconButtonRoot = createStyledComponent(
    IconButton,
    (theme, props) => {
        const { csx = {}, isExtendStyleFromThemeVars = true } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme

        return {
            ...(isExtendStyleFromThemeVars &&
                themeVars.checkbox(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    },
    { isExtendStyleFromThemeVars: false }
)

export const Checkbox = forwardRef<any, CheckboxProps>(
    (props, ref): JSX.Element => {
        const {
            classes = {},
            csx = {},
            className,
            isChecked = false,
            isIndeterminate = false,
            CheckedIcon = <DefaultCheckedIcon />,
            UncheckedIcon = <DefaultUncheckedIcon />,
            IndeterminateIcon = <DefaultIndeterminateIcon />,
            type = 'checkbox',
            containerRef,
            isDisabled,
            ...rest
        } = props

        const getIconToRender = (): ReactElement => {
            if (isIndeterminate) return IndeterminateIcon
            if (isChecked) return CheckedIcon
            return UncheckedIcon
        }

        const {
            size,
            borderStyle,
            isDense,
            isLoading,
            variant = 'ghost',
            color,
            hasElevation,
            hasHighlightOnFocus,
            hasHoverEffectOnFocus,
            isHovered,
            isFocused,
            isActive,
            ...inputProps
        } = rest

        const iconButtonProps = {
            isDisabled,
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
            csx
        }

        return (
            <IconButtonRoot
                className={cx(className, classes.root)}
                Component="label"
                Icon={getIconToRender()}
                ref={containerRef}
                {...iconButtonProps}
            >
                <InputBaseRoot
                    isDisabled={isDisabled}
                    type={type}
                    checked={isIndeterminate ? false : isChecked}
                    isHidden={true}
                    ref={ref}
                    csx={{ root: csx.inputBase }}
                    className={cx(classes.inputBase)}
                    {...inputProps}
                />
            </IconButtonRoot>
        )
    }
)

attachSignatureToComponent(Checkbox, CHECKBOX)
