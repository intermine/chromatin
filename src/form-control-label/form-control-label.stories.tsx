import { Story } from '@storybook/react/types-6-0'
import { useState } from 'react'

import { Checkbox } from '../checkbox'
import { Box } from '../box'
import { FormControlLabel } from './form-control-label'

export default {
    title: 'FormControlLabel',
    component: FormControlLabel,
}

const Template: Story = (args) => {
    const [checked, setChecked] = useState({
        cricket: false,
        hockey: false,
        football: false,
        swimming: false,
    })

    const onChange = (event) => {
        setChecked((prev) => ({
            ...prev,
            [event.target.name]: !prev[event.target.name],
        }))
    }

    return (
        <Box csx={{ root: { width: 200 } }}>
            <FormControlLabel
                control={
                    <Checkbox
                        name="cricket"
                        onChange={onChange}
                        isChecked={checked.cricket}
                    />
                }
                label="Cricket"
                {...args}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        name="hockey"
                        onChange={onChange}
                        isChecked={checked.hockey}
                    />
                }
                label="Hockey"
                {...args}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        name="football"
                        onChange={onChange}
                        isChecked={checked.football}
                    />
                }
                label="Football"
                {...args}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        name="swimming"
                        onChange={onChange}
                        isChecked={checked.swimming}
                    />
                }
                label="Swimming"
                {...args}
            />
        </Box>
    )
}

export const Checkboxes = Template.bind({})
Checkboxes.args = {}
