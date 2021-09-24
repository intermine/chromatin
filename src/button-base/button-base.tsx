import React, { ButtonHTMLAttributes } from 'react'
import cx from 'clsx'
import { CSSObject } from 'styled-components'
import {
    getContrastRatio,
    getTintOrShade,
    hex2rgba,
    isValidColorHex,
    isThemeColorName,
    createStyledComponent,
    themeTernaryOperator as tto,
    ThemeCSSStyles,
    getThemeCSSObject,
} from '../styles'

export interface ButtonBaseCommonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'as' | 'ref'> {
    variant?: 'normal' | 'outlined' | 'ghost'
    color?: string
    innerRef?: React.RefObject<any>
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
} & T

const ButtonBaseRoot = createStyledComponent<'button', ButtonBaseCommonProps>(
    'button',
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { palette, elevation, themeType } = themePropsForThemeVarFn
        const {
            common: { black, white },
            contrastThreshold,
            hover,
            focus,
            active,
            ...themeColors
        } = palette

        const {
            variant = 'normal',
            color = '',
            disabled = false,
            hasElevation: hasElevationProps = true,
            hasHighlightOnFocus = true,
            hasHoverEffectOnFocus = false,
            csx = {},
        } = props

        const getMainColor = (inverted = false): string => {
            if (!isThemeColorName(color)) return ''
            if (color !== 'neutral') return themeColors[color].main
            if (!inverted) return tto(themeType, black, white)
            return tto(themeType, white, black)
        }

        const getBackground = (): string => {
            if (disabled) {
                if (variant === 'ghost') return themeColors.disable[20]

                return themeColors.disable.main
            }

            if (variant !== 'normal') {
                /**
                 * Ghost and outlined variant didn't have any background
                 * by default
                 */
                return 'transparent'
            }

            if (isThemeColorName(color)) {
                return themeColors[color].main
            }
            /**
             * If there is any value in color then return
             * that value. It is important because it may
             * has value like 'red'.
             */
            if (color) return color

            /**
             * If there is no value then returning default color
             * based on theme type
             */
            return themeColors.neutral.main
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
                if (hasElevationProps && !disabled) {
                    return elevation.low
                }
                return
            }

            if (variant === 'outlined') {
                const boxShadowBase = 'inset 0 0 0 1px'
                if (disabled)
                    return `${boxShadowBase} ${themeColors.disable[60]}`

                if (!isThemeColorName(color)) {
                    if (!color) return
                    return `${boxShadowBase} ${color}`
                }

                const shadowColor = getMainColor()
                return `${boxShadowBase} ${shadowColor}`
            }
        }

        const getColor = (): string | undefined => {
            if (disabled) {
                return themeColors.disable[70]
            }

            if (variant === 'normal') {
                if (isThemeColorName(color)) return themeColors[color].text

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

            if (!isThemeColorName(color)) {
                return color
            }

            return getMainColor()
        }

        const getHoverProperties = (): CSSObject => {
            if (!color || disabled) return {}

            if (variant === 'normal') {
                if (!isThemeColorName(color)) {
                    if (!isValidColorHex(color))
                        return { opacity: hover.unknownColorOpacity }
                    return {
                        background: getTintOrShade(
                            color,
                            themeType !== 'light',
                            hover.tintOrShadeFactor
                        ),
                    }
                }

                return {
                    background: themeColors[color].mainDarkShade,
                }
            }

            if (!isThemeColorName(color)) {
                if (!isValidColorHex(color))
                    return {
                        opacity: hover.unknownColorOpacity,
                    }
                return {
                    background: hex2rgba(
                        color,
                        hover.ghostElementBackgroundOpacity
                    ).rgba,
                }
            }

            return {
                background: hex2rgba(
                    getMainColor(),
                    hover.ghostElementBackgroundOpacity
                ).rgba,
            }
        }

        const getFocusProperties = (): CSSObject => {
            if (disabled) return {}

            const boxShadowBase = '0 0 0 3px'
            const borderAsBoxShadow = getBoxShadow()
            if (!isThemeColorName(color)) {
                if (isValidColorHex(color)) {
                    const c = hex2rgba(color, focus.borderOpacity).rgba
                    return {
                        ...(hasHighlightOnFocus && {
                            boxShadow: boxShadowWithBorder(
                                `${boxShadowBase} ${c}`,
                                borderAsBoxShadow
                            ),
                        }),

                        ...(hasHoverEffectOnFocus && getHoverProperties()),
                    }
                }

                const c = hex2rgba(
                    tto(themeType, black, white),
                    focus.unknownColorBorderOpacity
                ).rgba
                return {
                    ...(hasHighlightOnFocus && {
                        boxShadow: boxShadowWithBorder(
                            `${boxShadowBase} ${c}`,
                            borderAsBoxShadow
                        ),
                    }),
                    ...(hasHoverEffectOnFocus && getHoverProperties()),
                }
            }

            return {
                ...(hasHighlightOnFocus && {
                    boxShadow: boxShadowWithBorder(
                        `${boxShadowBase} ${
                            hex2rgba(
                                themeColors[color].mainDarkShade,
                                focus.borderOpacity
                            ).rgba
                        }`,
                        borderAsBoxShadow
                    ),
                }),
                ...(hasHoverEffectOnFocus && getHoverProperties()),
            }
        }

        const getActiveProperties = (): CSSObject => {
            if (!color || disabled) return {}

            if (variant === 'normal') {
                if (!isThemeColorName(color)) {
                    if (!isValidColorHex(color)) return { opacity: 1 }
                    return {
                        background: getTintOrShade(
                            color,
                            themeType === 'light',
                            active.tintOrShadeFactor
                        ),
                    }
                }

                return {
                    background: themeColors[color].mainLightShade,
                }
            }

            if (!isThemeColorName(color)) {
                if (!isValidColorHex(color)) return { opacity: 1 }
                return {
                    background: hex2rgba(
                        color,
                        active.ghostElementBackgroundOpacity
                    ).rgba,
                }
            }

            return {
                background: themeColors[color][10],
            }
        }

        const calculatedColor = getColor()

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
            margin: 0,
            outline: 0,
            position: 'relative',
            textDecoration: 'none',

            ':disabled, &[disabled]': {
                pointerEvents: 'none',
                cursor: 'default',
            },

            '&::-moz-focus-inner': {
                borderStyle: 'none', // Remove Firefox dotted outline.
            },

            '&:hover': getHoverProperties(),
            '&:active&:hover': getActiveProperties(),
            '&:focus': getFocusProperties(),

            '@media print': {
                colorAdjust: 'exact',
            },
            ...themeVars.buttonBase(themePropsForThemeVarFn, props),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const ButtonBase = <T,>(props: ButtonBaseProps<T>): JSX.Element => {
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
        innerRef,
        classes = {},
        className,
        tabIndex = 0,
        ...rest
    } = props

    return (
        <ButtonBaseRoot
            as={Component}
            className={cx(className, classes.root)}
            ref={innerRef}
            tabIndex={tabIndex}
            {...rest}
        >
            {children}
        </ButtonBaseRoot>
    )
}
