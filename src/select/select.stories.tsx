import { Story } from '@storybook/react/types-6-0'

import { Select } from './select'

export default {
    title: 'Select',
    component: Select,
}

const Template: Story = (args) => {
    return <Select {...args} />
}

export const Default = Template.bind({})
Default.args = {
    isDisabled: false,
    options: [
        { value: 'fly-mine', label: 'FlyMine' },
        { value: 'human--mine', label: 'HumanMine' },
        { value: 'rat-mine', label: 'RatMine' },
        { value: 'covid-mind', label: 'CovidMine' },
    ],
}

export const MultipleSelect = Template.bind({})
MultipleSelect.args = {
    isDisabled: false,
    isMulti: true,
    options: [
        { value: 'fly-mine', label: 'FlyMine' },
        { value: 'human--mine', label: 'HumanMine' },
        { value: 'rat-mine', label: 'RatMine' },
        { value: 'covid-mind', label: 'CovidMine' },
    ],
}
