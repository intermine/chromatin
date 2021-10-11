import { Story } from '@storybook/react/types-6-0'
import { useState } from 'react'

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
    const [checked, setChecked] = useState({
        thumb: false,
        star: false,
        heart: true,
        default: false,
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
                name="default"
                onChange={onChange}
                isChecked={checked.default}
                {...args}
            />
            <Checkbox
                name="thumb"
                CheckedIcon={<ThumbsChecked />}
                UncheckedIcon={<ThumbsUnchecked />}
                onChange={onChange}
                isChecked={checked.thumb}
                {...args}
            />
            <Checkbox
                name="star"
                CheckedIcon={<StarChecked />}
                UncheckedIcon={<StarUnchecked />}
                onChange={onChange}
                isChecked={checked.star}
                {...args}
            />
            <Checkbox
                name="heart"
                CheckedIcon={<HeartChecked />}
                UncheckedIcon={<HeartUnchecked />}
                onChange={onChange}
                isChecked={checked.heart}
                {...args}
            />
        </div>
    )
}

export const Checkboxes = Template.bind({})
Checkboxes.args = {}
