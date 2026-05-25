import React, { useState } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from '@coreui/react'

export const ConfirmModal = ({ onCancel, onConfirm, title, message, show }) => {
  const onNo = () => {
    onCancel()
  }

  const onYes = () => {
    onConfirm()
  }

  return (
    <CModal
      backdrop="static"
      visible={show}
      onClose={() => onNo()}
      aria-labelledby="StaticBackdropExampleLabel"
    >
      <CModalHeader>
        <CModalTitle id="StaticBackdropExampleLabel">{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {message}
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={() => onYes()}>Yes</CButton>
        <CButton color="secondary" variant='outline' onClick={() => onNo()}>No</CButton>
      </CModalFooter>
    </CModal>
  )
}
