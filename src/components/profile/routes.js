import React from 'react'

export const profileRoutes = [
  {
    path: '/main/profile/change-password',
    name: 'Change Password',
    element: React.lazy(() => import('./ChangePw')),
  },
]
