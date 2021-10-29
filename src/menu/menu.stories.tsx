import { Story } from '@storybook/react/types-6-0'
import { useRef, useState } from 'react'

import { Menu } from './menu'
import { MenuItem } from '../menu-item'
import { MenuHeading } from '../menu-heading'

import { Button } from '../button'
import { Box } from '../box'

import DownArrow from '../icons/System/arrow-down-s-line'

import { useMouseOver, useOutsideClick } from '../utils'

export default {
    title: 'Menu',
    component: Menu,
    subcomponents: { MenuItem, MenuHeading },
}

const Template2: Story = (args) => {
    const [isOpen, setIsOpen] = useState(false)

    const anchorRef = useRef(null)
    const menuRef = useRef(null)

    useMouseOver({
        anchorElement: anchorRef.current,
        otherElement: menuRef.current,
        onHoverStart: () => setIsOpen(true),
        onHoverEnd: () => setIsOpen(false),
    })

    return (
        <Box>
            <Button
                ref={anchorRef}
                variant={isOpen ? 'normal' : 'ghost'}
                csx={{ root: { margin: '10rem', borderRadius: 0 } }}
                hasHighlightOnFocus={false}
                RightIcon={<DownArrow />}
            >
                Queries By
            </Button>
            <Menu
                ref={menuRef}
                anchorElement={anchorRef.current}
                isOpen={isOpen}
                {...args}
            >
                <MenuItem>Functions</MenuItem>
                <MenuItem>Genes</MenuItem>
                <MenuItem>Expression</MenuItem>
                <MenuItem>Regulation</MenuItem>
                <MenuItem>Interactions</MenuItem>
                <MenuItem>Homology</MenuItem>
            </Menu>
        </Box>
    )
}

export const HoverMenu = Template2.bind({})
HoverMenu.args = {}

const Template3: Story = (args) => {
    const [isOpen, setIsOpen] = useState(false)

    const anchorRef = useRef(null)
    const menuRef = useRef(null)

    useOutsideClick({
        anchorElement: anchorRef.current,
        otherElements: [menuRef.current],
        onInsideClicked: () => setIsOpen(true),
        onOutsideClicked: () => setIsOpen(false),
    })

    return (
        <Box>
            <Button
                ref={anchorRef}
                variant={isOpen ? 'normal' : 'ghost'}
                color="neutral"
                csx={{ root: { margin: '10rem', borderRadius: 0 } }}
                hasHighlightOnFocus={false}
                RightIcon={<DownArrow />}
            >
                Queries By
            </Button>
            <Menu
                ref={menuRef}
                anchorElement={anchorRef.current}
                isOpen={isOpen}
                csx={{ root: { maxHeight: 300, overflow: 'auto' } }}
                {...args}
            >
                <MenuHeading>Query By</MenuHeading>
                <MenuItem>Functions</MenuItem>
                <MenuItem>Genes</MenuItem>
                <MenuItem>Expression</MenuItem>
                <MenuItem>Regulation</MenuItem>
                <MenuItem>Interactions</MenuItem>
                <MenuItem>Homology</MenuItem>
                <MenuHeading>Query By</MenuHeading>
                <MenuItem>Functions</MenuItem>
                <MenuItem>Genes</MenuItem>
                <MenuItem>Expression</MenuItem>
                <MenuItem>Regulation</MenuItem>
                <MenuItem>Interactions</MenuItem>
                <MenuItem>Homology</MenuItem>
                <MenuHeading>Query By</MenuHeading>
                <MenuItem>Functions</MenuItem>
                <MenuItem>Genes</MenuItem>
                <MenuItem>Expression</MenuItem>
                <MenuItem>Regulation</MenuItem>
                <MenuItem>Interactions</MenuItem>
                <MenuItem>Homology</MenuItem>
                <MenuHeading>Query By</MenuHeading>
                <MenuItem>Functions</MenuItem>
                <MenuItem>Genes</MenuItem>
                <MenuItem>Expression</MenuItem>
                <MenuItem>Regulation</MenuItem>
                <MenuItem>Interactions</MenuItem>
                <MenuItem>Homology</MenuItem>
            </Menu>
        </Box>
    )
}

export const ClickMenu = Template3.bind({})
ClickMenu.args = {}

const Template: Story = (args) => {
    const [isOpen, setIsOpen] = useState(false)

    const anchorRef = useRef(null)
    const anchor2Ref = useRef(null)
    const menu2Ref = useRef(null)
    const menuRef = useRef(null)

    const isMouseOver = useMouseOver({
        anchorElement: anchor2Ref.current,
        otherElement: menu2Ref.current,
        isHoverPolygonVisible: true,
    })

    useOutsideClick({
        anchorElement: menuRef.current,
        otherElements: [anchorRef.current, menu2Ref.current],
        onOutsideClicked: () => setIsOpen(false),
        onInsideClicked: () => setIsOpen(true),
    })

    return (
        <Box>
            <Button
                ref={anchorRef}
                variant={isOpen ? 'normal' : 'ghost'}
                color="neutral"
                csx={{ root: { margin: '10rem', borderRadius: 0 } }}
                hasHighlightOnFocus={false}
                RightIcon={<DownArrow />}
            >
                Queries By
            </Button>
            <Menu
                ref={menuRef}
                anchorElement={anchorRef.current}
                isOpen={isOpen}
                {...args}
            >
                <MenuItem>Functions</MenuItem>
                <MenuItem>Genes</MenuItem>
                <MenuItem>Expression</MenuItem>
                <MenuItem>Regulation</MenuItem>
                <MenuItem>Interactions</MenuItem>
                <MenuItem>Homology</MenuItem>
                <MenuItem ref={anchor2Ref}>Nested Menu</MenuItem>
            </Menu>
            <Menu
                anchorElement={anchor2Ref.current}
                placement="right-start"
                isOpen={isMouseOver}
                ref={menu2Ref}
            >
                <MenuItem>Functions</MenuItem>
                <MenuItem>Genes</MenuItem>
                <MenuItem>Expression</MenuItem>
                <MenuItem>Regulation</MenuItem>
                <MenuItem>Interactions</MenuItem>
                <MenuItem>Homology</MenuItem>
            </Menu>
        </Box>
    )
}

export const NestedMenu = Template.bind({})
NestedMenu.args = {}
