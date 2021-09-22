import { Story } from '@storybook/react/types-6-0'

import { Grid } from './grid'
import { GridItem } from '../grid-item'

export default {
    title: 'Grid',
    component: Grid,
    subcomponents: { GridItem },
}

const Template: Story = ({ ...args }) => (
    <Grid {...args}>
        <GridItem md={8}>
            <Grid spacing={1}>
                <GridItem sm={12} md={4}>
                    nested
                </GridItem>
                <GridItem sm={12} md={4}>
                    nested
                </GridItem>
                <GridItem sm={12} md={4}>
                    nested
                </GridItem>
            </Grid>
        </GridItem>
        <GridItem md={4}>Col 2</GridItem>
        <GridItem md={4}>Col 3</GridItem>
        <GridItem md={4}>Col 4</GridItem>
        <GridItem md={4}>Col 5</GridItem>
    </Grid>
)

export const Default = Template.bind({})
Default.args = {
    spacing: 2,
}
