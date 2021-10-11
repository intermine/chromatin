import { cloneElement, useRef, useState } from 'react'
import cx from 'clsx'

import { Popper, PopperProp } from '../popper'
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
import {
    attachSignatureToComponent,
    isChromatinElement,
    setRef,
    useForkRef,
    useMouseOver,
} from '../utils'
import { TOOLTIP } from '../constants/component-ids'

import type { Ref } from '../utils'
import { CSSObject } from 'styled-components'
import { Typography } from '../typography'

export interface TooltipProps
    extends Omit<
        React.HTMLProps<HTMLDivElement>,
        'as' | 'ref' | 'title' | 'children'
    > {
    innerRef?: Ref
    /**
     * Color of tooltip
     */
    color?: string
    /**
     * Tooltip placement
     */
    placement?: PopperProp['placement']
    /**
     * Tooltip modifier, same as popper modifier
     */
    modifiers?: PopperProp['modifiers']
    /**
     * @default true
     */
    isRenderNullIfNoAnchorElement?: PopperProp['isRenderNullIfNoAnchorElement']
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
        actualPlacement: PopperProp['placement']
    }
>(Popper, (theme, props) => {
    const { themeVars, ...themePropsForThemeVarFn } = theme
    const { themeType, palette, elevation } = themePropsForThemeVarFn

    const {
        common: { black, white },
        neutral,
        contrastThreshold,
    } = palette

    const {
        csx = {},
        color,
        hasElevation = true,
        hasArrow = true,
        actualPlacement: placement = 'top',
    } = props

    const getBackground = (): string => {
        if (!color) return tto(themeType, black, neutral[50])
        if (isThemeColorName(color)) return palette[color].main
        return color
    }

    const getColor = (): string => {
        if (!color) return white
        if (isThemeColorName(color)) return palette[color].text
        if (!isValidColorHex(color)) {
            /**
             * Only guessing based on theme type.
             */
            return tto(themeType, white, black)
        }

        const colorFirstPref = tto(themeType, white, black)
        const colorSecondPref = tto(themeType, black, white)

        return getContrastRatio(color, colorFirstPref) > contrastThreshold
            ? colorFirstPref
            : colorSecondPref
    }

    const getArrow = (): CSSObject => {
        if (!hasArrow) return {}
        const borderDim = 0.5
        const background = getBackground()

        const getPosition = (): CSSObject => {
            if (placement.startsWith('top')) {
                return {
                    borderTopColor: background,
                    bottom: `-${borderDim * 2}rem`,
                    left: 0,
                    right: 0,
                    ...(placement === 'top-end' && {
                        left: 'unset',
                        right: `${borderDim}rem`,
                    }),
                    ...(placement === 'top-start' && {
                        left: `${borderDim}rem`,
                        right: 'unset',
                    }),
                }
            }
            if (placement.startsWith('bottom')) {
                return {
                    borderBottomColor: background,
                    left: 0,
                    right: 0,
                    top: `-${borderDim * 2}rem`,
                    ...(placement === 'bottom-end' && {
                        left: 'unset',
                        right: `${borderDim}rem`,
                    }),
                    ...(placement === 'bottom-start' && {
                        left: `${borderDim}rem`,
                        right: 'unset',
                    }),
                }
            }
            if (placement.startsWith('right')) {
                return {
                    borderRightColor: background,
                    bottom: 0,
                    left: `-${borderDim * 2}rem`,
                    top: 0,
                    ...(placement === 'right-end' && {
                        top: 'unset',
                        bottom: `${borderDim}rem`,
                    }),
                    ...(placement === 'right-start' && {
                        top: `${borderDim}rem`,
                        bottom: 'unset',
                    }),
                }
            }

            return {
                bottom: 0,
                borderLeftColor: background,
                right: `-${borderDim * 2}rem`,
                top: 0,
                ...(placement === 'left-end' && {
                    top: 'unset',
                    bottom: `${borderDim}rem`,
                }),
                ...(placement === 'left-start' && {
                    top: `${borderDim}rem`,
                    bottom: 'unset',
                }),
            }
        }
        return {
            '&:before': {
                border: `${borderDim}rem solid transparent`,
                content: '""',
                height: 0,
                position: 'absolute',
                width: 0,
                margin: 'auto',
                ...getPosition(),
            },
        }
    }

    return {
        borderRadius: '0.25rem',
        background: getBackground(),
        ...(hasElevation && {
            boxShadow: elevation.low,
        }),
        color: getColor(),
        padding: '0.8rem 1rem',
        position: 'relative',
        maxWidth: '15rem',
        ...getArrow(),
        ...themeVars.tooltip(themePropsForThemeVarFn, props),
        ...getThemeCSSObject(csx.root, theme),
    }
})

export const Tooltip = (props: TooltipProps): JSX.Element => {
    const {
        children,
        className,
        classes = {},
        title,
        message,
        isDisabled = false,
        innerRef,
        refPropName: _refPropsName = 'ref',
        modifiers: _modifiers = [],
        placement = 'top',
        csx = {},
        onTooltipClose,
        onTooltipOpen,
        isInteractiveTooltip = true,
        ...rest
    } = props

    const [tooltipElement, setTooltipElement] = useState<HTMLDivElement | null>(
        null
    )

    const [actualPlacement, setActualPlacement] = useState(placement)
    const childRefName = isChromatinElement(children)
        ? 'innerRef'
        : _refPropsName

    const childRef = useRef<any>(null)
    const _childInnerRef = children.props[childRefName]

    const childInnerRef = useForkRef(childRef, _childInnerRef)

    const isMouseOver = useMouseOver({
        anchorElement: childRef.current,
        otherElement: isInteractiveTooltip ? tooltipElement : undefined,
        onHoverEnd: onTooltipClose,
        onHoverStart: onTooltipOpen,
        isDisabled,
    })

    const modifiers: PopperProp['modifiers'] = [
        {
            name: 'offset',
            options: {
                offset: [0, 12],
            },
        },
        {
            name: 'onUpdate',
            enabled: true,
            phase: 'afterWrite',
            fn: ({ state }: any) => {
                if (state.placement !== actualPlacement) {
                    setActualPlacement(state.placement)
                }
            },
        },
        ..._modifiers,
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
                                ...getThemeCSSObject(csx.message, theme),
                            }
                        },
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
                            ...getThemeCSSObject(csx.title, theme),
                        }),
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
                [childRefName]: childInnerRef,
            })}
            <TooltipRoot
                anchorElement={childRef.current}
                className={cx(className, classes.root)}
                isOpen={isMouseOver}
                innerRef={(el: any) => {
                    setTooltipElement(el)
                    innerRef && setRef(innerRef, el)
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

attachSignatureToComponent(Tooltip, TOOLTIP)
