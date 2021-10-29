import { useState, forwardRef } from 'react'
import { CSSObject } from 'styled-components'
import cx from 'clsx'

import { InputBase, InputBaseProps } from '../input-base'
import {
    createStyledComponent,
    getContrastRatio,
    getThemeCSSObject,
    isValidColorHex,
    ReactElement,
    ThemeCSSStyles,
    themeTernaryOperator as tto
} from '../styles'
import { attachSignatureToComponent, getColorForComponent } from '../utils'
import { INPUT } from '../constants/component-ids'

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
    containerRef?: any
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
    isDisabled?: boolean
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
            isExtendStyleFromThemeVars = true
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
                    borderRadius
                }
            }

            if (LeftIcon && RightIcon) {
                return {
                    borderRadius: 0
                }
            }

            if (LeftIcon) {
                return {
                    borderTopRightRadius: borderRadius,
                    borderBottomRightRadius: borderRadius
                }
            }

            return {
                borderTopLeftRadius: borderRadius,
                borderBottomLeftRadius: borderRadius
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
            ...(isExtendStyleFromThemeVars &&
                themeVars.input(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.inputRoot, theme)
        }
    },
    {
        isExtendStyleFromThemeVars: false
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
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

const IconContainer = createStyledComponent<'div ', IconContainerProps>(
    'div',
    (theme, props) => {
        const {
            children,
            size = 'regular',
            isDisabled,
            isError,
            isWarning,
            isRight = false,
            isFocus,
            color,
            csx = {}
        } = props
        const {
            palette: {
                disable,
                warning,
                error,
                grey,
                darkGrey,
                common: { white, black },
                contrastThreshold
            },
            themeType
        } = theme

        if (!children) {
            return {
                display: 'none'
            }
        }

        const getBackground = (): string | undefined => {
            if (isDisabled) return disable.main

            if (isFocus) {
                return getColorForComponent({ theme, color })
            }

            if (isError) return error.main
            if (isWarning) return warning.main

            return tto(themeType, grey[50], darkGrey[50])
        }

        const getFillColor = (): string | undefined => {
            if (isDisabled) return disable.mainDarkShade

            if (isFocus) {
                if (color && isValidColorHex(color)) {
                    const textColorFirstPref = tto(themeType, white, black)
                    const textColorSecondPref = tto(themeType, black, white)

                    return getContrastRatio(color, textColorFirstPref) >
                        contrastThreshold
                        ? textColorFirstPref
                        : textColorSecondPref
                }

                return getColorForComponent({ theme, color, key: 'text' })
            }

            if (isError) return error.text
            if (isWarning) return warning.text

            return tto(themeType, black, white)
        }

        const getDimensions = (): CSSObject => {
            if (size === 'regular' || size === 'large')
                return {
                    width: '2rem'
                }
            return {
                width: '2rem'
            }
        }

        const getBorderRadius = (): CSSObject => {
            const borderRadius = '0.25rem'

            if (isRight)
                return {
                    borderTopRightRadius: borderRadius,
                    borderBottomRightRadius: borderRadius
                }

            return {
                borderTopLeftRadius: borderRadius,
                borderBottomLeftRadius: borderRadius
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
            ...(!isRight && getThemeCSSObject(csx.iconContainerLeft, theme))
        }
    }
)

export const Input = forwardRef<any, InputProps>((props, ref): JSX.Element => {
    const {
        hasFullWidth,
        RightIcon,
        LeftIcon,
        size,
        color,
        isError,
        isWarning,
        isDisabled,
        hasTransparentBackground,
        onFocus: onFocusProps,
        onBlur: onBlurProps,
        className,
        classes = {},
        csx,
        containerRef,
        Component = 'input',
        ...rest
    } = props

    const styleProps = {
        size,
        color,
        isError,
        isWarning,
        isDisabled,
        hasTransparentBackground,
        csx,
        Component
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
            ref={containerRef}
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
                ref={ref}
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
})

attachSignatureToComponent(Input, INPUT)
