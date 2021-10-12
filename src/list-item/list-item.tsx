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

import { Button } from '../button'
import { ButtonBaseCommonProps } from '../button-base'

import { Ref } from '../utils'

export interface ListItemProps extends ButtonBaseCommonProps {
    innerRef?: Ref
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
     * To have button interactive properties
     *
     * @default false
     */
    isButtonLike?: boolean
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

const ListItemRoot = createStyledComponent<typeof Button, ListItemProps>(
    Button,
    (theme, props) => {
        const {
            csx = {},
            hasPadding = true,
            isDense = false,
            display = 'flex',
            alignItems = 'center',
            justifyContent = 'flex-start',
            isExtendStyleFromThemeVars = true,
            isButtonLike = false,
            variant = 'ghost',
        } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            palette,
            typography: { body },
        } = themePropsForThemeVarFn

        const getPadding = (): string | undefined => {
            if (!hasPadding) return '0'
            if (isDense) return '0.4rem 1.2rem'
            return '0.7rem 1.4rem'
        }

        return {
            alignItems,
            borderRadius: '0',
            color: isButtonLike ? undefined : palette.neutral[90],
            cursor: isButtonLike ? 'pointer' : 'default',
            display,
            justifyContent,
            marginTop: variant === 'outlined' ? '-0.0625rem' : undefined,
            padding: getPadding(),
            ...body,
            ...(isExtendStyleFromThemeVars &&
                themeVars.listItem(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const ListItem = (props: ListItemProps): JSX.Element => {
    const {
        children,
        className,
        classes = {},
        variant = 'ghost',
        color = 'neutral',
        hasHighlightOnFocus = false,
        hasHoverEffectOnFocus = true,
        isButtonLike = false,
        hasHoverEffect = isButtonLike,
        hasActiveEffect = isButtonLike,
        hasElevation = false,
        hasFocusEffect = isButtonLike,
        ...rest
    } = props

    return (
        <ListItemRoot
            Component="li"
            variant={variant}
            color={color}
            hasHighlightOnFocus={hasHighlightOnFocus}
            hasHoverEffectOnFocus={hasHoverEffectOnFocus}
            hasFullWidth
            hasActiveEffect={hasActiveEffect}
            hasHoverEffect={hasHoverEffect}
            hasFocusEffect={hasFocusEffect}
            hasElevation={isButtonLike ? hasElevation : false}
            className={cx(className, classes.root)}
            isButtonLike={isButtonLike}
            {...rest}
        >
            {children}
        </ListItemRoot>
    )
}

attachSignatureToComponent(ListItem, LIST_ITEM)
