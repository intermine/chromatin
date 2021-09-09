import { Story, Meta } from '@storybook/react/types-6-0'
import { ButtonBase } from './button-base'

export default {
    title: 'ButtonBase',
    component: ButtonBase,
}

const Template: Story = ({ children, ...args }) => (
    <ButtonBase {...args}>{children}</ButtonBase>
)

export const Primary = Template.bind({})
Primary.args = {
    children: 'Button Base',
    color: 'primary',
    Component: 'button',
    disabled: true,
}
