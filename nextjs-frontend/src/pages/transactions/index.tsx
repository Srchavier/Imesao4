import { IntegratedFiltering, IntegratedPaging, PagingState, SearchState, SortingState } from '@devexpress/dx-react-grid';
import { Grid, PagingPanel, SearchPanel, Table, TableHeaderRow, Toolbar } from '@devexpress/dx-react-grid-material-ui';
import { Button, Container, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { format, parseISO } from 'date-fns';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Head } from '../../components/head';
import { Page } from '../../components/Page';
import { withAuth } from '../../hof/withAuth';
import makeHttp from '../../utils/http';
import { Transaction } from '../../utils/model';

interface TransactionsPageProps {
    transactions: Transaction[];
}

const columns = [
    {
        name: 'payment_date',
        title: 'Data pag.',
        getCellValue: (row: any, columnName: string) => {
            return format(parseISO(row[columnName].slice(0, 10)), "dd/MM/yyyy")
        }

    },
    { name: 'name', title: 'Nome' },
    { name: 'category', title: 'Categoria' },
    { name: 'type', title: 'Operação' },
    {
        name: 'created_at',
        title: 'Criado em',
        getCellValue: (row: any, columnName: string) => {
            return format(parseISO(row[columnName].slice(0, 10)), "dd/MM/yyyy")
        }
    },
];


const transactions: NextPage<TransactionsPageProps> = (props: TransactionsPageProps) => {
    const router = useRouter();
    return (

        <Page>
            <Head title="Minhas transações" />
            <Container>
                <Typography component="h1" variant="h4">Minhas Transações</Typography>
                <Button
                    startIcon={<AddIcon />}
                    variant={"contained"}
                    color="primary"
                    onClick={() => router.push("/transactions/new")}
                >Criar</Button>

                <Grid
                    rows={props.transactions}
                    columns={columns}
                >
                    <Table />
                    <SortingState defaultSorting={[{ columnName: "created_at", direction: "desc" }]} />
                    <SearchState defaultValue="" />
                    <PagingState pageSize={5} defaultCurrentPage={0} />
                    <TableHeaderRow showSortingControls />
                    <IntegratedFiltering />
                    <Toolbar />
                    <SearchPanel />
                    <PagingPanel />
                    <IntegratedPaging />
                </Grid>
            </Container>
        </Page>

    );
};

export default transactions;


export const getServerSideProps: GetServerSideProps = withAuth(async (ctx, {token}) => {
    const { data: transactions } = await makeHttp(token).get('/transactions');

    return {
        props: {
            transactions
        },
    };
});