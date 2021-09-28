import { Story } from '@storybook/react/types-6-0'
import { useState } from 'react'
import { Typography } from '..'

import { Radio } from './radio'
import { RadioGroup } from '../radio-group'

export default {
    title: 'Radio',
    component: Radio,
}

const Template: Story = (args) => {
    return (
        <RadioGroup name="gender">
            <Radio label="Male" value="male" {...args} />
            <Radio label="Female" value="female" {...args} />
            <Radio label="Other" value="other" {...args} />
            <Radio
                label="Prefer not to say"
                value="prefer-not-to-say"
                {...args}
            />
        </RadioGroup>
    )
}

export const Default = Template.bind({})
Default.args = {
    color: 'secondary',
}
