import { useState } from 'react'
import { CSSObject } from 'styled-components'
import cx from 'clsx'

import { InputBase, InputBaseProps } from '../input-base'
import {
    createStyledComponent,
    getContrastRatio,
    getThemeCSSObject,
    isThemeColorName,
    isValidColorHex,
    ReactElement,
    ThemeCSSStyles,
    themeTernaryOperator as tto,
} from '../styles'

export type InputProps = InputBaseProps & {
    /**
     * @default false
     */
    hasFullWidth?: boolean
    /**
     * @default regular
     */
    size?: 'small' | 'regular' | 'large'
    LeftIcon?: ReactElement
    RightIcon?: ReactElement
    Component?: 'input' | 'textarea'

    /**
     * To specify resize property
     * Only works if Component is textarea.
     */
    resize?: CSSObject['resize']
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to the root container
         */
        root?: string
        /**
         * Applied to input component
         */
        inputRoot?: string
        /**
         * Applied to right icon container
         */
        iconContainerRight?: string
        /**
         * Applied to left icon container
         */
        iconContainerLeft?: string
        /**
         * Applied to both icon container
         */
        iconContainer?: string
    }
    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Applied to the root container
         */
        root?: ThemeCSSStyles
        /**
         * Applied to input component
         */
        inputRoot?: ThemeCSSStyles
        /**
         * Applied to right icon container
         */
        iconContainerRight?: ThemeCSSStyles
        /**
         * Applied to left icon container
         */
        iconContainerLeft?: ThemeCSSStyles
        /**
         * Applied to both icon container
         */
        iconContainer?: ThemeCSSStyles
    }
}

interface ContainerProps {
    hasFullWidth?: InputProps['hasFullWidth']
    Component?: InputProps['Component']
    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Applied to the root container
         */
        root?: ThemeCSSStyles
    }
}

interface IconContainerProps {
    isRight?: boolean
    color?: string
    size?: 'small' | 'regular' | 'large'
    disabled?: boolean
    isError?: boolean
    isWarning?: boolean
    isFocus?: boolean
    Component?: InputProps['Component']
    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Applied to right icon container
         */
        iconContainerRight?: ThemeCSSStyles
        /**
         * Applied to left icon container
         */
        iconContainerLeft?: ThemeCSSStyles
        /**
         * Applied to both icon container
         */
        iconContainer?: ThemeCSSStyles
    }
}

const InputRoot = createStyledComponent<typeof InputBase, InputProps>(
    InputBase,
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            size = 'regular',
            LeftIcon,
            RightIcon,
            csx = {},
            resize = 'none',
        } = props
        const { body, bodySm, h3 } = themePropsForThemeVarFn.typography

        const getPadding = (): string => {
            if (size === 'regular') return '0.4rem 0.625rem'
            if (size === 'small') return '0.3rem 0.4rem'

            return '0.5rem 0.8rem'
        }

        const getTypographyProperties = (): CSSObject => {
            if (size === 'regular') return body
            if (size === 'small') return bodySm
            return { ...h3, fontWeight: 500 }
        }

        const getBorderRadius = (): CSSObject => {
            const borderRadius = '0.25rem'
            if (!LeftIcon && !RightIcon) {
                return {
                    borderRadius,
                }
            }

            if (LeftIcon && RightIcon) {
                return {
                    borderRadius: 0,
                }
            }

            if (LeftIcon) {
                return {
                    borderTopRightRadius: borderRadius,
                    borderBottomRightRadius: borderRadius,
                }
            }

            return {
                borderTopLeftRadius: borderRadius,
                borderBottomLeftRadius: borderRadius,
            }
        }

        return {
            flex: 1,
            padding: getPadding(),
            margin: 0,
            transition: '0.13s',
            resize,
            ...getTypographyProperties(),
            ...getBorderRadius(),
            ...themeVars.input(themePropsForThemeVarFn, props),
            ...getThemeCSSObject(csx.inputRoot, theme),
        }
    }
)

