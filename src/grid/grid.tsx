import { Children, cloneElement, forwardRef } from 'react'
import cx from 'clsx'
import { CSSObject } from 'styled-components'

import {
    createStyle,
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles
} from '../styles'

import { Box, BoxBaseProps } from '../box'
import { attachSignatureToComponent } from '../utils'
import { GRID } from '../constants/component-ids'

export interface GridProps extends BoxBaseProps {
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
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        root?: string
        /**
         * Applied to grid child
         */
        gridItem?: string
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
         * Applied to grid child
         */
        gridItem?: ThemeCSSStyles
    }
}

const GridRoot = createStyledComponent<typeof Box, GridProps>(
    Box,
    (theme, props) => {
        const {
            isInline = false,
            direction = 'row',
            csx = {},
            isExtendStyleFromThemeVars = true
        } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme

        return {
            boxSizing: 'border-box',
            display: isInline ? 'inline-flex' : 'flex',
            flexDirection: direction,
            flexWrap: 'wrap',
            ...(isExtendStyleFromThemeVars &&
                themeVars.grid(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    },
    {
        isExtendStyleFromThemeVars: false
    }
)

const useStyle = createStyle((theme) => ({
    gridItem: (props: GridProps) => ({
        paddingLeft: theme.spacing(props.spacing ?? 0),
        paddingTop: theme.spacing(props.spacing ?? 0),
        ...(props.csx && getThemeCSSObject(props.csx.gridItem, theme))
    })
}))

export const Grid = forwardRef<any, GridProps>((props, ref): JSX.Element => {
    const {
        children: childrenProps,
        spacing,
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
                  )
              })
          })

    return (
        <GridRoot
            className={cx(className, classesProps.root)}
            spacing={spacing}
            ref={ref}
            {...rest}
        >
            {children}
        </GridRoot>
    )
})

attachSignatureToComponent(Grid, GRID)
