import React from 'react';
import { connect } from 'react-redux';
import { Form, Select, Input, Button, DatePicker, Table, Divider, Tag, Modal } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { getUserLists, getAddress, delUserLists, addUserLists, editUserLists, filterQuery } from '../redux/action';
import Modal1 from './component/modal';
import { tableToExcel } from "./component/export";
class HorizontalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dialogTitle: '新增',
      name: "",
      address: [],
      status: false
    }
  }
  componentDidMount() {
    this.props.getUserLists()
    this.props.getAddress()
  }
  // 查询筛选按钮 ok
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.filterQuery(values)
    });
  };
  // 查询重置按钮 ok
  handleReset = () => {
    let objs = this.props.form.getFieldsValue();
    let flag = false;
    for (let key in objs) {
      if (objs[key]) flag = true
    }

    this.props.form.resetFields();
    if (flag) this.props.getUserLists();
  };
  // 表格删除按钮 ok
  tableDel = (row) => {
    let that = this;
    Modal.confirm({
      title: '提示',
      content: '确定要删除该条数据？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        that.props.delUserLists(row.id)
      }
    });
  }
  // 表格导出 ok
  tableExport = () => {
    let lists = this.props.userLists
    lists.unshift({
      name: "姓名",
      date: '日期',
      address: '地址',
      status: '状态'
    })
    tableToExcel(lists);
  }

  // 表格编辑按钮
  tableEdit = (row) => {
    this.setState({
      visible: !this.state.visible,
      dialogTitle: '编辑',
      name: row.name,
      address: row.address,
      status: row.status === "1" ? true : false
    });
  }
  // 表格新增按钮
  tableAdd = () => {
    this.setState({
      visible: !this.state.visible,
      dialogTitle: '新增',
      name: "",
      address: [],
      status: false
    });
  }
  //弹框取消回调
  toggleVisi = () => {
    this.setState({
      visible: !this.state.visible
    });
  }
  //弹框确认回调
  modalOK = (item) => {
    if(this.state.dialogTitle === "新增"){
      this.props.addUserLists(item)
    }else{
      this.props.editUserLists(item)
    }
    this.toggleVisi()
  }

  render() {
    // console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item label="姓名">
            {getFieldDecorator('user')(
              <Input placeholder="请输入" />
            )}
          </Form.Item>
          <Form.Item label="地址">
            {getFieldDecorator('region')(
              <Select placeholder="请选择" style={{ width: 170 }}>
                {
                  this.props.address.map((v, i) => <Select.Option key={i} value={v.province}>{v.province}</Select.Option>)
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item label="日期">
            {getFieldDecorator('date')(
              <DatePicker.RangePicker locale={locale} />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">筛选</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
          </Form.Item>
        </Form>
        <div style={{ marginTop: '20px' }}>
          <Button type="primary" onClick={() => this.tableAdd()}>新增</Button>&nbsp;&nbsp;
          <Button type="primary" onClick={() => this.tableExport()}>导出</Button>

          <Table bordered dataSource={this.props.userLists.map((row, i) => ({ ...row, rowIndex: i + 1, key: i + 1 }))}>
            <Table.Column title="序号" dataIndex="rowIndex" align="center" />
            <Table.Column title="姓名" dataIndex="name" align="center" />
            <Table.Column title="日期" dataIndex="date" align="center" />
            <Table.Column title="地址" dataIndex="address" align="center" />
            <Table.Column title="状态" dataIndex="status" align="center"
              render={status => (
                status === "1" ? (<Tag color="blue">已发布</Tag>) : (<Tag>未发布</Tag>)
              )}
            />
            <Table.Column title="操作" align="center"
              render={(text, record) => (
                <span>
                  <a onClick={() => this.tableEdit(record)}>编辑</a>
                  <Divider type="vertical" />
                  <a onClick={() => this.tableDel(record)}>删除</a>
                </span>
              )}
            />
          </Table>
        </div>
        <Modal1
          address={this.props.address}
          onCancel={this.toggleVisi}
          modalOK={this.modalOK}
          modalData={this.state}
        />
      </div>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

const mapStateToProps = (state, ownProps) => {
  return {
    userLists: state.userDatas.userLists,
    address: state.userDatas.address
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    filterQuery: (id) => dispatch(filterQuery(id)),
    getUserLists: () => dispatch(getUserLists()),
    delUserLists: (id) => dispatch(delUserLists(id)),
    addUserLists: (id) => dispatch(addUserLists(id)),
    editUserLists: (id) => dispatch(editUserLists(id)),
    getAddress: () => dispatch(getAddress())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedHorizontalLoginForm);