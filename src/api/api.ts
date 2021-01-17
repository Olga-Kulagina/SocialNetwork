import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '99efda20-dfa9-469b-8832-45007a73919e'
    }
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 12) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    }

}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get('profile/' + userId)
    },
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

}

type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: number
    messages: Array<string>
}
type LoginResponseType = {
    data: { userId: number }
    resultCode: number
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>('auth/me')
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete('auth/login')
    }

}
