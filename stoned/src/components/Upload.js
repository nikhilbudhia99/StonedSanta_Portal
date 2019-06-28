import React, { Component } from "react";
import { Button, Form, Input, Segment } from "semantic-ui-react";
import axios from "axios";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: "",
      customerPhone: "",
      productType: "String Art",
      sellingPrice: "",
      costPrice: "",
      advancePaid: "",
      specification: "",
      status: "Order Placed",
      orderDate: Date.now()
      //deliverByDate:Date.now(),
      //addDataErrorIp:'None'
    };
    //console.log(props.receiveData)
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
    console.log("checking ", event.target.value);
    this.setState({
      status: event.target.value
    });
  };
  onChangeOrderDate = event => {
    this.setState({
      orderDate: event.target.value
    });
  };
  onAdd = () => {
    const {
      customerName,
      customerPhone,
      productType,
      sellingPrice,
      costPrice,
      advancePaid,
      specification,
      status,
      orderDate,
      deliverByDate
    } = this.state;

    axios
      .post("http://localhost:5000/add/data", {
        customerName: customerName,
        customerPhone: customerPhone,
        productType: productType,
        sellingPrice: sellingPrice,
        costPrice: costPrice,
        advancePaid: advancePaid,
        specification: specification,
        status: status,
        orderDate: orderDate,
        deliverByDate: deliverByDate
      })
      .then(data => {
        console.log(this.state);
        //get request from db and pass entire data array to parent
        axios.get("http://localhost:5000/receive/data/admin").then(res => {
          console.log("please ho jaoo");
          this.props.updateData(res.data);
        });

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
      })
      .catch(err => {
        console.log(err);
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
      <Segment inverted>
        <Form inverted>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Name of Customer"
              type="text"
              placeholder="Name of Customer"
              value={customerName}
              onChange={this.onChangeCustomerName}
              required
            />
            <Form.Field
              control={Input}
              label="Phone of Customer"
              type="text"
              placeholder="Phone of Customer"
              value={customerPhone}
              onChange={this.onChangeCustomerPhone}
              required
            />
            <select onChange={this.onChangeProductType} value={productType}>
              <option value="String Art">String Art</option>
              <option value="Portrait">Portrait</option>
            </select>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Selling Price"
              type="number"
              placeholder="Selling Price"
              value={sellingPrice}
              onChange={this.onChnageSellingPrice}
              required
            />
            <Form.Field
              control={Input}
              label="Cost Price"
              type="number"
              placeholder="Cost Price"
              value={costPrice}
              onChange={this.onChangeCostPrice}
              required
            />
            <Form.Field
              control={Input}
              label="Advance Paid"
              type="number"
              placeholder="Advance Paid"
              value={advancePaid}
              onChange={this.onChangeAdvancePaid}
              required
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Specification"
              type="text"
              placeholder="Specification"
              value={specification}
              onChange={this.onChangeSpecification}
              required
            />
            <select onChange={this.onChangeStatus} value={status}>
              <option value="Order Placed">Order Placed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <Form.Field
              control={Input}
              label="Date of Order"
              type="date"
              placeholder="Date of Order"
              value={orderDate}
              onChange={this.onChangeOrderDate}
              required
            />
          </Form.Group>
          <Button type="submit" onClick={this.onAdd}>
            Submit
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default Upload;

/**
 * <Table.Row>
        <Table.Cell>1</Table.Cell>
        <Table.Cell>
          <Image src={logo} />
        </Table.Cell>
        <Table.Cell>
          <input
            type="text"
            placeholder="Name of Customer"
            size="10"
            value={customerName}
            onChange={this.onChangeCustomerName}
            required
          />
        </Table.Cell>
        <Table.Cell>
          <input
            type="number"
            placeholder="Phone of Customer"
            size="4"
            value={customerPhone}
            onChange={this.onChangeCustomerPhone}
            required
          />
        </Table.Cell>
        <Table.Cell>
          <select onChange={this.onChangeProductType} value={productType}>
            <option value="String Art">String Art</option>
            <option value="Portrait">Portrait</option>
          </select>
        </Table.Cell>
        <Table.Cell>
          <input
            type="number"
            placeholder="Selling Price"
            size="4"
            value={sellingPrice}
            onChange={this.onChnageSellingPrice}
            required
          />
        </Table.Cell>
        <Table.Cell>
          <input
            type="number"
            placeholder="Cost Price"
            size="4"
            value={costPrice}
            onChange={this.onChangeCostPrice}
            required
          />
        </Table.Cell>
        <Table.Cell>
          <input
            type="number"
            placeholder="Advance Paid"
            size="4"
            value={advancePaid}
            onChange={this.onChangeAdvancePaid}
            required
          />
        </Table.Cell>
        <Table.Cell>
          <input
            type="text"
            placeholder="Specification"
            size="10"
            value={specification}
            onChange={this.onChangeSpecification}
            required
          />
        </Table.Cell>
        <Table.Cell>
          <select onChange={this.onChangeStatus} value={status}>
            <option value="Order Placed">Order Placed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </Table.Cell>
        <Table.Cell>
          <input
            type="date"
            placeholder="date of order"
            size="10"
            value={orderDate}
            onChange={this.onChangeOrderDate}
            required
          />
        </Table.Cell>
        <Table.Cell>
          <button onClick={this.onAdd}>ADD</button>
        </Table.Cell>
      </Table.Row>







      <Form.Field
              control={Select}
              label="Product Type"
              options={ProductTypeOptions}
              placeholder="Product Type"
              onChange={this.onChangeProductType}
              value={productType}
            />
 */
