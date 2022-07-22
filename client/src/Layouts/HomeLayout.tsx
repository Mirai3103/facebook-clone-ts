import React from 'react'
import Header from '../Components/Header'
interface HomeLayoutProps {
    children: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default HomeLayout
