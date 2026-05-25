import React from 'react'

const DeliveryTypeListing = React.lazy(() => import('./delivery-type/listing/listing'))
const DeliveryTypeCreate = React.lazy(() => import('./delivery-type/create/create'))
const CityListing = React.lazy(() => import('./city/listing/listing'))
const CityCreate = React.lazy(() => import('./city/create/create'))
const CountryListing = React.lazy(() => import('./country/listing/listing'))
const CountryCreate = React.lazy(() => import('./country/create/create'))
const DiagItemTypeListing = React.lazy(() => import('./diag-item-type/listing/listing'))
const DiagItemTypeCreate = React.lazy(() => import('./diag-item-type/create/create'))
const DischargeOfficerListing = React.lazy(() => import('./discharge-officer/listing/listing'))
const DischargeOfficerCreate = React.lazy(() => import('./discharge-officer/create/create'))
const DischargeTypeListing = React.lazy(() => import('./discharge-type/listing/listing'))
const DischargeTypeCreate = React.lazy(() => import('./discharge-type/create/create'))
const EthnicGroupListing = React.lazy(() => import('./ethnic-group/listing/listing'))
const EthnicGroupCreate = React.lazy(() => import('./ethnic-group/create/create'))
const GenderListing = React.lazy(() => import('./gender/listing/listing'))
const GenderCreate = React.lazy(() => import('./gender/create/create'))

export const setupRoutes = [
  {
    path: '/main/setup/delivery-type/list',
    name: 'City List',
    element: DeliveryTypeListing
  },
  {
    path: '/main/setup/delivery-type/create',
    name: 'City Create',
    element: DeliveryTypeCreate
  },
  {
    path: '/main/setup/delivery-type/edit/:id',
    name: 'City Edit',
    element: DeliveryTypeCreate
  },
  {
    path: '/main/setup/city/list',
    name: 'City List',
    element: CityListing
  },
  {
    path: '/main/setup/city/create',
    name: 'City Create',
    element: CityCreate
  },
  {
    path: '/main/setup/city/edit/:id',
    name: 'City Edit',
    element: CityCreate
  },
  {
    path: '/main/setup/country/list',
    name: 'Country List',
    element: CountryListing
  },
  {
    path: '/main/setup/country/create',
    name: 'Country Create',
    element: CountryCreate
  },
  {
    path: '/main/setup/country/edit/:id',
    name: 'Country Edit',
    element: CountryCreate
  },
  {
    path: '/main/setup/diag-item-type/list',
    name: 'Diagnosis Item Type List',
    element: DiagItemTypeListing
  },
  {
    path: '/main/setup/diag-item-type/create',
    name: 'Diagnosis Item Type Create',
    element: DiagItemTypeCreate
  },
  {
    path: '/main/setup/diag-item-type/edit/:id',
    name: 'Diagnosis Item Type Edit',
    element: DiagItemTypeCreate
  },
  {
    path: '/main/setup/discharge-officer/list',
    name: 'Discharge Officer Type List',
    element: DischargeOfficerListing
  },
  {
    path: '/main/setup/discharge-officer/create',
    name: 'Discharge Officer Type Create',
    element: DischargeOfficerCreate
  },
  {
    path: '/main/setup/discharge-officer/edit/:id',
    name: 'Discharge Officer Type Edit',
    element: DischargeOfficerCreate
  },
  {
    path: '/main/setup/discharge-type/list',
    name: 'Discharge Type List',
    element: DischargeTypeListing
  },
  {
    path: '/main/setup/discharge-type/create',
    name: 'Discharge Type Create',
    element: DischargeTypeCreate
  },
  {
    path: '/main/setup/discharge-type/edit/:id',
    name: 'Discharge Type Edit',
    element: DischargeTypeCreate
  },
  {
    path: '/main/setup/ethnic-group/list',
    name: 'Ethnic Group List',
    element: EthnicGroupListing
  },
  {
    path: '/main/setup/ethnic-group/create',
    name: 'Ethnic Group Create',
    element: EthnicGroupCreate
  },
  {
    path: '/main/setup/ethnic-group/edit/:id',
    name: 'Ethnic Group Edit',
    element: EthnicGroupCreate
  },
  {
    path: '/main/setup/gender/list',
    name: 'Gender List',
    element: GenderListing
  },
  {
    path: '/main/setup/gender/create',
    name: 'Gender Create',
    element: GenderCreate
  },
  {
    path: '/main/setup/gender/edit/:id',
    name: 'Gender Edit',
    element: GenderCreate
  }
]
