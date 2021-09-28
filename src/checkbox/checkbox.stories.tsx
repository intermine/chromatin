import { Story } from '@storybook/react/types-6-0'
import { useState } from 'react'
import { Typography } from '..'

import { Checkbox } from './checkbox'

import ThumbsChecked from '../icons/System/thumb-up-fill'
import ThumbsUnchecked from '../icons/System/thumb-up-line'

import StarChecked from '../icons/System/star-fill'
import StarUnchecked from '../icons/System/star-line'

import HeartChecked from '../icons/Health/heart-fill'
import HeartUnchecked from '../icons/Health/heart-line'

export default {
    title: 'Checkbox',
    component: Checkbox,
}

const Template: Story = (args) => {
    const [checked, setChecked] = useState(false)

    const onChange = () => {
        setChecked(!checked)
    }

    return (
        <div style={{ width: '300px' }}>
            <Checkbox onChange={onChange} checked={checked} {...args} />
        </div>
    )
}

export const Default = Template.bind({})
Default.args = {
    label: <Typography>Checkbox Label</Typography>,
}

const Template2: Story = (args) => {
    const [checked, setChecked] = useState({
        thumb: false,
        star: false,
        heart: false,
    })

    const onChange = (event) => {
        setChecked((prev) => ({
            ...prev,
            [event.target.name]: !prev[event.target.name],
        }))
    }

    return (
        <div style={{ width: '300px', display: 'flex' }}>
            <Checkbox
                name="thumb"
                CheckedIcon={<ThumbsChecked />}
                UncheckedIcon={<ThumbsUnchecked />}
                onChange={onChange}
                checked={checked.thumb}
                {...args}
            />
            <Checkbox
                name="star"
                CheckedIcon={<StarChecked />}
                UncheckedIcon={<StarUnchecked />}
                onChange={onChange}
                checked={checked.star}
                {...args}
            />
            <Checkbox
                name="heart"
                CheckedIcon={<HeartChecked />}
                UncheckedIcon={<HeartUnchecked />}
                onChange={onChange}
                checked={checked.heart}
                {...args}
            />
        </div>
    )
}

export const CheckboxWithCustomIcon = Template2.bind({})
CheckboxWithCustomIcon.args = {}
