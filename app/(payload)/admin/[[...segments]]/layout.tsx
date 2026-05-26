/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT DIRECTLY. */
import config from '@/payload.config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from '../importMap.js'

import './custom.css'

type Args = {
  children: React.ReactNode
}

// NOTE: I'll use the local definition again as it worked best in types
import type { ServerFunctionClient } from 'payload'

const Layout = ({ children }: Args) => {
  const serverFunction: ServerFunctionClient = async (args) => {
    'use server'
    return handleServerFunctions({
      ...args,
      config,
      importMap,
    })
  }

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}

export default Layout
