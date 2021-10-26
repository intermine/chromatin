import { useEffect, useState, cloneElement, forwardRef } from 'react'
import cx from 'clsx'
import { CSSObject } from 'styled-components'

import {
    createStyledComponent,
    getThemeCSSObject,
    isThemeColorName,
    ReactElement,
    ThemeCSSStyles,
    useTheme,
    themeTernaryOperator as tto,
    createStyle
} from '../styles'
import {
    DefaultSuccessIcon,
    DefaultErrorIcon,
    DefaultWarningIcon,
    DefaultInfoIcon,
    DefaultCloseIcon
} from '../constants/default-icons'

import { attachSignatureToComponent } from '../utils'
import { ALERT } from '../constants/component-ids'
import { IconButton, IconButtonProps } from '../icon-button'
import { Typography } from '../typography'
import { Portal, PortalProps } from '../portal'

type IconType = ReactElement

export interface AlertProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref' | 'title'> {
    portalProps?: PortalProps
    /**
     * Pass false if you don't want to render main icon
     * @default true
     */
    hasMainIcon?: boolean
    /**
     * The icon appears on the left side. If empty then default icon
     * is render. If type is other and Icon is empty then no icon
     * will be rendered.
     */
    Icon?: IconType
    /**
     * @default 'other'
     */
    type?: 'success' | 'error' | 'info' | 'warning' | 'neutral' | 'other'
    /**
     * This will only update the color of main icon. If not passed,
     * then the color of icon is calculated using type.
     * Close icon color is not affected by this props.
     */
    iconColor?: string
    title?: ReactElement
    message?: ReactElement
    /**
     * To give margin
     */
    margin?: string
    /**
     * @default true
     */
    hasCloseButton?: boolean
    onClose?: () => void
    closeButtonProps?: IconButtonProps<'button'>
    /**
     * Alert is open or close.
     *
     * @default false
     */
    isOpen?: boolean
    /**
     * Alert origin.
     * @default 'top-right'
     */
    origin?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
    /**
     * @default true
     */
    hasAnimation?: boolean
    /**
     * For how long alert should be visible.
     * If nothing is passed then alert is visible as long as
     * close button is not pressed.
     *
     * It should be in milliseconds
     */
    duration?: number
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        root?: string
        entryAnimation?: string
        exitAnimation?: string
        /**
         * Applied to main section
         */
        mainSection?: string
        /**
         * Applied to main icon container
         */
        mainIconContainer?: string
        /**
         * Applied to closeIconContainer
         */
        closeIconContainer?: string
        /**
         * Applied to title component if
         * title is string.
         */
        title?: string
        /**
         * Applied to message component if
         * message is string.
         */
        message?: string
    }
    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Applied to root component
         */
        root?: ThemeCSSStyles
        /**
         * Applied to main section
         */
        mainSection?: ThemeCSSStyles
        /**
         * Applied to main icon container
         */
        mainIconContainer?: ThemeCSSStyles
        /**
         * Applied to closeIconContainer
         */
        closeIconContainer?: ThemeCSSStyles
        /**
         * Applied to title component if
         * title is string.
         */
        title?: ThemeCSSStyles
        /**
         * Applied to message component if
         * message is string.
         */
        message?: ThemeCSSStyles
    }
}

type IconContainerProps = {
    hasPadding?: boolean
    csx?: {
        root?: ThemeCSSStyles
    }
}

type MainSectionProps = {
    csx?: {
        root?: ThemeCSSStyles
    }
}

