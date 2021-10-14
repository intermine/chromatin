import { useState } from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Box } from '../box'
import { Button } from '../button'

import { Stepper, StepsType, StepStatus } from './stepper'
import { StepStatusEnum } from './stepper'

import UploadIcon from '../icons/System/upload-line'
import MapIcon from '../icons/Map/guide-fill'
import SupplementaryIcon from '../icons/Business/donut-chart-fill'
import ConfigureIcon from '../icons/Design/tools-fill'
import SaveIcon from '../icons/Device/save-3-fill'

export default {
    title: 'Stepper',
    component: Stepper,
}

const steps: StepsType[] = [
    {
        title: 'Upload files',
        description:
            'Files we can accepts include: gff, fasta, .tsv, .csv, .etc.',
    },
    {
        title: 'Map Columns',
    },
    {
        title: 'Supplementary Data',
        description: (
            <Box>
                Based on your uploaded data, we have couple of question for you.
                Also in this section you can enable and disable default
                settings.
            </Box>
        ),
    },
    {
        title: 'Configure Settings',
        description:
            'Brilliant!, Nearly done. In this section we would like to ask some question on how you want to publish your new mine.',
    },
    {
        title: 'Finalise And Save',
        description:
            'Almost Done. This section is to review your work. If you are okay, then you can upload and save.',
    },
]

const rand = (range: number) => Math.trunc(Math.random() * 1000_000_000) % range
const stepStates: StepStatusEnum[] = ['complete', 'error', 'warning']

const Template: Story = (args) => {
    const [step, setStep] = useState(1)
    const [stepsStatus, setStepsStatus] = useState<StepStatus>({})

    const increaseStep = () => {
        if (step <= args.steps.length) {
            setStep(step + 1)
            setStepsStatus((prev) => ({ ...prev, [step]: 'complete' }))
        }
    }

    const decreaseStep = () => {
        if (step > 1) {
            setStep(step - 1)
            setStepsStatus((prev) => ({
                ...prev,
                [step - 1]: undefined,
            }))
        }
    }

    return (
        <Box>
            <Button color="info" variant="ghost" onClick={decreaseStep}>
                Decrease Step
            </Button>
            <Button
                csx={{ root: { margin: '0 0 1rem 1rem' } }}
                onClick={increaseStep}
                color="info"
                variant="ghost"
            >
                Increase Step
            </Button>

            <Stepper stepsStatus={stepsStatus} activeStep={step} {...args} />
        </Box>
    )
}

const Template2: Story = (args) => {
    const [step, setStep] = useState(1)
    const [stepsStatus, setStepsStatus] = useState<StepStatus>({})

    const increaseStep = () => {
        if (step <= args.steps.length) {
            setStep(step + 1)
            setStepsStatus((prev) => ({ ...prev, [step]: stepStates[rand(3)] }))
        }
    }

    const decreaseStep = () => {
        if (step > 1) {
            setStep(step - 1)
            setStepsStatus((prev) => ({
                ...prev,
                [step - 1]: 'none',
            }))
        }
    }

    return (
        <Box>
            <Button color="info" variant="ghost" onClick={decreaseStep}>
                Decrease Step
            </Button>
            <Button
                csx={{ root: { margin: '0 0 1rem 1rem' } }}
                onClick={increaseStep}
                color="info"
                variant="ghost"
            >
                Increase Step
            </Button>

            <Stepper stepsStatus={stepsStatus} activeStep={step} {...args} />
        </Box>
    )
}

export const Default = Template.bind({})
Default.args = {
    steps,
    color: 'secondary',
}

export const RandomStepStatus = Template2.bind({})
RandomStepStatus.args = {
    steps,
    color: 'secondary',
}

const steps2: StepsType[] = [
    {
        title: 'Upload files',
        description:
            'Files we can accepts include: gff, fasta, .tsv, .csv, .etc.',
        AvatarIcon: <UploadIcon />,
        CompleteIcon: <UploadIcon />,
    },
    {
        title: 'Map Columns',
        description:
            'Map you header rows, map entries. Give us information about sequence features.',
        AvatarIcon: <MapIcon />,
        CompleteIcon: <MapIcon />,
    },
    {
        title: 'Supplementary Data',
        description: (
            <Box>
                Based on your uploaded data, we have couple of question for you.
                Also in this section you can enable and disable default
                settings.
            </Box>
        ),
        AvatarIcon: <SupplementaryIcon />,
        CompleteIcon: <SupplementaryIcon />,
    },
    {
        AvatarIcon: <ConfigureIcon />,
        CompleteIcon: <ConfigureIcon />,
        title: 'Configure Settings',
        description:
            'Brilliant!, Nearly done. In this section we would like to ask some question on how you want to publish your new mine.',
    },
    {
        AvatarIcon: <SaveIcon />,
        CompleteIcon: <SaveIcon />,
        title: 'Finalise And Save',
        description:
            'Almost Done. This section is to review your work. If you are okay, then you can upload and save.',
    },
]

export const WithCustomIcons = Template.bind({})
WithCustomIcons.args = {
    steps: steps2,
}
