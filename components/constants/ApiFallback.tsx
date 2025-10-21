'use client'
import React, { useEffect } from 'react'
import LoadingComponent from '../loading'

type Props = {}

function ApiFallback({ }: Props) {
    useEffect(() => {
        location.reload()
    }, [])
    return (
        <>
            <LoadingComponent />
        </>
    )
}

export default ApiFallback