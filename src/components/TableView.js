import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import MaterialTable from 'material-table';


export default function TableView() {
  const [data, setData] = useState();

  const columns = [
    { title: "ID", field: "productId", editable: false },
    { title: "Product Name", field: "productName" },
    { title: "Product Type",field : "productType" },
    { title: "Quantity", field: 'quantity' },
    { title: "Available Pkgs", field: "availablePkgs" },
    { title: "Price", field: 'price'},
  ];

  useEffect(() => {
    getData();
  },[]);

  const getData = () => {

    ApiService.getData().then((response) => {
      response.json().then((res) => {
        console.log('res : ',res);
        setData(res);
      })
    })

  };

  const handleEdit = (id,updatedRow) => {
    console.log('Edititng.....', updatedRow);
    ApiService.updateById(id,updatedRow).then((response) => {
      console.log('response : ',response);
      getData();
    })

  }

  const handleDelete = (tableData) => {
    console.log("data to be deleted : ", tableData.productId);
    ApiService.deleteDataById(tableData.productId).then((response) => {
      console.log('response : ',response);
      getData();
    })
  }


  return (
    <div style={{
      marginTop: '2%',
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>


      <MaterialTable
        title="Preskale Store"
        data={data}
        columns={columns}
        editable={{
          // onRowUpdate: (newData, oldData) =>
          //   new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //           const dataUpdate = [...data];
          //           const index = oldData.tableData.id;
          //           dataUpdate[index] = newData;
          //           setData([...dataUpdate]);

          //           resolve();
          //       }, 1000);
          //   }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            handleDelete(selectedRow);
            setTimeout(() => {
              resolve()
            }, 1000)
          }),
          onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
            handleEdit(oldRow.productId, updatedRow);
            setTimeout(() => {
              resolve()
            }, 1000)
          })

        }}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first"
        }}
      />
      
    </div>
  );
}
