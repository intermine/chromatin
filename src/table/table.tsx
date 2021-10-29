import { forwardRef } from 'react'
import cx from 'clsx'

import {
    createStyledComponent,
    ThemeCSSStyles,
    getThemeCSSObject,
    getColorForComponent
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { TABLE } from '../constants/component-ids'

import TableContext from './table-context'

export interface TableProps
    extends Omit<React.HTMLProps<HTMLTableElement>, 'as' | 'ref'> {
    /**
     * @default false
     */
    isDense?: boolean
    /**
     * @default false
     */
    hasStickyHeader?: boolean
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

const TableRoot = createStyledComponent<'table', TableProps>(
    'table',
    (theme, props) => {
        const {
            csx = {},
            isExtendStyleFromThemeVars = true,
            hasStickyHeader
        } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            typography: { body }
        } = themePropsForThemeVarFn

        const _color = getColorForComponent({ theme })

        return {
            borderCollapse: hasStickyHeader ? 'separate' : 'collapse',
            borderSpacing: '0',
            color: _color,
            display: 'table',
            width: '100%',
            textAlign: 'left',
            ...body,
            ...(isExtendStyleFromThemeVars &&
                themeVars.table(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

export const Table = forwardRef<HTMLTableElement, TableProps>(
    (props, ref): JSX.Element => {
        const {
            classes = {},
            className,
            isDense = false,
            hasStickyHeader = false,
            ...rest
        } = props

        const tableContext = {
            isDense,
            hasStickyHeader
        }

        return (
            <TableContext.Provider value={tableContext}>
                <TableRoot
                    className={cx(className, classes.root)}
                    ref={ref}
                    hasStickyHeader={hasStickyHeader}
                    {...rest}
                />
            </TableContext.Provider>
        )
    }
)

attachSignatureToComponent(Table, TABLE)
