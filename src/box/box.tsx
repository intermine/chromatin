import { CSSObject } from 'styled-components'
import cx from 'clsx'

import { createStyledComponent } from '../styles'

export interface BoxProps<T>
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    innerRef?: React.RefObject<any>
    Component?:
        | React.ElementType
        | React.ComponentType<T>
        | React.ForwardRefExoticComponent<T>

    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        boxRoot?: string
    }
}

const BoxRoot = createStyledComponent('div', (theme, props) => {
    const { themeVars, ...themePropsForThemeVarFn } = theme
    return {
        ...themeVars.box(themePropsForThemeVarFn, props),
    }
})

export const Box = <T,>(props: BoxProps<T>): JSX.Element => {
    const {
        children,
        className,
        classes = {},
        innerRef,
        Component = 'div',
        ...rest
    } = props
    return (
        <BoxRoot
            className={cx(className, classes.boxRoot)}
            as={Component}
            ref={innerRef}
            {...rest}
        >
            {children}
        </BoxRoot>
    )
}
