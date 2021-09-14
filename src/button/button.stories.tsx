import { Story } from '@storybook/react/types-6-0'
import { Button } from './button'

import SendMail from '../icons/Business/mail-send-fill'

export default {
    title: 'Button',
    component: Button,
}

const Template: Story = ({ children, ...args }) => (
    <Button {...args}>{children}</Button>
)

export const Default = Template.bind({})
Default.args = {
    children: 'Send Mail',
    color: 'primary',
    Component: 'button',
    onClick: (event) => console.log('You clicked me', event.currentTarget),
    onFocus: () => console.log('I am on focus'),
    disabled: false,
    fullWidth: true,
}

export const ButtonWithIcon = Template.bind({})
ButtonWithIcon.args = {
    children: 'Send Mail',
    color: 'primary',
    Component: 'button',
    onClick: (event) => console.log('You clicked me', event.currentTarget),
    onFocus: () => console.log('I am on focus'),
    disabled: false,
    RightIcon: <SendMail />,
    fullWidth: false,
}

export const FullWidthButton = Template.bind({})
FullWidthButton.args = {
    children: 'Send Mail',
    color: 'primary',
    Component: 'button',
    onClick: (event) => console.log('You clicked me', event.currentTarget),
    onFocus: () => console.log('I am on focus'),
    disabled: false,
    fullWidth: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
    children: 'Send Mail',
    color: 'primary',
    Component: 'button',
    onClick: (event) => console.log('You clicked me', event.currentTarget),
    onFocus: () => console.log('I am on focus'),
    disabled: true,
    fullWidth: true,
}
