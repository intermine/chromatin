import { forwardRef } from 'react'
import ReactSelect, {
    Props,
    defaultTheme as reactSelectDefaultTheme,
    CSSObjectWithLabel,
    GroupBase,
    StylesConfig,
    Theme as ReactSelectTheme
} from 'react-select'
import cx from 'clsx'
import type { StylesProps } from 'react-select/dist/declarations/src/styles'
import { attachSignatureToComponent, getColorForComponent } from '../utils'
import { SELECT } from '../constants/component-ids'

import {
    createColor,
    createStyle,
    hex2rgba,
    isThemeColorName,
    isValidColorHex,
    Theme,
    themeTernaryOperator as tto,
    useTheme
} from '../styles'
import { getHoverProperties } from '../button-base/utils'

type ReactSelectStylesFunctions<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
> = {
    [K in keyof StylesProps<Option, IsMulti, Group>]?: SelectCSXType<
        StylesProps<Option, IsMulti, Group>[K]
    >
}

export type SelectCSXType<Props> =
    | CSSObjectWithLabel
    | ((
          theme: Theme,
          provided: CSSObjectWithLabel,
          state: Props
      ) => CSSObjectWithLabel)

export type SelectProps<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
> = Omit<Props, 'styles'> & {
    color?: string
    /**
     * To override the applied styles.
     */
    csx?: ReactSelectStylesFunctions<Option, IsMulti, Group>
}

const buildStyle = <
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
>(
    theme: Theme,
    csx: SelectProps<Option, IsMulti, Group>['csx']
): StylesConfig => {
    if (!csx) return {}

    const styles = {} as StylesConfig
    const allStyleConfigNames = Object.keys(csx) as unknown as Array<
        keyof StylesProps<Option, IsMulti, Group>
    >

    for (const key of allStyleConfigNames) {
        const fn = csx[key]
        if (!fn) continue

        if (typeof fn === 'object') {
            styles[key] = (base) => ({ ...base, ...fn })
        } else {
            styles[key] = (base, props: any) => ({
                ...base,
                ...fn(theme, base, props)
            })
        }
    }

    return styles
}

const useStyles = createStyle(({ typography }) => ({
    root: {
        ...typography.body
    }
}))

export const Select = forwardRef(
    <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
        props: SelectProps<Option, IsMulti, Group>,
        ref: any
    ): JSX.Element => {
        const {
            color = 'primary',
            csx = {},
            className,
            theme: themeProps,
            ...rest
        } = props
        const theme = useTheme()
        const styles = buildStyle(theme, csx)
        const classes = useStyles()

        const getColors = (): ReactSelectTheme['colors'] => {
            const { palette, themeType } = theme
            const {
                error,
                common: { white, black },
                disable,
                grey,
                darkGrey,
                primary,
                hover
            } = palette

            const colorPalette = isValidColorHex(color)
                ? createColor(color)
                : { 30: color, 40: color, 50: color }

            const _neutral = tto(themeType, grey, darkGrey)
            const _neutralText = tto(themeType, black, white)

            return {
                danger: error.main,
                dangerLight: error.mainLightShade,
                neutral0: tto(themeType, white, _neutral[30]),
                neutral5: disable.main,
                neutral10: disable.mainDarkShade,
                neutral20: _neutral[60],
                neutral30: _neutral[70],
                neutral40: _neutralText,
                neutral50: _neutral[70],
                neutral60: _neutral[70],
                neutral70: _neutral[70],
                neutral80: _neutralText,
                neutral90: _neutralText,
                primary: isThemeColorName(color, theme)
                    ? getColorForComponent({ color, theme, key: 'main' }) ??
                      primary.main
                    : colorPalette[50],
                primary25:
                    (getHoverProperties({
                        theme,
                        color,
                        isDisabled: false,
                        variant: 'ghost'
                    }).background as string) ??
                    hex2rgba(_neutral[50], hover.ghostElementBackgroundOpacity)
                        .rgba,
                primary50: isThemeColorName(color, theme)
                    ? getColorForComponent({ color, theme, key: '30' }) ??
                      primary[30]
                    : colorPalette[30],
                primary75: isThemeColorName(color, theme)
                    ? getColorForComponent({ color, theme, key: '40' }) ??
                      primary[40]
                    : colorPalette[40]
            }
        }

        const getTheme = () => {
            return {
                ...reactSelectDefaultTheme,
                colors: getColors(),
                ...themeProps
            }
        }

        return (
            <ReactSelect
                styles={styles}
                className={cx(classes.root, className)}
                theme={getTheme()}
                ref={ref}
                {...rest}
            />
        )
    }
) as <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: SelectProps<Option, IsMulti, Group> & { ref?: any }
) => JSX.Element

attachSignatureToComponent(Select, SELECT)
