import { CSSObject } from 'styled-components'
import { BasicColor, CreateColorOptions, RGBA } from '../../colors'
import { ThemeType } from '../../colors/color'
import { FontMixinReturn, namedTypographyScales } from '../../typography'

// Component Props
import {
    ButtonProps,
    ButtonBaseCommonProps,
    IconButtonProps,
    ButtonGroupProps,
    InputBaseProps,
    InputProps,
    GridItemProps,
    GridProps,
    SpinnerProps,
    TypographyProps,
    BoxProps,
    LabelProps,
    CheckboxContainerProps,
    RadioGroupProps,
    RadioProps,
    FormControlLabelProps,
    ToggleProps,
    DividerProps,
    CollapsibleProps,
    ListProps,
    ListItemProps,
    ListHeadingProps,
    AlertProps,
    AlertGroupProps,
    InlineAlertProps,
    CardProps,
    CardActionProps,
    CardContentProps,
    CardHeaderProps,
    TooltipProps,
    PopperProps,
    MenuProps,
    MenuHeadingProps,
    MenuItemProps,
    StepperProps,
    TableProps,
    TableBodyProps,
    TableCellProps,
    TableHeadProps,
    TableRowProps,
    ModalProps,
} from '../../..'

/**
 * -----------------------------
 * Theme Vars
 * -----------------------------
 */
export type ThemeVariableFunction<T> = (
    theme: Omit<Theme, 'themeVars'>,
    props: T
) => CSSObject

export type ThemeVars = {
    button: ThemeVariableFunction<ButtonProps<'button'>>
    buttonBase: ThemeVariableFunction<ButtonBaseCommonProps>
    iconButton: ThemeVariableFunction<IconButtonProps<'button'>>
    buttonGroup: ThemeVariableFunction<ButtonGroupProps<'button'>>
    inputBase: ThemeVariableFunction<InputBaseProps>
    input: ThemeVariableFunction<InputProps>
    grid: ThemeVariableFunction<GridProps>
    gridItem: ThemeVariableFunction<GridItemProps>
    spinner: ThemeVariableFunction<SpinnerProps>
    box: ThemeVariableFunction<BoxProps<'div'>>
    typography: ThemeVariableFunction<TypographyProps<'div'>>
    label: ThemeVariableFunction<LabelProps>
    popper: ThemeVariableFunction<PopperProps>
    checkbox: ThemeVariableFunction<CheckboxContainerProps>
    radio: ThemeVariableFunction<RadioProps>
    radioGroup: ThemeVariableFunction<RadioGroupProps>
    formControlLabel: ThemeVariableFunction<FormControlLabelProps>
    toggle: ThemeVariableFunction<ToggleProps>
    divider: ThemeVariableFunction<DividerProps<'div'>>
    collapsible: ThemeVariableFunction<CollapsibleProps>
    list: ThemeVariableFunction<ListProps>
    listItem: ThemeVariableFunction<ListItemProps>
    listHeading: ThemeVariableFunction<ListHeadingProps>
    alert: ThemeVariableFunction<AlertProps>
    alertGroup: ThemeVariableFunction<AlertGroupProps>
    inlineAlert: ThemeVariableFunction<InlineAlertProps>
    card: ThemeVariableFunction<CardProps>
    cardAction: ThemeVariableFunction<CardActionProps>
    cardContent: ThemeVariableFunction<CardContentProps>
    cardHeader: ThemeVariableFunction<CardHeaderProps>
    tooltip: ThemeVariableFunction<TooltipProps>
    menu: ThemeVariableFunction<MenuProps>
    menuHeading: ThemeVariableFunction<MenuHeadingProps>
    menuItem: ThemeVariableFunction<MenuItemProps>
    stepper: ThemeVariableFunction<StepperProps>
    table: ThemeVariableFunction<TableProps>
    tableBody: ThemeVariableFunction<TableBodyProps>
    tableCell: ThemeVariableFunction<TableCellProps>
    tableHead: ThemeVariableFunction<TableHeadProps>
    tableRow: ThemeVariableFunction<TableRowProps>
    modal: ThemeVariableFunction<ModalProps>
}

export type CreateThemeVarsOptions = Partial<ThemeVars>

/**
 * -----------------------------
 * Color Palette
 * -----------------------------
 */
export type ThemePaletteColor = BasicColor & {
    main: string
    text: string
    mainLightShade: string
    mainDarkShade: string
}

export type ThemeColorName =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'neutral'
    | 'disable'
    | 'common'
    | 'grey'
    | 'darkGrey'

export type ThemePalette = {
    themeBackground: {
        [x in ThemeType]: RGBA
    }
    primary: ThemePaletteColor
    secondary: ThemePaletteColor
    success: ThemePaletteColor
    error: ThemePaletteColor
    warning: ThemePaletteColor
    info: ThemePaletteColor
    neutral: ThemePaletteColor
    disable: ThemePaletteColor
    common: {
        black: string
        white: string
    }
    grey: BasicColor
    darkGrey: BasicColor
    custom: {
        [x: string]: ThemePaletteColor
    }

    contrastThreshold: number
    themeType: ThemeType
    hover: {
        ghostElementBackgroundOpacity: number
        unknownColorOpacity: number
        tintOrShadeFactor: number
    }
    active: {
        unknownColorOpacity: number
        tintOrShadeFactor: number
        ghostElementBackgroundOpacity: number
    }
    focus: {
        borderOpacity: number
        unknownColorBorderOpacity: number
    }
}

