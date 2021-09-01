/**
 * To check whether current environment is production.
 * @returns {boolean}
 */
export const isProdEnv = (): boolean => {
    if (process.env.NODE_ENV === 'production') return true
    return false
}
