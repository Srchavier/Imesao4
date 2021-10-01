import { Box, Button, Container, Grid, MenuItem, TextField, Typography } from "@material-ui/core";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { NextPage } from 'next';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Head } from "../../components/head";
import { Page } from "../../components/Page";
import makeHttp from "../../utils/http";
import { TransactionCategoryLabels, TransactionTypeLabels } from "../../utils/model";


const transactionsNewPage: NextPage = () => {

    const { initialized, keycloak } = useKeycloak<KeycloakInstance>();

    const { register, handleSubmit } = useForm();
    const router = useRouter();

    async function onSubmit(data: any) {

        try {
            await makeHttp().post('/transactions', data);
            router.push('/transactions');
        } catch (error) {
            console.error(error)
        }
    }

    if (typeof window !== 'undefined' &&
        initialized &&
        !keycloak?.authenticated) {

        router.replace(`/login?from=${window!.location.pathname}`);
        return null;
    }

    return (
        keycloak?.authenticated ?
            (<Page>
                <Head title="Nova transação" />
                <Container>
                    <Typography component="h1" variant="h4">Nova Transação</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register('payment_date')}
                                    type="date"
                                    required
                                    label="Data Pagamento"
                                    fullWidth
                                    InputLabelProps={
                                        { shrink: true }
                                    } />
                                <TextField
                                    {...register('name')}
                                    label="Nome"
                                    required
                                    fullWidth
                                // inputProps={
                                //     { maxLenght: 120 }
                                // }
                                />
                                <TextField
                                    {...register('description')}
                                    label="Descriçào"
                                    required
                                    fullWidth
                                />
                                <TextField
                                    {...register('category')}
                                    select
                                    label="Categoria"
                                    required
                                    fullWidth >
                                    {TransactionCategoryLabels.map((i, key) => (
                                        <MenuItem key={key} value={i.value}>
                                            {i.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    {...register('amount', { valueAsNumber: true })}
                                    label="Valor"
                                    type="number"
                                    required
                                    fullWidth />
                                <TextField
                                    {...register('type')}
                                    label="Operação"
                                    id="select"
                                    required
                                    select
                                    fullWidth>
                                    {TransactionTypeLabels.map((i, key) => (
                                        <MenuItem key={key} value={i.value}>{i.label}</MenuItem>

                                    ))}
                                </TextField>

                                <Box marginTop={1}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth >Salvar</Button>

                                </Box>
                            </Grid>
                        </Grid>
                    </form>

                </Container>
            </Page>)
            : null

    );
};

export default transactionsNewPage;


