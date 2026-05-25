import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from '@coreui/react'

const CalendarModal = ({ onCancelCb, onConfirm, selected, show }) => {
  const [value, onChange] = useState(() => {
    if (selected === '') {
      return new Date()
    }
    return selected
  })

  useEffect(() => {
    if (selected !== '') {
      onChange(selected)
    }
  }, [selected, show])

  const onCancel = () => {
    onCancelCb()
  }

  const onSelect = () => {
    onConfirm(value)
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={show}
      onClose={() => onCancel()}
    >
      <CModalHeader>
        <CModalTitle>Calendar</CModalTitle>
      </CModalHeader>
      <CModalBody className="d-flex justify-content-center align-items-center">
        <Calendar onChange={onChange} value={value} />
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={() => onSelect()}>Select</CButton>
        <CButton color="secondary" variant='outline' onClick={() => onCancel()}>Cancel</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default CalendarModal
