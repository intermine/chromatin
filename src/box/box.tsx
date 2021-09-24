import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
} from '../styles'

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
    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Applied to root component
         */
        boxRoot?: ThemeCSSStyles
    }
}

const BoxRoot = createStyledComponent<'div', BoxProps<'div'>>(
    'div',
    (theme, props) => {
        const { csx = {} } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme

        return {
            ...themeVars.box(themePropsForThemeVarFn, props),
            ...getThemeCSSObject(csx.boxRoot, theme),
        }
    }
)

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
