/**
 * To check whether current environment is development.
 * @returns {boolean}
 */
export const isDevEnv = (): boolean => {
    if (process.env.NODE_ENV === 'development') return true
    return false
}
