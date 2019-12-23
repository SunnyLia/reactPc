import React from 'react';
import { Modal, Switch, Form, message, Input, Select } from 'antd';
class LocalizedModal extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     user: "",
        //     region: [],
        //     status: false
        // };
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                this.props.onCancel()
            }
        }); 
    };
    componentDidMount(){
        console.log("我进来了");
        
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(this.props);
        
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
                        {getFieldDecorator('user', {
                            initialValue: this.props.modalData.user,
                            rules: [{ required: true, message: '请输入姓名!' }],
                        })(
                            <Input placeholder="请输入" />,
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="地址">
                        {getFieldDecorator('region', {
                            initialValue: this.props.modalData.region,
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