import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button} from '@material-ui/core';
import ApiService from '../services/ApiService';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    maxWidth: 1000,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const ListView = () => {

  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productId, setProductId] = useState();

  const handleClickOpen = (productId) => {
    setProductId(productId);
    ApiService.getDataById(productId).then((response => {
      response.json().then((res) => {
        setProductName(res.productName);
        setProductType(res.productType);
        setQuantity(res.quantity);
        setValidityPeriod(res.validityPeriod);
        setManufactoringDate(res.manufactoringDate);
        setAvailablePkgs(res.availablePkgs);
        setPrice(res.price);
      })
    }))
    setOpen(true);
  };

  const handleClose = () => {
    console.log("Quantity : ", quantity);
    setOpen(false);
  };

  const handleUpdate = () => {
    console.log("Updating ");
    let newData = {
      "productName": productName,
      "productType": productType,
      "quantity": quantity,
      "availablePkgs": availablePkgs,
      "price": price,
      "manufactoringDate": manufactoringDate,
      "validityPeriod": validityPeriod
    };
    ApiService.updateById(productId, newData).then((response) => {
      response.json().then((res) => {
        console.log("Updated DATA : ", res);
        getData();
        setOpen(false);
      })
    });
  };

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isIconVisible, setIconVisible] = useState();

  const [productName, setProductName] = useState();
  const [productType, setProductType] = useState();
  const [quantity, setQuantity] = useState();
  const [availablePkgs, setAvailablePkgs] = useState();
  const [price, setPrice] = useState();
  const [manufactoringDate, setManufactoringDate] = useState();
  const [validityPeriod, setValidityPeriod] = useState();


  useEffect(() => {
    getData();
  }, []);

  const getData = () => {

    ApiService.getData().then((response) => {
      response.json().then((res) => {
        console.log('res : ', res);
        setData(res);
      })
    })

  };

  const handleDelete = () => {
    console.log("delete");
    ApiService.deleteDataById(productId).then((response) => {
      console.log('response : ',response);
      setOpenDeleteDialog(false);
      getData();
    })
  };

  const handleDeleteDialogOpen = (productId) => {
    setProductId(productId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleMouseOver = (productId) => {
    setIconVisible(productId);
  }

  const handleMouseLeave = (productId) => {
    setIconVisible(null);
  }

  const isExpired = (validityPeriod) => {
    let validDate = new Date(validityPeriod).toISOString().slice(0, 10);
    let today = new Date().toISOString().slice(0, 10);
    if (today > validDate){
      return "YES";
    }
    else{
      return "NO";
    }
  }

  

  return (
    <div style={{
      marginTop: '2%',
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product Name</StyledTableCell>
            <StyledTableCell align="right">Product Type</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Available Pkgs</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Manufactoring Date</StyledTableCell>
            <StyledTableCell align="right">Validity Period</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
            <StyledTableCell align="center">is Expired</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow style={{ height: '70px' }} key={row.productName} onMouseOver={() => handleMouseOver(row.productId)} onMouseLeave={() => handleMouseLeave(row.productId)}>
              <StyledTableCell component="th" scope="row">
                {row.productName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.productType}</StyledTableCell>
              <StyledTableCell align="right">{row.quantity}</StyledTableCell>
              <StyledTableCell align="right">{row.availablePkgs}</StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">{row.manufactoringDate}</StyledTableCell>
              <StyledTableCell align="right">{row.validityPeriod}</StyledTableCell>
              <StyledTableCell align="right" style={{ width: '16%' }}>


                {isIconVisible === row.productId ?

                  <div >
                    <Button>
                      <EditIcon color="primary" onClick={() => handleClickOpen(row.productId)} />
                    </Button>

                    <Button>
                      <DeleteIcon color="primary" onClick={() => handleDeleteDialogOpen(row.productId)} />
                    </Button>
                  </div>
                  :
                  <div>

                  </div>
                }



              </StyledTableCell>
              <StyledTableCell align="right">{isExpired(row.validityPeriod)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>


      <div>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update Product Details</DialogTitle>
          <DialogContent>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="productname"
              label="Product Name"
              name="productname"
              autoFocus
              value={productName}
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
              value={productType}
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
              value={quantity}
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
              value={availablePkgs}
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
              value={price}
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
              value={manufactoringDate}
              autoFocus
              onChange={(e) => setManufactoringDate(e.target.value)}
            />
            <TextField
              type="date"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mandate"
              label="Validation period (Months)"
              name="mandate"
              value={validityPeriod}
              autoFocus
              onChange={(e) => setValidityPeriod(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>



      <div>
        <Dialog
          open={openDeleteDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this data ?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleDelete} color="secondary">
              Yes
            </Button>
            <Button onClick={handleDeleteDialogClose} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>



    </div>
  )

}

export default ListView;