import { Children, cloneElement, useEffect, useRef, forwardRef } from 'react'
import cx from 'clsx'

import {
    createStyle,
    createStyledComponent,
    getThemeCSSObject,
    Theme,
    ThemeCSSStyles
} from '../styles'
import { AlertProps } from '../alert'
import {
    attachSignatureToComponent,
    getChromatinElementId,
    useForkRef
} from '../utils'
import { ALERT_GROUP, ALERT } from '../constants/component-ids'

import { Portal, PortalProps } from '../portal'
import { CSSObject } from 'styled-components'
import { Collapsible } from '../collapsible'

export interface AlertGroupProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    /**
     * @default false
     **/
    isOpen?: boolean
    /**
     * If origin is top-* then only this is applicable.
     *
     * Scroll to bottom on addition of new alert.
     * @default true
     */
    isScrollToBottom?: boolean
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

        /**
         * Applied to collapsible component
         */
        collapsible?: string
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
        /**
         * Applied to collapsible component
         */
        collapsible?: ThemeCSSStyles
    }
}

const AlertGroupRoot = createStyledComponent<'div', AlertGroupProps>(
    'div',
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            csx = {},
            origin = 'top-right',
            isExtendStyleFromThemeVars = true
        } = props
        const {
            breakingPoints: { mixin }
        } = themePropsForThemeVarFn

        const getOrigin = (): CSSObject => {
            switch (origin) {
                case 'top-left':
                    return {
                        top: 0,
                        left: 0
                    }
                case 'top-right':
                    return {
                        top: 0,
                        right: 0
                    }

                case 'bottom-left':
                    return {
                        bottom: 0,
                        left: 0
                    }
                default:
                    return {
                        bottom: 0,
                        right: 0
                    }
            }
        }

        return {
            boxSizing: 'border-box',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            maxHeight: '100vh',
            overflowY: 'auto',
            position: 'fixed',
            scrollBehavior: 'smooth',
            width: '27rem',
            zIndex: 10,
            ...mixin(
                {
                    sm: {
                        bottom:
                            origin === 'bottom-right' ||
                            origin === 'bottom-left'
                                ? 0
                                : 'auto',
                        height: '10rem',
                        justifyContent: 'center',
                        left: 0,
                        right: 0,
                        top:
                            origin === 'top-right' || origin === 'top-left'
                                ? 0
                                : 'auto',
                        width: 'auto'
                    }
                },
                'max'
            ),
            ...getOrigin(),
            ...(isExtendStyleFromThemeVars &&
                themeVars.alertGroup(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
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
            ...theme.breakingPoints.mixin(
                { sm: { width: '100%', padding: 0, alignItems: 'flex-end' } },
                'max'
            ),
            ...getThemeCSSObject(csx.wrapper, theme)
        }
    },
    collapsible: (props: AlertGroupProps) => {
        const { csx = {} } = props
        return {
            boxSizing: 'border-box',
            padding: '0.5rem',
            ...theme.breakingPoints.mixin(
                { sm: { padding: '0.2rem 0' } },
                'max'
            ),
            ...getThemeCSSObject(csx.collapsible, theme)
        }
    }
}))

export const AlertGroup = forwardRef<HTMLDivElement, AlertGroupProps>(
    (props, ref): JSX.Element => {
        const {
            children: childrenProps,
            classes: classesProps = {},
            className,
            portalProps = {},
            alertChildProps = {},
            isOpen = false,
            isScrollToBottom = true,
            origin = 'top-right',
            ...rest
        } = props
        const classes = useStyles(props)
        const alertGroupRef = useRef<HTMLDivElement | null>(null)
        const _ref = useForkRef(alertGroupRef, ref)

        const children = Children.map(childrenProps, (child: any) => {
            const id = getChromatinElementId(child)
            if (id === ALERT) {
                const alert = cloneElement(child, {
                    ...child.props,
                    portalProps: { hasUseReactPortal: false },
                    ...alertChildProps,
                    csx: {
                        ...child.csx,
                        root: (theme: Theme) => ({
                            left: 'unset',
                            position: 'relative',
                            right: 'unset',
                            top: 'unset',
                            bottom: 'unset',
                            ...alertChildProps.csx?.root,
                            ...(child.csx &&
                                child.csx.root &&
                                getThemeCSSObject(child.csx.root, theme))
                        })
                    }
                })
                const isChildOpen = alert.props.isOpen

                return (
                    <Collapsible
                        className={cx(
                            { [classes.collapsible]: isChildOpen },
                            classesProps.collapsible
                        )}
                        in={isChildOpen}
                    >
                        {alert}
                    </Collapsible>
                )
            }
            return child
        })

        useEffect(() => {
            if (
                alertGroupRef.current &&
                isScrollToBottom &&
                (origin === 'top-right' || origin === 'top-left')
            ) {
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
                    aria-live="polite"
                    role="alert-group"
                    className={cx(className, classesProps.root)}
                    ref={_ref}
                    origin={origin}
                    {...rest}
                >
                    <div className={classes.wrapper}>{children}</div>
                </AlertGroupRoot>
            </Portal>
        )
    }
)

attachSignatureToComponent(AlertGroup, ALERT_GROUP)
