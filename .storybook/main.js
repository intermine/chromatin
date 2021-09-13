module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        {
            name: '@storybook/addon-essentials',
            options: {
                actions: true,
                backgrounds: true,
                controls: true,
                docs: true,
                toolbars: true,
                viewport: true
            }
        },
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true,
                mdxBabelOptions: { babelrc: true, configFile: true }
            }
        }
    ]
}
