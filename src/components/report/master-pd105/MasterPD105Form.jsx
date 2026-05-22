import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ReportService } from './api'
import { LookupService } from '../../../api/lookup'
import CalendarModal from '../../CalendarModal'
import LookupModal from '../../LookupModal'
import { AppLoading } from '../../AppLoading'
import { Helper } from '../../../utils/helper'

const schema = yup.object({
  ACCOUNT_NO: yup.string(),
  ADMISSION_DATE: yup.string(),
  ADMISSION_STATUS: yup.string(),
  ADMISSION_TIME: yup.string(),
  CHARGE_CATEGORY_CODE: yup.string(),

  CITYCODE: yup.string(),
  CLUSTERFACILITYRN: yup.string(),
  COUNTRY_OF_BIRTH: yup.string(),
  DOB: yup.string(),
  DOCUMENT_NUMBER: yup.string(),

  DOCUMENT_TYPE: yup.string(),
  ETHNIC_GROUP: yup.string(),
  GENDER: yup.string(),
  HEIGHT: yup.string(),
  HOME_ADDRESS: yup.string(),

  HOME_PHONE: yup.string(),
  ISPOLICECASE: yup.string(),
  MARITAL_STATUS: yup.string(),
  MOBILE_PHONE: yup.string(),
  NATIONALITY: yup.string(),

  NOK_HOME_ADDRESS: yup.string(),
  NOK_HOME_PHONE: yup.string(),
  NOK_ID: yup.string(),
  NOK_ID_TYPE: yup.string(),
  NOK_MOBILE_PHONE: yup.string(),

  NOK_TITLE: yup.string(),
  OCITY: yup.string(),
  PATIENT_NAME: yup.string(),
  PATIENT_NOK_NAME: yup.string(),

  PAYMENT_CLASS_CODE: yup.string(),
  POSTCODE: yup.string(),
  PRIMARY_SPECIALTY: yup.string(),
  PRN: yup.string(),
  REFERRAL: yup.string(),

  REFFOREIGNRCOUNTRYCODE: yup.string(),
  REFPERSONCATEGORYCODE: yup.string(),
  REGISTRATION_DATE: yup.string(),
  REGISTRATION_TIME: yup.string(),
  RELATION_DESCRIPTION: yup.string(),

  RELIGION: yup.string(),
  STREET1: yup.string(),
  STREET2: yup.string(),
  TITLE: yup.string(),
  VISIT_TYPE: yup.string(),

  WARD_NO: yup.string(),
  WEIGHT: yup.string(),

  DEATH_DATE: yup.string(),

  NOK_CITYCODE: yup.string(),
  NOK_NATIONALITY: yup.string(),
  NOK_OCITY: yup.string(),
  NOK_POSTCODE: yup.string(),
  NOK_STREET1: yup.string(),
  NOK_STREET2: yup.string()
}).required()

