import { Download, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Download as DownloadType } from '@/payload-types'

const getFileExtension = (mimeType: string | null | undefined): string => {
  const mimeMap: Record<string, string> = {
    'application/pdf': 'PDF',
    'application/msword': 'DOC',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
    'application/vnd.ms-excel': 'XLS',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
    'application/vnd.ms-powerpoint': 'PPT',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
    'image/jpeg': 'JPG',
    'image/png': 'PNG',
    'image/gif': 'GIF',
    'image/webp': 'WEBP',
    'text/plain': 'TXT',
    'application/zip': 'ZIP',
  }
  return mimeMap[mimeType ?? ''] ?? mimeType?.split('/').pop()?.toUpperCase() ?? 'FILE'
}

const formatFileSize = (bytes: number | null | undefined): string => {
  if (!bytes) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

type Props = DownloadType

export const DownloadCard = ({ title, description, mimeType, filesize, url, filename }: Props) => {
  return (
    <Card className="border-primary/30 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0" aria-hidden="true">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg mb-1 text-foreground">{title}</h3>
            <p className="text-sm text-foreground/70 mb-3">{description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-foreground/60">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded font-medium">
                  {getFileExtension(mimeType)}
                </span>
                <span>{formatFileSize(filesize)}</span>
              </div>
              <Button size="sm" asChild className="bg-primary hover:bg-secondary text-foreground">
                <a 
                  href={url ?? '#'} 
                  download={filename}
                  aria-label={`Stáhnout soubor ${title}`}
                >
                  <Download className="w-4 h-4 mr-1.5" aria-hidden="true" />
                  Stáhnout
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
