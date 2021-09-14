import { Story } from '@storybook/react/types-6-0'
import { Button } from './button'

import HomeIcon from '../icons/Communication/video-chat-fill'

export default {
    title: 'Button',
    component: Button,
}

const Template: Story = ({ children, ...args }) => (
    <Button {...args}>{children}</Button>
)

export const Primary = Template.bind({})
Primary.args = {
    children: 'This is a test button',
    color: 'primary',
    Component: 'button',
    onClick: (event) => console.log('You clicked me', event.currentTarget),
    onFocus: () => console.log('I am on focus'),
    disabled: false,
    RightIcon: <HomeIcon />,
}
