import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ApiService from '../services/ApiService';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const NewProduct = () => {

    const classes = useStyles();
    const path = useHistory();

    const [productName, setProductName] = useState();
    const [productType, setProductType] = useState();
    const [quantity, setQuantity] = useState();
    const [availablePkgs, setAvailablePkgs] = useState();
    const [price, setPrice] = useState();
    const [manufactoringDate, setManufactoringDate] = useState();
    const [validityPeriod, setValidityPeriod] = useState();

    const submitForm = (e) => {
        e.preventDefault();
        let newData = {
            "productName": productName,
            "productType": productType,
            "quantity": quantity,
            "availablePkgs": availablePkgs,
            "price": price,
            "manufactoringDate": manufactoringDate,
            "validityPeriod": validityPeriod
          };

          ApiService.storeData(newData).then((response) => {
              response.json().then((res) => {
                path.push('/');
              })
          })

    };

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <form className={classes.form} onSubmit={(e) => submitForm(e)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="productname"
                        label="Product Name"
                        name="productname"
                        autoFocus
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="producttype"
                        label="Product Type"
                        name="producttype"

                        autoFocus
                        onChange={(e) => setProductType(e.target.value)}
                    />
                    <TextField
                        type="number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="quantity"
                        label="Quantity"
                        name="quantity"

                        autoFocus
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <TextField
                        type="number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="availablepkgs"
                        label="Available Pkgs"
                        name="availablepkgs"

                        autoFocus
                        onChange={(e) => setAvailablePkgs(e.target.value)}
                    />
                    <TextField
                        type="number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="price"
                        label="Price"
                        name="price"

                        autoFocus
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        type="date"

                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="mandate"
                        label="Manufacturing Date"
                        name="mandate"

                        autoFocus
                        onChange={(e) => setManufactoringDate(e.target.value)}
                    />
                    <TextField
                        type="date"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="validityPeriod"
                        label="Validation period (Months)"
                        name="validityPeriod"
                        autoFocus
                        onChange={(e) => setValidityPeriod(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        
                    >
                        Submit
                    </Button>
                </form>
            </Container>
        </div>
    )
}

export default NewProduct;