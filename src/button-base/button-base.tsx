import React, { ButtonHTMLAttributes } from 'react'
import { CSSObject } from 'styled-components'
import {
    getContrastRatio,
    getTintOrShade,
    hex2rgba,
    isValidColorHex,
} from '../styles/colors'
import { createStyle } from '../styles/theme/create/create-style'
import { isThemeColorName } from '../styles/theme/create/create-theme'

export interface ButtonBaseCommonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'as' | 'ref'> {
    variant?: 'normal' | 'outlined' | 'ghost'
    color?: string
    innerRef?: React.RefObject<any>
    elevation?: boolean
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

const boxShadowWithBorder = (
    shadow: string,
    border: string | undefined
): string => {
    if (border) return `${border}, ${shadow}`
    return shadow
}

const ButtonBaseRoot = createStyle<'button', ButtonBaseRootProps>(
    'button',
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { palette, elevation } = themePropsForThemeVarFn
        const {
            themeType,
            common,
            grey,
            darkGrey,
            contrastThreshold,
            hover,
            focus,
            ...themeColors
        } = palette

        const { states } = props
        const {
            variant = 'normal',
            color = '',
            disabled = false,
            elevation: elevationProps = true,
        } = states

        const getBackground = (): string => {
            if (disabled) {
                if (variant === 'ghost')
                    return themeType === 'light' ? grey[20] : darkGrey[20]
                return themeType === 'light' ? grey[50] : darkGrey[50]
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
            return grey[40]
        }

        const getBoxShadow = (): string | undefined => {
            if (variant === 'normal') {
                if (elevationProps) {
                    return elevation.low
                }
                return
            }

            if (variant === 'outlined') {
                const boxShadowBase = '0 0 0 1px'
                if (!isThemeColorName(color)) {
                    return `${boxShadowBase} ${color}`
                }
                return `${boxShadowBase} ${themeColors[color].main}`
            }
        }

        const getColor = (): string | undefined => {
            if (disabled) {
                return themeType === 'light' ? darkGrey[90] : grey[90]
            }

            if (variant === 'normal') {
                if (isThemeColorName(color)) return themeColors[color].text
                if (isValidColorHex(color))
                    return getContrastRatio(color, common.white) >
                        contrastThreshold
                        ? common.white
                        : common.black
                return
            }

            if (!isThemeColorName(color)) {
                return color
            }

            return themeColors[color].mainDarkShade
        }

        const getFocusProperties = (): CSSObject => {
            const boxShadowBase = '0 0 0 3px'
            const borderAsBoxShadow = getBoxShadow()
            // const colorOpacity =
            if (!isThemeColorName(color)) {
                if (isValidColorHex(color)) {
                    const c = hex2rgba(color, focus.borderOpacity).rgba
                    return {
                        boxShadow: boxShadowWithBorder(
                            `${boxShadowBase} ${c}`,
                            borderAsBoxShadow
                        ),
                    }
                }
                return {}
            }

            return {
                boxShadow: boxShadowWithBorder(
                    `${boxShadowBase} ${
                        hex2rgba(themeColors[color].main, focus.borderOpacity)
                            .rgba
                    }`,
                    borderAsBoxShadow
                ),
            }
        }

        const getHoverProperties = (): CSSObject => {
            if (variant === 'normal') {
                if (!isThemeColorName(color)) {
                    if (!isValidColorHex(color)) return {}
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
                if (!isValidColorHex(color)) return {}
                return { background: hex2rgba(color, hover.opacity).rgba }
            }

            return {
                background: hex2rgba(themeColors[color].main, hover.opacity)
                    .rgba,
            }
        }

        const getActiveProperties = (): CSSObject => {
            if (variant === 'normal') {
                if (!isThemeColorName(color)) {
                    if (!isValidColorHex(color)) return {}
                    return {
                        background: getTintOrShade(
                            color,
                            themeType === 'light',
                            hover.tintOrShadeFactor
                        ),
                    }
                }

                return {
                    background: themeColors[color].mainLightShade,
                }
            }

            if (!isThemeColorName(color)) {
                if (!isValidColorHex(color)) return {}
                return {
                    background: getTintOrShade(
                        color,
                        themeType === 'light',
                        hover.tintOrShadeFactor * 4
                    ),
                }
            }

            return {
                background: themeColors[color][10],
            }
        }

        return {
            alignItems: 'center',
            backgroundColor: getBackground(),
            border: 0,
            borderRadius: 0,
            boxSizing: 'border-box',
            boxShadow: getBoxShadow(),
            color: getColor(),
            cursor: 'pointer',
            display: 'inline-flex',
            justifyContent: 'center',
            margin: 0,
            outline: 0,
            position: 'relative',
            textDecoration: 'none',

            ':disabled': {
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
        ...rest
    } = props

    return (
        <ButtonBaseRoot
            as={Component}
            className={className}
            ref={innerRef}
            states={{ color, variant, disabled, elevation }}
            disabled={disabled}
            tabIndex={tabIndex}
            {...rest}
        >
            {children}
        </ButtonBaseRoot>
    )
}
