import React from 'react'
import { LayoutConfig } from '~/main/config/layoutsConfig'
import { makeRoutes } from '~/main/factories/routes'

export const makeLayouts = (): React.ReactElement[] =>
  Object.values(LayoutConfig).map(layout => (
    <layout.component key={layout.name}>
      {makeRoutes(layout.name)}
    </layout.component>
  ))
