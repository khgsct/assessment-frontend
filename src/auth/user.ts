import { reactive } from "vue"

const JwtKey = 'jwt'

export const user = reactive({
    isAuthenticated: false,
    updateToken(token: string): void {
        sessionStorage.setItem(JwtKey, token)
        this.isAuthenticated = true
    },
    getToken(): string | null {
        const jwt = sessionStorage.getItem(JwtKey)
        return jwt
    },
    logout(): void {
        sessionStorage.removeItem(JwtKey)
        this.isAuthenticated = false
    }
})
