'use client'
import LoadingComponent from '@/components/loading';
import { useTheme } from '@/providers/theme-provider';
import React from 'react'

type Props = {}

function loading({ }: Props) {


  return (
    <>
      <LoadingComponent />
    </>
  )
}

export default loading