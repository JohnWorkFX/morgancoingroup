export { default } from 'next-auth/middleware'
// '/dashboard', '/transactions'
export const config = {matcher:['/dashboard', '/transactions', '/history', '/wallet']}