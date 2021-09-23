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
}

const GridRoot = createStyledComponent<'div', GridProps>('div', (_, props) => {
    const { isInline = false, direction = 'row' } = props
    return {
        boxSizing: 'border-box',
        display: isInline ? 'inline-flex' : 'flex',
        flexDirection: direction,
        flexWrap: 'wrap',
    }
})

const useStyle = createStyle((theme) => ({
    gridItem: (props: GridProps) => ({
        paddingLeft: theme.spacing(props.spacing ?? 0),
        paddingTop: theme.spacing(props.spacing ?? 0),
    }),
}))

export const Grid = (props: GridProps): JSX.Element => {
    const { children: childrenProps, spacing, innerRef, ...rest } = props
    const classes = useStyle(props)

    const children = !spacing
        ? childrenProps
        : Children.map(childrenProps, (child: any) => {
              return cloneElement(child, {
                  ...child.props,
                  className: cx(classes.gridItem, child.props.className),
              })
          })

    return (
        <GridRoot ref={innerRef} spacing={spacing} {...rest}>
            {children}
        </GridRoot>
    )
}
