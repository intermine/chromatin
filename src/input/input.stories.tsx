import { Story } from '@storybook/react/types-6-0'

import { Input } from './input'

export default {
    title: 'Input',
    component: Input,
}

const Template: Story = (args) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
    color: 'primary',
    disabled: false,
    isError: false,
    isWarning: false,
    placeholder: 'Test placeholder',
    hasFullWidth: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
    color: 'primary',
    disabled: true,
    placeholder: 'Disabled',
}
