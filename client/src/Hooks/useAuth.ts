import React from 'react';
import { AuthContext } from '../Contexts/Auth';

export default function useAuth() {
    const Auth = React.useContext(AuthContext);
    return Auth;
}