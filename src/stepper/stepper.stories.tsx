import { useState } from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Box } from '../box'
import { Button } from '../button'

import { Stepper, StepsType, StepStatus } from './stepper'
import { StepStatusEnum } from '.'

export default {
    title: 'Stepper',
    component: Stepper,
}

const steps: StepsType[] = [
    {
        title: 'Step 1',
        description: ' This is step 1',
    },
    {
        title: 'Step 2',
        description: 'This is step 2.',
    },
    {
        title: 'Step 3',
        description: 'This is step 3.',
    },
    {
        title: 'Step 4',
        description: 'This is step 4.',
    },
    {
        title: 'Step 5',
        description: 'This is step 5.',
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
