import { useState, useEffect } from "react";
import "./App.css";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Paper,
  IconButton,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import "./assets/scss/form.scss";

interface ProductDetails {
  product_id?: number;
  name: string;
  description: string;
  type: string;
  in_stock: number;
}

const createUniqueId = () => {
  return Math.floor(Math.random() * 9999);
};

const tableHeader = [
  { name: "Product ID", field: "product_id" },
  { name: "Name", field: "name" },
  { name: "Description", field: "description" },
  { name: "Item Type", field: "type" },
  { name: "In Stock", field: "in_stock" },
];
function App() {
  // const ProductObj: ObjectType = ProductDetails;
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    name: "",
    description: "",
    type: "",
    in_stock: 0,
  });
  const [productList, setProductList] = useState<ProductDetails[]>([]);

  useEffect(() => {
    setProductList([
      {
        product_id: createUniqueId(),
        name: "Speakers",
        description: "with Dolby sound",
        type: "Electronics",
        in_stock: 5,
      },
    ]);
  }, []);

  const handleChangeFormValue = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleResetForm = () => {
    setProductDetails({
      name: "",
      description: "",
      type: "",
      in_stock: 0,
    });
  };

  const handleCreateUpdateProduct = () => {
    const list = [...productList];
    if (productDetails.product_id === undefined) {
      productDetails.product_id = createUniqueId();
      setProductList([...list, productDetails]);
    } else {
      const productIndex = list.findIndex(
        (n) => n.product_id === productDetails.product_id
      );

      list[productIndex] = productDetails;
      setProductList(list);
    }

    handleResetForm();
  };

  const handleEditProduct = (row: ProductDetails) => {
    setProductDetails(row);
  };

  const handleDeleteProduct = (id: number | undefined) => {
    const list = [...productList];
    const productIndex = list.findIndex((n) => n.product_id === id);
    list.splice(productIndex, 1);
    setProductList(list);
  };

  return (
    <Box>
      <Box className="inventory-form">
        <Box className="inventory-form-item">
          <Typography variant="subtitle1">Name: </Typography>
          <TextField
            name="name"
            autoComplete="off"
            value={productDetails.name}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              handleChangeFormValue(e)
            }
            fullWidth
          />
        </Box>
        <Box className="inventory-form-item">
          <Typography variant="subtitle1">Description: </Typography>
          <TextField
            name="description"
            autoComplete="off"
            value={productDetails.description}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              handleChangeFormValue(e)
            }
            fullWidth
          />
        </Box>
        <Box className="inventory-form-item">
          <Typography variant="subtitle1">Type: </Typography>
          <TextField
            name="type"
            autoComplete="off"
            value={productDetails.type}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              handleChangeFormValue(e)
            }
            fullWidth
          />
        </Box>
        <Box className="inventory-form-item">
          <Typography variant="subtitle1">Stock: </Typography>
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            name="in_stock"
            autoComplete="off"
            value={productDetails.in_stock}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              handleChangeFormValue(e)
            }
            fullWidth
          />
        </Box>
      </Box>
      <Box className="inventory-form-action">
        <Button variant="outlined" onClick={handleResetForm}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={handleCreateUpdateProduct}
        >
          {productDetails.product_id ? "Update" : "Save"}
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeader.map(
                (item: { name: string; field: string }, key: number) => (
                  <TableCell key={key}>{item.name}</TableCell>
                )
              )}
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((item: ProductDetails, key: number) => (
              <TableRow key={key}>
                {tableHeader.map(
                  (itemField: { field: string }, detailKey: number) => (
                    <TableCell key={detailKey}>
                      {item[itemField.field as keyof ProductDetails]}
                    </TableCell>
                  )
                )}
                <TableCell align="right">
                  <Box>
                    <IconButton onClick={() => handleEditProduct(item)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteProduct(item.product_id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {productList.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: "center" }}>
                  No Results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default App;