const AlertRoot = createStyledComponent<'div', AlertProps>(
    'div',
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            palette: {
                themeBackground: { light },
                neutral
            },
            elevation,
            themeType,
            breakingPoints: { mixin }
        } = themePropsForThemeVarFn
        const {
            csx = {},
            origin = 'top-right',
            margin,
            isOpen,
            isExtendStyleFromThemeVars = true
        } = props

        const getOrigin = (): CSSObject => {
            const offset = '1rem'
            if (origin === 'top-right')
                return {
                    top: offset,
                    right: offset
                }

            if (origin === 'bottom-right') {
                return {
                    bottom: offset,
                    right: offset
                }
            }
            if (origin === 'top-left') {
                return {
                    top: offset,
                    left: offset
                }
            }
            if (origin === 'bottom-left') {
                return {
                    bottom: offset,
                    left: offset
                }
            }
            return {
                top: offset,
                right: offset
            }
        }

        return {
            alignSelf: 'flex-start',
            background: tto(themeType, light.hex, neutral[40]),
            borderRadius: '0.25rem',
            boxSizing: 'border-box',
            boxShadow: elevation.low,
            display: 'flex',
            margin: isOpen ? margin : 0,
            maxWidth: '25rem',
            overflow: 'hidden',
            padding: isOpen ? '0.5rem' : 0,
            position: 'fixed',
            width: '100%',
            zIndex: 10,
            ...mixin(
                {
                    sm: {
                        bottom:
                            origin === 'bottom-right' ||
                            origin === 'bottom-left'
                                ? 0
                                : undefined,
                        left: 0,
                        maxWidth: '100%',
                        right: 0,
                        top:
                            origin === 'top-right' || origin === 'top-left'
                                ? 0
                                : undefined,
                        width: 'auto'
                    }
                },
                'max'
            ),
            ...getOrigin(),
            ...(isExtendStyleFromThemeVars &&
                themeVars.alert(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

const IconContainer = createStyledComponent<'div', IconContainerProps>(
    'div',
    (theme, props) => {
        const { csx = {}, hasPadding = false } = props

        return {
            alignItems: 'flex-start',
            display: 'flex',
            padding: hasPadding ? '0.3125rem' : undefined,
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

const MainSection = createStyledComponent<'div', MainSectionProps>(
    'div',
    (theme, props) => {
        const {
            typography: { body }
        } = theme
        const { csx = {} } = props
        return {
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            height: '100%',
            padding: '0.3125rem 1rem',
            ...body,
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

const useStyles = createStyle({
    '@keyframes scaleAnimation': {
        '0%': {
            transform: 'scale(0)'
        },
        '100%': {
            transform: 'scale(1)'
        }
    },
    '@keyframes scaleAnimationReverse': {
        '0%': {
            transform: 'scale(1)'
        },
        '100%': {
            transform: 'scale(0)'
        }
    },
    entryAnimation: {
        animation: '$scaleAnimation 0.2s forwards'
    },
    exitAnimation: {
        animation: '$scaleAnimationReverse 0.2s forwards'
    }
})

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
    (props, ref): JSX.Element => {
        const {
            title,
            message,
            closeButtonProps = {} as IconButtonProps<any>,
            classes: classesProps = {},
            csx = {},
            className,
            children,
            hasCloseButton = true,
            hasMainIcon = true,
            iconColor,
            Icon,
            type = 'success',
            isOpen = false,
            portalProps = {},
            onClose,
            duration,
            hasAnimation = true,
            ...rest
        } = props

        const { onClick, ...restCloseButtonProps } = closeButtonProps

        const [isMounted, setIsMounted] = useState(isOpen)

        const classes = useStyles()
        const theme = useTheme()
        const { palette, themeType } = theme
        const {
            common: { black, white }
        } = palette

        const getMainIcon = (): JSX.Element | null => {
            if (!hasMainIcon) return null

            const fillColor =
                iconColor ??
                (isThemeColorName(type)
                    ? palette[type].main
                    : tto(themeType, black, white))
            const iconProps = {
                height: '24',
                width: '24',
                fill: fillColor
            }

            if (Icon) {
                return cloneElement(Icon as any, {
                    ...(Icon as any).props,
                    ...iconProps
                })
            }

            if (type === 'success') {
                return <DefaultSuccessIcon {...iconProps} />
            }
            if (type === 'error') {
                return <DefaultErrorIcon {...iconProps} />
            }
            if (type === 'warning') {
                return <DefaultWarningIcon {...iconProps} />
            }
            if (type === 'info') {
                return <DefaultInfoIcon {...iconProps} />
            }

            // No icon for neutral and other
            return <></>
        }

        const getMessage = (): ReactElement => {
            if (typeof message === 'string') {
                return (
                    <Typography
                        variant="body"
                        className={cx(classesProps.message)}
                        csx={{
                            root: (theme) => {
                                const {
                                    palette: { neutral }
                                } = theme
                                return {
                                    color: neutral[80],
                                    ...getThemeCSSObject(csx.message, theme)
                                }
                            }
                        }}
                    >
                        {message}
                    </Typography>
                )
            }
            return message
        }

        const getTitle = (): ReactElement => {
            if (typeof title === 'string') {
                return (
                    <Typography
                        variant="title"
                        className={cx(classesProps.title)}
                        csx={{
                            root: (theme) => ({
                                marginBottom: '0.5rem',
                                ...getThemeCSSObject(csx.title, theme)
                            })
                        }}
                    >
                        {title}
                    </Typography>
                )
            }
            return title
        }

        const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (typeof onClick === 'function') {
                onClick(event)
            }
            if (typeof onClose === 'function') {
                onClose()
            }
        }

        useEffect(() => {
            let interval: NodeJS.Timeout | null
            if (!isOpen) {
                interval = setTimeout(
                    () => setIsMounted(false),
                    hasAnimation ? 300 : 0
                )
            } else {
                setIsMounted(true)
            }

            return () => {
                if (interval) {
                    clearInterval(interval)
                }
            }
        }, [isOpen])

        useEffect(() => {
            let interval: NodeJS.Timeout | null
            if (
                typeof duration === 'number' &&
                typeof onClose === 'function' &&
                isOpen
            ) {
                interval = setTimeout(() => onClose(), duration)
            }

            return () => {
                if (interval) clearInterval(interval)
            }
        }, [duration, isOpen])

        if (!isMounted) return <></>
        return (
            <Portal {...portalProps}>
                <AlertRoot
                    isOpen={isOpen}
                    className={cx(className, classesProps.root, {
                        [classesProps.entryAnimation ?? classes.entryAnimation]:
                            isOpen && hasAnimation,
                        [classesProps.exitAnimation ?? classes.exitAnimation]:
                            !isOpen && hasAnimation
                    })}
                    csx={csx}
                    ref={ref}
                    {...rest}
                >
                    {hasMainIcon && (
                        <IconContainer
                            hasPadding
                            className={cx(classesProps.mainIconContainer)}
                            csx={{ root: csx.mainIconContainer }}
                        >
                            {getMainIcon()}
                        </IconContainer>
                    )}
                    <MainSection
                        className={cx(classesProps.mainSection)}
                        csx={{ root: csx.mainSection }}
                    >
                        {getTitle()}
                        {getMessage()}
                        {children}
                    </MainSection>
                    {hasCloseButton && (
                        <IconContainer
                            className={cx(classesProps.closeIconContainer)}
                            csx={{ root: csx.closeIconContainer }}
                        >
                            <IconButton
                                size="regular"
                                isDense
                                color="error"
                                borderStyle="circle"
                                Icon={<DefaultCloseIcon />}
                                onClick={handleClose}
                                {...restCloseButtonProps}
                            />
                        </IconContainer>
                    )}
                </AlertRoot>
            </Portal>
        )
    }
)

attachSignatureToComponent(Alert, ALERT)
