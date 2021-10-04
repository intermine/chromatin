import { Story } from '@storybook/react/types-6-0'
import { useEffect, useState } from 'react'
import { Box } from '../box'
import { Button } from '../button'
import { Alert } from './alert'

export default {
    title: 'Alert',
    component: Alert,
}

const Template: Story = (args) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Box>
            <Button
                color="secondary"
                variant="outlined"
                onClick={() => setIsOpen(!isOpen)}
            >
                Toggle Alert
            </Button>
            <Alert isOpen={isOpen} onClose={() => setIsOpen(false)} {...args} />
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
