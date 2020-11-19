import React from 'react'
import { RouteConfig } from '~/main/config/routes-config'
import { ProtectRoute } from '~/presentation/components'

export const makeRoutes = (layout: string): React.ReactElement[] =>
  Object.values(RouteConfig)
    .filter(route => route.layout === layout)
    .map(route => (
      <ProtectRoute
        key={route.path}
        private={route.private}
        path={route.path}
        component={route.component}
      />
    ))
