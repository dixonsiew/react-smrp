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
const IdTypeListing = React.lazy(() => import('./id-type/listing/listing'))
const IdTypeCreate = React.lazy(() => import('./id-type/create/create'))
const MaritalStatusListing = React.lazy(() => import('./marital-status/listing/listing'))
const MaritalStatusCreate = React.lazy(() => import('./marital-status/create/create'))
const PersonCategoryCodeListing = React.lazy(() => import('./person-category-code/listing/listing'))
const PersonCategoryCodeCreate = React.lazy(() => import('./person-category-code/create/create'))
const ReferralListing = React.lazy(() => import('./referral/listing/listing'))
const ReferralCreate = React.lazy(() => import('./referral/create/create'))
const RelationshipListing = React.lazy(() => import('./relationship/listing/listing'))
const RelationshipCreate = React.lazy(() => import('./relationship/create/create'))
const ReligionListing = React.lazy(() => import('./religion/listing/listing'))
const ReligionCreate = React.lazy(() => import('./religion/create/create'))
const SpecialityListing = React.lazy(() => import('./speciality/listing/listing'))
const SpecialityCreate = React.lazy(() => import('./speciality/create/create'))
const StateListing = React.lazy(() => import('./state/listing/listing'))
const StateCreate = React.lazy(() => import('./state/create/create'))
const TitleListing = React.lazy(() => import('./title/listing/listing'))
const TitleCreate = React.lazy(() => import('./title/create/create'))
const UserListing = React.lazy(() => import('./user/listing/listing'))
const UserCreate = React.lazy(() => import('./user/create/create'))
const VisitTypeListing = React.lazy(() => import('./visit-type/listing/listing'))
const VisitTypeCreate = React.lazy(() => import('./visit-type/create/create'))
const AdmStatusListing = React.lazy(() => import('./adm-status/listing/listing'))
const AdmStatusCreate = React.lazy(() => import('./adm-status/create/create'))
const WardClassListing = React.lazy(() => import('./ward-class/listing/listing'))
const WardClassCreate = React.lazy(() => import('./ward-class/create/create'))

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
  },
  {
    path: '/main/setup/id-type/list',
    name: 'ID Type List',
    element: IdTypeListing
  },
  {
    path: '/main/setup/id-type/create',
    name: 'ID Type Create',
    element: IdTypeCreate
  },
  {
    path: '/main/setup/id-type/edit/:id',
    name: 'ID Type Edit',
    element: IdTypeCreate
  },
  {
    path: '/main/setup/marital-status/list',
    name: 'Marital Status List',
    element: MaritalStatusListing
  },
  {
    path: '/main/setup/marital-status/create',
    name: 'Marital Status Create',
    element: MaritalStatusCreate
  },
  {
    path: '/main/setup/marital-status/edit/:id',
    name: 'Marital Status Edit',
    element: MaritalStatusCreate
  },
  {
    path: '/main/setup/person-category-code/list',
    name: 'Person Category Code List',
    element: PersonCategoryCodeListing
  },
  {
    path: '/main/setup/person-category-code/create',
    name: 'Person Category Code Create',
    element: PersonCategoryCodeCreate
  },
  {
    path: '/main/setup/person-category-code/edit/:id',
    name: 'Person Category Code Edit',
    element: PersonCategoryCodeCreate
  },
  {
    path: '/main/setup/referral/list',
    name: 'Referral List',
    element: ReferralListing
  },
  {
    path: '/main/setup/referral/create',
    name: 'Referral Create',
    element: ReferralCreate
  },
  {
    path: '/main/setup/referral/edit/:id',
    name: 'Referral Edit',
    element: ReferralCreate
  },
  {
    path: '/main/setup/relationship/list',
    name: 'Relationship List',
    element: RelationshipListing
  },
  {
    path: '/main/setup/relationship/create',
    name: 'Relationship Create',
    element: RelationshipCreate
  },
  {
    path: '/main/setup/relationship/edit/:id',
    name: 'Relationship Edit',
    element: RelationshipCreate
  },
  {
    path: '/main/setup/religion/list',
    name: 'Religion List',
    element: ReligionListing
  },
  {
    path: '/main/setup/religion/create',
    name: 'Religion Create',
    element: ReligionCreate
  },
  {
    path: '/main/setup/religion/edit/:id',
    name: 'Religion Edit',
    element: ReligionCreate
  },
  {
    path: '/main/setup/speciality/list',
    name: 'Speciality List',
    element: SpecialityListing
  },
  {
    path: '/main/setup/speciality/create',
    name: 'Speciality Create',
    element: SpecialityCreate
  },
  {
    path: '/main/setup/speciality/edit/:id',
    name: 'Speciality Edit',
    element: SpecialityCreate
  },
  {
    path: '/main/setup/state/list',
    name: 'State List',
    element: StateListing
  },
  {
    path: '/main/setup/state/create',
    name: 'State Create',
    element: StateCreate
  },
  {
    path: '/main/setup/state/edit/:id',
    name: 'State Edit',
    element: StateCreate
  },
  {
    path: '/main/setup/title/list',
    name: 'Title List',
    element: TitleListing
  },
  {
    path: '/main/setup/title/create',
    name: 'Title Create',
    element: TitleCreate
  },
  {
    path: '/main/setup/title/edit/:id',
    name: 'Title Edit',
    element: TitleCreate
  },
  {
    path: '/main/setup/user/list',
    name: 'User List',
    element: UserListing
  },
  {
    path: '/main/setup/user/create',
    name: 'User Create',
    element: UserCreate
  },
  {
    path: '/main/setup/user/edit/:id',
    name: 'User Edit',
    element: UserCreate
  },
  {
    path: '/main/setup/visit-type/list',
    name: 'Visit Type List',
    element: VisitTypeListing
  },
  {
    path: '/main/setup/visit-type/create',
    name: 'Visit Type Create',
    element: VisitTypeCreate
  },
  {
    path: '/main/setup/visit-type/edit/:id',
    name: 'Visit Type Edit',
    element: VisitTypeCreate
  },
  {
    path: '/main/setup/adm-status/list',
    name: 'Adm Status List',
    element: AdmStatusListing
  },
  {
    path: '/main/setup/adm-status/create',
    name: 'Adm Status Create',
    element: AdmStatusCreate
  },
  {
    path: '/main/setup/adm-status/edit/:id',
    name: 'Adm Status Edit',
    element: AdmStatusCreate
  },
  {
    path: '/main/setup/ward-class/list',
    name: 'Ward Class List',
    element: WardClassListing
  },
  {
    path: '/main/setup/ward-class/create',
    name: 'Ward Class Create',
    element: WardClassCreate
  },
  {
    path: '/main/setup/ward-class/edit/:id',
    name: 'Ward Class Edit',
    element: WardClassCreate
  }
]
