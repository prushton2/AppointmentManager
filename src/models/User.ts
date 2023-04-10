export default interface User {
    id: string,
    name: string,
    permissions: string[],
    email: string,
    sessions: string[]
}