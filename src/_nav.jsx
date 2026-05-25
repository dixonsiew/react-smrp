/**
 * Sidebar Navigation Configuration
 *
 * Defines the structure and content of the sidebar navigation menu.
 * Supports multiple navigation component types from CoreUI React:
 * - CNavItem: Single navigation link
 * - CNavGroup: Collapsible group of links
 * - CNavTitle: Section title/divider
 *
 * @module _nav
 */

import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

/**
 * Navigation menu structure array
 *
 * @type {Array<Object>}
 * @property {React.ComponentType} component - CoreUI nav component (CNavItem, CNavGroup, CNavTitle)
 * @property {string} name - Display text for the nav item
 * @property {string} [to] - Internal route path (for CNavItem with routing)
 * @property {string} [href] - External URL (for CNavItem with external links)
 * @property {React.ReactNode} [icon] - Icon element to display
 * @property {Object} [badge] - Optional badge configuration
 * @property {string} badge.color - Badge color (info, danger, success, etc.)
 * @property {string} badge.text - Badge text content
 * @property {Array<Object>} [items] - Child items for CNavGroup
 *
 * @example
 * // Simple navigation item
 * {
 *   component: CNavItem,
 *   name: 'Dashboard',
 *   to: '/dashboard',
 *   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
 * }
 *
 * @example
 * // Navigation group with children
 * {
 *   component: CNavGroup,
 *   name: 'Base',
 *   to: '/base',
 *   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
 *   items: [
 *     {
 *       component: CNavItem,
 *       name: 'Cards',
 *       to: '/base/cards',
 *     },
 *   ],
 * }
 *
 * @example
 * // Section title
 * {
 *   component: CNavTitle,
 *   name: 'Theme',
 * }
 */
const _nav = [
  {
    component: CNavGroup,
    name: 'Reports',
    to: '/main/report',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'PD101',
        to: '/main/report/master-pd101/list',
      },
      {
        component: CNavItem,
        name: 'RH101',
        to: '/main/report/master-rh101/list',
      },
      {
        component: CNavItem,
        name: 'PD301',
        to: '/main/report/master-pd301/list',
      },
      {
        component: CNavItem,
        name: 'RH301',
        to: '/main/report/master-rh301/list',
      },
      {
        component: CNavItem,
        name: 'PD102',
        to: '/main/report/master-pd102/list',
      },
      {
        component: CNavItem,
        name: 'PD105',
        to: '/main/report/master-pd105/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Setup',
    to: '/main/setup',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Birth Delivery Type',
        to: '/main/setup/delivery-type/list',
      },
      {
        component: CNavItem,
        name: 'City',
        to: '/main/setup/city/list',
      },
      {
        component: CNavItem,
        name: 'Country',
        to: '/main/setup/country/list',
      },
      {
        component: CNavItem,
        name: 'Diagnosis Item Type',
        to: '/main/setup/diag-item-type/list',
      },
      {
        component: CNavItem,
        name: 'Discharge Officer Type',
        to: '/main/setup/discharge-officer/list',
      },
      {
        component: CNavItem,
        name: 'Discharge Type',
        to: '/main/setup/discharge-type/list',
      },
      {
        component: CNavItem,
        name: 'Ethnic Group',
        to: '/main/setup/ethnic-group/list',
      },
      {
        component: CNavItem,
        name: 'Gender',
        to: '/main/setup/gender/list',
      },
      {
        component: CNavItem,
        name: 'ID Type',
        to: '/main/setup/id-type/list',
      },
      {
        component: CNavItem,
        name: 'Marital Status',
        to: '/main/setup/marital-status/list',
      },
      {
        component: CNavItem,
        name: 'Person Category Code',
        to: '/main/setup/person-category-code/list',
      },
      {
        component: CNavItem,
        name: 'Referral',
        to: '/main/setup/referral/list',
      },
      {
        component: CNavItem,
        name: 'Relationship',
        to: '/main/setup/relationship/list',
      },
      {
        component: CNavItem,
        name: 'Religion',
        to: '/main/setup/religion/list',
      },
      {
        component: CNavItem,
        name: 'Speciality',
        to: '/main/setup/speciality/list',
      },
      {
        component: CNavItem,
        name: 'State',
        to: '/main/setup/state/list',
      },
      {
        component: CNavItem,
        name: 'Title',
        to: '/main/setup/title/list',
      },
      {
        component: CNavItem,
        name: 'User',
        to: '/main/setup/user/list',
      },
      {
        component: CNavItem,
        name: 'Visit Type',
        to: '/main/setup/visit-type/list',
      },
      {
        component: CNavItem,
        name: 'Ward Admission Status',
        to: '/main/setup/adm-status/list',
      },
      {
        component: CNavItem,
        name: 'Ward Class',
        to: '/main/setup/ward-class/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Profile',
    to: '/main/profile',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Change Password',
        to: '/main/profile/change-password',
      },
    ],
  },
]

export default _nav
