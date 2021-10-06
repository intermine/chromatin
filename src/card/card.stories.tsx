import { Story } from '@storybook/react/types-6-0'

import { Card } from './card'
import { CardAction } from '../card-action'
import { CardHeader } from '../card-header'
import { CardContent } from '../card-content'
import { Button } from '../button'

export default {
    title: 'Card',
    component: Card,
    subcomponents: { CardAction, CardContent, CardHeader },
}

const Template: Story = (args) => {
    return (
        <Card csx={{ root: { width: 250, height: 300 } }} {...args}>
            <CardHeader>
                <img
                    src="https://www.humanmine.org/humanmine/model/images/logo.png"
                    style={{
                        height: '32px',
                        width: '32px',
                        marginRight: '0.5rem',
                    }}
                />
                HumanMine
            </CardHeader>
            <CardContent>
                An integrated database of Homo sapiens genomic data
            </CardContent>
            <CardAction>
                <Button isDense color="info" variant="ghost">
                    Learn More
                </Button>
            </CardAction>
        </Card>
    )
}

export const Default = Template.bind({})
Default.args = {}
