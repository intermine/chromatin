import { Story } from '@storybook/react/types-6-0'

import { Grid } from './grid'
import { GridItem } from '../grid-item'

export default {
    title: 'Grid',
    component: Grid,
    subcomponents: { GridItem },
}

const Template: Story = ({ ...args }) => (
    <Grid csx={{ root: { '& div': { border: '1px solid black' } } }} {...args}>
        <GridItem sm={12} md={6}>
            Col 1
        </GridItem>
        <GridItem sm={12} md={6}>
            Col 2
        </GridItem>
        <GridItem sm={6} md={4}>
            Col 3
        </GridItem>
        <GridItem sm={6} md={4}>
            Col 4
        </GridItem>
        <GridItem sm="hidden" md={4}>
            Col 5
        </GridItem>
    </Grid>
)

export const Default = Template.bind({})
Default.args = {
    spacing: 2,
}
