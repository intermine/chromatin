import { Story } from '@storybook/react/types-6-0'
import { useState } from 'react'
import { FormControlLabel, Typography } from '..'

import { Radio } from './radio'
import { RadioGroup } from '../radio-group'

export default {
    title: 'Radio',
    component: Radio,
}

const Template: Story = (args) => {
    return (
        <RadioGroup name="gender">
            <FormControlLabel
                control={<Radio value="male" {...args} />}
                label="Male"
            />
            <FormControlLabel
                control={<Radio value="female" {...args} />}
                label="Female"
            />
            <FormControlLabel
                control={<Radio value="other" {...args} />}
                label="Other"
            />
            <FormControlLabel
                control={<Radio value="prefer-not-to-say" {...args} />}
                label="Prefer not to say"
            />
        </RadioGroup>
    )
}

export const Default = Template.bind({})
Default.args = {
    color: 'secondary',
}
