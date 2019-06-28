import React, { Component } from "react";
import { Button, Image, Table } from "semantic-ui-react";
import logo from "./logo.svg";
import axios from "axios";
import UpdateData from "./UpdateData.js";

class Item extends Component {
  constructor() {
    super();
    this.state = {
      updating: false,
      success: false
    };
  }
  //   sure = () => {
  //     confirmAlert({
  //       title: "Confirm to submit",
  //       message: "Are you sure to delete this item",
  //       buttons: [
  //         {
  //           label: "Yes",
  //           onClick: () => this.deleteItem()
  //         },
  //         {
  //           label: "No"
  //         }
  //       ]
  //     });
  //   };
  deleteItem = () => {
    if (window.confirm("delete?"))
      axios
        .delete("http://localhost:5000/delete", { data: { id: this.props.id } })
        .then(abc => {
          //this.props.updateDataRemove(this.props.id);
          this.setState({ success: true });
          console.log(abc);
        });
    // .catch((err)=>{
    //     console.log(err)
    //})
    //console.log(this.state.success)
    this.props.updateDataRemove(this.props.id);
  };

  render() {
    //console.log('checking props')
    //console.log(this.props)
    const {
      customerName,
      customerPhone,
      //img,
      productType,
      sellingPrice,
      costPrice,
      advancePaid,
      specification,
      status,
      orderDate
    } = this.props;

    return (
      <Table.Row>
        <Table.Cell>1</Table.Cell>
        <Table.Cell>
          <Image src={logo} />
        </Table.Cell>
        <Table.Cell>{customerName}</Table.Cell>
        <Table.Cell>{customerPhone}</Table.Cell>
        <Table.Cell>{productType}</Table.Cell>
        <Table.Cell>{sellingPrice}</Table.Cell>
        <Table.Cell>{costPrice}</Table.Cell>
        <Table.Cell>{advancePaid}</Table.Cell>
        <Table.Cell>{specification}</Table.Cell>
        <Table.Cell>{status}</Table.Cell>
        <Table.Cell>{orderDate}</Table.Cell>
        <Table.Cell>
          <UpdateData
            customerName={this.props.customerName}
            customerPhone={this.props.customerPhone}
            img={this.props.img}
            productType={this.props.productType}
            sellingPrice={this.props.sellingPrice}
            costPrice={this.props.costPrice}
            advancePaid={this.props.advancePaid}
            specification={this.props.specification}
            status={this.props.status}
            orderDate={this.props.orderDate}
            id={this.props.id}
          />
        </Table.Cell>
        <Table.Cell>
          <Button onClick={this.deleteItem}>Delete</Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default Item;

/**
 * <Modal trigger={} basic size='small'>
                    <Header icon='archive' content='Do you want to Delete?'/>
                    <Modal.Content>
                        <p>
                            The Item will be permanently deleted .
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic color='red' onClick={this.doNothing} inverted>
                            <Icon name='remove' /> No
                        </Button>
                        <Button color='green'  inverted>
                            <Icon name='checkmark' /> Yes
                        </Button>
                    </Modal.Actions>
              </Modal>
 */
