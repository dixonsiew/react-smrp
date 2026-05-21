import { BASE_URL } from './config'
import axios from 'axios'

export class AuthService {

  static async login(username, password) {
    try {
      const response = await axios.post(`${BASE_URL}/o/token`, {
        username,
        password,
      });
      
      const { token, refresh_token } = response.data

      return {
        success: true,
        token,
        refresh_token,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      }
    }
  }

  static async refreshToken() {
    try {
      const x = localStorage.getItem('refreshToken')
      if (!x) {
        return null
      }

      const response = await axios.post(`${BASE_URL}/o/refresh-token`, {
        refresh_token: x,
      });

      const { token, refresh_token } = response.data

      return {
        success: true,
        token,
        refresh_token,
      };
    } catch (error) {
      return null
    }
  }

  static getToken() {
    return localStorage.getItem('token') || ''
  }

  static getRefreshToken() {
    return localStorage.getItem('refreshToken') || ''
  }

  static hasValidToken() {
    return !!this.getToken()
  }

  static hasValidRefreshToken() {
    return !!this.getRefreshToken()
  }

  static async changePassword(password, confirm_password) {
    try {
      await axios.post(`${BASE_URL}/api/change-password`, {
        password,
        confirm_password,
      })
      return true
    } catch (error) {
      return false
    }
  }

  static async me() {
    try {
      const response = await axios.get(`${BASE_URL}/api/current-user`)
      return response.data
    } catch (error) {
      return null
    }
  }
}
