import { Story } from '@storybook/react/types-6-0'

import { List } from './list'
import { ListItem } from '../list-item'
import { ListHeading } from '../list-heading'
import { Divider } from '../divider'
import { Button } from '../button'
import { useState } from 'react'
import { Box } from '../box'

import Icon1 from '../icons/Business/slideshow-2-fill'
import Icon2 from '../icons/Business/pie-chart-2-fill'
import Icon3 from '../icons/Business/donut-chart-fill'
import Icon4 from '../icons/Business/bar-chart-2-fill'
import Icon5 from '../icons/Business/line-chart-fill'

export default {
    title: 'List',
    component: List,
    subcomponents: { ListItem, ListHeading },
}

const Template: Story = (args) => {
    return (
        <List {...args}>
            <ListItem>List Item 1</ListItem>
            <ListItem>List Item 2</ListItem>
            <ListItem>List Item 3</ListItem>
            <ListItem>List Item 4</ListItem>
            <ListItem>List Item 5</ListItem>
        </List>
    )
}

export const Default = Template.bind({})
Default.args = {}

const Template2: Story = (args) => {
    return (
        <List listItemProps={{ hoverColor: 'primary' }} {...args}>
            <ListItem>List Item 1</ListItem>
            <ListItem>List Item 2</ListItem>
            <ListItem>List Item 3</ListItem>
            <ListItem>List Item 4</ListItem>
            <ListItem>List Item 5</ListItem>
        </List>
    )
}

export const ListWithHoverEffect = Template2.bind({})
ListWithHoverEffect.args = {}

const Template3: Story = (args) => {
    return (
        <List listItemProps={{ hasPadding: false }} {...args}>
            <ListItem>List Item 1</ListItem>
            <Divider Component="li" />
            <ListItem>List Item 2</ListItem>
            <Divider Component="li" />
            <ListItem>List Item 3</ListItem>
            <Divider Component="li" />
            <ListItem>List Item 4</ListItem>
            <Divider Component="li" />
            <ListItem>List Item 5</ListItem>
        </List>
    )
}

export const ListSeparatedByDivider = Template3.bind({})
ListSeparatedByDivider.args = {}

const SidebarItem = ({ children, isActive, onClick, Icon }) => {
    return (
        <Button
            Component="a"
            variant="ghost"
            color="primary"
            onClick={onClick}
            hasFullWidth
            hasHoverEffectOnFocus
            hasHighlightOnFocus={false}
            isHovered={isActive}
            csx={{
                root: {
                    justifyContent: 'flex-start',
                },
            }}
        >
            <Box
                csx={{
                    root: (theme) => ({
                        fill: isActive
                            ? 'inherit'
                            : theme.themeType === 'light'
                            ? '#000'
                            : '#fff',
                        color: isActive
                            ? 'inherit'
                            : theme.themeType === 'light'
                            ? '#000'
                            : '#fff',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                    }),
                }}
            >
                {Icon}
                {children}
            </Box>
        </Button>
    )
}
const Sidebar: Story = (args) => {
    const [activeItem, setActiveItem] = useState(0)

    const handleOnClick = (itemName: number) => {
        setActiveItem(itemName)
    }

    return (
        <List {...args}>
            <ListItem>
                <SidebarItem
                    isActive={activeItem === 1}
                    onClick={() => handleOnClick(1)}
                    Icon={
                        <Icon1
                            height={16}
                            width={16}
                            style={{ marginRight: '1rem' }}
                        />
                    }
                >
                    Sidebar Item 1
                </SidebarItem>
            </ListItem>
            <ListItem>
                <SidebarItem
                    Icon={
                        <Icon2
                            height={16}
                            width={16}
                            style={{ marginRight: '1rem' }}
                        />
                    }
                    isActive={activeItem === 2}
                    onClick={() => handleOnClick(2)}
                >
                    Sidebar Item 2
                </SidebarItem>
            </ListItem>
            <ListItem>
                <SidebarItem
                    Icon={
                        <Icon3
                            height={16}
                            width={16}
                            style={{ marginRight: '1rem' }}
                        />
                    }
                    isActive={activeItem === 3}
                    onClick={() => handleOnClick(3)}
                >
                    Sidebar Item 3
                </SidebarItem>
            </ListItem>
            <ListItem>
                <SidebarItem
                    Icon={
                        <Icon4
                            height={16}
                            width={16}
                            style={{ marginRight: '1rem' }}
                        />
                    }
                    isActive={activeItem === 4}
                    onClick={() => handleOnClick(4)}
                >
                    Sidebar Item 4
                </SidebarItem>
            </ListItem>
            <ListItem>
                <SidebarItem
                    Icon={
                        <Icon5
                            height={16}
                            width={16}
                            style={{ marginRight: '1rem' }}
                        />
                    }
                    isActive={activeItem === 5}
                    onClick={() => handleOnClick(5)}
                >
                    Sidebar Item 5
                </SidebarItem>
            </ListItem>
        </List>
    )
}

