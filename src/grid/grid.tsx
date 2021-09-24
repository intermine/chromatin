import cx from 'clsx'
import { Children, cloneElement } from 'react'
import { CSSObject } from 'styled-components'

import { createStyle, createStyledComponent } from '../styles'

export interface GridProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    /**
     * @default false
     */
    isInline?: boolean
    /**
     * @default 'row'
     */
    direction?: CSSObject['flexDirection']
    /**
     * Space between each child. It uses
     * theme.spacing(val) for spacing.
     *
     * @default 0
     */
    spacing?: number
    innerRef?: React.RefObject<any>
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        gridRoot?: string
        /**
         * Applied to grid child
         */
        gridItem?: string
    }
}

const GridRoot = createStyledComponent<'div', GridProps>(
    'div',
    (theme, props) => {
        const { isInline = false, direction = 'row' } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme

        return {
            boxSizing: 'border-box',
            display: isInline ? 'inline-flex' : 'flex',
            flexDirection: direction,
            flexWrap: 'wrap',
            ...themeVars.grid(themePropsForThemeVarFn, props),
        }
    }
)

const useStyle = createStyle((theme) => ({
    gridItem: (props: GridProps) => ({
        paddingLeft: theme.spacing(props.spacing ?? 0),
        paddingTop: theme.spacing(props.spacing ?? 0),
    }),
}))

export const Grid = (props: GridProps): JSX.Element => {
    const {
        children: childrenProps,
        spacing,
        innerRef,
        className,
        classes: classesProps = {},
        ...rest
    } = props

    const classes = useStyle(props)

    const children = !spacing
        ? childrenProps
        : Children.map(childrenProps, (child: any) => {
              return cloneElement(child, {
                  ...child.props,
                  className: cx(
                      classes.gridItem,
                      child.props.className,
                      classesProps.gridItem
                  ),
              })
          })

    return (
        <GridRoot
            className={cx(className, classesProps.gridRoot)}
            ref={innerRef}
            spacing={spacing}
            {...rest}
        >
            {children}
        </GridRoot>
    )
}