const Container = createStyledComponent<'div', ContainerProps>(
    'div',
    (theme, props) => {
        const { hasFullWidth = false, csx = {} } = props

        return {
            boxSizing: 'border-box',
            display: 'inline-flex',

            width: (hasFullWidth && '100%') || undefined,
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

const IconContainer = createStyledComponent<'div ', IconContainerProps>(
    'div',
    (theme, props) => {
        const {
            children,
            size = 'regular',
            disabled,
            isError,
            isWarning,
            isRight = false,
            isFocus,
            color = 'neutral',
            csx = {},
        } = props
        const { palette } = theme

        if (!children) {
            return {
                display: 'none',
            }
        }

        const getBackground = (): string => {
            if (disabled) return palette.disable.main

            if (isFocus) {
                if (isThemeColorName(color)) {
                    return palette[color].main
                }
                return color
            }

            if (isError) return palette.error.main
            if (isWarning) return palette.warning.main

            return palette.neutral.mainLightShade
        }

        const getFillColor = (): string => {
            if (disabled) return palette.neutral[80]
            if (isFocus) {
                if (isThemeColorName(color)) {
                    return palette[color].text
                }

                if (isValidColorHex(color)) {
                    const { black, white } = palette.common
                    const textColorFirstPref = tto(
                        palette.themeType,
                        white,
                        black
                    )
                    const textColorSecondPref = tto(
                        palette.themeType,
                        black,
                        white
                    )

                    return getContrastRatio(color, textColorFirstPref) >
                        palette.contrastThreshold
                        ? textColorFirstPref
                        : textColorSecondPref
                }
            }
            if (isError) return palette.error.text
            if (isWarning) return palette.warning.text

            return palette.neutral[80]
        }

        const getDimensions = (): CSSObject => {
            if (size === 'regular' || size === 'large')
                return {
                    width: '2rem',
                }
            return {
                width: '2rem',
            }
        }

        const getBorderRadius = (): CSSObject => {
            const borderRadius = '0.25rem'

            if (isRight)
                return {
                    borderTopRightRadius: borderRadius,
                    borderBottomRightRadius: borderRadius,
                }

            return {
                borderTopLeftRadius: borderRadius,
                borderBottomLeftRadius: borderRadius,
            }
        }

        const getPadding = (): string => {
            if (size === 'regular' || size === 'large') return '0.5rem'
            return '0.125rem'
        }

        return {
            background: getBackground(),
            boxSizing: 'border-box',
            display: 'inline-flex',
            fill: getFillColor(),
            justifyContent: 'center',
            padding: getPadding(),
            transition: '0.13s',
            ...getDimensions(),
            ...getBorderRadius(),
            ...getThemeCSSObject(csx.iconContainer, theme),
            ...(isRight && getThemeCSSObject(csx.iconContainerRight, theme)),
            ...(!isRight && getThemeCSSObject(csx.iconContainerLeft, theme)),
        }
    }
)

export const Input = (props: InputProps): JSX.Element => {
    const {
        hasFullWidth,
        RightIcon,
        LeftIcon,
        size,
        color,
        isError,
        isWarning,
        disabled,
        hasTransparentBackground,
        onFocus: onFocusProps,
        onBlur: onBlurProps,
        className,
        classes = {},
        csx,
        Component = 'input',
        ...rest
    } = props

    const styleProps = {
        size,
        color,
        isError,
        isWarning,
        disabled,
        hasTransparentBackground,
        csx,
        Component,
    }

    const {
        root,
        inputRoot,
        iconContainer,
        iconContainerRight,
        iconContainerLeft,
        ...classesForBase
    } = classes

    const [isInputFocused, setIsInputFocused] = useState(false)

    const onFocus = (event: any) => {
        setIsInputFocused(true)
        if (onFocusProps) onFocusProps(event)
    }

    const onBlur = (event: any) => {
        setIsInputFocused(false)
        if (onBlurProps) onBlurProps(event)
    }

    return (
        <Container
            className={cx(className, root)}
            hasFullWidth={hasFullWidth}
            {...styleProps}
        >
            <IconContainer
                className={cx(iconContainer, iconContainerLeft)}
                isFocus={isInputFocused}
                {...styleProps}
            >
                {LeftIcon}
            </IconContainer>
            <InputRoot
                className={cx(inputRoot, classesForBase)}
                LeftIcon={LeftIcon}
                RightIcon={RightIcon}
                onFocus={onFocus}
                onBlur={onBlur}
                {...styleProps}
                {...rest}
            />
            <IconContainer
                className={cx(iconContainer, iconContainerRight)}
                isFocus={isInputFocused}
                isRight
                {...styleProps}
            >
                {RightIcon}
            </IconContainer>
        </Container>
    )
}
