import type { CreateLabelSchema } from '../schemas/create-label-schema'
import { useCreateLabelStore } from '../stores/create-label-store'

const BARCODE_LINES = Array.from(
  { length: 20 },
  (_, i) => ((i * 7 + 13) % 60) + 40,
)

interface LabelPreviewCardProps {
  data: CreateLabelSchema
}

export function LabelPreviewCard({ data }: LabelPreviewCardProps) {
  const { selectedType, imagePreview } = useCreateLabelStore()

  return (
    <div className='mx-auto w-full max-w-[280px]'>
      <div
        className='aspect-[10/7] overflow-hidden rounded-lg border bg-white'
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        {/* Header bar */}
        <div className='flex h-7 items-center bg-navy px-2'>
          <span className='text-[10px] font-semibold uppercase tracking-wider text-white'>
            {selectedType ?? 'Etiqueta'}
          </span>
        </div>

        {/* Content */}
        <div className='flex h-[calc(100%-1.75rem)] flex-col gap-1 p-2'>
          {/* Image area */}
          {imagePreview ? (
            <div className='flex items-center justify-center rounded-sm bg-gray-50'>
              <img
                src={imagePreview}
                alt=''
                className='max-h-14 max-w-full object-contain'
              />
            </div>
          ) : (
            <div className='flex h-14 items-center justify-center rounded-sm bg-gray-50'>
              <span className='text-[8px] text-gray-400'>Sem imagem</span>
            </div>
          )}

          {/* Reference code */}
          <div>
            <p className='font-mono text-[11px] font-bold leading-tight text-gray-900'>
              {data.referenceCode || '---'}
            </p>
          </div>

          {/* Name */}
          <div className='min-h-0 flex-1'>
            <p className='text-[9px] leading-tight text-gray-700 line-clamp-2'>
              {data.name || '---'}
            </p>
          </div>

          {/* Location & meta */}
          <div className='grid grid-cols-2 gap-x-1 gap-y-0.5 border-t border-gray-100 pt-1'>
            <div>
              <span className='text-[7px] font-medium uppercase text-gray-400'>
                Setor
              </span>
              <p className='text-[8px] leading-tight text-gray-700'>
                {data.sector || '---'}
              </p>
            </div>
            {data.aisle && (
              <div>
                <span className='text-[7px] font-medium uppercase text-gray-400'>
                  Corredor
                </span>
                <p className='text-[8px] leading-tight text-gray-700'>
                  {data.aisle}
                </p>
              </div>
            )}
            {data.shelf && (
              <div>
                <span className='text-[7px] font-medium uppercase text-gray-400'>
                  Prateleira
                </span>
                <p className='text-[8px] leading-tight text-gray-700'>
                  {data.shelf}
                </p>
              </div>
            )}
            {data.revision && (
              <div>
                <span className='text-[7px] font-medium uppercase text-gray-400'>
                  Rev.
                </span>
                <p className='text-[8px] leading-tight text-gray-700'>
                  {data.revision}
                </p>
              </div>
            )}
          </div>

          {/* Bottom barcode area */}
          <div className='flex items-end justify-center border-t border-gray-100 pt-0.5'>
            <div className='flex h-3 items-end gap-[1px]'>
              {BARCODE_LINES.map((height) => (
                <div
                  key={height}
                  className='w-[2px] bg-gray-800'
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
