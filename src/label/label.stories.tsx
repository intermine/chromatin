import { Story } from '@storybook/react/types-6-0'
import { Grid, GridItem, Input } from '..'

import { Label } from './label'

export default {
    title: 'Label',
    component: Label,
}

const Template: Story = (args) => {
    return (
        <Grid spacing={2} isContentAlignCenter>
            <GridItem sm={12} md={'auto'}>
                <Label htmlFor="test" {...args} />
            </GridItem>
            <GridItem sm={12} md={3}>
                <Input hasFullWidth id="test" />
            </GridItem>
        </Grid>
    )
}

export const Default = Template.bind({})
Default.args = {
    children: 'Label',
    required: true,
}
