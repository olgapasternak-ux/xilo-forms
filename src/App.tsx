import { PageLayout } from './components/layout/PageLayout'
import { FormsPage } from './components/forms/FormsPage'

export default function App() {
  return (
    <PageLayout
      title="Forms"
      userName="Olha Pasternak"
      orgName="XILO 666812"
    >
      <FormsPage />
    </PageLayout>
  )
}
