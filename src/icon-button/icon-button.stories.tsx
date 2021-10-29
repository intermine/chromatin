import { Story } from '@storybook/react/types-6-0'
import { IconButton } from './icon-button'

import SendMail from '../icons/Business/mail-send-fill'

export default {
    title: 'IconButton',
    component: IconButton,
}

const Template: Story = (args) => <IconButton {...args} />

export const Default = Template.bind({})
Default.args = {
    Icon: <SendMail />,
    isDisabled: false,
    hasHighlightOnFocus: true,
    hasHoverEffectOnFocus: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
    Icon: <SendMail />,
    color: 'primary',
    isDisabled: true,
}
