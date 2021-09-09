import React, { ButtonHTMLAttributes } from 'react'
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

const ButtonBaseRoot = createStyle<'button', ButtonBaseRootProps>(
    'button',
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { palette, elevation } = themePropsForThemeVarFn
        const { themeType, common, grey, darkGrey, ...themeColors } = palette

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
                if (disabled) {
                }
                return ''
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

        const getColor = (): string => {
            if (disabled) {
                return themeType === 'light' ? darkGrey[90] : grey[90]
            }

            if (!isThemeColorName(color)) {
                if (!color) themeType === 'light' ? common.black : common.white
                /**
                 * If color is unknown then button will try to get
                 * color form it's parent
                 */
                return ''
            }

            if (variant === 'normal') {
                return themeColors[color].text
            }

            return themeColors[color].main
        }

        return {
            alignItems: 'center',
            backgroundColor: getBackground(),
            border: 0,
            borderRadius: 0,
            boxSizing: 'border-box',
            boxShadow: (elevationProps && elevation.low) || undefined,
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

            // '&:active': {
            //     boxShadow: elevation && elevation.high,
            // },

            // '&:focus': {
            //     boxShadow: elevation && elevation.medium,
            // },

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
