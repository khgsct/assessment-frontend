import { http } from "./base"

export const auth = () => {
    return {
        authenticate: (email: string, password: string) => {
            return http(false).post('/api/v1/auth', {
                email,
                password
            })
            .then(response => response.data)
        }
    }
}
