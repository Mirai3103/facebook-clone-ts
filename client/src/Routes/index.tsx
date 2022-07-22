import React from 'react';

import { useRoutes, RouteObject } from "react-router-dom";
import LoginPage from '../Pages/Login';

import HomePage from '../Pages/Home';
import SearchPeoplePage from '../Pages/SearchPeople';

const routesObject: RouteObject[] = [
    { path: '/login', element: <LoginPage /> },
    { path: '/', element: <HomePage /> },
    { path: '/search', element: <SearchPeoplePage /> }
];

export default function Routes() {
    return (
        useRoutes(routesObject)
    )
}