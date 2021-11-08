import { ButtonHTMLAttributes, forwardRef, HTMLProps } from 'react'
import cx from 'clsx'
import { CSSObject } from 'styled-components'
import {
    getContrastRatio,
    hex2rgba,
    isValidColorHex,
    createStyledComponent,
    themeTernaryOperator as tto,
    ThemeCSSStyles,
    getThemeCSSObject,
    getColorNameAndKey,
    getThemeColorUsingKey
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { BUTTON_BASE } from '../constants/component-ids'

import { getActiveProperties, getHoverProperties } from './utils'

export interface ButtonBaseCommonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'as'> {
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
    isDisabled?: boolean
    /**
     * Whether to have hover effect applicable
     * when the element is focused.
     * @default false
     */
    hasHoverEffectOnFocus?: boolean
    hasHoverEffect?: boolean
    hasActiveEffect?: boolean
    hasFocusEffect?: boolean
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

export type ButtonBaseProps<T> = ButtonBaseCommonProps & {
    Component?:
        | React.ElementType
        | React.ComponentType<T>
        | React.ForwardRefExoticComponent<T>
} & (T extends string ? Omit<HTMLProps<HTMLButtonElement>, 'size' | 'as'> : T)

const ButtonBaseRoot = createStyledComponent<'button', ButtonBaseCommonProps>(
    'button',
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { palette, elevation, themeType } = themePropsForThemeVarFn
        const {
            common: { black, white },
            grey,
            darkGrey,
            contrastThreshold,
            focus,
            ...themeColors
        } = palette

        const { disable } = themeColors

        const {
            variant = 'normal',
            color,
            isDisabled = false,
            hasElevation: hasElevationProps = true,
            hasHighlightOnFocus = true,
            hasHoverEffectOnFocus = false,
            csx = {},
            isActive = false,
            isFocused = false,
            isHovered = false,
            hasHoverEffect = true,
            hasActiveEffect = true,
            hasFocusEffect = true,
            isExtendStyleFromThemeVars = true
        } = props

        const colorTuple = color
            ? getColorNameAndKey(color, { theme })
            : undefined

        const getBackground = (): string | undefined => {
            if (isDisabled) {
                if (variant === 'ghost') return disable[20]

                return disable.main
            }

            if (variant !== 'normal') {
                /**
                 * Ghost and outlined variant didn't have any background
                 * by default
                 */
                return 'transparent'
            }

            if (!color) {
                /**
                 * If there is no value then returning default color
                 * based on theme type
                 */
                return tto(themeType, grey[10], darkGrey[30])
            }

            if (colorTuple) {
                return getThemeColorUsingKey(colorTuple, theme)
            }

            return color
        }

        const boxShadowWithBorder = (
            shadow: string,
            border: string | undefined
        ): string => {
            if (!hasHighlightOnFocus && border) return border
            if (!hasHighlightOnFocus) return ''
            if (border) return `${border}, ${shadow}`
            return shadow
        }

        const getBoxShadow = (): string | undefined => {
            if (variant === 'normal') {
                if (hasElevationProps && !isDisabled) {
                    return elevation.low
                }
                return
            }

            if (variant === 'outlined') {
                const boxShadowBase = 'inset 0 0 0 1px'
                if (isDisabled)
                    return `${boxShadowBase} ${disable.mainDarkShade}`

                if (colorTuple) {
                    const shadowColor = getThemeColorUsingKey(colorTuple, theme)
                    return `${boxShadowBase} ${shadowColor}`
                }

                const shadowColor =
                    color ?? tto(themeType, darkGrey[10], grey[10])

                return `${boxShadowBase} ${shadowColor}`
            }
        }

        const getColor = (): string | undefined => {
            if (isDisabled) {
                return disable.mainDarkShade
            }

            if (!color) {
                return tto(themeType, darkGrey[10], grey[10])
            }

            if (variant === 'normal') {
                if (colorTuple)
                    return getThemeColorUsingKey([colorTuple[0], 'text'], theme)

                if (isValidColorHex(color)) {
                    const textColorFirstPref = tto(themeType, white, black)
                    const textColorSecondPref = tto(themeType, black, white)

                    return getContrastRatio(color, textColorFirstPref) >
                        contrastThreshold
                        ? textColorFirstPref
                        : textColorSecondPref
                }
                return
            }

            /**
             * For ghost and outlined
             */
            if (colorTuple) {
                return getThemeColorUsingKey(colorTuple, theme)
            }

            return tto(themeType, darkGrey[10], grey[10])
        }

        const calculatedColor = getColor()
        const hoverProperties = getHoverProperties({
            color,
            isDisabled,
            theme,
            variant
        })
        const activeProperties = getActiveProperties({
            color,
            isDisabled,
            variant,
            theme
        })

        // TODO: Move getFocusProperties to ./utils
        const getFocusProperties = (): CSSObject => {
            if (isDisabled) return {}

            const boxShadowBase = '0 0 0 3px'
            const borderAsBoxShadow = getBoxShadow()

            if (colorTuple) {
                return {
                    ...(hasHighlightOnFocus && {
                        boxShadow: boxShadowWithBorder(
                            `${boxShadowBase} ${
                                hex2rgba(
                                    getThemeColorUsingKey(colorTuple, theme),
                                    focus.borderOpacity
                                ).rgba
                            }`,
                            borderAsBoxShadow
                        )
                    }),
                    ...(hasHoverEffectOnFocus && hoverProperties)
                }
            }

            const _color = color ?? tto(themeType, darkGrey[10], grey[10])

            if (isValidColorHex(_color)) {
                const c = hex2rgba(_color, focus.borderOpacity).rgba
                return {
                    ...(hasHighlightOnFocus && {
                        boxShadow: boxShadowWithBorder(
                            `${boxShadowBase} ${c}`,
                            borderAsBoxShadow
                        )
                    }),

                    ...(hasHoverEffectOnFocus && hoverProperties)
                }
            }

            const c = hex2rgba(_color, focus.unknownColorBorderOpacity).rgba
            return {
                ...(hasHighlightOnFocus && {
                    boxShadow: boxShadowWithBorder(
                        `${boxShadowBase} ${c}`,
                        borderAsBoxShadow
                    )
                }),
                ...(hasHoverEffectOnFocus && hoverProperties)
            }
        }

        const focusProperties = getFocusProperties()

        return {
            alignItems: 'center',
            backgroundColor: getBackground(),
            border: 0,
            borderRadius: 0,
            boxSizing: 'border-box',
            boxShadow: getBoxShadow(),
            color: calculatedColor,
            cursor: 'pointer',
            display: 'inline-flex',
            fill: calculatedColor,
            justifyContent: 'center',
            outline: 0,
            position: 'relative',
            textDecoration: 'none',

            ':disabled, &[disabled]': {
                pointerEvents: 'none',
                cursor: 'default'
            },

            '&::-moz-focus-inner': {
                borderStyle: 'none' // Remove Firefox dotted outline.
            },

            ...(hasHoverEffect && { '&:hover': hoverProperties }),
            ...(hasActiveEffect && { '&:active&:hover': activeProperties }),
            ...(hasFocusEffect && { '&:focus': focusProperties }),

            '@media print': {
                colorAdjust: 'exact'
            },
            ...(isHovered && hoverProperties),
            ...(isActive && activeProperties),
            ...(isFocused && focusProperties),
            ...(isExtendStyleFromThemeVars &&
                themeVars.buttonBase(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

export const ButtonBase = forwardRef(
    <T,>(props: ButtonBaseProps<T>, ref: unknown): JSX.Element => {
        /**
         * ButtonBase
         * Use ButtonBase to create component which behaves like a button.
         *
         * This component will handle normal, focus, active and hover
         * state depending on the variant and background provided via props.
         */
        const {
            children,
            Component = 'button',
            classes = {},
            className,
            tabIndex = 0,
            isDisabled,
            onKeyUp,
            type = 'button',
            ...rest
        } = props

        const triggerClickAnimationOnKeyUp = (
            event: React.KeyboardEvent<any>
        ) => {
            if (onKeyUp) {
                onKeyUp(event)
            }

            // TODO: Trigger click animation
        }

        return (
            <ButtonBaseRoot
                onKeyUp={triggerClickAnimationOnKeyUp}
                as={Component}
                className={cx(className, classes.root)}
                ref={ref}
                tabIndex={tabIndex}
                disabled={isDisabled}
                isDisabled={isDisabled}
                type={type}
                {...rest}
            >
                {children}
            </ButtonBaseRoot>
        )
    }
) as <T>(props: ButtonBaseProps<T> & { ref?: any }) => JSX.Element

attachSignatureToComponent(ButtonBase, BUTTON_BASE)