export type ThemeColors = {
    primary: ThemePalette['primary']
    secondary: ThemePalette['secondary']
    success: ThemePalette['success']
    error: ThemePalette['error']
    warning: ThemePalette['warning']
    info: ThemePalette['info']
    disable: ThemePalette['disable']
    neutral: ThemePalette['neutral']
    common: ThemePalette['common']
    grey: ThemePalette['grey']
    darkGrey: ThemePalette['darkGrey']
}

export type CreateThemePaletteOptionsColorType =
    | string
    | ({ baseColor: string } & CreateColorOptions)
    | (() => ThemePaletteColor)

export type CreateThemePaletteOptions = {
    primary?: CreateThemePaletteOptionsColorType
    secondary?: CreateThemePaletteOptionsColorType
    success?: CreateThemePaletteOptionsColorType
    error?: CreateThemePaletteOptionsColorType
    warning?: CreateThemePaletteOptionsColorType
    info?: CreateThemePaletteOptionsColorType
    neutral?: CreateThemePaletteOptionsColorType
    disable?: CreateThemePaletteOptionsColorType
    grey?: BasicColor
    darkGrey?: BasicColor
    themeType?: ThemeType
    contrastThreshold?: number
    hover?: {
        ghostElementBackgroundOpacity?: number
        unknownColorOpacity?: number
        tintOrShadeFactor?: number
    }
    active?: {
        tintOrShadeFactor?: number
        unknownColorOpacity?: number
        ghostElementBackgroundOpacity?: number
    }
    focus?: {
        borderOpacity?: number
        unknownColorBorderOpacity?: number
    }
    custom?: {
        [x: string]: ThemePaletteColor
    }
}

/**
 * -----------------------------
 * Typography
 * -----------------------------
 */
export type ThemeTypographyTagsProperties = FontMixinReturn

export type ThemeTypography = {
    h1: ThemeTypographyTagsProperties
    h2: ThemeTypographyTagsProperties
    h3: ThemeTypographyTagsProperties
    h4: ThemeTypographyTagsProperties
    h5: ThemeTypographyTagsProperties
    h6: ThemeTypographyTagsProperties
    bodyLg: ThemeTypographyTagsProperties
    body: ThemeTypographyTagsProperties
    bodySm: ThemeTypographyTagsProperties
    caption: ThemeTypographyTagsProperties
    title: ThemeTypographyTagsProperties
    small: ThemeTypographyTagsProperties
    meta: {
        // document font size in px.
        documentFontSize: number
    }
}

export type ThemeTypographyVariant = Exclude<keyof ThemeTypography, 'meta'>

export type CreateThemeTypographyOptionsObject = {
    scale?: number | keyof typeof namedTypographyScales
    /**
     * Document font size is in px. Only give the number value.
     */
    documentFontSize?: number
    fontFamily?: {
        bold?: { name?: string; weight?: number; lineHeight?: number }
        regular?: { name?: string; weight?: number; lineHeight?: number }
        medium?: { name?: string; weight?: number; lineHeight?: number }
    }
}

export type CreateThemeTypographyOptions =
    | CreateThemeTypographyOptionsObject
    | (() => ThemeTypography)

/**
 * -----------------------------
 * Spacing
 * -----------------------------
 */
export type ThemeSpacing = (...args: (string | number)[]) => string
export type CreateThemeSpacingOptions =
    | ((...factor: (number | string)[]) => string)
    | number
    | string[]

/**
 * -----------------------------
 * Breaking Points
 * -----------------------------
 */
export type ThemeBPMixinObj = {
    xs?: CSSObject
    sm?: CSSObject
    md?: CSSObject
    lg?: CSSObject
    xl?: CSSObject
} & { [x: string]: CSSObject }

export type ThemeBPMixinFnName = 'max' | 'min'

export type ThemeBreakingPoints = {
    max: (screen: string) => string
    min: (screen: string) => string
    between: (startScreen: string, endScreen: string) => string
    mixin: (obj: ThemeBPMixinObj, mixinFnName: ThemeBPMixinFnName) => CSSObject
    baseFontSize: number
    keys: string[]
    values: { [x: string]: number }
    unit: string
}

export type CreateThemeBreakingPointsOptions = {
    // In px
    xs?: number
    // In px
    sm?: number
    // In px
    md?: number
    // In px
    lg?: number
    // In px
    xl?: number
    /**
     * This is used for the conversion from px to em.
     * @default typography.meta.documentFontSize
     */
    baseFontSize?: number
} & {
    // If some extra breaking points are needed.
    [x: string]: number
}

/**
 * -----------------------------
 * Transitions
 * -----------------------------
 */
export type ThemeTransitions = (...args: (string | number)[]) => string
export type CreateThemeTransitionOptions = any
/**
 * -----------------------------
 * Elevation
 * -----------------------------
 */
export type ThemeElevation = {
    none: string
    low: string
    medium: string
    high: string
    themeType: ThemeType
}

export type CreateThemeElevationOptions = Partial<ThemeElevation> & {
    themeType?: ThemeType
}

/**
 * -----------------------------
 * Theme
 * -----------------------------
 */
export type Theme = {
    themeType: ThemeType
    themeVars: ThemeVars
    palette: ThemePalette
    typography: ThemeTypography
    elevation: ThemeElevation
    spacing: ThemeSpacing
    breakingPoints: ThemeBreakingPoints
}

export type CreateThemeOptions = {
    themeType?: ThemeType
    themeVars?: CreateThemeVarsOptions
    palette?: CreateThemePaletteOptions
    typography?: CreateThemeTypographyOptions
    elevation?: CreateThemeElevationOptions
    spacing?: CreateThemeSpacingOptions
    breakingPoints?: CreateThemeBreakingPointsOptions
}

export type ReactElement =
    | React.ReactNode
    | Element
    | React.ReactChildren
    | undefined
    | null
    | ReactElement[]
