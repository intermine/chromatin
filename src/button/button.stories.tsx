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
    children: 'Neutral Button',
    color: 'neutral',
    Component: 'button',
    onClick: (event) => console.log('You clicked me', event.currentTarget),
    onFocus: () => console.log('I am on focus'),
    disabled: false,
    fullWidth: false,
    elevation: true,
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
    elevation: true,
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
    elevation: true,
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
    elevation: true,
}

export const ButtonWithCustomColor = Template.bind({})
ButtonWithCustomColor.args = {
    children: 'InterMine Green',
    color: '#C0D848',
    disabled: false,
}
