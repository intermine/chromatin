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
    disabled: false,
    isError: false,
    isWarning: false,
    placeholder: 'Test placeholder',
}

export const Disabled = Template.bind({})
Disabled.args = {
    color: 'primary',
    disabled: true,
    placeholder: 'Disabled',
}
