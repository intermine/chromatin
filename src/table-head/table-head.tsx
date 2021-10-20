import { cloneElement, Children } from 'react'
import cx from 'clsx'
import {
    createStyledComponent,
    ThemeCSSStyles,
    getThemeCSSObject,
} from '../styles'
import { attachSignatureToComponent, getChromatinElementId } from '../utils'
import { TABLE_HEAD } from '../constants/component-ids'

import type { Ref } from '../utils'

export interface TableHeadProps
    extends Omit<React.HTMLProps<HTMLTableSectionElement>, 'as' | 'ref'> {
    innerRef?: Ref
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

const TableHeadRoot = createStyledComponent<'thead', TableHeadProps>(
    'thead',
    (theme, props) => {
        const { csx = {}, isExtendStyleFromThemeVars = true } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme

        return {
            display: 'table-header-group',
            ...(isExtendStyleFromThemeVars &&
                themeVars.tableHead(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const TableHead = (props: TableHeadProps): JSX.Element => {
    const { innerRef, classes = {}, className, ...rest } = props

    return (
        <TableHeadRoot
            className={cx(className, classes.root)}
            ref={innerRef}
            {...rest}
        />
    )
}

attachSignatureToComponent(TableHead, TABLE_HEAD)
