import type { FC } from 'react'
import {
  Fragment,
  memo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useReactFlow } from 'reactflow'
import {
  PortalToFollowElem,
  PortalToFollowElemContent,
  PortalToFollowElemTrigger,
} from '@/app/components/base/portal-to-follow-elem'
import { SearchLg } from '@/app/components/base/icons/src/vender/line/general'
import { ChevronDown } from '@/app/components/base/icons/src/vender/line/arrows'

const ZoomInOut: FC = () => {
  const { t } = useTranslation()
  const reactFlow = useReactFlow()
  const [open, setOpen] = useState(false)

  const ZOOM_IN_OUT_OPTIONS = [
    [
      {
        key: 'in',
        text: t('workflow.operator.zoomIn'),
      },
      {
        key: 'out',
        text: t('workflow.operator.zoomOut'),
      },
    ],
    [
      {
        key: 'to50',
        text: t('workflow.operator.zoomTo50'),
      },
      {
        key: 'to100',
        text: t('workflow.operator.zoomTo100'),
      },
    ],
    [
      {
        key: 'fit',
        text: t('workflow.operator.zoomToFit'),
      },
    ],
  ]

  const handleZoom = (type: string) => {
    if (type === 'in')
      reactFlow.zoomIn()

    if (type === 'out')
      reactFlow.zoomOut()

    if (type === 'fit')
      reactFlow.fitView()

    if (type === 'to50')
      reactFlow.zoomTo(0.5)

    if (type === 'to100')
      reactFlow.zoomTo(1)
  }

  return (
    <PortalToFollowElem
      placement='top-start'
      open={open}
      onOpenChange={setOpen}
      offset={4}
    >
      <PortalToFollowElemTrigger asChild onClick={() => setOpen(v => !v)}>
        <div className={`
          flex items-center px-2 h-8 cursor-pointer text-[13px] hover:bg-gray-50 rounded-lg
          ${open && 'bg-gray-50'}
        `}>
          <SearchLg className='mr-1 w-4 h-4' />
          100%
          <ChevronDown className='ml-1 w-4 h-4' />
        </div>
      </PortalToFollowElemTrigger>
      <PortalToFollowElemContent>
        <div className='w-[168px] rounded-lg border-[0.5px] border-gray-200 bg-white shadow-lg'>
          {
            ZOOM_IN_OUT_OPTIONS.map((options, i) => (
              <Fragment key={i}>
                {
                  i !== 0 && (
                    <div className='h-[1px] bg-gray-100' />
                  )
                }
                <div className='p-1'>
                  {
                    options.map(option => (
                      <div
                        key={option.key}
                        className='flex items-center px-3 h-8 rounded-lg hover:bg-gray-50 cursor-pointer text-sm text-gray-700'
                        onClick={() => handleZoom(option.key)}
                      >
                        {option.text}
                      </div>
                    ))
                  }
                </div>
              </Fragment>
            ))
          }
        </div>
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  )
}

export default memo(ZoomInOut)