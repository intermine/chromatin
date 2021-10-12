import React, { useState, useEffect, useRef } from 'react'
import cx from 'clsx'

import {
    createStyle,
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
    themeTernaryOperator as tto,
} from '../styles'
import { attachSignatureToComponent, useForkRef } from '../utils'
import { MENU } from '../constants/component-ids'
import { List } from '../list'
import { Popper, PopperProps } from '../popper'

import type { Ref } from '../utils'

export interface MenuProps
    extends Omit<
        React.HTMLProps<HTMLOListElement | HTMLUListElement | HTMLDivElement>,
        'as' | 'ref'
    > {
    innerRef?: Ref
    /**
     * @default false
     */
    isOpen?: boolean
    /**
     * Target element
     */
    anchorElement?: HTMLElement
    /**
     * Tooltip placement
     */
    placement?: PopperProps['placement']
    /**
     * If true then overlap the anchor element.
     * @default true
     */
    isOverlapAnchorElement?: boolean
    /**
     * Tooltip modifier, same as popper modifier
     */
    modifiers?: PopperProps['modifiers']
    /**
     * To have box shadow
     * @default true
     */
    hasElevation?: boolean
    /**
     * Time for which component is mounted after isOpen is false.
     * It should be in millisecond.
     *
     * @default 230
     */
    waitForXDurationBeforeUnmount?: number
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

const MenuRoot = createStyledComponent<typeof List, MenuProps>(
    List,
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { elevation, themeType, palette } = themePropsForThemeVarFn
        const {
            neutral,
            common: { white },
        } = palette
        const {
            hasElevation = true,
            csx = {},
            isOpen,
            isExtendStyleFromThemeVars,
        } = props

        return {
            background: tto(themeType, white, neutral[40]),
            display: isOpen ? 'block' : 'none',
            minWidth: '15rem',
            ...(hasElevation && {
                boxShadow: elevation.low,
            }),
            ...(isExtendStyleFromThemeVars &&
                themeVars.menu(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme),
        }
    },
    { isExtendStyleFromThemeVars: false }
)

const useStyles = createStyle({
    '@keyframes entry': {
        '0%': {
            transform: 'scale(0)',
        },
        '100%': {
            transform: 'scale(1)',
        },
    },
    '@keyframes exit': {
        '0%': {
            transform: 'scale(1)',
        },
        '100%': {
            transform: 'scale(0)',
        },
    },

    menu: (props: MenuProps) => {
        const { placement = 'bottom-start' } = props
        const getTransformOrigin = (): string => {
            let xOrigin = '0'
            let yOrigin = '0'

            if (
                placement === 'bottom-end' ||
                placement === 'left-start' ||
                placement === 'left' ||
                placement === 'left-end' ||
                placement === 'top-end'
            ) {
                xOrigin = '100%'
            }
            if (placement === 'bottom' || placement === 'top') {
                xOrigin = '50%'
            }
            if (placement === 'left' || placement === 'right') {
                yOrigin = '50%'
            }
            if (
                placement === 'top' ||
                placement === 'top-start' ||
                placement === 'top-end' ||
                placement === 'right-end' ||
                placement === 'left-end'
            ) {
                yOrigin = '100%'
            }

            return `${xOrigin} ${yOrigin}`
        }

        return {
            transformOrigin: getTransformOrigin(),
        }
    },

    entryAnimation: {
        animation: '$entry 0.230s  forwards',
    },

    exitAnimation: {
        animation: '$exit 0.230s forwards',
    },
})

export const Menu = (props: MenuProps): JSX.Element => {
    const {
        children,
        isOpen: _isOpen,
        anchorElement,
        placement = 'bottom-start',
        modifiers: _modifiers = [],
        isOverlapAnchorElement = false,
        className,
        classes: _classes = {},
        waitForXDurationBeforeUnmount = 230,
        innerRef,
        ...rest
    } = props

    const [actualPlacement, setActualPlacement] = useState(placement)
    const [isOpen, setIsOpen] = useState(_isOpen)

    const ref = useRef<null | HTMLElement>(null)
    const menuRef = useForkRef(ref, innerRef)

    const getOffset = (): [number, number] => {
        if (!isOverlapAnchorElement || !anchorElement) return [0, 0]
        const { height = 0 } = anchorElement.getBoundingClientRect()
        return [0, -height]
    }

    const modifiers: PopperProps['modifiers'] = [
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
        {
            name: 'offset',
            options: {
                offset: getOffset(),
            },
        },
        ..._modifiers,
    ]

    const classes = useStyles({ ...props, placement: actualPlacement })

    useEffect(() => {
        let interval: NodeJS.Timeout | null
        if (_isOpen) {
            setIsOpen(true)
        } else {
            interval = setTimeout(
                () => setIsOpen(false),
                waitForXDurationBeforeUnmount
            )
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [_isOpen, waitForXDurationBeforeUnmount])

    return (
        <Popper
            anchorElement={anchorElement}
            placement={placement}
            modifiers={modifiers}
        >
            <MenuRoot
                isOpen={isOpen}
                tabIndex={0}
                innerRef={menuRef}
                className={cx(classes.menu, className, _classes.root, {
                    [_classes.entryAnimation ??
                    classes.entryAnimation]: _isOpen,
                    [_classes.exitAnimation ?? classes.exitAnimation]: !_isOpen,
                })}
                {...rest}
            >
                {children}
            </MenuRoot>
        </Popper>
    )
}

attachSignatureToComponent(Menu, MENU)
