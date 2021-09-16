import React, { ButtonHTMLAttributes } from 'react'
import { CSSObject } from 'styled-components'
import {
    getContrastRatio,
    getTintOrShade,
    hex2rgba,
    isValidColorHex,
    isThemeColorName,
    createStyle,
    themeTernaryOperator as tto,
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
    elevation?: boolean
    /**
     * @default true
     */
    highlightOnFocus?: boolean
    /**
     * Whether to have hover effect applicable
     * when the element is focused.
     * @default false
     */
    hoverEffectOnFocus?: boolean
}

export type ButtonBaseProps<T> = ButtonBaseCommonProps & {
    Component?:
        | React.ElementType
        | React.ComponentType<T>
        | React.ForwardRefExoticComponent<T>
} & T

type ButtonBaseRootProps = ButtonBaseCommonProps & {
    states: ButtonBaseCommonProps
}

const ButtonBaseRoot = createStyle<'button', ButtonBaseRootProps>(
    'button',
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { palette, elevation } = themePropsForThemeVarFn
        const {
            themeType,
            common: { black, white },
            contrastThreshold,
            hover,
            focus,
            active,
            ...themeColors
        } = palette

        const { states } = props
        const {
            variant = 'normal',
            color = '',
            disabled = false,
            elevation: elevationProps = true,
            highlightOnFocus = true,
            hoverEffectOnFocus = false,
        } = states

        const getMainColor = (inverted = false): string => {
            if (!isThemeColorName(color)) return ''
            if (color !== 'neutral') return themeColors[color].main
            if (!inverted) return tto(themeType, black, white)
            return tto(themeType, white, black)
        }

        const getBackground = (): string => {
            if (disabled) {
                if (variant === 'ghost')
                    return tto(
                        themeType,
                        themeColors.disable[20],
                        themeColors.disable[30]
                    )
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
            if (!highlightOnFocus && border) return border
            if (!highlightOnFocus) return ''
            if (border) return `${border}, ${shadow}`
            return shadow
        }

        const getBoxShadow = (): string | undefined => {
            if (variant === 'normal') {
                if (elevationProps && !disabled) {
                    return elevation.low
                }
                return
            }

            if (variant === 'outlined') {
                const boxShadowBase = '0 0 0 1px'
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
                if (isValidColorHex(color))
                    return getContrastRatio(color, white) > contrastThreshold
                        ? white
                        : black
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
            if (!color || disabled) return {}

            const boxShadowBase = '0 0 0 3px'
            const borderAsBoxShadow = getBoxShadow()
            if (!isThemeColorName(color)) {
                if (isValidColorHex(color)) {
                    const c = hex2rgba(color, focus.borderOpacity).rgba
                    return {
                        ...(highlightOnFocus && {
                            boxShadow: boxShadowWithBorder(
                                `${boxShadowBase} ${c}`,
                                borderAsBoxShadow
                            ),
                        }),

                        ...(hoverEffectOnFocus && getHoverProperties()),
                    }
                }

                const c = hex2rgba(
                    tto(themeType, black, white),
                    focus.unknownColorBorderOpacity
                ).rgba
                return {
                    ...(highlightOnFocus && {
                        boxShadow: boxShadowWithBorder(
                            `${boxShadowBase} ${c}`,
                            borderAsBoxShadow
                        ),
                    }),
                    ...(hoverEffectOnFocus && getHoverProperties()),
                }
            }

            return {
                ...(highlightOnFocus && {
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
                ...(hoverEffectOnFocus && getHoverProperties()),
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
        className,
        children,
        Component = 'button',
        innerRef,
        color,
        disabled,
        variant,
        tabIndex = 0,
        elevation,
        highlightOnFocus,
        hoverEffectOnFocus,
        ...rest
    } = props

    return (
        <ButtonBaseRoot
            as={Component}
            className={className}
            ref={innerRef}
            states={{
                color,
                variant,
                disabled,
                elevation,
                highlightOnFocus,
                hoverEffectOnFocus,
            }}
            disabled={disabled}
            tabIndex={tabIndex}
            {...rest}
        >
            {children}
        </ButtonBaseRoot>
    )
}
