import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    isThemeColorName,
    ThemeCSSStyles,
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { DIVIDER } from '../constants/component-ids'

import type { Ref } from '../utils'

export interface DividerProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    /**
     * @default 'div'
     */
    Component?:
        | React.ElementType
        | React.ComponentType<any>
        | React.ForwardRefExoticComponent<any>

    innerRef?: Ref
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
     * @default 'neutral'
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

const DividerRoot = createStyledComponent<'div', DividerProps>(
    'div',
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            palette,
            spacing,
            typography: {
                meta: { documentFontSize },
            },
        } = themePropsForThemeVarFn

        const {
            csx = {},
            hasFlexParent,
            alignment = 'hr',
            color = 'neutral',
            borderWidth = 1,
            isExtendStyleFromThemeVars = true,
        } = props

        const getMargin = (): string => {
            if (alignment === 'hr') {
                return `${spacing(1)} 0`
            }

            return `0 ${spacing(1)}`
        }

        const getBorder = (): string => {
            const width = `${borderWidth / documentFontSize}rem`
            let borderColor = color

            if (isThemeColorName(color)) {
                borderColor = palette[color].main
            }

            return `${width} solid ${borderColor}`
        }

        return {
            border: getBorder(),
            boxSizing: 'border-box',
            display: 'inline-block',
            padding: 0,
            margin: getMargin(),
            ...(alignment === 'hr' && {
                height: 0,
                flex: hasFlexParent ? 1 : undefined,
                width: hasFlexParent ? undefined : '100%',
            }),
            ...(alignment === 'vt' && {
                bottom: 0,
                top: 0,
            }),
            ...(!hasFlexParent &&
                alignment === 'vt' && {
                    position: 'relative',
                    top: 0,
                    bottom: 0,
                }),
            ...(hasFlexParent &&
                alignment !== 'hr' && {
                    alignSelf: 'stretch',
                    height: 'auto',
                }),
            ...(isExtendStyleFromThemeVars &&
                themeVars.divider(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const Divider = (props: DividerProps): JSX.Element => {
    const {
        className,
        classes = {},
        innerRef,
        Component = 'div',
        ...rest
    } = props
    return (
        <DividerRoot
            as={Component}
            ref={innerRef}
            className={cx(className, classes.root)}
            {...rest}
        />
    )
}

attachSignatureToComponent(Divider, DIVIDER)
