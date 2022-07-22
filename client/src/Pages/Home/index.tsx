import React from 'react'
import useAuth from '../../Hooks/useAuth'
import HomeLayout from '../../Layouts/HomeLayout'
import Body from './Body'
import Login from '../Login';

export default function HomePage() {
    const auth = useAuth();


    if (auth.isLoggedIn) {
        return (<HomeLayout >

            <Body />
        </HomeLayout>)
    } else {
        return (<Login />)
    }

}