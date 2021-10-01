import { Container, makeStyles } from '@material-ui/core';
import { NextPage } from 'next';
import { PropsWithChildren } from 'react';
import NavBar from './Navbar';

const useStyles = makeStyles({
container: {
    height:"calc(100% - 64px)",
}
});

interface PageProps {}
export const Page: NextPage<PageProps> = (props: PropsWithChildren<PageProps>) => {
    const classes = useStyles();
    return (
        <>
            <NavBar /> 
            <Container className={classes.container}>{props.children}</Container>
        </>
    );
};