import React from 'react';
import { connect } from 'react-redux';
import { Form, Select, Input, Button, DatePicker, Table, Divider, Tag } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { getUserLists } from '../redux/action';
class HorizontalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          status: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          status: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          status: ['cool', 'teacher'],
        },
      ]
    }
  }
  componentDidMount() {
    this.props.getUserLists()
  }
  handleReset = () => {
    this.props.form.resetFields();
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    console.log(this.props);

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
                <Select.Option value="rmb">RMB</Select.Option>
                <Select.Option value="dollar">Dollar</Select.Option>
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

          <Table dataSource={this.props.userLists} >
            <Table.Column title="姓名" dataIndex="name" key="name" />
            <Table.Column title="日期" dataIndex="date" key="date" />
            <Table.Column title="地址" dataIndex="address" key="address" />
            <Table.Column title="状态" dataIndex="status" key="status"
              render={status => (
                  status==1?(<Tag color="blue" key={status}>已发布</Tag>):(<Tag key={status}>未发布</Tag>)
              )}
            />
            <Table.Column title="Action" key="action"
              render={(text, record) => (
                <span>
                  <a>编辑</a>
                  <Divider type="vertical" />
                  <a>删除</a>
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
    userLists: state.userDatas.userLists
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  
  return {
    getUserLists: () => dispatch(getUserLists())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedHorizontalLoginForm);