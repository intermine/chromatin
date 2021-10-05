import React, { Children, cloneElement, useEffect, useRef } from 'react'
import cx from 'clsx'

import {
    createStyle,
    createStyledComponent,
    getThemeCSSObject,
    Theme,
    ThemeCSSStyles,
} from '../styles'
import { AlertProps } from '../alert'
import {
    attachSignatureToComponent,
    getChromatinElementId,
    useForkRef,
} from '../utils'
import { ALERT_GROUP, ALERT } from '../constants/component-ids'

import type { Ref } from '../utils'
import { Portal, PortalProps } from '../portal'
import { CSSObject } from 'styled-components'
import { Collapsible } from '../collapsible'

export interface AlertGroupProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    /**
     * @default false
     **/
    isOpen?: boolean
    innerRef?: Ref
    portalProps?: PortalProps
    alertChildProps?: Omit<
        AlertProps,
        'portalProps' | 'isOpen' | 'children' | 'origin'
    >
    /**
     * Alert origin.
     * @default 'top-right'
     */
    origin?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'

    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        root?: string
        /**
         * Applied to wrapper component
         */
        wrapper?: string
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
         * Applied to wrapper component
         */
        wrapper?: ThemeCSSStyles
    }
}

const AlertGroupRoot = createStyledComponent<'div', AlertGroupProps>(
    'div',
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { csx = {}, origin = 'top-right' } = props

        const getOrigin = (): CSSObject => {
            if (origin === 'top-right' || origin === 'bottom-right') {
                return {
                    top: 0,
                    bottom: 0,
                    right: 0,
                }
            }

            return {
                left: 0,
                top: 0,
                bottom: 0,
            }
        }

        return {
            boxSizing: 'border-box',
            bottom: 0,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            overflowY: 'auto',
            position: 'fixed',
            scrollBehavior: 'smooth',
            top: 0,
            width: '27rem',
            ...getOrigin(),
            ...themeVars.alertGroup(themePropsForThemeVarFn, props),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

const useStyles = createStyle((theme) => ({
    wrapper: (props: AlertGroupProps) => {
        const { csx = {}, origin = 'top-right' } = props
        const getFlexDirection = (): string => {
            if (origin === 'top-right' || origin === 'top-left') return 'column'
            return 'column-reverse'
        }

        return {
            display: 'flex',
            flexDirection: getFlexDirection(),
            paddingBottom: theme.spacing(3),
            width: '25rem',
            ...getThemeCSSObject(csx.wrapper, theme),
        }
    },
    collapsible: {
        boxSizing: 'border-box',
        padding: '0.5rem',
    },
}))

export const AlertGroup = (props: AlertGroupProps): JSX.Element => {
    const {
        children: childrenProps,
        innerRef,
        classes: classesProps = {},
        className,
        portalProps = {},
        isOpen = false,
        ...rest
    } = props
    const classes = useStyles(props)
    const alertGroupRef = useRef<HTMLDivElement | null>(null)
    const ref = useForkRef(alertGroupRef, innerRef)

    const children = Children.map(childrenProps, (child: any) => {
        const id = getChromatinElementId(child)
        if (id === ALERT) {
            const alert = cloneElement(child, {
                ...child.props,
                portalProps: { isPortalDisabled: true },
                csx: {
                    ...child.csx,
                    root: (theme: Theme) => ({
                        ...(child.csx &&
                            child.csx.root &&
                            getThemeCSSObject(child.csx.root, theme)),
                        left: 'unset',
                        position: 'relative',
                        right: 'unset',
                        top: 'unset',
                        bottom: 'unset',
                    }),
                },
            })
            const isChildOpen = alert.props.isOpen
            return (
                <Collapsible
                    className={cx({ [classes.collapsible]: isChildOpen })}
                    isOpen={isChildOpen}
                >
                    {alert}
                </Collapsible>
            )
        }
        return child
    })

    useEffect(() => {
        if (alertGroupRef.current) {
            alertGroupRef.current.scrollTo(
                0,
                alertGroupRef.current.scrollHeight
            )
        }
    }, [children?.length])

    if (!isOpen) return <></>
    return (
        <Portal {...portalProps}>
            <AlertGroupRoot
                className={cx(className, classesProps.root)}
                ref={ref}
                {...rest}
            >
                <div className={classes.wrapper}>{children}</div>
            </AlertGroupRoot>
        </Portal>
    )
}

attachSignatureToComponent(AlertGroup, ALERT_GROUP)
