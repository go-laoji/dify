'use client'

// Libraries
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounceFn } from 'ahooks'
import useSWR from 'swr'

// Components
import Datasets from './Datasets'
import DatasetFooter from './DatasetFooter'
import ApiServer from './ApiServer'
import Doc from './Doc'
import TabSliderNew from '@/app/components/base/tab-slider-new'
import SearchInput from '@/app/components/base/search-input'
import TagFilter from '@/app/components/base/tag-management/filter'

// Services
import { fetchDatasetApiBaseUrl } from '@/service/datasets'

// Hooks
import { useTabSearchParams } from '@/hooks/use-tab-searchparams'

const Container = () => {
  const { t } = useTranslation()

  const options = [
    { value: 'dataset', text: t('dataset.datasets') },
    { value: 'api', text: t('dataset.datasetsApi') },
  ]

  const [activeTab, setActiveTab] = useTabSearchParams({
    defaultTab: 'dataset',
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const { data } = useSWR(activeTab === 'dataset' ? null : '/datasets/api-base-info', fetchDatasetApiBaseUrl)

  const [keywords, setKeywords] = useState('')
  const [searchKeywords, setSearchKeywords] = useState('')
  const { run: handleSearch } = useDebounceFn(() => {
    setSearchKeywords(keywords)
  }, { wait: 500 })
  const handleKeywordsChange = (value: string) => {
    setKeywords(value)
    handleSearch()
  }
  const [tagIDs, setTagIDs] = useState<string[]>(['good', 'bad'])

  return (
    <div ref={containerRef} className='grow relative flex flex-col bg-gray-100 overflow-y-auto'>
      <div className='sticky top-0 flex justify-between pt-4 px-12 pb-2 leading-[56px] bg-gray-100 z-10 flex-wrap gap-y-2'>
        <TabSliderNew
          value={activeTab}
          onChange={newActiveTab => setActiveTab(newActiveTab)}
          options={options}
        />
        {activeTab === 'dataset' && (
          <div className='flex items-center gap-2'>
            <TagFilter value={tagIDs} onChange={setTagIDs} />
            <SearchInput className='w-[200px]' value={keywords} onChange={handleKeywordsChange} />
          </div>
        )}
        {activeTab === 'api' && data && <ApiServer apiBaseUrl={data.api_base_url || ''} />}
      </div>

      {activeTab === 'dataset' && (
        <>
          <Datasets containerRef={containerRef} tags={tagIDs} keywords={searchKeywords} />
          <DatasetFooter />
        </>
      )}

      {activeTab === 'api' && data && <Doc apiBaseUrl={data.api_base_url || ''} />}
    </div>

  )
}

export default Container
