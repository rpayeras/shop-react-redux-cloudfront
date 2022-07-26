import React, { useEffect } from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { formatAsPrice } from "utils/utils";
import { Product } from "models/Product";
import AddProductToCart from "components/AddProductToCart/AddProductToCart";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "store/products";
import { RootState } from "store/store";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Products() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isLoading, list = [] } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    // axios.get(`${API_PATHS.bff}/product/available/`)
    //   .then(res => setProducts(res.data));
    dispatch(getProducts());
  }, []);

  return (
    <Grid container spacing={4}>
      {isLoading ? "loading..." : ""}

      {list.map((product: Product, index: number) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={product.image}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ fontWeight: 700 }}
              >
                {product.name}
              </Typography>
              <Typography>{formatAsPrice(product.price)}</Typography>
            </CardContent>
            <CardActions>
              <AddProductToCart product={product} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
