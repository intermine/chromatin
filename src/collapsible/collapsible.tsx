import { useRef, useState, useLayoutEffect } from 'react'
import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
} from '../styles'
import { attachSignatureToComponent, useForkRef } from '../utils'
import { COLLAPSIBLE } from '../constants/component-ids'

import type { Ref } from '../utils'

export interface CollapsibleProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    /**
     * To open or close collapsible.
     */
    isOpen?: boolean
    /**
     * Ref to collapsible container.
     */
    innerRef?: Ref<HTMLDivElement>
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
        const { csx = {}, isOpen = false, animationDuration } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme

        return {
            opacity: isOpen ? 1 : 0,
            overflow: 'hidden',
            transition: `${animationDuration}ms`,
            ...themeVars.collapsible(themePropsForThemeVarFn, props),
            ...getThemeCSSObject(csx.root, theme),
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

export const Collapsible = (props: CollapsibleProps): JSX.Element => {
    const {
        innerRef,
        children,
        classes = {},
        className,
        isOpen = false,
        animationDuration: animationDurationProp,
        ...rest
    } = props

    const [animationDuration, setAnimationDuration] = useState(0)

    const ref = useRef<HTMLDivElement | null>(null)
    const collapsibleRef = useForkRef(innerRef, ref)

    const onIsOpenChange = () => {
        if (!ref.current) return

        if (isOpen) {
            const height = ref.current.scrollHeight ?? 0
            ref.current.style.height = `${height}px`
        } else {
            ref.current.style.height = '0'
        }
    }

    useLayoutEffect(() => {
        if (animationDurationProp) {
            setAnimationDuration(animationDurationProp)
        } else if (ref.current) {
            const height = ref.current.scrollHeight ?? 0
            const duration = getAnimationDurationBasedOnHeight(height)
            setAnimationDuration(duration)
        }
    }, [animationDurationProp, ref])

    useLayoutEffect(() => {
        onIsOpenChange()
    }, [isOpen])

    return (
        <CollapsibleRoot
            ref={collapsibleRef}
            className={cx(className, classes.root)}
            animationDuration={animationDuration}
            isOpen={isOpen}
            {...rest}
        >
            {children}
        </CollapsibleRoot>
    )
}

attachSignatureToComponent(Collapsible, COLLAPSIBLE)
