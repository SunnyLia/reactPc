import React from 'react';
import { Card, Upload, Icon, message, Modal, Button } from 'antd';
import '../component/index.css'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            previewVisible: false,
            previewImage: '',
            iconShow: {
                showRemoveIcon: true,
                showPreviewIcon: true,
                showDownloadIcon: false
            },
            fileList: [
                {
                    name: "logo.jpeg",
                    uid: '-1',
                    status: 'done',
                    url: "https://hbimg.huabanimg.com/322e523731a5022eed6c9da7a573ddee230d06b11bc5-lQSMDi_fw658"
                }
            ]
        }
    }
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('请上传jpg/png格式的文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('文件大小不能超过2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                this.setState({
                    imageUrl,
                    loading: false,
                })
            });
        }
    };

    handleChange1 = (info) => {
        this.setState({ fileList: info.fileList });
    }
    handlePreview = file => {
        if (!file.url && !file.preview) {
            getBase64(file.originFileObj, imgUrl => {
                this.setState({
                    previewImage: imgUrl,
                    previewVisible: true,
                });
            });
        } else {
            this.setState({
                previewImage: file.url || file.preview,
                previewVisible: true,
            });
        }
    };
    handleCancel = () => this.setState({ previewVisible: false });
    render() {

        const uploadButton = (<Icon type={this.state.loading ? 'loading' : 'plus'} />);
        const { imageUrl, previewVisible, previewImage, fileList } = this.state;
        return (
            <div>
                <Card title="头像上传" bordered={false}>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '105px', height: '105px' }} /> : uploadButton}
                    </Upload>
                </Card>
                <Card title="头像列表" bordered={false} style={{ marginTop: '20px' }}>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        multiple
                        showUploadList={this.state.iconShow}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange1}
                    >
                        {fileList.length >= 8 ? null : <Icon type='plus' />}
                    </Upload>

                </Card>
                <Card title="文件列表" bordered={false} style={{ marginTop: '20px' }}>
                    <div style={{ width: '50%' }} className="aaaaaaaaaaaaaaaaaa">
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture"
                            defaultFileList={fileList}
                            multiple
                            onPreview={this.handlePreview}
                        >
                            <Button><Icon type="upload" /> Upload </Button>
                        </Upload>
                    </div>
                </Card>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel} style={{ textAlign: 'center' }}>
                    <img alt="example" style={{ maxWidth: '470px', marginTop: '25px' }} src={previewImage} />
                </Modal>
            </div >
        );
    }

}
export default Uploader;