const MasterPD105Form = () => {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lookup, setLookup] = useState({
    title: '',
    show: false,
    field: '',
    items: [],
    selected: ''
  })
  const [calendar, setCalendar] = useState({
    show: false,
    field: '',
    selected: ''
  })
  const { id } = useParams()

  const [listData, setListData] = useState({
    ethnicgroup: [],
    personcategorycode: [],
    speciality: [],
    wardcls: [],
    referral: [],
    country: [],
    gender: [],
    religion: [],
    title: [],
    idtype: [],
    maritalstatus: [],
    relationship: [],
    city: [],
    state: [],
    admstatus: [],
    occupation: [],
    visittype: []
  })

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // validates on change, blur, and submit
  })

  const title = 'PD105'

  useEffect(() => {
    if (id) {
      load()
    }
  }, [id])

  const load = async () => {
    setLoading(true)
    const [
      ethnicgroup,
      personcategorycode,
      speciality,
      wardcls,
      referral,
      country,
      gender,
      religion,
      title,
      idtype,
      maritalstatus,
      relationship,
      city,
      state,
      admstatus,
      occupation,
      visittype
    ] = await Promise.all([
      LookupService.listEthnicGroup(),
      LookupService.listPersonCategoryCode(),
      LookupService.listSpeciality(),
      LookupService.listWardClass(),
      LookupService.listReferral(),
      LookupService.listCountry(),
      LookupService.listGender(),
      LookupService.listReligion(),
      LookupService.listTitle(),
      LookupService.listIDType(),
      LookupService.listMaritalStatus(),
      LookupService.listRelationship(),
      LookupService.listCity(),
      LookupService.listState(),
      LookupService.listAdmStatus(),
      LookupService.listOccupation(),
      LookupService.listVisitTypes()
    ])
    setListData(prev => ({
      ...prev,
      ethnicgroup,
      personcategorycode,
      speciality,
      wardcls,
      referral,
      country,
      gender,
      religion,
      title,
      idtype,
      maritalstatus,
      relationship,
      city,
      state,
      admstatus,
      occupation,
      visittype
    }))

    const response = await ReportService.edit(id)
    if (response) {
      setData(response)
      reset(response)
      setLoading(false)
    }
  }

  const onShowCalendar = (field) => {
    setCalendar(prev => ({
      ...prev,
      show: true,
      field,
      selected: getValues(field)
    }))
  }

  const onConfirmCalendar = (date) => {
    setCalendar(prev => ({
      ...prev,
      show: false
    }))
    const dt = Helper.getDateStr(date)
    setValue(calendar.field, dt)
  }

  const onShowLookup = (title, items, field) => {
    setLookup(prev => ({
      ...prev,
      title,
      show: true,
      field,
      items,
      selected: getValues(field)
    }))
  }

  const onConfirmLookup = (item) => {
    setLookup(prev => ({
      ...prev,
      show: false,
      selected: item.desc
    }))
    setValue(lookup.field, item.desc)
  }

  const formSubmit = async (data) => {
    const b = await ReportService.update(data._id, data)
    if (b) {
      toast.success('Data successfully updated')
    }
  }

  if (loading) {
    return <AppLoading />
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-12">
            <h3 className="m-0 text-dark">Edit {title}</h3>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <form className="form-horizontal needs-validation" noValidate onSubmit={handleSubmit(formSubmit)}>
          <div className="row mb-2">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-0">Visit</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">ACCOUNT NO</label>
                    <div className="col-sm-10">
                      <input type="text" placeholder="ACCOUNT NO" name="ACCOUNT_NO" readOnly={true}
                        className={`form-control ${errors.ACCOUNT_NO ? 'is-invalid' : ''}`}
                        {...register('ACCOUNT_NO')}
                      />
                      {errors.ACCOUNT_NO && <div className="invalid-feedback">{errors.ACCOUNT_NO.message}</div>}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">PRN</label>
                    <div className="col-sm-10">
                      <input type="text" placeholder="PRN" name="PRN" readOnly={true}
                        className={`form-control ${errors.PRN ? 'is-invalid' : ''}`}
                        {...register('PRN')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">REG DATE</label>
                    <div className="col-sm-4">
                      <input type="text" placeholder="REG DATE" name="REGISTRATION_DATE" readOnly={true}
                        className={`form-control ${errors.REGISTRATION_DATE ? 'is-invalid' : ''}`}
                        {...register('REGISTRATION_DATE')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">REG TIME</label>
                    <div className="col-sm-4">
                      <input type="text" placeholder="REG TIME" name="REGISTRATION_TIME" readOnly={true}
                        className={`form-control ${errors.REGISTRATION_TIME ? 'is-invalid' : ''}`}
                        {...register('REGISTRATION_TIME')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-0">Patient</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">TITLE</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="TITLE" {...register('TITLE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Title', listData.title, 'TITLE')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">NAME</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="NAME" name="PATIENT_NAME"
                        className={`form-control ${errors.PATIENT_NAME ? 'is-invalid' : ''}`}
                        {...register('PATIENT_NAME')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">GENDER</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="GENDER" {...register('GENDER')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Gender', listData.gender, 'GENDER')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">DOB</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="DOB" {...register('DOB')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowCalendar('DOB')}>
                          <i className="fa fa-calendar-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">MARITAL STATUS</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="MARITAL_STATUS" {...register('MARITAL_STATUS')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Marital Status', listData.maritalstatus, 'MARITAL_STATUS')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">RELIGION</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="RELIGION" {...register('RELIGION')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Religion', listData.religion, 'RELIGION')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">NATIONALITY</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="NATIONALITY" {...register('NATIONALITY')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Nationality', listData.country, 'NATIONALITY')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">ETHNIC GROUP</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="ETHNIC_GROUP" {...register('ETHNIC_GROUP')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Ethnic Group', listData.ethnicgroup, 'ETHNIC_GROUP')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">HEIGHT</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="HEIGHT" name="HEIGHT"
                        className={`form-control ${errors.HEIGHT ? 'is-invalid' : ''}`}
                        {...register('HEIGHT')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">WEIGHT</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="WEIGHT" name="WEIGHT"
                        className={`form-control ${errors.WEIGHT ? 'is-invalid' : ''}`}
                        {...register('WEIGHT')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">COUNTRY OF BIRTH</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="COUNTRY_OF_BIRTH" {...register('COUNTRY_OF_BIRTH')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Country of Birth', listData.country, 'COUNTRY_OF_BIRTH')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">PATIENT CATEGORY</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="REFPERSONCATEGORYCODE" {...register('REFPERSONCATEGORYCODE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Patient Category', listData.personcategorycode, 'REFPERSONCATEGORYCODE')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">DOC TYPE</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="DOCUMENT_TYPE" {...register('DOCUMENT_TYPE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Document Type', listData.idtype, 'DOCUMENT_TYPE')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">DOC NO</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="DOC NO" name="DOCUMENT_NUMBER"
                        className={`form-control ${errors.DOCUMENT_NUMBER ? 'is-invalid' : ''}`}
                        {...register('DOCUMENT_NUMBER')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">HOME PHONE</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="HOME PHONE" name="HOME_PHONE"
                        className={`form-control ${errors.HOME_PHONE ? 'is-invalid' : ''}`}
                        {...register('HOME_PHONE')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-0">Patient Address</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">STREET1</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="STREET1" name="STREET1"
                        className={`form-control ${errors.STREET1 ? 'is-invalid' : ''}`}
                        {...register('STREET1')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">STREET2</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="STREET2" name="STREET2"
                        className={`form-control ${errors.STREET2 ? 'is-invalid' : ''}`}
                        {...register('STREET2')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">STREET3</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="CITYCODE" {...register('CITYCODE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Street3', listData.city, 'CITYCODE')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">POSTCODE</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="POSTCODE" name="POSTCODE"
                        className={`form-control ${errors.POSTCODE ? 'is-invalid' : ''}`}
                        {...register('POSTCODE')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">STATE</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="OCITY" {...register('OCITY')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('State', listData.state, 'OCITY')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">COUNTRY</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="NATIONALITY" {...register('NATIONALITY')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Country', listData.country, 'NATIONALITY')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-0">Next of Kin</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">RELATIONSHIP</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="RELATION_DESCRIPTION" {...register('RELATION_DESCRIPTION')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Relationship', listData.relationship, 'RELATION_DESCRIPTION')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">NOK TITLE</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="NOK TITLE" name="NOK_TITLE"
                        className={`form-control ${errors.NOK_TITLE ? 'is-invalid' : ''}`}
                        {...register('NOK_TITLE')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">NOK NAME</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="NOK NAME" name="PATIENT_NOK_NAME"
                        className={`form-control ${errors.PATIENT_NOK_NAME ? 'is-invalid' : ''}`}
                        {...register('PATIENT_NOK_NAME')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">NOK DOC TYPE</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="NOK_ID_TYPE" {...register('NOK_ID_TYPE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('NOK Doc Type', listData.idtype, 'NOK_ID_TYPE')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">NOK DOC NO</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="NOK DOC NO" name="NOK_ID"
                        className={`form-control ${errors.NOK_ID ? 'is-invalid' : ''}`}
                        {...register('NOK_ID')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">NOK MOBILE NO</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="NOK MOBILE NO" name="NOK_MOBILE_PHONE"
                        className={`form-control ${errors.NOK_MOBILE_PHONE ? 'is-invalid' : ''}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-0">Next of Kin Address</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">STREET1</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="STREET1" name="NOK_STREET1"
                        className={`form-control ${errors.NOK_STREET1 ? 'is-invalid' : ''}`}
                        {...register('NOK_STREET1')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">STREET2</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="STREET2" name="NOK_STREET2"
                        className={`form-control ${errors.NOK_STREET2 ? 'is-invalid' : ''}`}
                        {...register('NOK_STREET2')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">STREET3</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="NOK_CITYCODE" {...register('NOK_CITYCODE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Street3', listData.city, 'NOK_CITYCODE')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">POSTCODE</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="POSTCODE" name="NOK_POSTCODE"
                        className={`form-control ${errors.NOK_POSTCODE ? 'is-invalid' : ''}`}
                        {...register('NOK_POSTCODE')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">STATE</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="NOK_OCITY" {...register('NOK_OCITY')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('State', listData.state, 'NOK_OCITY')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">COUNTRY</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="NOK_NATIONALITY" {...register('NOK_NATIONALITY')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Country', listData.country, 'NOK_NATIONALITY')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-0">Admission</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">ADMISSION DATE</label>
                    <div className="col-sm-4">
                      <div className="input-group">
                        <input type="text" className="form-control" name="ADMISSION_DATE" {...register('ADMISSION_DATE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowCalendar('ADMISSION_DATE')}>
                          <i className="fa fa-calendar-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">ADMISSION TIME</label>
                    <div className="col-sm-4">
                      <input type="text" placeholder="ADMISSION TIME" name="ADMISSION_TIME"
                        className={`form-control ${errors.ADMISSION_TIME ? 'is-invalid' : ''}`}
                        {...register('ADMISSION_TIME')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">WARD NO</label>
                    <div className="col-sm-10">
                      <input type="text" placeholder="WARD NO" name="WARD_NO"
                        className={`form-control ${errors.WARD_NO ? 'is-invalid' : ''}`}
                        {...register('WARD_NO')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">PRIMARY SPECIALITY</label>
                    <div className="col-sm-10">
                      <div className="input-group">
                        <input type="text" className="form-control" name="PRIMARY_SPECIALTY" {...register('PRIMARY_SPECIALTY')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Primary Speciality', listData.speciality, 'PRIMARY_SPECIALTY')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">PAYMENT CLASS</label>
                    <div className="col-sm-10">
                      <div className="input-group">
                        <input type="text" className="form-control" name="PAYMENT_CLASS_CODE" {...register('PAYMENT_CLASS_CODE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Payment Class', listData.wardcls, 'PAYMENT_CLASS_CODE')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-0">Death</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">DEATH DATE</label>
                    <div className="col-sm-4">
                      <div className="input-group">
                        <input type="text" className="form-control" name="DEATH_DATE" {...register('DEATH_DATE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowCalendar('DEATH_DATE')}>
                          <i className="fa fa-calendar-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}><i className="fas fa-chevron-circle-left"></i> Back</button>
                  <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Save</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <CalendarModal
        onCancelCb={() => setCalendar(prev => ({ ...prev, show: false }))}
        onConfirm={(date) => {
          onConfirmCalendar(date)
        }}
        selected={calendar.selected}
        show={calendar.show}
      />
      <LookupModal
        onCancelCb={() => setLookup(prev => ({ ...prev, show: false }))}
        onConfirm={(item) => {
          onConfirmLookup(item)
        }}
        title={`Select ${lookup.title}`}
        items={lookup.items}
        selected={lookup.selected}
        show={lookup.show}
      />
    </>
  )
}

export default MasterPD105Form
