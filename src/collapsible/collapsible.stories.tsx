import { Story } from '@storybook/react/types-6-0'
import { Typography } from '../typography'

import { Collapsible } from './collapsible'

export default {
    title: 'Collapsible',
    component: Collapsible,
}

const Template: Story = (args) => {
    return <Collapsible {...args} />
}

export const Default = Template.bind({})
Default.args = {
    children: (
        <Typography>
            For those who are interested in finding random paragraphs, that's
            exactly what this webpage provides. If both a random word and a
            random sentence aren't quite long enough for your needs, then a
            random paragraph might be the perfect solution. Once you arrive at
            this page, you'll see a random paragraph. If you need another one,
            all you need to do is click on the "next paragraph" button. If you
            happen to need several random paragraphs all at once, you can use
            this other paragraph generator. Below you can find a number of ways
            that this generator can be used. For those who are interested in
            finding random paragraphs, that's exactly what this webpage
            provides. If both a random word and a random sentence aren't quite
            long enough for your needs, then a random paragraph might be the
            perfect solution. Once you arrive at this page, you'll see a random
            paragraph. If you need another one, all you need to do is click on
            the "next paragraph" button. If you happen to need several random
            paragraphs all at once, you can use this other paragraph generator.
            Below you can find a number of ways that this generator can be used.
        </Typography>
    ),
}
