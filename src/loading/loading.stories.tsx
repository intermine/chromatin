import { Story } from '@storybook/react/types-6-0'

import { Spinner } from './spinner'

export default {
    title: 'Spinner',
    component: Spinner,
}

const Template: Story = (args) => <Spinner {...args} />

export const Default = Template.bind({})
Default.args = {
    size: 'regular',
    color: 'primary',
}
