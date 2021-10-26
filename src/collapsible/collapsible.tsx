import { useRef, useState, useLayoutEffect, forwardRef } from 'react'
import { Transition } from 'react-transition-group'
import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles
} from '../styles'
import { attachSignatureToComponent, useForkRef } from '../utils'
import { COLLAPSIBLE } from '../constants/component-ids'

export interface CollapsibleProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    /**
     * To open or close collapsible.
     */
    in?: boolean
    /**
     * Animation duration when collapse or expand the collapsible.
     * If not given then it will automatically calculated based on
     * content. If you want no animation then pass 0.
     */
    animationDuration?: number
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        root?: string
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
const CollapsibleRoot = createStyledComponent<'div', CollapsibleProps>(
    'div',
    (theme, props) => {
        const {
            csx = {},
            in: _in = false,
            animationDuration,
            isExtendStyleFromThemeVars = true
        } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme

        return {
            boxSizing: 'border-box',
            height: 0,
            opacity: _in ? 1 : 0,
            overflow: 'hidden',
            transition: `${animationDuration}ms`,
            ...(isExtendStyleFromThemeVars &&
                themeVars.collapsible(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

const getAnimationDurationBasedOnHeight = (height: number): number => {
    if (!height) {
        return 0
    }

    const constant = height / 36
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10)
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
    (props, ref): JSX.Element => {
        const {
            children,
            classes = {},
            className,
            in: _in = false,
            animationDuration: animationDurationProp,
            ...rest
        } = props

        const [animationDuration, setAnimationDuration] = useState(0)

        const _ref = useRef<HTMLDivElement | null>(null)
        const collapsibleRef = useForkRef(ref, _ref)

        const onIsOpenChange = () => {
            if (!_ref.current) return

            if (_in) {
                const height = _ref.current.scrollHeight ?? 0
                _ref.current.style.height = `${height}px`
            } else {
                _ref.current.style.height = '0'
            }
        }

        useLayoutEffect(() => {
            if (animationDurationProp) {
                setAnimationDuration(animationDurationProp)
            } else if (_ref.current) {
                const height = _ref.current.scrollHeight ?? 0
                const duration = getAnimationDurationBasedOnHeight(height)
                setAnimationDuration(duration)
            }
        }, [animationDurationProp, _ref])

        useLayoutEffect(() => {
            onIsOpenChange()
        }, [_in, ref])

        return (
            <Transition in={_in} timeout={animationDuration} {...rest}>
                {(state) => {
                    return (
                        <CollapsibleRoot
                            ref={collapsibleRef}
                            className={cx(className, classes.root)}
                            animationDuration={animationDuration}
                            in={state === 'entered' || state === 'entering'}
                            {...rest}
                        >
                            {children}
                        </CollapsibleRoot>
                    )
                }}
            </Transition>
        )
    }
)

attachSignatureToComponent(Collapsible, COLLAPSIBLE)
