import React, { useState } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CListGroup,
  CListGroupItem
} from '@coreui/react'

const LookupModal = ({ onCancelCb, onConfirm, title, items, selected, show }) => {
  const [selectedItem, setSelectedItem] = useState(null)

  const onCancel = () => {
    onCancelCb()
  }

  const onSelectDbl = (item) => {
    onSelectItem(item)
    onSelect()
  }

  const onSelect = () => {
    onConfirm(selectedItem)
  }

  const onSelectItem = (item) => {
    setSelectedItem(item)
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={show}
      onClose={() => onCancel()}
    >
      <CModalHeader>
        <CModalTitle id="StaticBackdropExampleLabel">{title}</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <CListGroup>
          {
            items.map((item, index) => (
              <CListGroupItem
                key={index}
                active={item.desc === selectedItem?.desc || item.desc === selected}
                onClick={() => onSelectItem(item)}
                onDoubleClick={() => onSelectDbl(item)}
                className="cursor-pointer"
              >
                {item.desc}
              </CListGroupItem>
            ))
          }
        </CListGroup>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={() => onSelect()}>Select</CButton>
        <CButton color="secondary" variant='outline' onClick={() => onCancel()}>Cancel</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default LookupModal
