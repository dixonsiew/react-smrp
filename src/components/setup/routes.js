import React from 'react'

const CityListing = React.lazy(() => import('./city/listing/CityListing'))
const CityCreate = React.lazy(() => import('./city/create/CityCreate'))

export const setupRoutes = [
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
  }
]
