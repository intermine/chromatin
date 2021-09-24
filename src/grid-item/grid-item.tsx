import cx from 'clsx'
import { CSSObject } from 'styled-components'
import { createStyledComponent } from '../styles'

export type ColWidthValues =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 9
    | 10
    | 11
    | 12
    | 'auto'
    | 'hidden'
    | 'cover'

export interface GridItemProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    xs?: ColWidthValues
    sm?: ColWidthValues
    md?: ColWidthValues
    lg?: ColWidthValues
    xl?: ColWidthValues
    /**
     * @default 'block'
     */
    display?: CSSObject['display']
    innerRef?: React.RefObject<any>
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        gridItemRoot?: string
    }
}

const GridItemRoot = createStyledComponent<'div', GridItemProps>(
    'div',
    (theme, props) => {
        const { xs, sm, md, lg, xl, display = 'block' } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { mixin } = themePropsForThemeVarFn.breakingPoints

        const colMixin = (width?: ColWidthValues): CSSObject => {
            if (width === undefined) return {}

            if (width === 0 || width === 'hidden')
                return {
                    display: 'none',
                }

            if (width === 'auto') {
                return {
                    display,
                    flex: '0 0 auto',
                    maxWidth: 'none',
                    width: 'auto',
                }
            }

            if (width === 'cover') {
                return {
                    display,
                    flex: 1,
                    width: '100%',
                }
            }

            const w = `${(width / 12) * 100}%`
            return {
                display,
                flex: `0 0 ${w}`,
                maxWidth: w,
            }
        }

        const getSmallestDefinedScreenProps = (): CSSObject => {
            if (xs !== undefined) return colMixin(xs)
            if (sm !== undefined) return colMixin(sm)
            if (md !== undefined) return colMixin(md)
            if (lg !== undefined) return colMixin(lg)
            if (xl !== undefined) return colMixin(xl)
            return {}
        }

        return {
            boxSizing: 'border-box',
            ...mixin(
                {
                    xs: getSmallestDefinedScreenProps(),
                    sm: colMixin(sm),
                    md: colMixin(md),
                    lg: colMixin(lg),
                    xl: colMixin(xl),
                },
                'min'
            ),
            ...themeVars.gridItem(themePropsForThemeVarFn, props),
        }
    }
)

export const GridItem = (props: GridItemProps): JSX.Element => {
    const { children, innerRef, className, classes = {}, ...rest } = props
    return (
        <GridItemRoot
            className={cx(className, classes.gridItemRoot)}
            ref={innerRef}
            {...rest}
        >
            {children}
        </GridItemRoot>
    )
}
