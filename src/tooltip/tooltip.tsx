import { cloneElement, useRef, useState, forwardRef } from 'react'
import cx from 'clsx'

import { Popper, PopperProps } from '../popper'
import {
    createStyledComponent,
    getContrastRatio,
    getThemeCSSObject,
    isValidColorHex,
    ReactElement,
    ThemeCSSStyles,
    themeTernaryOperator as tto,
    getColorForComponent,
    isThemeColorName
} from '../styles'
import {
    attachSignatureToComponent,
    setRef,
    useForkRef,
    useMouseOver
} from '../utils'
import { TOOLTIP } from '../constants/component-ids'

import { CSSObject } from 'styled-components'
import { Typography } from '../typography'

export interface TooltipProps
    extends Omit<
        React.HTMLProps<HTMLDivElement>,
        'as' | 'ref' | 'title' | 'children' | 'color' | 'background'
    > {
    /**
     * Background of tooltip
     */
    tooltipBackgroundColor?: string
    /**
     * tooltip's color text
     */
    textColor?: string
    /**
     * Tooltip placement
     */
    placement?: PopperProps['placement']
    /**
     * Tooltip modifier, same as popper modifier
     */
    modifiers?: PopperProps['modifiers']
    /**
     * @default true
     */
    hasArrow?: boolean
    /**
     * @default true
     */
    hasElevation?: boolean
    /**
     * Title of the tooltip
     */
    title?: ReactElement
    /**
     * Message/Content of the tooltip
     */
    message?: ReactElement
    /**
     * @default false
     */
    isDisabled?: boolean
    children: JSX.Element
    /**
     * Sometime for ref other libraries use other
     * name for ref. If this is the case then you
     * update it here. This is only applicable if
     * root children element is not a chromatin element.
     *
     * Note: This is for the anchor element.
     * @default 'ref'
     */
    refPropName?: string
    /**
     * Callback fn trigger after tooltip is opened
     */
    onTooltipOpen?: () => void
    /**
     * Callback fn triggered after tooltip is closed
     */
    onTooltipClose?: () => void
    /**
     * If true then use can interact with the tooltip.
     * Otherwise, tooltip will go away when mouse leaves
     * the anchor element.
     */
    isInteractiveTooltip?: boolean
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to the root container
         */
        root?: string
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
         * Applied to the root container
         */
        root?: ThemeCSSStyles
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

const TooltipRoot = createStyledComponent<
    typeof Popper,
    Omit<TooltipProps, 'children'> & {
        children: any
        actualPlacement: PopperProps['placement']
        isOpen: boolean
    }
>(Popper, (theme, props) => {
    const { themeVars, ...themePropsForThemeVarFn } = theme
    const {
        themeType,
        palette: {
            common: { white, black },
            darkGrey,
            contrastThreshold
        },
        elevation
    } = themePropsForThemeVarFn

    const {
        csx = {},
        tooltipBackgroundColor,
        textColor,
        hasElevation = true,
        hasArrow = true,
        actualPlacement: placement = 'top',
        isExtendStyleFromThemeVars = true,
        isOpen
    } = props

    const getBackground = (): string => {
        const _color = getColorForComponent({
            theme,
            color: tooltipBackgroundColor,
            isReturnDefaultColor: false
        })
        if (_color) return _color
        return darkGrey[30]
    }

    const getColor = (): string => {
        if (!textColor && !tooltipBackgroundColor) return white

        let _color: string | undefined

        if (textColor) {
            _color = getColorForComponent({
                theme,
                color: textColor,
                isReturnDefaultColor: false
            })
        } else if (!tooltipBackgroundColor) {
            /**
             * Only guessing based on theme type.
             */
            _color = tto(themeType, white, black)
        } else if (isThemeColorName(tooltipBackgroundColor.split('.')[0])) {
            _color = getColorForComponent({
                theme,
                color: tooltipBackgroundColor,
                isReturnDefaultColor: false,
                key: 'text'
            })
        }

        if (_color) return _color

        if (!tooltipBackgroundColor || !isValidColorHex(tooltipBackgroundColor))
            return tto(themeType, white, black)

        const colorFirstPref = tto(themeType, white, black)
        const colorSecondPref = tto(themeType, black, white)

        return getContrastRatio(tooltipBackgroundColor, colorFirstPref) >
            contrastThreshold
            ? colorFirstPref
            : colorSecondPref
    }

    const getArrow = (): CSSObject => {
        if (!hasArrow) return {}
        const arrowDim = 0.7
        const background = getBackground()

        const getPosition = (isForAfter: boolean): CSSObject => {
            if (placement.startsWith('top')) {
                return {
                    bottom: isForAfter ? 0 : `-${arrowDim / 2}rem`,
                    left: 0,
                    right: 0,
                    ...(placement === 'top-end' && {
                        left: 'unset',
                        right: `${arrowDim}rem`
                    }),
                    ...(placement === 'top-start' && {
                        left: `${arrowDim}rem`,
                        right: 'unset'
                    })
                }
            }
            if (placement.startsWith('bottom')) {
                return {
                    left: 0,
                    right: 0,
                    top: isForAfter ? 0 : `-${arrowDim / 2}rem`,
                    ...(placement === 'bottom-end' && {
                        left: 'unset',
                        right: `${arrowDim}rem`
                    }),
                    ...(placement === 'bottom-start' && {
                        left: `${arrowDim}rem`,
                        right: 'unset'
                    })
                }
            }
            if (placement.startsWith('right')) {
                return {
                    bottom: 0,
                    left: isForAfter ? 0 : `-${arrowDim / 2}rem`,
                    top: 0,
                    ...(placement === 'right-end' && {
                        top: 'unset',
                        bottom: `${arrowDim}rem`
                    }),
                    ...(placement === 'right-start' && {
                        top: `${arrowDim}rem`,
                        bottom: 'unset'
                    })
                }
            }

            return {
                bottom: 0,
                right: isForAfter ? 0 : `-${arrowDim / 2}rem`,
                top: 0,
                ...(placement === 'left-end' && {
                    top: 'unset',
                    bottom: `${arrowDim}rem`
                }),
                ...(placement === 'left-start' && {
                    top: `${arrowDim}rem`,
                    bottom: 'unset'
                })
            }
        }

        return {
            '&:before, &:after': {
                background,
                content: '""',
                height: `${arrowDim}rem`,
                position: 'absolute',
                width: `${arrowDim}rem`,
                margin: 'auto'
            },
            '&:before': {
                transform: 'rotate(45deg)',
                ...getPosition(false),
                ...(hasElevation && {
                    boxShadow: elevation.low
                })
            },
            '&:after': {
                height: '1rem',
                width: '1rem',
                ...getPosition(true)
            }
        }
    }

    return {
        borderRadius: '0.25rem',
        background: getBackground(),
        color: getColor(),
        visibility: isOpen ? 'visible' : 'hidden',

        maxWidth: '15rem',
        opacity: isOpen ? 1 : 0,
        padding: '0.8rem 1rem',
        position: 'relative',
        transitionDuration: '0.3s',
        transitionProperty: 'box-shadow, opacity',
        ...(hasElevation && {
            boxShadow: elevation.low
        }),
        ...getArrow(),
        ...(isExtendStyleFromThemeVars &&
            themeVars.tooltip(themePropsForThemeVarFn, props)),
        ...getThemeCSSObject(csx.root, theme)
    }
})

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
    (props, ref): JSX.Element => {
        const {
            children,
            className,
            classes = {},
            title,
            message,
            isDisabled = false,
            refPropName = 'ref',
            modifiers: _modifiers = [],
            placement = 'top',
            csx = {},
            onTooltipClose,
            onTooltipOpen,
            isInteractiveTooltip = true,
            ...rest
        } = props

        const [tooltipElement, setTooltipElement] =
            useState<HTMLDivElement | null>(null)

        const [actualPlacement, setActualPlacement] = useState(placement)

        const childRef = useRef<any>(null)
        const _childInnerRef = children.props[refPropName]

        const childInnerRef = useForkRef(childRef, _childInnerRef)

        const isMouseOver = useMouseOver({
            anchorElement: childRef.current,
            otherElement: isInteractiveTooltip ? tooltipElement : undefined,
            onHoverEnd: onTooltipClose,
            onHoverStart: onTooltipOpen,
            isDisabled,
            isCheckMouseInsidePolygon: true
        })

        const modifiers: PopperProps['modifiers'] = [
            {
                name: 'offset',
                options: {
                    offset: [0, 12]
                }
            },
            {
                name: 'onUpdate',
                enabled: true,
                phase: 'afterWrite',
                fn: ({ state }: any) => {
                    if (state.placement !== actualPlacement) {
                        setActualPlacement(state.placement)
                    }
                }
            },
            ..._modifiers
        ]

        const getMessage = (): ReactElement => {
            if (typeof message === 'string') {
                return (
                    <Typography
                        variant="body"
                        className={cx(classes.message)}
                        csx={{
                            root: (theme) => {
                                return {
                                    color: 'inherit',
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
                        className={cx(classes.title)}
                        csx={{
                            root: (theme) => ({
                                color: 'inherit',
                                marginBottom: '0.6rem',
                                textAlign: 'center',
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

        return (
            <>
                {cloneElement(children, {
                    ...children.props,
                    [refPropName]: childInnerRef
                })}
                <TooltipRoot
                    anchorElement={childRef.current}
                    className={cx(className, classes.root)}
                    isOpen={isMouseOver ?? false}
                    ref={(el: any) => {
                        setTooltipElement(el)
                        ref && setRef(ref, el)
                    }}
                    placement={placement}
                    modifiers={modifiers}
                    actualPlacement={actualPlacement}
                    csx={csx}
                    {...rest}
                >
                    {getTitle()}
                    {getMessage()}
                </TooltipRoot>
            </>
        )
    }
)

attachSignatureToComponent(Tooltip, TOOLTIP)
