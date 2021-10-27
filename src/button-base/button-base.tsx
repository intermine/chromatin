import { ButtonHTMLAttributes, forwardRef } from 'react'
import cx from 'clsx'
import { CSSObject } from 'styled-components'
import {
    getContrastRatio,
    hex2rgba,
    isValidColorHex,
    isThemeColorName,
    createStyledComponent,
    themeTernaryOperator as tto,
    ThemeCSSStyles,
    getThemeCSSObject
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
} & T

const ButtonBaseRoot = createStyledComponent<'button', ButtonBaseCommonProps>(
    'button',
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { palette, elevation, themeType } = themePropsForThemeVarFn
        const {
            common: { black, white },
            contrastThreshold,
            focus,
            ...themeColors
        } = palette

        const {
            variant = 'normal',
            color = '',
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

        const getMainColor = (inverted = false): string => {
            if (!isThemeColorName(color)) return ''
            if (color !== 'neutral') return themeColors[color].main
            if (!inverted) return tto(themeType, black, white)
            return tto(themeType, white, black)
        }

        const getBackground = (): string => {
            if (isDisabled) {
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
                if (hasElevationProps && !isDisabled) {
                    return elevation.low
                }
                return
            }

            if (variant === 'outlined') {
                const boxShadowBase = 'inset 0 0 0 1px'
                if (isDisabled)
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
            if (isDisabled) {
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

        const calculatedColor = getColor()
        const hoverProperties = getHoverProperties({
            color,
            isDisabled,
            mainColor: getMainColor(),
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
            if (!isThemeColorName(color)) {
                if (isValidColorHex(color)) {
                    const c = hex2rgba(color, focus.borderOpacity).rgba
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

                const c = hex2rgba(
                    tto(themeType, black, white),
                    focus.unknownColorBorderOpacity
                ).rgba
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
            margin: 0,
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
