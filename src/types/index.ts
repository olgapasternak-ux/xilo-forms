export type FormType = 'Intake Form' | 'Customer Form'
export type FormIcon = 'bundle' | 'home' | 'auto-home' | 'car' | 'business' | 'document'

export interface Form {
  id: string
  name: string
  icon: FormIcon
  type: FormType
  groups: string[]
  createdBy: string
  updatedAt: string
}

export type GroupTab =
  | 'All Form Groups'
  | 'Business Group 111'
  | 'Form Group Test1'
  | 'Business Group new2'
  | 'Testing'
  | 'Life Insurance Group'
  | 'Personal Lines test'
  | 'Master Group 111'
  | 'Personal Lines Group'

export type TypeFilter = 'all' | 'Customer Form' | 'Intake Form'
