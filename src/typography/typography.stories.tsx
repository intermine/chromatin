import { Story } from '@storybook/react/types-6-0'

import { Typography } from './typography'

export default {
    title: 'Typography',
    component: Typography,
}

const Template: Story = (args) => <Typography {...args} />

export const Default = Template.bind({})
Default.args = {
    children: 'I am a box',
}
