import { forwardRef } from 'react'
import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
    getColorForComponent
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { DIVIDER } from '../constants/component-ids'

export interface DividerBaseProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    /**
     * Alignment of the divider.
     * hr - horizontal, vt - vertical
     * @default 'hr'
     */
    alignment?: 'hr' | 'vt'
    /**
     * Width of the divider border.
     * It should be equivalent to px.
     * @default 1
     */
    borderWidth?: number
    /**
     * Color of the border
     */
    color?: string
    /**
     * Whether parent is a flex item.
     */
    hasFlexParent?: boolean
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

export type DividerProps<T> = DividerBaseProps & {
    Component?:
        | React.ElementType
        | React.ComponentType<any>
        | React.ForwardRefExoticComponent<any>
} & T

const DividerRoot = createStyledComponent<'div', DividerProps<'div'>>(
    'div',
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            spacing,
            typography: {
                meta: { documentFontSize }
            }
        } = themePropsForThemeVarFn

        const {
            csx = {},
            hasFlexParent,
            alignment = 'hr',
            color,
            borderWidth = 1,
            isExtendStyleFromThemeVars = true
        } = props

        const getMargin = (): string | undefined => {
            if (alignment === 'hr') {
                return `${spacing(2)} 0`
            }

            return `0 ${spacing(2)}`
        }

        const getBorder = (): string => {
            const width = `${borderWidth / documentFontSize}rem`
            const borderColor = getColorForComponent({
                theme,
                color,
                isSwitchDefaultColor: true,
                defaultKey: {
                    grey: 30,
                    darkGrey: 40
                }
            })

            return `${width} solid ${borderColor}`
        }

        return {
            borderBottom: getBorder(),
            borderLeft: getBorder(),
            boxSizing: 'border-box',
            margin: getMargin(),
            padding: 0,
            lineHeight: 0,
            ...(alignment === 'hr' && {
                height: 0,
                display: 'block',
                flex: hasFlexParent ? 1 : undefined,
                width: hasFlexParent ? undefined : '100%'
            }),
            ...(alignment === 'vt' && {
                bottom: 0,
                top: 0,
                display: 'inline-block'
            }),
            ...(!hasFlexParent &&
                alignment === 'vt' && {
                    position: 'relative',
                    top: 0,
                    bottom: 0
                }),
            ...(hasFlexParent &&
                alignment !== 'hr' && {
                    alignSelf: 'stretch',
                    height: 'auto'
                }),
            ...(isExtendStyleFromThemeVars &&
                themeVars.divider(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

export const Divider = forwardRef(
    <T,>(props: DividerProps<T>, ref: any): JSX.Element => {
        const { className, classes = {}, Component = 'div', ...rest } = props
        return (
            <DividerRoot
                as={Component}
                ref={ref}
                className={cx(className, classes.root)}
                {...rest}
            />
        )
    }
) as <T>(props: DividerProps<T> & { ref?: any }) => JSX.Element

attachSignatureToComponent(Divider, DIVIDER)
