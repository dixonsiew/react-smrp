import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Create from '../../Create'
import { SpecialityService } from '../api'
import { AppLoading } from '../../../AppLoading'

const SpecialityCreate = () => {
  const title = 'Speciality'
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
    const response = await SpecialityService.edit(id)
    if (response) {
      setData(response)
      setLoading(false)
    }
  }

  const formSubmit = async (data) => {
    if (!edit) {
      const b = await SpecialityService.create(data)
      if (b) {
        toast.success(`New ${title} successfully created`)
        childRef.current.resetForm()
      }
    } else {
      const b = await SpecialityService.update(id, data)
      if (b) {
        toast.success(`${title} successfully updated`)
      }
    }
  }

  if (loading) {
    return <AppLoading />
  }

  return (
    <Create
      title={title}
      data={data}
      loading={loading}
      onFormSubmit={formSubmit}
      ref={childRef}
    />
  )
}

export default SpecialityCreate
