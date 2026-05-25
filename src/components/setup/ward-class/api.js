import { BASE_URL } from '../../../api/config'
import axios from 'axios'

export class WardClassService {

  static async list(page, limit, sort, dir) {
    const params = {
      _page: page,
      _limit: limit,
    }
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc'
      }
      params['sort'] = `${sort}:${dir}`
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/ward-classes`, { params })
      return {
        data: response.data,
        headers: response.headers,
      }
    } catch (error) {
      return null
    }
  }

  static async search(page, limit, sort, dir, keyword) {
    const params = {
      _page: page,
      _limit: limit,
    }
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc'
      }
      params['sort'] = `${sort}:${dir}`
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/ward-classes`, { keyword }, { params })
      return {
        data: response.data,
        headers: response.headers,
      }
    } catch (error) {
      return null
    }
  }

  static async create(data) {
    try {
      await axios.post(`${BASE_URL}/api/ward-class`, data)
      return true
    } catch (error) {
      return false
    }
  }

  static async edit(id) {
    try {
      const response = await axios.get(`${BASE_URL}/api/ward-class/${id}`)
      return response.data
    } catch (error) {
      return null
    }
  }

  static async update(id, data) {
    try {
      await axios.put(`${BASE_URL}/api/ward-class/${id}`, data)
      return true
    } catch (error) {
      return false
    }
  }

  static async remove(id) {
    try {
      await axios.delete(`${BASE_URL}/api/ward-class/${id}`)
      return true
    } catch (error) {
      return false
    }
  }
}
