import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form } from "semantic-ui-react";
import axios from "axios";

class UpdateData extends Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.state = {
      customerName: props.customerName,
      customerPhone: props.customerPhone,
      productType: props.productType,
      sellingPrice: props.sellingPrice,
      costPrice: props.costPrice,
      advancePaid: props.advancePaid,
      specification: props.specification,
      status: props.specification,
      orderDate: props.orderDate,
      id: props.id
    };
    //console.log(this.state)
  }

  onChangeCustomerName = event => {
    this.setState({
      customerName: event.target.value
    });
  };
  onChangeCustomerPhone = event => {
    this.setState({
      customerPhone: event.target.value
    });
  };
  onChangeProductType = event => {
    this.setState({
      productType: event.target.value
    });
  };
  onChnageSellingPrice = event => {
    this.setState({
      sellingPrice: event.target.value
    });
  };
  onChangeCostPrice = event => {
    this.setState({
      costPrice: event.target.value
    });
  };
  onChangeAdvancePaid = event => {
    this.setState({
      advancePaid: event.target.value
    });
  };
  onChangeSpecification = event => {
    this.setState({
      specification: event.target.value
    });
  };
  onChangeStatus = event => {
    this.setState({
      status: event.target.value
    });
  };
  onChangeOrderDate = event => {
    this.setState({
      orderDate: event.target.value
    });
  };

  updateData = () => {
    //console.log("updated data called");
    console.log(this.state);
    axios
      .put("http://localhost:5000/update", {
        id: this.state.id,
        customerName: this.state.customerName,
        customerPhone: this.state.customerPhone,
        productType: this.state.productType,
        sellingPrice: this.state.sellingPrice,
        costPrice: this.state.costPrice,
        advancePaid: this.state.advancePaid,
        specification: this.state.specification,
        status: this.state.status,
        orderDate: this.state.orderDate
      })
      .then(res => {
        //console.log(res.config.data);
        this.setState({
          customerName: "",
          customerPhone: "",
          productType: "String Art",
          sellingPrice: "",
          costPrice: "",
          advancePaid: "",
          specification: "",
          status: "",
          orderDate: Date.now()
        });
      });
  };

  render() {
    const {
      customerName,
      customerPhone,
      productType,
      sellingPrice,
      costPrice,
      advancePaid,
      specification,
      status,
      orderDate
    } = this.state;
    return (
      <Modal trigger={<Button>Update</Button>} basic size="small">
        <Header icon="archive" content="Update Data" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <label style={{ color: "white" }}>Customer Name</label>
              <input
                placeholder="First Name"
                value={customerName}
                onChange={this.onChangeCustomerName}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: "white" }}>Customer Phone NO.</label>
              <input
                placeholder="Customer Phone"
                value={customerPhone}
                onChange={this.onChangeCustomerPhone}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: "white" }}>Product Type</label>
              <input
                placeholder="Product Type"
                value={productType}
                onChange={this.onChangeProductType}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: "white" }}>Cost Price</label>
              <input
                placeholder="Cost Price"
                value={costPrice}
                onChange={this.onChangeCostPrice}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: "white" }}>Selling Price</label>
              <input
                placeholder="Selling Price"
                value={sellingPrice}
                onChange={this.onChnageSellingPrice}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: "white" }}>Advance Paid</label>
              <input
                placeholder="Advance Paid"
                value={advancePaid}
                onChange={this.onChangeAdvancePaid}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: "white" }}>Specification</label>
              <input
                placeholder="Specification"
                value={specification}
                onChange={this.onChangeSpecification}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: "white" }}>Status</label>
              <input
                placeholder="Status"
                value={status}
                onChange={this.onChangeStatus}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: "white" }}>Order Date</label>
              <input
                placeholder="Order Date"
                value={orderDate}
                onChange={this.onChangeOrderDate}
              />
            </Form.Field>
          </Form>
          <Button basic color="red" inverted>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" onClick={this.updateData} inverted>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Content>
      </Modal>
    );
  }
}

export default UpdateData;
