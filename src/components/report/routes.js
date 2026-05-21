import React from 'react'

const MasterPD101Listing = React.lazy(() => import('./master-pd101/MasterPD101Listing'))
const MasterPD101Form = React.lazy(() => import('./master-pd101/MasterPD101Form'))

export const reportRoutes = [
  {
    path: '/main/report/master-pd101/list',
    name: 'Master PD101 List',
    element: MasterPD101Listing
  },
  {
    path: '/main/report/master-pd101/form/:id',
    name: 'Master PD101 Form',
    element: MasterPD101Form
  }
]
