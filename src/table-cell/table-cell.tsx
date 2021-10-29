import { forwardRef } from 'react'
import cx from 'clsx'
import { useContext } from 'react'

import {
    createStyledComponent,
    ThemeCSSStyles,
    getThemeCSSObject,
    themeTernaryOperator as tto
} from '../styles'
import {
    attachSignatureToComponent,
    getNeutralBasicColorForComponent
} from '../utils'
import { TABLE_CELL } from '../constants/component-ids'

import TableContext from '../table/table-context'

import { CSSObject } from 'styled-components'

export interface TableCellProps
    extends Omit<React.HTMLProps<HTMLTableCellElement>, 'as' | 'ref'> {
    /**
     * @default false
     */
    isDense?: boolean
    /**
     * @default false
     */
    isSticky?: boolean
    /**
     * @default 'td'
     */
    Component?: 'td' | 'th'
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

const TableCellRoot = createStyledComponent<'td' | 'th', TableCellProps>(
    'td',
    (theme, props) => {
        const {
            csx = {},
            isExtendStyleFromThemeVars = true,
            isDense,
            isSticky
        } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            palette: {
                common: { white }
            },
            themeType
        } = themePropsForThemeVarFn

        const getStickyProps = (): CSSObject => {
            if (!isSticky) return {}
            return {
                position: 'sticky',
                top: '0'
            }
        }

        const _neutral = getNeutralBasicColorForComponent({ theme })
        return {
            background: tto(themeType, white, _neutral[30]),
            borderBottom: `1px solid ${_neutral[40]}`,
            display: 'table-cell',
            padding: isDense ? '0.5rem 1rem' : '1rem',
            ...getStickyProps(),
            ...(isExtendStyleFromThemeVars &&
                themeVars.tableCell(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
    (props, ref): JSX.Element => {
        const {
            Component = 'td',
            className,
            classes = {},
            isSticky: _isSticky,
            isDense: _isDense,
            ...rest
        } = props

        const tableContext = useContext(TableContext)
        const isSticky =
            _isSticky ?? Component === 'th'
                ? tableContext?.hasStickyHeader
                : false
        const isDense = _isDense ?? tableContext?.isDense

        return (
            <TableCellRoot
                className={cx(className, classes.root)}
                as={Component}
                ref={ref}
                isSticky={isSticky}
                isDense={isDense}
                {...rest}
            />
        )
    }
)

attachSignatureToComponent(TableCell, TABLE_CELL)
