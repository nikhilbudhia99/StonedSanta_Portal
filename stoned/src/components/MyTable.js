import React, { Component } from "react";
import { Table } from "semantic-ui-react";
//import logo from './logo.svg';
import Item from "./Item.js";
import Upload from "./Upload.js";
/**
 *
 */

class MyTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      errorMessage: "",
      loading: true
    };
  }

  componentDidMount() {
    this.receiveData();
  }

  receiveData() {
    fetch("http://localhost:5000/receive/data/admin")
      .then(res => res.json())
      .then(json => {
        //if(json.success){
        this.setState({
          loading: false,
          data: json.data
        });
        //}
        // else{
        //   this.setState({
        //     errorMessage:json.message
        //   })
        // }
      });
  }

  //create a fun to add

  updateData = data => {
    console.log("pleaaseee");
    //console.log(data)
    let newData = data;
    console.log(newData.data);
    this.setState({ data: newData.data }, () => {
      console.log("data added");
    });
    //console.log(this.state.data)
  };

  updateDataRemove = (deletedId, success) => {
    //let newData=this.state.data;
    var newData = this.state.data.filter(item => item._id !== deletedId);
    this.setState(
      {
        data: newData
      },
      () => {
        console.log("data deleted");
      }
    );
  };

  displayItem = data => {
    // console.log('testing data')
    //  console.log(data._id);
    return (
      <Item
        key={data._id}
        customerName={data.customerName}
        customerPhone={data.customerPhone}
        img={data.img}
        productType={data.productType}
        sellingPrice={data.sellingPrice}
        costPrice={data.costPrice}
        advancePaid={data.advancePaid}
        specification={data.specification}
        status={data.status}
        orderDate={data.orderDate}
        id={data._id}
        updateDataRemove={this.updateDataRemove}
      />
    );
  };

  displayAllItems = datas => {
    // console.log('testing datas')
    // console.log(datas);
    return datas.map(data => this.displayItem(data));
  };
  render() {
    const { loading } = this.state;
    //console.log(loading)
    if (loading === false) {
      return (
        <React.Fragment>
          <Upload updateData={this.updateData} />
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine>Sl.No.</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Customer Name</Table.HeaderCell>
                <Table.HeaderCell>Contact No.</Table.HeaderCell>
                <Table.HeaderCell>Product Type</Table.HeaderCell>
                <Table.HeaderCell>Selling Price</Table.HeaderCell>
                <Table.HeaderCell>Cost Price</Table.HeaderCell>
                <Table.HeaderCell>Advance Paid</Table.HeaderCell>
                <Table.HeaderCell>Specification</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Order Receiving Date</Table.HeaderCell>
                <Table.HeaderCell> </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.displayAllItems(this.state.data)}</Table.Body>
          </Table>
        </React.Fragment>
      );
    } else {
      return (
        <>
          <p>loading..</p>
        </>
      );
    }
  }
}

export default MyTable;
