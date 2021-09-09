import { Story, Meta } from '@storybook/react/types-6-0'
// import mdx from './button-base.mdx'
import { Button } from './button'

// export default {
//     title: 'Component/Button',
//     component: Button,
//     parameters: {
//         component: Button,
//         // docs: {
//         //     page: mdx,
//         // },
//     },
// } as Meta

export default {
    title: 'Button',
    component: Button,
}

const Template: Story = ({ children, ...args }) => (
    <Button {...args}>{children}</Button>
)

export const Primary = Template.bind({})
Primary.args = {
    children: 'This is a test button',
    color: 'primary',
    Component: 'button',
    onClick: (event) => console.log('You clicked me', event.currentTarget),
    onFocus: () => console.log('I am on focus'),
}