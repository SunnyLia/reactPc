import React from 'react';
import { connect } from 'react-redux';
import { Form, Select, Input, Button, DatePicker, Table, Divider, Tag } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { getUserLists, getAddress } from '../redux/action';
class HorizontalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    this.props.getUserLists()
    this.props.getAddress()
  }
  handleReset = () => {
    this.props.form.resetFields();
  };
  tableEdit = (row) => {
    console.log(row);

  }
  tableDel = (row) => {
    console.log(row);

  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
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
          <Button type="primary" >新增</Button>

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
    getUserLists: () => dispatch(getUserLists()),
    getAddress: () => dispatch(getAddress())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedHorizontalLoginForm);