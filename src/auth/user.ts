import { reactive } from "vue"

const JwtKey = 'jwt'

export const user = reactive({
    isAuthenticated: false,
    updateAuthState() {
        this.isAuthenticated = this.getToken() != null
    },
    updateToken(token: string): void {
        sessionStorage.setItem(JwtKey, token)
        this.updateAuthState()
    },
    getToken(): string | null {
        const jwt = sessionStorage.getItem(JwtKey)
        return jwt
    },
    logout(): void {
        sessionStorage.removeItem(JwtKey)
        this.updateAuthState()
    }
})
