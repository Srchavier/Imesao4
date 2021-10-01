// @flow 
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';
import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';
import { NextPage } from 'next';
import { useContext } from 'react';
import TenantContext from '../tenantProvider';
import { Menu } from './Menu';
import UserAccountMenu from './UserAccountMenu';



const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    }
});


const NavBar: NextPage<any> = () => {
    const { initialized, keycloak } = useKeycloak<KeycloakInstance>();
    const tenant = useContext(TenantContext);
    const classes = useStyles();
    return (
        initialized && tenant &&
        keycloak?.authenticated ? (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Menu />
                        <StoreIcon />
                        <Typography component="h1" variant="h6" className={classes.title} >
                            FinCycle - {tenant.name}
                        </Typography>
                        <Typography >
                            Saldo R$ {tenant.balance}
                        </Typography>
                        <UserAccountMenu />
                    </Toolbar>
                </AppBar>

            </div>
        ) : null
    );
};


export default NavBar;
