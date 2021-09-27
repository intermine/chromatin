import { useState } from '@storybook/addons'
import { Story } from '@storybook/react/types-6-0'
import { Button } from '../button'

import { Spinner } from './spinner'
import UploadFile from '../icons/System/upload-2-fill'

export default {
    title: 'Spinner',
    component: Spinner,
}

const Template: Story = (args) => <Spinner {...args} />

export const Default = Template.bind({})
Default.args = {
    size: 'regular',
    color: 'primary',
}

const Template2: Story = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [buttonTitle, setButtonTitle] = useState('Upload File')

    const handleClick = () => {
        setIsLoading(true)
        setButtonTitle('Uploading')

        setTimeout(() => {
            setIsLoading(false)
            setButtonTitle('Upload File')
        }, 6000)
    }

    return (
        <div>
            <h4> Click the Button</h4>
            <Button
                color="info"
                disabled={isLoading}
                onClick={handleClick}
                RightIcon={isLoading ? <Spinner /> : <UploadFile />}
            >
                {buttonTitle}
            </Button>
        </div>
    )
}

export const CustomButtonLoading = Template2.bind({})
CustomButtonLoading.args = {}
