import { Story } from '@storybook/react/types-6-0'

import { InputBase } from './input-base'

export default {
    title: 'InputBase',
    component: InputBase,
}

const Template: Story = (args) => <InputBase {...args} />

export const Default = Template.bind({})
Default.args = {
    color: 'neutral',
    isDisabled: false,
    isError: false,
    isWarning: false,
    placeholder: 'Test placeholder',
}

export const Disabled = Template.bind({})
Disabled.args = {
    color: 'primary',
    isDisabled: true,
    placeholder: 'Disabled',
}
