import { createContext, useState, useContext, useEffect } from 'react'
import { AuthService } from '../api/auth'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(AuthService.getToken())
  const [refreshToken, setRefreshToken] = useState(AuthService.getRefreshToken())
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      verifyToken(token)
    }

    setLoading(false)
  }, [token])

  const verifyToken = async (token) => {
    try {
      const response = await AuthService.me()
      if (!response) {
        logout()
        return
      }

      setUser(response)
    } catch (error) {
      logout()
    }
  }

  const login = async (username, password) => {
    try {
      const response = await AuthService.login(username, password)
      
      if (!response.success) {
        return response
      }

      const { token, refresh_token } = response
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refresh_token)
      setToken(token);
      setRefreshToken(refresh_token)

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      return { success: true }
    } catch (error) {
      return { 
        success: false,
        error: error.response?.data?.message || 'Login failed' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    delete axios.defaults.headers.common['Authorization']
    setToken(null)
    setRefreshToken(null)
  }

  const doRefreshToken = async () => {
    try {
      const response = await AuthService.refreshToken()

      if (!response || !response.success) {
        logout()
        return null
      }

      const { token, refresh_token } = response
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refresh_token)
      setToken(token)
      setRefreshToken(refresh_token)

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      return { success: true, token }
    } catch (error) {
      logout()
      return null
    }
  }

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        
        const res = await doRefreshToken()
        if (res?.success) {
          originalRequest.headers['Authorization'] = `Bearer ${res.token}`
          return axios(originalRequest)
        }
      }
      
      return Promise.reject(error)
    }
  )

  return (
    <AuthContext.Provider value={{ user, login, logout, doRefreshToken, loading }}>
      {children}
    </AuthContext.Provider>
  )
}