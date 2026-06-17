export const LABEL_TYPES = {
  PECA: 'PECA',
  FIXADORES: 'FIXADORES',
  PRATELEIRA: 'PRATELEIRA',
  JAULA: 'JAULA',
} as const

export type LabelType = (typeof LABEL_TYPES)[keyof typeof LABEL_TYPES]

export interface LabelTypeInfo {
  value: LabelType
  label: string
  description: string
  icon: string
}

export const LABEL_TYPES_INFO: LabelTypeInfo[] = [
  {
    value: 'PECA',
    label: 'Peça',
    description: 'Componente para montagem',
    icon: 'Package',
  },
  {
    value: 'FIXADORES',
    label: 'Fixadores',
    description: 'Parafuso, ruela, porca',
    icon: 'Wrench',
  },
  {
    value: 'PRATELEIRA',
    label: 'Prateleira',
    description: 'Localizador de armazenagem',
    icon: 'LayoutGrid',
  },
  {
    value: 'JAULA',
    label: 'Jaula',
    description: 'Recipiente retornável',
    icon: 'Container',
  },
]

export interface LabelResponse {
  id: number
  name: string
  description?: string
  codeRef: string
  typeId: number
  typeName: string
  createdById?: number
  createdByName?: string
  qtdByBatch?: number
  imageId?: number
  imageUrl?: string
  localization?: string
  fields?: Record<string, string>
  sector?: string
  createdAt: string
  updatedAt: string
}

export interface CreateLabelRequest {
  name: string
  codeRef: string
  typeName: string
  description?: string
  sector?: string
  qtdByBatch?: number
  imageId?: number
  localization?: string
  fields?: Record<string, string>
}

export interface UpdateLabelRequest {
  name: string
  codeRef: string
  typeName: string
  description?: string
  sector?: string
  qtdByBatch?: number
  imageId?: number
  localization?: string
  fields?: Record<string, string>
}

export interface UploadResponse {
  id: number
  fileName: string
  fileType: string
  fileSize: number
  url: string
}
