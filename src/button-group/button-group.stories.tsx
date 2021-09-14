import { Story } from '@storybook/react/types-6-0'

import { ButtonGroup } from './button-group'
import { Button } from '../button'
import { IconButton } from '../icon-button'

// Icons
import DeleteIcon from '../icons/System/delete-bin-6-fill'
import EditIcon from '../icons/Design/edit-fill'
import FilterIcon from '../icons/System/filter-fill'
import SettingIcon from '../icons/System/settings-fill'

export default {
    title: 'ButtonGroup',
    component: ButtonGroup,
}

const Template: Story = ({ children, ...args }) => (
    <ButtonGroup {...args}>
        <Button
            className="test"
            onClick={() => console.log('Button 1 Clicked')}
        >
            Button 1
        </Button>
        <Button onClick={() => console.log('Button 2 Clicked')}>
            Button 2
        </Button>
        <Button onClick={() => console.log('Button 3 Clicked')}>
            Button 3
        </Button>
        <Button onClick={() => console.log('Button 4 Clicked')}>
            Button 4
        </Button>
    </ButtonGroup>
)

const Template2: Story = ({ children, ...args }) => (
    <ButtonGroup {...args}>
        <IconButton
            className="test"
            onClick={() => console.log('Button 1 Clicked')}
            Icon={<EditIcon />}
        />
        <IconButton
            onClick={() => console.log('Button 2 Clicked')}
            Icon={<FilterIcon />}
        />
        <IconButton
            onClick={() => console.log('Button 3 Clicked')}
            Icon={<DeleteIcon />}
        />
        <IconButton
            onClick={() => console.log('Button 4 Clicked')}
            Icon={<SettingIcon />}
        />
    </ButtonGroup>
)

const Template3: Story = ({ children, ...args }) => (
    <ButtonGroup {...args}>
        <Button
            className="test"
            onClick={() => console.log('Button 1 Clicked')}
            LeftIcon={<EditIcon />}
        >
            Edit
        </Button>
        <Button
            onClick={() => console.log('Button 2 Clicked')}
            LeftIcon={<FilterIcon />}
        >
            Filter
        </Button>
        <Button
            onClick={() => console.log('Button 3 Clicked')}
            LeftIcon={<DeleteIcon />}
        >
            Delete
        </Button>
        <Button
            onClick={() => console.log('Button 4 Clicked')}
            LeftIcon={<SettingIcon />}
        >
            Settings
        </Button>
    </ButtonGroup>
)

export const Default = Template.bind({})
Default.args = {
    color: 'primary',
    variant: 'normal',
    Component: 'button',
    onClick: () => console.log('Main button clicked'),
}

export const IconButtonGroup = Template2.bind({})
IconButtonGroup.args = {
    color: 'primary',
    variant: 'normal',
    Component: 'button',
    onClick: () => console.log('Main button clicked'),
}

export const ButtonGroupWithButtonHavingIcon = Template3.bind({})
ButtonGroupWithButtonHavingIcon.args = {
    color: 'primary',
    variant: 'normal',
    Component: 'button',
    onClick: () => console.log('Main button clicked'),
    elevation: false,
    noHighlightOnFocus: false,
}
