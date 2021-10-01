// @flow 
import { Divider, IconButton, Menu as MuiMenu, MenuItem } from '@material-ui/core';
import { AccountBox } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React from 'react';

import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';

export const UserAccountMenu = () => {

    const { keycloak } = useKeycloak<KeycloakInstance>();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const handleMenuClose = () => setAnchorEl(null);
    const handleMobileMenuOpen = (event: any) => setAnchorEl(event.currentTarget);


    return (
        <React.Fragment>
            <IconButton
                color="inherit"
                edge="end"
                onClick={handleMobileMenuOpen}
            >
                <AccountBox></AccountBox>
            </IconButton>
            <MuiMenu
                open={open}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                getContentAnchorEl={null}
            >
                <MenuItem
                    disabled={true}
                >
                    {(keycloak?.idTokenParsed as any)?.family_name}
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => router.push('/logout')}
                >
                    Logout
                </MenuItem>

            </MuiMenu>
        </React.Fragment>
    );
};

export default UserAccountMenu;