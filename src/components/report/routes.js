import React from 'react'

const MasterPD101Listing = React.lazy(() => import('./master-pd101/MasterPD101Listing'))
const MasterPD101Form = React.lazy(() => import('./master-pd101/MasterPD101Form'))
const MasterPD102Listing = React.lazy(() => import('./master-pd102/MasterPD102Listing'))
const MasterPD102Form = React.lazy(() => import('./master-pd102/MasterPD102Form'))
const MasterPD105Listing = React.lazy(() => import('./master-pd105/MasterPD105Listing'))
const MasterPD105Form = React.lazy(() => import('./master-pd105/MasterPD105Form'))
const MasterPD301Listing = React.lazy(() => import('./master-pd301/MasterPD301Listing'))
const MasterPD301Form = React.lazy(() => import('./master-pd301/MasterPD301Form'))
const MasterRH101Listing = React.lazy(() => import('./master-rh101/MasterRH101Listing'))
const MasterRH101Form = React.lazy(() => import('./master-rh101/MasterRH101Form'))
const MasterRH301Listing = React.lazy(() => import('./master-rh301/MasterRH301Listing'))
const MasterRH301Form = React.lazy(() => import('./master-rh301/MasterRH301Form'))

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
  },
  {
    path: '/main/report/master-pd102/list',
    name: 'Master PD102 List',
    element: MasterPD102Listing
  },
  {
    path: '/main/report/master-pd102/form/:id',
    name: 'Master PD102 Form',
    element: MasterPD102Form
  },
  {
    path: '/main/report/master-pd105/list',
    name: 'Master PD105 List',
    element: MasterPD105Listing
  },
  {
    path: '/main/report/master-pd105/form/:id',
    name: 'Master PD105 Form',
    element: MasterPD105Form
  },
  {
    path: '/main/report/master-pd301/list',
    name: 'Master PD301 List',
    element: MasterPD301Listing
  },
  {
    path: '/main/report/master-pd301/form/:id',
    name: 'Master PD301 Form',
    element: MasterPD301Form
  },
  {
    path: '/main/report/master-rh101/list',
    name: 'Master RH101 List',
    element: MasterRH101Listing
  },
  {
    path: '/main/report/master-rh101/form/:id',
    name: 'Master RH101 Form',
    element: MasterRH101Form
  },
  {
    path: '/main/report/master-rh301/list',
    name: 'Master RH301 List',
    element: MasterRH301Listing
  },
  {
    path: '/main/report/master-rh301/form/:id',
    name: 'Master RH301 Form',
    element: MasterRH301Form
  }
]
