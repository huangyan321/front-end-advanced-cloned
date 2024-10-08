'use client'

import { useCallback, useMemo } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { useModalStack } from 'rc-modal-sheet'

import { MAIN_MARKDOWN_ID } from '~/constants/dom-id'

import { FABPortable } from '../fab'
import { TocTree } from './TocTree'

export const TocFAB = () => {
  const { present } = useModalStack()
  const pathname = usePathname()
  const params = useParams()

  const $headings = useMemo(() => {
    const $mainMarkdownRender = document.getElementById(MAIN_MARKDOWN_ID)
    if (!$mainMarkdownRender) return

    const $headings = [
      ...$mainMarkdownRender.querySelectorAll('h1,h2,h3,h4,h5,h6'),
    ] as HTMLHeadingElement[]

    return $headings
      .filter(($heading) => {
        if ($heading.dataset['markdownHeading'] === 'true') return true
        return false
      })
      .slice(1)
  }, [])
  const presentToc = useCallback(() => {
    const dispose = present({
      title: 'Table of Content',

      content: () => (
        <TocTree
          $headings={$headings!}
          className="space-y-3 [&>li]:py-1"
          onItemClick={() => {
            dispose()
          }}
          scrollInNextTick
        />
      ),
    })
  }, [$headings, present])

  if (!$headings?.length) return null

  return (
    <FABPortable aria-label="Show ToC" onClick={presentToc}>
      <i className="icon-[mingcute--list-expansion-line]" />
    </FABPortable>
  )
}
