import React from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import axios from "axios";
import {
  Typography,
  Link as MuiLink,
  Card,
  CardHeader,
  CardContent,
  Box,
  Grid,
} from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { OrderStatus, OrderStatusTranslate } from "../../utils/models";
import useSWR from "swr";
import Router, { useRouter } from "next/router";

interface OrdersPageProps {
  orders: Array<Record<string, any>>;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function OrderShowPage(props: OrdersPageProps) {
  const router = useRouter();

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_HOST}/orders/${router.query.id}`,
    fetcher,
    {
      onError: (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          Router.push("/login");
        }
      },
    }
  );

  if (data) {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <Grid container>
          <Grid item>
            <Card>
              <CardHeader
                title="Order"
                subheader={data.id}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                sx={{ backgroundColor: (theme) => theme.palette.grey[700] }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    mb: 2,
                  }}
                >
                  <Typography component="h2" variant="h3" color="text.primary">
                    R$ {data.amount}
                  </Typography>
                </Box>
                <ul style={{ listStyle: "none" }}>
                  <Typography component="li" variant="subtitle1">
                    {data.credit_card_number}
                  </Typography>
                  <Typography component="li" variant="subtitle1">
                    {data.credit_card_name}
                  </Typography>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }

  return <div>Loading...</div>;
}

export default OrderShowPage;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
    revalidate: 20,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
