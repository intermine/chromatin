import { forwardRef } from 'react'
import cx from 'clsx'

import {
    createStyledComponent,
    ThemeCSSStyles,
    getThemeCSSObject
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { TABLE_ROW } from '../constants/component-ids'

export interface TableRowProps
    extends Omit<React.HTMLProps<HTMLTableRowElement>, 'as' | 'ref'> {
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

const TableRowRoot = createStyledComponent<'tr', TableRowProps>(
    'tr',
    (theme, props) => {
        const { csx = {}, isExtendStyleFromThemeVars = true } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        return {
            display: 'table-row',
            ...(isExtendStyleFromThemeVars &&
                themeVars.tableRow(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
    (props, ref): JSX.Element => {
        const { classes = {}, className, ...rest } = props

        return (
            <TableRowRoot
                className={cx(className, classes.root)}
                ref={ref}
                {...rest}
            />
        )
    }
)
attachSignatureToComponent(TableRow, TABLE_ROW)
