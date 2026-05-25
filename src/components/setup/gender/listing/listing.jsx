import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ResponsivePagination from 'react-responsive-pagination'
import { toast } from 'react-toastify'
import { AppLoading } from '../../../AppLoading'
import { SearchInput } from '../../../SearchInput'
import { SortColumn } from '../../../SortColumn'
import { ConfirmModal } from '../../../ConfirmModal'
import { GenderService } from '../api'
import { AppConstant } from '../../../../constants'

const GenderListing = () => {
  const uiState = 'setup.gender.gender-listing'
  const title = 'Gender'
  const pageSize = AppConstant.PAGE_SIZE

  const navigate = useNavigate()
  const [refresh, setRefresh] = useState(false)
  const [uiData, setUiData] = useState(() => {
    const o = {
      loading: false,
      list: [],
      totalCount: 0,
      totalPage: 0,
      page: 1,
      search: '',
      sort: 'code',
      sortDir: 'asc',
      sx: 0,
      sy: 0
    }
    const item = localStorage.getItem(uiState)
    if (item) {
      const parsed = JSON.parse(item)
      o.page = parsed.page
      o.search = parsed.search
      o.sort = parsed.sort
      o.sortDir = parsed.sortDir
      o.sx = parsed.sx
      o.sy = parsed.sy
    }
    return o
  })
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    message: '',
    id: null
  })

  useEffect(() => {
    if (uiData.search !== '') {
      onSearch(uiData.search)
    } else {
      load()
    }

    setTimeout(() => {
      window.scrollTo(uiData.sx, uiData.sy)
    }, 200)
    localStorage.removeItem(uiState)
  }, [refresh])

  const load = async () => {
    setUiData(prev => ({ ...prev, loading: true }))
    try {
      const response = await GenderService.list(uiData.page, pageSize, uiData.sort, uiData.sortDir)
      setUiData(prev => ({
        ...prev,
        loading: false,
        list: response.data,
        totalCount: Number(response.headers[AppConstant.HTTP_HEADER.X_TOTAL_COUNT]),
        totalPage: Number(response.headers[AppConstant.HTTP_HEADER.X_TOTAL_PAGE])
      }))
      return
    } catch (error) {

    } finally {
      setUiData(prev => ({ ...prev, loading: false }))
    }
  }

  const onSearch = async (e) => {
    setUiData(prev => ({ ...prev, search: e, page: 1, loading: true }))
    try {
      const response = await GenderService.search(uiData.page, pageSize, uiData.sort, uiData.sortDir, e)
      setUiData(prev => ({
        ...prev,
        loading: false,
        list: response.data,
        totalCount: Number(response.headers[AppConstant.HTTP_HEADER.X_TOTAL_COUNT]),
        totalPage: Number(response.headers[AppConstant.HTTP_HEADER.X_TOTAL_PAGE]),
        sx: 0,
        sy: 0
      }))
      setRefresh(prev => !prev)
      return
      // setTimeout(() => {
      //   window.scrollTo(uiData.sx, uiData.sy)
      //   localStorage.removeItem(uiState)
      // }, 200)
    } catch (error) {

    } finally {
      setUiData(prev => ({ ...prev, loading: false }))
      setRefresh(prev => !prev)
    }
  }

  const onSortBy = (e) => {
    if (e.sort === '' && e.dir === 'asc') {
      setUiData(prev => ({ ...prev, sort: 'code', sortDir: 'asc' }))
    } else {
      setUiData(prev => ({ ...prev, sort: e.sort, sortDir: e.dir }))
    }

    setRefresh(prev => !prev)
  }

  const saveUIState = () => {
    const uiStateData = {
      page: uiData.page,
      search: uiData.search,
      sort: uiData.sort,
      sortDir: uiData.sortDir,
      sx: window.scrollX,
      sy: window.scrollY,
    }
    localStorage.setItem(uiState, JSON.stringify(uiStateData))
  }

  const goto = (path) => {
    saveUIState()
    navigate(`/main/setup/gender/${path}`, { replace: false })
  }

  const onEdit = (item) => {
    const s = `edit/${item.id}`
    goto(s)
  }

  const onDelete = (item) => {
    setDeleteModal(prev => ({ ...prev, show: true, id: item.id, message: `Are you sure to delete this ${title} ${item.code} ?` }))
  }

  const onCancelDelete = () => {
    setDeleteModal(prev => ({ ...prev, show: false }))
  }

  const onConfirmDelete = async () => {
    const b = await GenderService.remove(deleteModal.id)
    if (b) {
      toast.success(`${title} successfully deleted`)
      setDeleteModal(prev => ({ ...prev, show: false }))
      setRefresh(prev => !prev)
    }
  }

  const onPageChange = (page) => {
    setUiData(prev => ({ ...prev, page, sx: window.scrollX, sy: window.scrollY }))
    setRefresh(prev => !prev)
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
        <div className="card mb-2">
          <div className="card-header">
            <div className="row">
              <div className="col-sm-6 col-12 p-1">
                <SearchInput msearch={uiData.search} onSearch={onSearch} />
              </div>
              <div className="col-sm-6 col-12 p-1 text-end">
                <button type="button" className="btn btn-primary" onClick={() => goto('create')}>
                  <i className="fas fa-plus"></i> Add New
                </button>
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
                      <th>
                        <SortColumn name={'VESALIUS Description'} sort={'desc'} dir={uiData.sortDir} current={uiData.sort} onSortBy={onSortBy} />
                      </th>
                      <th>
                        <SortColumn name={'SMRP Code'} sort={'code'} dir={uiData.sortDir} current={uiData.sort} onSortBy={onSortBy} />
                      </th>
                      <th>
                        <SortColumn name={'Reference'} sort={'ref'} dir={uiData.sortDir} current={uiData.sort} onSortBy={onSortBy} />
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {uiData.list.map((item, index) => (
                      <tr key={index}>
                        <td>{item.desc}</td>
                        <td>{item.code}</td>
                        <td>{item.ref}</td>
                        <td>
                          <button type="button" className="btn btn-sm btn-primary me-2" onClick={() => onEdit(item)}>
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete(item)}>
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
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
      <ConfirmModal
        show={deleteModal.show}
        title={`Delete ${title}`}
        message={deleteModal.message}
        onCancel={() => onCancelDelete()}
        onConfirm={() => onConfirmDelete()}
      />
    </>
  )
}

export default GenderListing
