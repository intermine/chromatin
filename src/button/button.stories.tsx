import { Story } from '@storybook/react/types-6-0'
import { Button } from './button'

import SendMail from '../icons/Business/mail-send-fill'
import UploadFile from '../icons/System/upload-2-fill'

import { InputBase } from '../input-base'
import { useEffect, useRef } from 'react'

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
    color: 'warning',
    Component: 'button',
    onClick: (event) => console.log('You clicked me', event.currentTarget),
    onFocus: () => console.log('I am on focus'),
    isDisabled: false,
    hasFullWidth: false,
    hasElevation: true,
}

export const ButtonWithIcon = Template.bind({})
ButtonWithIcon.args = {
    children: 'Send Mail',
    color: 'primary',
    Component: 'button',
    onClick: (event) => console.log('You clicked me', event.currentTarget),
    onFocus: () => console.log('I am on focus'),
    isDisabled: false,
    RightIcon: <SendMail />,
    hasFullWidth: false,
    hasElevation: true,
}

export const FullWidthButton = Template.bind({})
FullWidthButton.args = {
    children: 'Send Mail',
    color: 'primary',
    Component: 'button',
    onClick: (event) => console.log('You clicked me', event.currentTarget),
    onFocus: () => console.log('I am on focus'),
    isDisabled: false,
    hasFullWidth: true,
    hasElevation: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
    children: 'Send Mail',
    color: 'primary',
    Component: 'button',
    onClick: (event) => console.log('You clicked me', event.currentTarget),
    onFocus: () => console.log('I am on focus'),
    isDisabled: true,
    hasFullWidth: true,
    hasElevation: true,
}

export const ButtonWithCustomColor = Template.bind({})
ButtonWithCustomColor.args = {
    children: 'InterMine Green',
    color: '#C0D848',
    isDisabled: false,
}

const Template3: Story = (props) => {
    const br = useRef()

    useEffect(() => {
        if (br.current) {
            console.log(br.current)
        }
    }, [br])
    return (
        <div>
            <InputBase id="upload" type="file" isHidden />
            <Button
                innerRef={br}
                onClick={() => console.log('Clicked')}
                variant="normal"
                color="secondary"
                Component="label"
                htmlFor="upload"
                RightIcon={<UploadFile />}
                {...props}
            >
                Upload File
            </Button>
        </div>
    )
}

export const ButtonAsLabel = Template3.bind({})
ButtonAsLabel.args = {}
