import { forwardRef } from 'react'
import { CSSObject } from 'styled-components'
import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ReactElement,
    ThemeCSSStyles,
    ThemePalette,
    themeTernaryOperator as tto,
    getNeutralBasicColorForComponent
} from '../styles'
import DefaultWarningIcon from '../icons/System/alert-line'
import DefaultCompleteIcon from '../icons/System/check-fill'
import DefaultErrorIcon from '../icons/System/close-fill'
import { attachSignatureToComponent } from '../utils'
import { STEPPER } from '../constants/component-ids'

import { Box } from '../box'
import { Typography } from '../typography'
import { Collapsible, CollapsibleProps } from '../collapsible'
import { Divider, DividerBaseProps } from '../divider'

export type StepsType = {
    /**
     * If not given then step number is
     * used as avatar icon
     */
    AvatarIcon?: ReactElement
    /**
     * If not given then default will be used.
     */
    CompleteIcon?: ReactElement
    /**
     * If not given then default will be used.
     */
    WarningIcon?: ReactElement
    /**
     * If not given then default will be used.
     */
    ErrorIcon?: ReactElement
    title: ReactElement
    description?: ReactElement
    /**
     * If id is not given then if title is of type string
     * then title is the id otherwise index is considered as
     * id by default.
     */
    id?: string
}
export type StepStatusEnum =
    | 'complete'
    | 'error'
    | 'warning'
    | 'none'
    | 'current'
export type StepStatus = { [k: number]: StepStatusEnum }

export interface StepperProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    CompleteIcon?: ReactElement
    WarningIcon?: ReactElement
    ErrorIcon?: ReactElement
    steps?: StepsType[]
    stepsStatus?: StepStatus
    /**
     * Alignment of the stepper.
     * hr - horizontal, vt - vertical
     * @default 'vt'
     */
    alignment?: 'hr' | 'vt'
    /**
     * It should be between 1 to N, where N is the length of
     * steps array.
     */
    activeStep?: number
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        root?: string
        /**
         * Applied to individual step container
         */
        stepContainer?: string
        /**
         * Applied to avatar
         */
        avatar?: string
        /**
         * Applied to title
         */
        title?: string
        /**
         * Applied to avatar and title container
         */
        avatarAndTitleContainer?: string
        /**
         * Applied to description
         */
        description?: string
        /**
         * Applied to divider
         */
        divider?: string
    }
    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Applied to root component
         */
        root?: ThemeCSSStyles
        /**
         * Applied to individual step container
         */
        stepContainer?: ThemeCSSStyles
        /**
         * Applied to avatar
         */
        avatar?: ThemeCSSStyles
        /**
         * Applied to title
         */
        title?: ThemeCSSStyles
        /**
         * Applied to avatar and title container
         */
        avatarAndTitleContainer?: string
        /**
         * Applied to description
         */
        description?: ThemeCSSStyles
        /**
         * Applied to divider
         */
        divider?: ThemeCSSStyles
    }
}

const getThemeColorBasedOnStatus = (
    type: 'main' | 'text',
    status: StepStatusEnum,
    palette: ThemePalette
): string => {
    const { themeType, darkGrey, grey, primary, error, warning } = palette

    if (status === 'complete' || status === 'current') return primary[type]
    if (status === 'warning') return warning[type]
    if (status === 'error') return error[type]

    if (type === 'text') return tto(themeType, darkGrey[10], grey[10])
    return tto(themeType, grey[50], darkGrey[50])
}

type AvatarProps = {
    children?: ReactElement
    alignment?: StepperProps['alignment']
    status: StepStatusEnum
}

