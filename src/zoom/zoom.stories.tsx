import { Story } from '@storybook/react/types-6-0'
import { Collapsible } from '../collapsible'

import { Zoom } from './zoom'
import { Box } from '../box'

export default {
    title: 'Zoom',
    component: Zoom,
}

const Template: Story = (props) => {
    const { timeout = 200, ...rest } = props
    return (
        <Zoom timeout={timeout} {...props}>
            <Box
                isContentCenter
                csx={{
                    root: {
                        height: 500,
                        width: 500,
                        background: '#232323',
                        color: '#fff',
                    },
                }}
            >
                Zoom Animation Content.For those who are interested in finding
                random paragraphs, that's exactly what this webpage provides. If
                both a random word and a random sentence aren't quite long
                enough for your needs, then a random paragraph might be the
                perfect solution. Once you arrive at this page, you'll see a
                random paragraph. If you need another one, all you need to do is
                click on the "next paragraph" button. If you happen to need
                several random paragraphs all at once, you can use this other
                paragraph generator. Below you can find a number of ways that
                this generator can be used. For those who are interested in
                finding random paragraphs, that's exactly what this webpage
                provides. If both a random word and a random sentence aren't
                quite long enough for your needs, then a random paragraph might
                be the
            </Box>
        </Zoom>
    )
}

export const Default = Template.bind({})
Default.args = {
    in: false,
    timeout: 200,
}
