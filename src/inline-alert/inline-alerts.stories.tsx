import { Story } from '@storybook/react/types-6-0'

import { InlineAlert } from './inline-alert'
import { Box } from '../box'
import { Button } from '../button'
import { useState } from 'react'

export default {
    title: 'InlineAlert',
    component: InlineAlert,
}

const Template: Story = (args) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Box>
            <InlineAlert
                onClose={() => setIsOpen(false)}
                isOpen={isOpen}
                {...args}
            />
            <Button
                variant="outlined"
                color={args.type}
                isDisabled={isOpen}
                onClick={() => setIsOpen(true)}
                csx={{ root: { margin: '1rem 0' } }}
            >
                Open Inline Alert
            </Button>
        </Box>
    )
}

export const Default = Template.bind({})
Default.args = {
    title: 'Success',
    type: 'success',
    message:
        'This is a very very long success message. This is here to see how a very long message appears.',
}

export const WithAction = Template.bind({})
WithAction.args = {
    title: 'Warning',
    type: 'warning',
    message:
        'This is a very very long success message. This is here to see how a very long message appears.',
    children: (
        <Box csx={{ root: { marginTop: '1rem' } }}>
            <Button
                hasElevation={false}
                variant="normal"
                color="warning"
                isDense
                csx={{ root: { opacity: 0.8 } }}
            >
                Action 1
            </Button>
        </Box>
    ),
}
