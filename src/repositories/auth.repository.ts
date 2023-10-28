import { User } from "@/model/user";

class AuthRepository {

    private static readonly LOGGED_KEY = '@AULA_AUTH_LOGGED'

    public getLogged() {
        const json = localStorage.getItem(AuthRepository.LOGGED_KEY)
        return json ? JSON.parse(json) as User : null
    }

    public setLogged(user: User) {
        const json = JSON.stringify(user)
        localStorage.setItem(AuthRepository.LOGGED_KEY, json)
    }

    public removeLoggedUser() {
        localStorage.removeItem(AuthRepository.LOGGED_KEY)
    }

}

export const authRepository = new AuthRepository()