export const ListAsSidebar = Sidebar.bind({})
ListAsSidebar.args = {}

const ListImg = ({ url }) => {
    return (
        <img
            src={url}
            alt="img"
            height="24"
            width="auto"
            style={{ marginRight: '0.5rem' }}
        />
    )
}

const Template4: Story = (args) => {
    return (
        <List listItemProps={{ hoverColor: 'neutral' }} {...args}>
            <ListHeading>Default Mines</ListHeading>
            <ListItem>
                <ListImg url="https://www.flymine.org/flymine/model/images/logo.png" />
                FlyMine
            </ListItem>
            <ListItem>
                <ListImg url="https://www.humanmine.org/humanmine/model/images/logo.png" />
                HumanMine
            </ListItem>
            <ListHeading>Registry Mines</ListHeading>
            <ListItem>
                <ListImg url="https://mines.legumeinfo.org/beanmine/model/images/common-bean.png" />
                BeanMine
            </ListItem>
            <ListItem>
                <ListImg url="https://test.intermine.org/covidmine/model/images/logo.png" />
                CovidMine
            </ListItem>
            <ListHeading>Incompatible Mines</ListHeading>
            <ListItem>
                <ListImg url="http://ratmine.mcw.edu/ratmine/model/images/logo.png" />
                RatMine
            </ListItem>
        </List>
    )
}

export const ListWithHeading = Template4.bind({})
ListWithHeading.args = {}

const Template5: Story = (args) => {
    return (
        <List
            csx={{ root: { height: 300, overflowY: 'scroll', width: '400' } }}
            {...args}
        >
            <ListHeading>Default Mines</ListHeading>
            <ListItem>
                <ListImg url="https://www.flymine.org/flymine/model/images/logo.png" />
                FlyMine
            </ListItem>
            <ListItem>
                <ListImg url="https://www.humanmine.org/humanmine/model/images/logo.png" />
                HumanMine
            </ListItem>
            <ListHeading>Registry Mines</ListHeading>
            <ListItem>
                <ListImg url="https://mines.legumeinfo.org/beanmine/model/images/common-bean.png" />
                BeanMine
            </ListItem>
            <ListItem>
                <ListImg url="https://test.intermine.org/covidmine/model/images/logo.png" />
                CovidMine
            </ListItem>

            <ListHeading>Incompatible Mines</ListHeading>
            <ListItem>
                <ListImg url="http://ratmine.mcw.edu/ratmine/model/images/logo.png" />
                RatMine
            </ListItem>
            <ListHeading>Default Mines</ListHeading>
            <ListItem>
                <ListImg url="https://www.flymine.org/flymine/model/images/logo.png" />
                FlyMine
            </ListItem>
            <ListItem>
                <ListImg url="https://www.humanmine.org/humanmine/model/images/logo.png" />
                HumanMine
            </ListItem>
            <ListHeading>Registry Mines</ListHeading>
            <ListItem>
                <ListImg url="https://mines.legumeinfo.org/beanmine/model/images/common-bean.png" />
                BeanMine
            </ListItem>
            <ListItem>
                <ListImg url="https://test.intermine.org/covidmine/model/images/logo.png" />
                CovidMine
            </ListItem>

            <ListHeading>Incompatible Mines</ListHeading>
            <ListItem>
                <ListImg url="http://ratmine.mcw.edu/ratmine/model/images/logo.png" />
                RatMine
            </ListItem>
        </List>
    )
}

export const ListWithStickyHeading = Template5.bind({})
ListWithStickyHeading.args = {}
