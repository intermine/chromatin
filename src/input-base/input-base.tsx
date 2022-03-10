import { forwardRef } from 'react'
import { CSSObject } from 'styled-components'
import cx from 'clsx'

import {
    themeTernaryOperator as tto,
    createStyledComponent,
    ThemeCSSStyles,
    getThemeCSSObject,
    getColorForComponent
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { INPUT_BASE } from '../constants/component-ids'

export interface InputBaseProps
    extends Omit<
        React.HTMLProps<HTMLInputElement | HTMLTextAreaElement>,
        'as' | 'ref' | 'color' | 'size'
    > {
    Component?: 'input' | 'textarea'
    /**
     * @default true
     */
    hasOutline?: boolean
    /**
     * If hasOutline is true then setting it false has
     * no effect.
     *
     * @default true
     */
    hasOutlineOnFocus?: boolean
    /**
     * @default false
     */
    hasTransparentBackground?: boolean
    isError?: boolean
    isWarning?: boolean
    color?: string
    /**
     * @default false
     */
    isHidden?: boolean
    isDisabled?: boolean
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        root?: string
    }
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

const InputBaseRoot = createStyledComponent<'input', InputBaseProps>(
    'input',
    (theme, props) => {
        const {
            hasOutline = true,
            hasOutlineOnFocus = true,
            isHidden = false,
            hasTransparentBackground = false,
            isError = false,
            isWarning = false,
            color,
            isDisabled,
            csx = {},
            isExtendStyleFromThemeVars = true
        } = props

        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { palette, themeType } = themePropsForThemeVarFn

        const { grey, darkGrey, disable, error, warning } = palette

        const getBackground = (): string => {
            if (isDisabled) return disable.main

            if (hasTransparentBackground || isError || isWarning)
                return 'transparent'
            return tto(themeType, grey[10], darkGrey[10])
        }

        const getBoxShadow = (): string => {
            if (!hasOutline) return 'none'
            if (isDisabled) return disable.mainDarkShade

            const base = 'inset 0 0 0 1px'

            if (isError) return `${base} ${error.main}`
            if (isWarning) return `${base} ${warning.main}`

            const _color = tto(themeType, grey[80], darkGrey[50])
            return `${base} ${_color}`
        }

        const getColor = (): string => {
            return tto(themeType, darkGrey[80], grey[80])
        }

        const getHoverProperties = (): CSSObject => {
            if (isDisabled) return {}

            const _color = tto(themeType, grey[30], darkGrey[30])

            return {
                background: _color
            }
        }

        const getFocusProperties = (): CSSObject => {
            if (isDisabled) return {}

            const shadowBase = 'inset 0 0 0 2px'
            const shadowColor = getColorForComponent({ theme, color })

            return {
                background: 'transparent',
                ...(hasOutline && {
                    boxShadow: `${shadowBase} ${shadowColor}`
                }),
                ...(!hasOutline &&
                    hasOutlineOnFocus && {
                        boxShadow: `${shadowBase} ${shadowColor}`
                    })
            }
        }

        const getPlaceholderProperties = (): CSSObject => {
            if (isDisabled) {
                return {
                    color: tto(themeType, grey[90], darkGrey[90]),
                    opacity: 1
                }
            }

            return {
                color: tto(themeType, grey[60], darkGrey[60]),
                opacity: 1
            }
        }

        if (isHidden)
            return {
                display: 'none',
                ...themeVars.inputBase(theme, props)
            }

        return {
            background: getBackground(),
            border: 'none',
            boxSizing: 'border-box',
            boxShadow: getBoxShadow(),
            color: getColor(),
            display: 'inline-flex',
            outline: 'none',

            '&::placeholder': getPlaceholderProperties(),
            '&:hover': getHoverProperties(),
            '&:focus': getFocusProperties(),

            ':disabled, &[disabled]': {
                pointerEvents: 'none',
                cursor: 'default'
            },

            ...(isExtendStyleFromThemeVars &&
                themeVars.inputBase(theme, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

export const InputBase = forwardRef<any, InputBaseProps>(
    (props, ref): JSX.Element => {
        const {
            hasOutline,
            hasOutlineOnFocus,
            hasTransparentBackground,
            color,
            isHidden,
            classes = {},
            className,
            Component = 'input',
            isDisabled = false,
            ...rest
        } = props

        const styleProps = {
            hasOutline,
            hasTransparentBackground,
            hasOutlineOnFocus,
            color,
            isHidden,
            Component
        }

        return (
            <InputBaseRoot
                as={Component}
                className={cx(className, classes.root)}
                ref={ref}
                disabled={isDisabled}
                isDisabled={isDisabled}
                {...styleProps}
                {...rest}
            />
        )
    }
)

attachSignatureToComponent(InputBase, INPUT_BASE)
