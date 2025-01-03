import * as Headless from '@headlessui/react'
import { forwardRef } from 'react'

export const Link = forwardRef(function Link(
  props: any,
  ref: any
) {
  // @ts-ignore
  return (
    <Headless.DataInteractive>
      <a ref={ref} {...props} />
    </Headless.DataInteractive>
  )
})
