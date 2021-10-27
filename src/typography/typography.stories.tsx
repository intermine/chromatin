import { Story } from '@storybook/react/types-6-0'

import { Typography } from './typography'

export default {
    title: 'Typography',
    component: Typography,
}

const Template: Story = (args) => <Typography {...args} />

export const Default = Template.bind({})
Default.args = {
    children: 'Typography',
}

export const Truncate = Template.bind({})
Truncate.args = {
    isTruncateText: true,
    children: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
}
