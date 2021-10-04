import ReactSelect, {
    Props,
    defaultTheme as reactSelectDefaultTheme,
    CSSObjectWithLabel,
    GroupBase,
    StylesConfig,
    Theme as ReactSelectTheme,
} from 'react-select'
import cx from 'clsx'
import type { StylesProps } from 'react-select/dist/declarations/src/styles'
import { attachSignatureToComponent } from '../utils'
import { SELECT } from '../constants/component-ids'

import {
    createColor,
    createStyle,
    hex2rgba,
    isThemeColorName,
    isValidColorHex,
    Theme,
    themeTernaryOperator as tto,
    useTheme,
} from '../styles'

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
    const allStyleConfigNames = (Object.keys(csx) as unknown) as Array<
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
                ...fn(theme, base, props),
            })
        }
    }

    return styles
}

const getColor25 = (theme: Theme, color: string) => {
    const { hover } = theme.palette
    if (!isThemeColorName(color)) {
        if (!isValidColorHex(color)) return color

        return hex2rgba(color, hover.ghostElementBackgroundOpacity).rgba
    }

    const mainColor =
        color === 'neutral'
            ? theme.palette[color][80]
            : theme.palette[color].main
    return hex2rgba(mainColor, hover.ghostElementBackgroundOpacity).rgba
}

const useStyles = createStyle(({ typography }) => ({
    root: {
        ...typography.body,
    },
}))

export const Select = <
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
>(
    props: SelectProps<Option, IsMulti, Group>
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
            neutral,
            common: { white, black },
            disable,
        } = palette

        const colorPalette = isValidColorHex(color)
            ? createColor(color)
            : { 30: color, 40: color, 50: color }

        return {
            danger: error.main,
            dangerLight: error.mainLightShade,
            neutral0: neutral[10],
            neutral5: disable.main,
            neutral10: disable.mainDarkShade,
            neutral20: neutral[60],
            neutral30: neutral[70],
            neutral40: neutral[80],
            neutral50: neutral[70],
            neutral60: neutral[70],
            neutral70: neutral[70],
            neutral80: neutral[80],
            neutral90: tto(themeType, black, white),
            primary: isThemeColorName(color)
                ? palette[color].main
                : colorPalette[50],
            primary25: getColor25(theme, color),
            primary50: isThemeColorName(color)
                ? palette[color][30]
                : colorPalette[30],
            primary75: isThemeColorName(color)
                ? palette[color][40]
                : colorPalette[40],
        }
    }

    const getTheme = () => {
        return {
            ...reactSelectDefaultTheme,
            colors: getColors(),
            ...themeProps,
        }
    }

    return (
        <ReactSelect
            styles={styles}
            className={cx(classes.root, className)}
            theme={getTheme()}
            {...rest}
        />
    )
}

attachSignatureToComponent(Select, SELECT)
