"use client"
import React from 'react'
import Container from '../constants/Container'
import SubHeading from '../constants/SubHeading'
import Heading from '../constants/Heading'
import CategoryCard from '../constants/CategoryCard'
import { useLanguage } from '../../providers/language-provider'

function Categories() {
    const { t } = useLanguage();
    return (
        <div className='Categories'>
            <Container>
                <div className='flex justify-center items-center flex-col gap-[23px]'>
                    <SubHeading title={t('categories.subheading')} />
                    <Heading title={t('categories.heading')} />
                </div>
                <div className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:grid-row-2 md:grid-row-3 grid-row-4 gap-5 mt-[50px] mb-[19px]'>
                    <CategoryCard image={'/assets/haircut.png'} title={t('categories.haircut')} animation='fade-zoom-in' animateDelay='0' />
                    <CategoryCard image={'/assets/beard.png'} title={t('categories.beard')} animation='fade-zoom-in' animateDelay='100' />
                    <CategoryCard image={'/assets/spa.png'} title={t('categories.spa')} animation='fade-zoom-in' animateDelay='200' />
                    <CategoryCard image={'/assets/face-cream.png'} title={t('categories.face')} animation='fade-zoom-in' animateDelay='300' />
                    <CategoryCard image={'/assets/massage.png'} title={t('categories.massage')} animation='fade-zoom-in' animateDelay='0' />
                    <CategoryCard image={'/assets/nails.png'} title={t('categories.nails')} animation='fade-zoom-in' animateDelay='100' />
                    <CategoryCard image={'/assets/makeup.png'} title={t('categories.makeup')} animation='fade-zoom-in' animateDelay='200' />
                    <CategoryCard image={'/assets/viewMore.png'} title={t('categories.viewMore')} animation='fade-zoom-in' animateDelay='300' />
                </div>
            </Container>
            <div>
                <img src={'/assets/strip.png'} className='w-full' />
            </div>
        </div>
    )
}

export default Categories