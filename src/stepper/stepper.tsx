import { CSSObject } from 'styled-components'
import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ReactElement,
    ThemeCSSStyles,
    ThemePalette,
} from '../styles'
import DefaultWarningIcon from '../icons/System/alert-line'
import DefaultCompleteIcon from '../icons/System/check-fill'
import DefaultErrorIcon from '../icons/System/close-fill'
import { attachSignatureToComponent } from '../utils'
import { STEPPER } from '../constants/component-ids'

import { Box } from '../box'
import { Typography } from '../typography'
import { Collapsible, CollapsibleProps } from '../collapsible'
import { Divider, DividerProps } from '../divider'

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
export type StepStatusEnum = 'complete' | 'error' | 'warning' | 'none'
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
    if (status === 'complete') return palette.primary[type]
    if (status === 'warning') return palette.warning[type]
    if (status === 'error') return palette.error[type]

    return type == 'text' ? palette.neutral[70] : palette.neutral.main
}

type AvatarProps = {
    children?: ReactElement
    alignment?: StepperProps['alignment']
    status: StepStatusEnum
    isActive: boolean
}

const Avatar = createStyledComponent<typeof Box, AvatarProps>(
    Box,
    (theme, props) => {
        const { csx = {}, alignment, status, isActive } = props
        const { palette } = theme

        const background = getThemeColorBasedOnStatus(
            'main',
            isActive ? 'complete' : status,
            palette
        )
        const color = getThemeColorBasedOnStatus(
            'text',
            isActive ? 'complete' : status,
            palette
        )
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
            width: '2rem',
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

const getAvatarIcon = (
    status: StepStatusEnum,
    props: Partial<StepsType>
): ReactElement => {
    if (!status || status === 'none') return props.AvatarIcon
    if (status === 'complete') return props.CompleteIcon
    if (status === 'warning') return props.WarningIcon
    if (status === 'error') return props.ErrorIcon

    return props.AvatarIcon
}

type StepContainerProps = {
    children?: ReactElement
    alignment?: StepperProps['alignment']
    key?: any
}
const StepContainer = createStyledComponent<typeof Box, StepContainerProps>(
    Box,
    (theme, props) => {
        const { csx = {}, alignment = 'vt' } = props

        return {
            display: 'inline-flex',
            flexDirection: 'column',
            ...getThemeCSSObject(csx.root, theme),
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
        const {
            palette: { neutral },
        } = theme
        const { alignment, csx = {}, isLast } = props
        return {
            marginLeft: alignment === 'vt' ? '1.5rem' : '0',
            paddingLeft: alignment === 'vt' ? '2.5rem' : '0',
            borderLeft:
                alignment === 'vt' && !isLast
                    ? `0.0625rem solid ${neutral.main}`
                    : '0',
            ...getThemeCSSObject(csx.root, theme),
        }
    },
    { isExtendStyleFromThemeVars: false }
)

interface DividerRootProps extends DividerProps {
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
                    width: 0,
                }
            }

            return {
                height: 0,
                minWidth: '3rem',
                width: '3rem',
            }
        }
        return {
            borderColor: getThemeColorBasedOnStatus(
                'main',
                status,
                theme.palette
            ),
            display: isLast ? 'none' : undefined,
            flex: 1,
            marginLeft: alignment === 'vt' ? '1.5rem' : '0',
            marginTop: alignment === 'vt' ? '0' : '1.5rem',
            ...getDimension(),
            ...getThemeCSSObject(csx.root, theme),
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
            isExtendStyleFromThemeVars = true,
        } = props

        const { themeVars, ...themePropsForThemeVarFn } = theme
        return {
            display: 'flex',
            flexDirection: alignment === 'vt' ? 'column' : 'row',
            position: 'relative',
            ...(isExtendStyleFromThemeVars &&
                themeVars.stepper(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme),
        }
    },
    { isExtendStyleFromThemeVars: false }
)

export const Stepper = (props: StepperProps): JSX.Element => {
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

    return (
        <StepperContainer
            className={cx(className, classes.root)}
            csx={csx}
            alignment={alignment}
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
                    id = typeof title === 'string' ? title : idx,
                } = step

                return (
                    <>
                        <StepContainer alignment={alignment} key={id}>
                            <Box
                                csx={{
                                    root: {
                                        alignItems: 'center',
                                        padding: '0.5rem',
                                        display: 'flex',
                                        flexDirection:
                                            alignment === 'vt'
                                                ? 'row'
                                                : 'column',
                                    },
                                }}
                            >
                                <Avatar
                                    alignment={alignment}
                                    csx={{ root: csx.avatar }}
                                    className={cx(classes.avatar)}
                                    status={stepsStatus[idx + 1] ?? 'none'}
                                    isActive={idx + 1 == activeStep}
                                >
                                    {getAvatarIcon(stepsStatus[idx + 1], {
                                        CompleteIcon: _CompleteIcon,
                                        WarningIcon: _WarningIcon,
                                        ErrorIcon: _ErrorIcon,
                                        AvatarIcon,
                                    })}
                                </Avatar>
                                {title}
                            </Box>
                            <DescriptionContainer
                                alignment={alignment}
                                isOpen={activeStep === idx + 1}
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
                            status={stepsStatus[idx + 1] ?? 'none'}
                            alignment={alignment}
                        />
                    </>
                )
            })}
        </StepperContainer>
    )
}

attachSignatureToComponent(Stepper, STEPPER)
