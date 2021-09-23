import { Story } from '@storybook/react/types-6-0'

import { Box } from './box'

export default {
    title: 'Box',
    component: Box,
}

const Template: Story = (args) => <Box {...args} />

export const Default = Template.bind({})
Default.args = {
    children: 'I am a box',
}
