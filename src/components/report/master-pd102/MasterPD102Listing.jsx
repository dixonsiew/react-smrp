import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ResponsivePagination from 'react-responsive-pagination'
import {
  CSpinner,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { AppLoading } from '../../AppLoading'
import { ReportService } from './api'
import CalendarModal from '../../CalendarModal'
import { AppConstant } from '../../../constants'
import { Helper } from '../../../utils/helper'
import download from 'downloadjs'

const MasterPD102Listing = () => {
  const uiState = 'report.master-pd102.master-pd102-listing'
  const title = 'PD102'
  const placeholderdateFrom = 'Birth Delivery From Date'
  const placeholderdateTo = 'Birth Delivery To Date'
  const pageSize = AppConstant.PAGE_SIZE

  const navigate = useNavigate()
  const [refresh, setRefresh] = useState(false)
  const [uiData, setUiData] = useState(() => {
    const o = {
      loading: false,
      downloading1: false,
      downloading2: false,
      list: [],
      columnmaps: [],
      totalCount: 0,
      totalPage: 0,
      page: 1,
      dateFrom: null,
      dateTo: null,
      idateFrom: '',
      idateTo: '',
      sx: 0,
      sy: 0
    }
    const item = localStorage.getItem(uiState)
    if (item) {
      const parsed = JSON.parse(item)
      o.page = parsed.page
      o.sx = parsed.sx
      o.sy = parsed.sy
    }
    return o
  })
  const [calendar, setCalendar] = useState({
    show: false,
    field: '',
    selected: ''
  })

  useEffect(() => {
    load()
  }, [refresh])

  const load = () => {
    loadPrevious()
    setTimeout(() => {
      window.scrollTo(uiData.sx, uiData.sy)
    }, 200)
    localStorage.removeItem(uiState)
  }

  const loadPrevious = async () => {
    setUiData(prev => ({ ...prev, loading: true }))
    try {
      const response = await ReportService.listPrevious(uiData.page, pageSize, '', '', uiData.idateFrom, uiData.idateTo)
      setUiData(prev => ({
        ...prev,
        loading: false,
        list: response.data,
        columnmaps: response.columnmaps,
        totalCount: response.total_count,
        totalPage: response.total_page,
        dateFrom: response.datefrom === 'null' ? new Date() : response.datefrom,
        dateTo: response.dateto === 'null' ? new Date() : response.dateto,
        idateFrom: response.datefrom === 'null' ? '' : response.datefrom,
        idateTo: response.dateto === 'null' ? '' : response.dateto
      }))
      return
    } catch (error) {

    } finally {
      setUiData(prev => ({ ...prev, loading: false }))
    }
  }

  const onExportXlsx = async () => {
    try {
      setUiData(prev => ({ ...prev, downloading2: true }))
      const response = await ReportService.exportXlsx(uiData.idateFrom, uiData.idateTo)
      if (!response) {
        setUiData(prev => ({ ...prev, downloading2: false }))
        return
      }

      const filename = response.headers['filename']
      const data = response.data;
      download(data, filename)
    } catch (error) {

    } finally {
      setUiData(prev => ({ ...prev, downloading2: false }))
    }
  }

  const onExport = async () => {
    try {
      setUiData(prev => ({ ...prev, downloading1: true }))
      const response = await ReportService.exportJSON(uiData.idateFrom, uiData.idateTo)
      if (!response) {
        setUiData(prev => ({ ...prev, downloading1: false }))
        return
      }

      const filename = response.headers['filename']
      const data = response.data;
      download(data, filename)
    } catch (error) {

    } finally {
      setUiData(prev => ({ ...prev, downloading1: false }))
    }
  }

  const onApplyFilter = () => {

  }

  const onClearFilter = () => {
    setUiData(prev => ({ ...prev, dateFrom: null, dateTo: null, idateFrom: '', idateTo: '' }))
  }

  const onToday = () => {
    const date = new Date()
    setUiData(prev => ({ ...prev, dateFrom: date, dateTo: date, idateFrom: Helper.getDateStr(date), idateTo: Helper.getDateStr(date) }))
    return false
  }

  const onYesterday = () => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    setUiData(prev => ({ ...prev, dateFrom: date, dateTo: date, idateFrom: Helper.getDateStr(date), idateTo: Helper.getDateStr(date) }))
    return false
  }

  const saveUIState = () => {
    const uiStateData = {
      page: uiData.page,
      sx: window.scrollX,
      sy: window.scrollY,
    }
    localStorage.setItem(uiState, JSON.stringify(uiStateData))
  }

  const goto = (path) => {
    saveUIState()
    navigate(`/main/report/master-pd102/${path}`, { replace: false })
  }

  const onEdit = (item) => {
    const s = `form/${item._id}`
    goto(s)
  }

  const onPageChange = (page) => {
    setUiData(prev => ({ ...prev, page, sx: window.scrollX, sy: window.scrollY }))
    setRefresh(prev => !prev)
  }

  const onShowCalendar = (field) => {
    setCalendar(prev => ({
      ...prev,
      show: true,
      field,
      selected: field === 'from' ? uiData.idateFrom : uiData.idateTo
    }))
  }

  const onConfirmCalendar = (date) => {
    setCalendar(prev => ({
      ...prev,
      show: false
    }))
    const dt = Helper.getDateStr(date)
    if (calendar.field === 'from') {
      setUiData(prev => ({ ...prev, idateFrom: dt }))
    } else {
      setUiData(prev => ({ ...prev, idateTo: dt }))
    }
  }

  if (uiData.loading) {
    return <AppLoading />
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-12">
            <h3 className="m-0 text-dark">{title} Listing</h3>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-sm-3 col-12 p-1">
                <div className="input-group date">
                  <input type="text" className="form-control" placeholder={placeholderdateFrom} name="dateFrom"
                    value={uiData.idateFrom}
                    onChange={(e) => setUiData(prev => ({ ...prev, idateFrom: e.target.value }))}
                  />
                  <button type="button" className="btn btn-outline-primary" onClick={() => onShowCalendar('from')}>
                    <i className="fas fa-calendar-alt"></i>
                  </button>
                </div>
              </div>
              <div className="col-sm-3 col-12 p-1">
                <div className="input-group date">
                  <input type="text" className="form-control" placeholder={placeholderdateTo} name="dateTo"
                    value={uiData.idateTo}
                    onChange={(e) => setUiData(prev => ({ ...prev, idateTo: e.target.value }))}
                  />
                  <button type="button" className="btn btn-outline-primary" onClick={() => onShowCalendar('to')}>
                    <i className="fas fa-calendar-alt"></i>
                  </button>
                </div>
              </div>
              <div className="col-sm-1 col-12 p-1">
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-outline-primary" onClick={onClearFilter}>Clear</button>
                  <CDropdown variant="btn-group">
                    <CDropdownToggle color="primary"></CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem href="#" onClick={() => onToday()}>Today</CDropdownItem>
                      <CDropdownItem href="#" onClick={() => onYesterday()}>Yesterday</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </div>
              </div>
              <div className="col-sm-5 col-12 p-1 text-end">
                <button type="button" className="btn btn-primary me-2" onClick={onApplyFilter} disabled={uiData.dateFrom == null || uiData.dateTo == null}>Apply</button>
                {uiData.downloading1 && (
                <button type="button" className="btn btn-primary me-2" disabled>
                  <CSpinner as="span" className="me-2" size="sm" aria-hidden="true" />
                  <span role="status">Downloading...</span>
                </button>
                )}
                <button type="button" className="btn btn-primary me-2" onClick={onExport}
                  hidden={uiData.downloading1}
                  disabled={uiData.list == null || uiData.list.length === 0 || uiData.downloading1}>JSON File</button>
                {uiData.downloading2 && (
                <button type="button" className="btn btn-primary" disabled>
                  <CSpinner as="span" className="me-2" size="sm" aria-hidden="true" />
                  <span role="status">Downloading...</span>
                </button>
                )}
                <button type="button" className="btn btn-primary" onClick={onExportXlsx}
                  hidden={uiData.downloading2}
                  disabled={uiData.list == null || uiData.list.length === 0 || uiData.downloading2}>Xlsx File</button>
              </div>
            </div>
          </div>
          <div className="card-body">
            {uiData.list && uiData.list.length === 0 && !uiData.loading && (
            <div className="text-center">
              <h4>No records found</h4>
            </div>
            )}
            {uiData.list && uiData.list.length > 0 && !uiData.loading && (
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-sm">
                <thead>
                  <tr>
                    <th></th>
                    {uiData.columnmaps.map((c, index) => (
                    <th key={index} className="text-nowrap">{c.text}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {uiData.list.map((item, index) => (
                  <tr key={index}>
                    <td className="text-nowrap">
                      <button type="button" className="btn btn-sm btn-primary" onClick={() => onEdit(item)}><i className="fas fa-pencil-alt"></i></button>
                    </td>
                    {uiData.columnmaps.map((c, index) => (
                    <td key={index} className="text-nowrap">
                      {item[c.field]}
                    </td>
                    ))}
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
          </div>
          {uiData.totalCount > 0 && (
          <div className={`card-footer ${uiData.loading ? 'd-none' : ''}`}>
            <div className="float-start pg-label">
              Page {uiData.page} / {uiData.totalPage} of {uiData.totalCount} record(s)
            </div>
            <div className="float-end">
              <ResponsivePagination
                total={uiData.totalPage}
                current={uiData.page}
                onPageChange={page => onPageChange(page)}
              />
            </div>
          </div>
          )}
        </div>
      </div>
      <CalendarModal
        onCancelCb={() => setCalendar(prev => ({ ...prev, show: false }))}
        onConfirm={(date) => {
          onConfirmCalendar(date)
        }}
        selected={calendar.selected}
        show={calendar.show}
      />
    </>
  )
}

export default MasterPD102Listing
