import React from 'react';
import { Modal, Switch, Form, message, Input, Select } from 'antd';
class LocalizedModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            user: "",
            region: [],
            status: false
        };
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);

            }
        });
    };
    closeModal = () => {
        this.setState({
            visible: false,
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="新增"
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.closeModal}
                okText="确认"
                cancelText="取消"
                width="400px"
            >
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item {...formItemLayout} label="姓名">
                        {getFieldDecorator('user', {
                            initialValue: this.state.user,
                            rules: [{ required: true, message: '请输入姓名!' }],
                        })(
                            <Input placeholder="请输入" />,
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="地址">
                        {getFieldDecorator('region', {
                            initialValue: this.state.region,
                            rules: [{ required: true, message: '请选择地址!' }],
                        })(
                            <Select placeholder="请选择" >
                                {
                                    this.props.address.map((v, i) => <Select.Option key={i} value={v.province}>{v.province}</Select.Option>)
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="发布">
                        {getFieldDecorator('status', {
                            initialValue: this.state.status,
                            valuePropName: 'checked'
                        })(
                            <Switch />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LocalizedModal);
export default WrappedNormalLoginForm
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};