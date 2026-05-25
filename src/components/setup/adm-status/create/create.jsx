import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Create from '../../Create'
import { AdmStatusService } from '../api'
import { AppLoading } from '../../../AppLoading'

const AdmStatusCreate = () => {
  const title = 'Ward Admission Status'
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
    const response = await AdmStatusService.edit(id)
    if (response) {
      setData(response)
      setLoading(false)
    }
  }

  const formSubmit = async (data) => {
    if (!edit) {
      const b = await AdmStatusService.create(data)
      if (b) {
        toast.success(`New ${title} successfully created`)
        childRef.current.resetForm()
      }
    } else {
      const b = await AdmStatusService.update(id, data)
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

export default AdmStatusCreate
