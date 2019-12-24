import React from 'react';
import { Modal, Switch, Form, message, Input, Select } from 'antd';
class LocalizedModal extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     name: "",
        //     address: [],
        //     status: false
        // };
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let date = (new Date()).toLocaleDateString().replace(new RegExp("/", "g"), "-");
                let status = values.status === true ? "1" : "0";
                let { id, title } = this.props.modalData;
                console.log(id);
                id = title === "新增" ? date : id;
                console.log(id);
                
                values = { ...values, date: date, id: id, status: status }
                this.props.modalOK(values)
                this.props.form.resetFields();
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title={this.props.modalData.dialogTitle}
                visible={this.props.modalData.visible}
                onOk={this.handleSubmit}
                onCancel={this.props.onCancel}
                okText="确认"
                cancelText="取消"
                width="400px"
            >
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item {...formItemLayout} label="姓名">
                        {getFieldDecorator('name', {
                            initialValue: this.props.modalData.name,
                            rules: [{ required: true, message: '请输入姓名!' }],
                        })(
                            <Input placeholder="请输入" />,
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="地址">
                        {getFieldDecorator('address', {
                            initialValue: this.props.modalData.address,
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
                            initialValue: this.props.modalData.status,
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