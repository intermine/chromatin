import { Story } from '@storybook/react/types-6-0'

import { Input } from './input'
import EmailIcon from '../icons/Business/mail-fill'

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
    placeholder: 'Username',
    hasFullWidth: false,
    hasOutlineOnFocus: false,
}

export const InputWithIcon = Template.bind({})
InputWithIcon.args = {
    color: 'primary',
    disabled: false,
    isError: false,
    isWarning: false,
    placeholder: 'Email',
    hasFullWidth: false,
    LeftIcon: <EmailIcon />,
}

export const Disabled = Template.bind({})
Disabled.args = {
    color: 'primary',
    disabled: true,
    placeholder: 'Disabled',
    RightIcon: <EmailIcon />,
}
