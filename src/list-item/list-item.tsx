import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    isThemeColorName,
    ThemeCSSStyles,
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { LIST_ITEM } from '../constants/component-ids'
import { CSSObject } from 'styled-components'
import { getHoverProperties } from '../button-base/utils'

import { Ref } from '../utils'

export interface ListItemProps
    extends Omit<React.HTMLProps<HTMLLIElement>, 'as' | 'ref'> {
    innerRef?: Ref
    /**
     * If given then list has hover effect
     * @default undefined
     */
    hoverColor?: string
    /**
     * @default 'flex'
     */
    display?: CSSObject['display']
    /**
     * This is dependent on display. If display is other
     * than flex or inline-flex then this has no effect.
     *  @default 'center'
     */
    alignItems?: CSSObject['alignItems']
    /**
     * This is dependent on display. If display is other
     * than flex or inline-flex then this has no effect.
     * @default undefined
     */
    justifyContent?: CSSObject['justifyContent']
    /**
     * @default true
     */
    hasPadding?: boolean
    /**
     * To have dense padding
     */
    isDense?: boolean
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

const ListItemRoot = createStyledComponent<'li', ListItemProps>(
    'li',
    (theme, props) => {
        const {
            csx = {},
            hasPadding = true,
            isDense = false,
            hoverColor,
            display = 'flex',
            alignItems = 'center',
            justifyContent,
        } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            palette,
            typography: { body },
        } = themePropsForThemeVarFn

        const getPadding = (): string | undefined => {
            if (!hasPadding) return
            if (isDense) return '0.4rem 1.2rem'
            return '0.7rem 1.4rem'
        }

        const hoverProperties = (): CSSObject => {
            if (!hoverColor) return {}

            let color = ''
            if (hoverColor === 'neutral') color = palette.neutral[80]
            else {
                color = isThemeColorName(hoverColor)
                    ? palette[hoverColor].main
                    : hoverColor
            }

            return {
                ...getHoverProperties({
                    color,
                    disabled: false,
                    variant: 'ghost',
                    theme,
                    mainColor: color,
                }),
                cursor: 'default',
            }
        }

        return {
            alignItems,
            borderRadius: '0.25rem',
            color: palette.neutral[90],
            display,
            justifyContent,
            padding: getPadding(),
            ...(hoverColor && {
                '&: hover': hoverProperties(),
            }),
            ...body,
            ...themeVars.listItem(themePropsForThemeVarFn, props),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const ListItem = (props: ListItemProps): JSX.Element => {
    const { children, innerRef, className, classes = {}, ...rest } = props

    return (
        <ListItemRoot
            ref={innerRef}
            className={cx(className, classes.root)}
            {...rest}
        >
            {children}
        </ListItemRoot>
    )
}

attachSignatureToComponent(ListItem, LIST_ITEM)
