import React from 'react';
import { Form, message, Input, Button, Row } from 'antd';

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let state = this.props.location.state
        if (values.username == "admin" && values.password == "123") {
          let from = state ? state.from : "/";
          sessionStorage.setItem("user", "admin")
          this.props.history.push(from)
        } else {
          message.error("用户名或密码错误了哦~");
        }
      }
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" justify="center" align="middle" style={{ height: "100%", paddingBottom: '150px' }}>
        <Form onSubmit={this.handleSubmit} style={{ width: '250px' }}>
          <Row type="flex" justify="center" style={{ padding: '0px 0 20px 60px' }}>
            <img style={imgShadow} src="https://hbimg.huabanimg.com/322e523731a5022eed6c9da7a573ddee230d06b11bc5-lQSMDi_fw658" />
          </Row>
          <Form.Item {...formItemLayout} label="账户">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入账户!' }],
            })(
              <Input placeholder="admin" />,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="密码">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input type="password" placeholder="123" />,
            )}
          </Form.Item>
          <Form.Item>
            <Row type="flex" justify="space-around" style={{ padding: '0px 0 20px 60px' }}>
              <Button type="primary" htmlType="submit">确认</Button>
              <Button onClick={this.handleReset}>重置</Button>
            </Row>
          </Form.Item>
        </Form>
      </Row>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm
const imgShadow = {
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  boxShadow: '0 0 15px 5px #ddd'
}
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};