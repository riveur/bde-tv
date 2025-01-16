import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SlideUploader } from './slide_uploader'

export function SlidesForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une slide</CardTitle>
      </CardHeader>
      <CardContent>
        <SlideUploader />
      </CardContent>
    </Card>
  )
}
