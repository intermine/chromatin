import { forwardRef } from 'react'
import cx from 'clsx'

import {
    createStyledComponent,
    ThemeCSSStyles,
    getThemeCSSObject
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { TABLE_BODY } from '../constants/component-ids'

export interface TableBodyProps
    extends Omit<React.HTMLProps<HTMLTableSectionElement>, 'as' | 'ref'> {
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

const TableBodyRoot = createStyledComponent<'tbody', TableBodyProps>(
    'tbody',
    (theme, props) => {
        const { csx = {}, isExtendStyleFromThemeVars = true } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme

        return {
            display: 'table-row-group',
            ...(isExtendStyleFromThemeVars &&
                themeVars.tableBody(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
    (props, ref): JSX.Element => {
        const { classes = {}, className, ...rest } = props

        return (
            <TableBodyRoot
                className={cx(className, classes.root)}
                ref={ref}
                {...rest}
            />
        )
    }
)

attachSignatureToComponent(TableBody, TABLE_BODY)
