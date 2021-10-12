import { useContext } from 'react';

import { AppBar, Toolbar } from '@material-ui/core';

import PublicNavigation from "../Navigation/PublicNavigation"
import PrivateNavigation from "../Navigation/PrivateNavigation"

import { AuthContext } from '../../App';


export default function Header() {

    // using Context from App.js
    const { loggedIn } = useContext(AuthContext)

    return (
        <AppBar color="inherit" position="fixed" >
            <Toolbar 
                style={{ display: "flex", justifyContent: "space-between", background: "#303F9F", color: "white" }}>

                {loggedIn ? <PrivateNavigation /> : <PublicNavigation />}

            </Toolbar>
        </AppBar>
    )
}