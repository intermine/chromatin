import cx from 'clsx'

import {
    createStyledComponent,
    ThemeCSSStyles,
    getThemeCSSObject,
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { TABLE } from '../constants/component-ids'

import TableContext from './table-context'

import type { Ref } from '../utils'

export interface TableProps
    extends Omit<React.HTMLProps<HTMLTableElement>, 'as' | 'ref'> {
    innerRef?: Ref
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
            hasStickyHeader,
        } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            typography: { body },
            palette: { neutral },
        } = themePropsForThemeVarFn

        return {
            borderCollapse: hasStickyHeader ? 'separate' : 'collapse',
            borderSpacing: '0',
            color: neutral[90],
            display: 'table',
            width: '100%',
            textAlign: 'left',
            ...body,
            ...(isExtendStyleFromThemeVars &&
                themeVars.table(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const Table = (props: TableProps): JSX.Element => {
    const {
        innerRef,
        classes = {},
        className,
        isDense = false,
        hasStickyHeader = false,
        ...rest
    } = props

    const tableContext = {
        isDense,
        hasStickyHeader,
    }

    return (
        <TableContext.Provider value={tableContext}>
            <TableRoot
                className={cx(className, classes.root)}
                ref={innerRef}
                hasStickyHeader={hasStickyHeader}
                {...rest}
            />
        </TableContext.Provider>
    )
}

attachSignatureToComponent(Table, TABLE)