const Avatar = createStyledComponent<typeof Box, AvatarProps>(
    Box,
    (theme, props) => {
        const { csx = {}, alignment, status } = props
        const { palette } = theme

        const background = getThemeColorBasedOnStatus('main', status, palette)
        const color = getThemeColorBasedOnStatus('text', status, palette)
        return {
            alignItems: 'center',
            background,
            borderRadius: '50%',
            boxSizing: 'border-box',
            color,
            display: 'flex',
            fill: color,
            height: '2rem',
            justifyContent: 'center',
            margin: alignment === 'vt' ? '0 1.5rem 0 0' : '0 0 1rem 0',
            padding: '0.5rem',
            transition: '0.230s',
            width: '2rem',
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

const getAvatarIcon = (
    status: StepStatusEnum,
    props: Partial<StepsType>
): ReactElement => {
    if (!status || status === 'none' || status === 'current')
        return props.AvatarIcon
    if (status === 'complete') return props.CompleteIcon
    if (status === 'warning') return props.WarningIcon
    if (status === 'error') return props.ErrorIcon

    return props.AvatarIcon
}

type AvatarAndTitleContainerProps = {
    alignment: StepperProps['alignment']
}

const AvatarAndTitleContainer = createStyledComponent<
    typeof Box,
    AvatarAndTitleContainerProps
>(
    Box,
    (theme, props) => {
        const { alignment, csx = {} } = props

        return {
            alignItems: 'center',
            padding: '0.5rem',
            display: 'flex',
            flexDirection: alignment === 'vt' ? 'row' : 'column',
            ...getThemeCSSObject(csx.root, theme)
        }
    },
    { isExtendStyleFromThemeVars: false }
)

type StepContainerProps = {
    children?: ReactElement
    alignment?: StepperProps['alignment']
    key?: any
}
const StepContainer = createStyledComponent<typeof Box, StepContainerProps>(
    Box,
    (theme, props) => {
        const { csx = {} } = props

        return {
            display: 'inline-flex',
            flex: 1,
            flexDirection: 'column',
            maxWidth: '25rem',
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

interface DescriptionContainerProps extends CollapsibleProps {
    children?: StepsType['description']
    alignment: StepperProps['alignment']
    isLast: boolean
}
const DescriptionContainer = createStyledComponent<
    typeof Collapsible,
    DescriptionContainerProps
>(
    Collapsible,
    (theme, props) => {
        const { palette } = theme
        const { alignment, csx = {}, isLast } = props

        const _color = getThemeColorBasedOnStatus('text', 'none', palette)

        const _border = getThemeColorBasedOnStatus('main', 'none', palette)

        return {
            color: _color,
            borderLeft:
                alignment === 'vt' && !isLast
                    ? `0.0625rem solid ${_border}`
                    : '0',
            lineHeight: 1.2,
            marginLeft: alignment === 'vt' ? '1.5rem' : '0',
            paddingLeft: alignment === 'vt' ? '2.5rem' : '0',
            textAlign: alignment === 'hr' ? 'center' : undefined,
            ...getThemeCSSObject(csx.root, theme)
        }
    },
    { isExtendStyleFromThemeVars: false }
)

interface DividerRootProps extends DividerBaseProps {
    alignment: StepperProps['alignment']
    isLast: boolean
    status: StepStatusEnum
}
const DividerRoot = createStyledComponent<typeof Divider, DividerRootProps>(
    Divider,
    (theme, props) => {
        const { alignment, isLast, csx = {}, status } = props

        const getDimension = (): CSSObject => {
            if (alignment === 'vt') {
                return {
                    height: '1.5rem',
                    minHeight: '1.5rem',
                    width: 0
                }
            }

            return {
                height: 0,
                minWidth: '3rem',
                width: '3rem'
            }
        }
        return {
            borderColor: getThemeColorBasedOnStatus(
                'main',
                status === 'current' ? 'none' : status,
                theme.palette
            ),
            display: isLast ? 'none' : undefined,
            flex: 1,
            marginLeft: alignment === 'vt' ? '1.5rem' : '0',
            marginTop: alignment === 'vt' ? '0' : '1.5rem',
            transition: '0.230s',
            ...getDimension(),
            ...getThemeCSSObject(csx.root, theme)
        }
    },
    { isExtendStyleFromThemeVars: false }
)

const StepperContainer = createStyledComponent<typeof Box, StepperProps>(
    Box,
    (theme, props) => {
        const {
            alignment = 'vt',
            csx = {},
            isExtendStyleFromThemeVars = true
        } = props

        const { themeVars, ...themePropsForThemeVarFn } = theme
        return {
            display: 'flex',
            flexDirection: alignment === 'vt' ? 'column' : 'row',
            position: 'relative',
            ...(isExtendStyleFromThemeVars &&
                themeVars.stepper(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    },
    { isExtendStyleFromThemeVars: false }
)

export const Stepper = forwardRef<any, StepperProps>(
    (props, ref): JSX.Element => {
        const {
            alignment = 'vt',
            className,
            classes = {},
            csx = {},
            steps = [],
            stepsStatus = {},
            activeStep = 1,
            CompleteIcon = <DefaultCompleteIcon />,
            WarningIcon = <DefaultWarningIcon />,
            ErrorIcon = <DefaultErrorIcon />,
            ...rest
        } = props

        const getTitle = (
            title: ReactElement,
            status: StepStatusEnum
        ): ReactElement => {
            if (typeof title === 'string') {
                return (
                    <Typography
                        variant="title"
                        className={cx(classes.title)}
                        csx={{
                            root: (theme) => {
                                const _neutral =
                                    getNeutralBasicColorForComponent({
                                        theme,
                                        isOpposite: true
                                    })
                                return {
                                    color:
                                        status === 'none' || !status
                                            ? _neutral[90]
                                            : _neutral[10],
                                    ...getThemeCSSObject(csx.title, theme)
                                }
                            }
                        }}
                    >
                        {title}
                    </Typography>
                )
            }
            return title
        }

        const getStatus = (idx: number, activeStep: number): StepStatusEnum => {
            if (stepsStatus[idx + 1]) return stepsStatus[idx + 1]
            if (activeStep === idx + 1) return 'current'
            return 'none'
        }

        return (
            <StepperContainer
                className={cx(className, classes.root)}
                csx={csx}
                alignment={alignment}
                ref={ref}
                {...rest}
            >
                {steps.map((step, idx) => {
                    const {
                        CompleteIcon: _CompleteIcon = CompleteIcon,
                        WarningIcon: _WarningIcon = WarningIcon,
                        ErrorIcon: _ErrorIcon = ErrorIcon,
                        AvatarIcon = idx + 1,
                        title,
                        description,
                        id = typeof title === 'string' ? title : idx
                    } = step

                    const _status = getStatus(idx, activeStep)
                    return (
                        <>
                            <StepContainer
                                classes={{ root: classes.stepContainer }}
                                csx={{ root: csx.stepContainer }}
                                alignment={alignment}
                                key={id}
                            >
                                <AvatarAndTitleContainer alignment={alignment}>
                                    <Avatar
                                        alignment={alignment}
                                        csx={{ root: csx.avatar }}
                                        className={cx(classes.avatar)}
                                        status={_status}
                                    >
                                        {getAvatarIcon(stepsStatus[idx + 1], {
                                            CompleteIcon: _CompleteIcon,
                                            WarningIcon: _WarningIcon,
                                            ErrorIcon: _ErrorIcon,
                                            AvatarIcon
                                        })}
                                    </Avatar>
                                    {getTitle(title, _status)}
                                </AvatarAndTitleContainer>
                                <DescriptionContainer
                                    alignment={alignment}
                                    in={activeStep === idx + 1}
                                    csx={{ root: csx.description }}
                                    classes={{ root: classes.description }}
                                    isLast={idx + 1 === steps.length}
                                >
                                    {description}
                                </DescriptionContainer>
                            </StepContainer>
                            <DividerRoot
                                isLast={idx + 1 === steps.length}
                                csx={{ root: csx.divider }}
                                classes={{ root: classes.divider }}
                                status={_status}
                                alignment={alignment}
                            />
                        </>
                    )
                })}
            </StepperContainer>
        )
    }
)

attachSignatureToComponent(Stepper, STEPPER)
