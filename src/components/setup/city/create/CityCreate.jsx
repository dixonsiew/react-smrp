import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Create from '../../Create'
import { CityService } from '../api'
import { AppLoading } from '../../../AppLoading'

const CityCreate = () => {
  const childRef = useRef()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  let edit = false
  if (id) {
    edit = true
  }

  useEffect(() => {
    if (id) {
      load()
    }
  }, [id])

  const load = async () => {
    setLoading(true)
    const response = await CityService.edit(id)
    if (response) {
      setData(response)
      setLoading(false)
    }
  }

  const formSubmit = async (data) => {
    if (!edit) {
      const b = await CityService.create(data)
      if (b) {
        toast.success('New City successfully created')
        childRef.current.resetForm()
      }
    } else {
      const b = await CityService.update(id, data)
      if (b) {
        toast.success('City successfully updated')
      }
    }
  }

  if (loading) {
    return <AppLoading />
  }

  return (
    <Create
      title="City"
      data={data}
      loading={loading}
      onFormSubmit={formSubmit}
      ref={childRef}
    />
  )
}

export default CityCreate
