import { Story } from '@storybook/react/types-6-0'

import { Button } from '../button'

import { Tooltip } from './tooltip'

export default {
    title: 'Tooltip',
    component: Tooltip,
}

const Template: Story = (props) => {
    return (
        <Tooltip {...props}>
            <Button
                csx={{ root: { margin: '15rem' } }}
                variant="outlined"
                color="secondary"
            >
                Hover For Tooltip
            </Button>
        </Tooltip>
    )
}

export const Default = Template.bind({})
Default.args = {
    title: 'Simple Heading!',
    message: 'Tooltip message. This is a very short tooltip message.',
    onTooltipOpen: () => console.log('Tooltip is open'),
    onTooltipClose: () => console.log('Tooltip is closed'),
}
