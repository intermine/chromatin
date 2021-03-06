import { Story, Meta } from '@storybook/react/types-6-0'
import { ButtonBase } from './button-base'

export default {
    title: 'ButtonBase',
    component: ButtonBase,
}

const Template: Story = ({ children, ...args }) => (
    <ButtonBase {...args}>{children}</ButtonBase>
)

export const Default = Template.bind({})
Default.args = {
    children: 'Button Base',
    Component: 'button',
    isDisabled: false,
    hasHoverEffectOnFocus: false,
    hasHighlightOnFocus: true,
}

export const LinkAsButton = Template.bind({})
LinkAsButton.args = {
    children: 'Button Base',
    color: 'primary',
    Component: 'a',
    isDisabled: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
    children: 'Button Base',
    color: 'primary',
    Component: 'a',
    isDisabled: true,
}
