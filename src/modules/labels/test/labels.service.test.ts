import { http } from '@/shared/api/http'
import { LabelsService } from '../services/labels.service'

vi.mock('@/shared/api/http')

const service = new LabelsService()

const mockLabel = {
  id: 1,
  name: 'Suporte metálico 150mm',
  codeRef: 'PEC-001',
  typeId: 1,
  typeName: 'Peça',
  sector: 'PRODUCAO',
  qtdByBatch: 50,
  localization: 'C-01 / P-05',
  fields: {
    assemblyLine: 'Linha A',
    aisle: 'C-01',
    shelf: 'P-05',
    revision: 'Rev. 01',
  },
  createdAt: '2026-06-08T10:00:00',
  updatedAt: '2026-06-08T10:00:00',
}

const mockPaginatedResponse = {
  data: {
    content: [mockLabel],
    totalPages: 1,
    totalElements: 1,
    number: 0,
    size: 20,
    empty: false,
  },
}

describe('LabelsService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls GET /labels with page and size params', async () => {
    vi.mocked(http.get).mockResolvedValue(mockPaginatedResponse)

    const result = await service.list(0, 20)

    expect(http.get).toHaveBeenCalledWith('/labels', {
      params: { page: 0, size: 20 },
    })
    expect(result.content).toHaveLength(1)
    expect(result.content[0]?.codeRef).toBe('PEC-001')
    expect(result.content[0]?.name).toBe('Suporte metálico 150mm')
    expect(result.content[0]?.typeName).toBe('Peça')
    expect(result.content[0]?.sector).toBe('PRODUCAO')
    expect(result.content[0]?.qtdByBatch).toBe(50)
  })

  it('returns empty paginated response when no labels', async () => {
    const emptyResponse = {
      data: {
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0,
        size: 20,
        empty: true,
      },
    }
    vi.mocked(http.get).mockResolvedValue(emptyResponse)

    const result = await service.list(0, 20)

    expect(result.content).toHaveLength(0)
    expect(result.empty).toBe(true)
  })

  it('passes search param when provided', async () => {
    vi.mocked(http.get).mockResolvedValue(mockPaginatedResponse)

    await service.list(0, 20, 'PEC')

    expect(http.get).toHaveBeenCalledWith('/labels', {
      params: { page: 0, size: 20, search: 'PEC' },
    })
  })

  it('throws when list API returns an error', async () => {
    vi.mocked(http.get).mockRejectedValue(new Error('Network Error'))

    await expect(service.list(0, 20)).rejects.toThrow('Network Error')
  })

  it('calls GET /labels/:id and returns label', async () => {
    const mockResponse = { data: mockLabel }
    vi.mocked(http.get).mockResolvedValue(mockResponse)

    const result = await service.getById(1)

    expect(http.get).toHaveBeenCalledWith('/labels/1')
    expect(result.codeRef).toBe('PEC-001')
  })

  it('throws when getById returns an error', async () => {
    vi.mocked(http.get).mockRejectedValue(new Error('Label not found'))

    await expect(service.getById(999)).rejects.toThrow('Label not found')
  })

  it('calls GET /labels/code-ref/:codeRef and returns label', async () => {
    const mockResponse = { data: mockLabel }
    vi.mocked(http.get).mockResolvedValue(mockResponse)

    const result = await service.getByCodeRef('PEC-001')

    expect(http.get).toHaveBeenCalledWith('/labels/code-ref/PEC-001')
    expect(result.codeRef).toBe('PEC-001')
  })

  it('throws when getByCodeRef returns an error', async () => {
    vi.mocked(http.get).mockRejectedValue(new Error('Label not found'))

    await expect(service.getByCodeRef('INVALID')).rejects.toThrow(
      'Label not found',
    )
  })

  it('calls POST /labels with create data', async () => {
    const createResponse = { data: mockLabel }
    vi.mocked(http.post).mockResolvedValue(createResponse)

    const result = await service.create({
      name: 'Suporte metálico 150mm',
      codeRef: 'PEC-001',
      typeName: 'Peça',
      sector: 'PRODUCAO',
      qtdByBatch: 50,
      localization: 'C-01 / P-05',
      fields: {
        assemblyLine: 'Linha A',
        aisle: 'C-01',
        shelf: 'P-05',
        revision: 'Rev. 01',
      },
    })

    expect(http.post).toHaveBeenCalledWith('/labels', {
      name: 'Suporte metálico 150mm',
      codeRef: 'PEC-001',
      typeName: 'Peça',
      sector: 'PRODUCAO',
      qtdByBatch: 50,
      localization: 'C-01 / P-05',
      fields: {
        assemblyLine: 'Linha A',
        aisle: 'C-01',
        shelf: 'P-05',
        revision: 'Rev. 01',
      },
    })
    expect(result.name).toBe('Suporte metálico 150mm')
    expect(result.codeRef).toBe('PEC-001')
  })

  it('calls POST /labels with minimal required data', async () => {
    const response = {
      data: {
        ...mockLabel,
        name: 'Peça simples',
        sector: null,
        qtdByBatch: null,
      },
    }
    vi.mocked(http.post).mockResolvedValue(response)

    const result = await service.create({
      name: 'Peça simples',
      codeRef: 'PEC-002',
      typeName: 'Peça',
    })

    expect(http.post).toHaveBeenCalledWith('/labels', {
      name: 'Peça simples',
      codeRef: 'PEC-002',
      typeName: 'Peça',
    })
    expect(result.name).toBe('Peça simples')
  })

  it('throws when create API returns an error', async () => {
    vi.mocked(http.post).mockRejectedValue(new Error('Code ref already exists'))

    await expect(
      service.create({
        name: 'Duplicated',
        codeRef: 'PEC-001',
        typeName: 'Peça',
      }),
    ).rejects.toThrow('Code ref already exists')
  })

  it('calls PUT /labels/:id with update data', async () => {
    const updateResponse = { data: { ...mockLabel, name: 'Updated name' } }
    vi.mocked(http.put).mockResolvedValue(updateResponse)

    const result = await service.update(1, {
      name: 'Updated name',
      codeRef: 'PEC-001',
      typeName: 'Peça',
      sector: 'MONTAGEM',
    })

    expect(http.put).toHaveBeenCalledWith('/labels/1', {
      name: 'Updated name',
      codeRef: 'PEC-001',
      typeName: 'Peça',
      sector: 'MONTAGEM',
    })
    expect(result.name).toBe('Updated name')
  })

  it('throws when update API returns an error', async () => {
    vi.mocked(http.put).mockRejectedValue(new Error('Update failed'))

    await expect(
      service.update(999, {
        name: 'Fake',
        codeRef: 'PEC-001',
        typeName: 'Peça',
      }),
    ).rejects.toThrow('Update failed')
  })

  it('calls DELETE /labels/:id', async () => {
    vi.mocked(http.delete).mockResolvedValue({})

    await service.delete(1)

    expect(http.delete).toHaveBeenCalledWith('/labels/1')
  })

  it('throws when delete API returns an error', async () => {
    vi.mocked(http.delete).mockRejectedValue(new Error('Label not found'))

    await expect(service.delete(999)).rejects.toThrow('Label not found')
  })

  it('calls POST /uploads with FormData for image upload', async () => {
    const uploadResponse = {
      data: {
        id: 1,
        fileName: 'image.png',
        fileType: 'image/png',
        fileSize: 1024,
        url: '/api/uploads/1/file',
      },
    }
    vi.mocked(http.post).mockResolvedValue(uploadResponse)
    const file = new File(['dummy'], 'image.png', { type: 'image/png' })

    const result = await service.uploadImage(file)

    expect(http.post).toHaveBeenCalledWith('/uploads', expect.any(FormData), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    expect(result.id).toBe(1)
    expect(result.url).toBe('/api/uploads/1/file')
  })

  it('throws when image upload returns an error', async () => {
    vi.mocked(http.post).mockRejectedValue(new Error('Upload failed'))
    const file = new File(['dummy'], 'image.png', { type: 'image/png' })

    await expect(service.uploadImage(file)).rejects.toThrow('Upload failed')
  })
})
