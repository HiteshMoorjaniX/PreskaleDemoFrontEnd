import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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



const CustomerView = () => {

    const [data, setData] = useState([]);
    const classes = useStyles();

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

    const isExpired = (validityPeriod) => {
        let validDate = new Date(validityPeriod).toISOString().slice(0, 10);
        let today = new Date().toISOString().slice(0, 10);
        if (today > validDate) {
            return "YES";
        }
        else {
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
                        <StyledTableCell >Product Name</StyledTableCell>
                        <StyledTableCell align="right">Product Type</StyledTableCell>
                        <StyledTableCell align="right">Quantity</StyledTableCell>
                        <StyledTableCell align="right">Available Pkgs</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                        <StyledTableCell align="right">Manufactoring Date</StyledTableCell>
                        <StyledTableCell align="right">Validity Period</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <>
                            {
                                isExpired(row.validityPeriod) === 'NO' ?
                                    
                                        <StyledTableRow style={{ height: '70px' }} key={row.productName} >
                                            <StyledTableCell component="th" scope="row">
                                                {row.productName}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.productType}</StyledTableCell>
                                            <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                                            <StyledTableCell align="right">{row.availablePkgs}</StyledTableCell>
                                            <StyledTableCell align="right">{row.price}</StyledTableCell>
                                            <StyledTableCell align="right">{row.manufactoringDate}</StyledTableCell>
                                            <StyledTableCell align="right">{row.validityPeriod}</StyledTableCell>
                                        </StyledTableRow>
                                    
                                    :
                                    ''
                            }
                            </>
                        
                    )
                    )}
                </TableBody>
            </Table>


        </div>
    )
}

export default CustomerView;