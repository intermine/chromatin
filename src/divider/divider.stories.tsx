import { Story } from '@storybook/react/types-6-0'

import { Box } from '../box'
import { IconButton } from '../icon-button'
import { Divider } from './divider'
import { Typography } from '../typography'

import ThumbsChecked from '../icons/System/thumb-up-fill'
import ThumbsUnchecked from '../icons/System/thumb-up-line'

import StarChecked from '../icons/System/star-fill'
import StarUnchecked from '../icons/System/star-line'

import HeartChecked from '../icons/Health/heart-fill'
import HeartUnchecked from '../icons/Health/heart-line'

export default {
    title: 'Divider',
    component: Divider,
}

const Template: Story = (args) => {
    return (
        <Box display="inline-flex">
            <IconButton color="info" Icon={<ThumbsChecked />} />
            <IconButton color="info" Icon={<StarChecked />} />
            <IconButton color="info" Icon={<HeartChecked />} />
            <Divider
                csx={{ root: { margin: '4px' } }}
                alignment="vt"
                {...args}
            />
            <IconButton color="info" Icon={<ThumbsUnchecked />} />
            <IconButton color="info" Icon={<StarUnchecked />} />
            <IconButton color="info" Icon={<HeartUnchecked />} />
        </Box>
    )
}

export const VerticalDivider = Template.bind({})
VerticalDivider.args = {
    Component: 'div'
}

const Template2: Story = (args) => {
    return (
        <Box>
            <Typography>List Item 1</Typography>
            <Divider {...args} />

            <Typography>List Item 2</Typography>
            <Divider {...args} />

            <Typography>List Item 3</Typography>
            <Divider {...args} />

            <Typography>List Item 4</Typography>
            <Divider {...args} />

            <Typography>List Item 5</Typography>
        </Box>
    )
}

export const HorizontalDivider = Template2.bind({})
HorizontalDivider.args = {}
