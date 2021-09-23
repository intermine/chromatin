import { InputHTMLAttributes } from 'react'
import { CSSObject } from 'styled-components'
import {
    themeTernaryOperator as tto,
    createStyledComponent,
    isThemeColorName,
} from '../styles'

export interface InputBaseProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'as' | 'ref' | 'color' | 'size'
    > {
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
    innerRef?: React.RefObject<any>
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
            color = 'neutral',
            disabled,
        } = props

        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { palette, themeType } = themePropsForThemeVarFn

        const getBackground = (): string => {
            if (disabled) return palette.disable.main

            if (hasTransparentBackground || isError || isWarning)
                return 'transparent'
            return palette.neutral[10]
        }

        const getBoxShadow = (): string => {
            if (!hasOutline) return 'none'
            if (disabled) return palette.disable.mainDarkShade

            const base = 'inset 0 0 0 1px'

            if (isError) return `${base} ${palette.error.main}`
            if (isWarning) return `${base} ${palette.warning.main}`

            return `${base} ${palette.neutral.main}`
        }

        const getColor = (): string => {
            return tto(themeType, palette.darkGrey[80], palette.grey[80])
        }

        const getHoverProperties = (): CSSObject => {
            if (disabled) return {}
            return {
                background: palette.neutral[30],
            }
        }

        const getFocusProperties = (): CSSObject => {
            if (disabled) return {}

            const shadowBase = 'inset 0 0 0 2px'
            const shadowColor = isThemeColorName(color)
                ? palette[color].main
                : color

            return {
                background: 'transparent',
                ...(hasOutline && {
                    boxShadow: `${shadowBase} ${shadowColor}`,
                }),
                ...(!hasOutline &&
                    hasOutlineOnFocus && {
                        boxShadow: `${shadowBase} ${shadowColor}`,
                    }),
            }
        }

        const getPlaceholderProperties = (): CSSObject => {
            if (disabled) {
                return {
                    color: tto(
                        themeType,
                        palette.neutral[70],
                        palette.neutral[80]
                    ),
                    opacity: 1,
                }
            }

            return {
                color: palette.neutral[60],
                opacity: 1,
            }
        }

        if (isHidden)
            return {
                display: 'none',
                ...themeVars.inputBase(theme, props),
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
                cursor: 'default',
            },

            ...themeVars.inputBase(theme, props),
        }
    }
)

export const InputBase = (props: InputBaseProps): JSX.Element => {
    const {
        hasOutline,
        hasOutlineOnFocus,
        hasTransparentBackground,
        color,
        isHidden,
        innerRef,
        ...rest
    } = props

    const styleProps = {
        hasOutline,
        hasTransparentBackground,
        hasOutlineOnFocus,
        color,
        isHidden,
    }

    return <InputBaseRoot ref={innerRef} {...styleProps} {...rest} />
}
