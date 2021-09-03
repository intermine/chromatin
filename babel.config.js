module.exports = (api) => {
    const isTest = api.env('test')
    
    console.log(api.env())
    const ignore = [
        // 'src/**/*.stories.ts',
        // 'src/**/*.stories.tsx',
        // 'src/**/*.stories.js',
        // 'src/**/*.stories.jsx',
    ]

    if (!isTest) {
        /**
         * If environment is not test then we have
         * to exclude exclude test files from being
         * compiled
         */
        ignore.push('src/**/*.test.tsx')
        ignore.push('src/**/*.test.ts')
        ignore.push('src/**/*.test.jsx')
        ignore.push('src/**/*.test.js')
        ignore.push('**/__tests__/*')
        ignore.push('**/__mocks__/*')
    }

    return {
        presets: ['@babel/env', '@babel/typescript'],
        plugins: [
            '@babel/proposal-class-properties',
            '@babel/proposal-object-rest-spread',
        ],
        ignore: ignore,
        babelrcRoots: ['.', '.storybook/*']
    }
}
