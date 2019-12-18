import React from 'react';
import { Layout, Menu, Icon, Row, Dropdown } from 'antd';
import 'antd/dist/antd.css';
const { Header, Sider, Content } = Layout;
const { SubMenu, Item } = Menu;
class SiderDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { collapsed: false }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout style={{ height: '100%', width: '100%' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div style={{ textAlign: 'center' }}>
                        <img style={{ width: '65px', borderRadius: '50%' }} src="https://hbimg.huabanimg.com/322e523731a5022eed6c9da7a573ddee230d06b11bc5-lQSMDi_fw658" />
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Item key="1">
                            <Icon type="home" />
                            <span>首页</span>
                        </Item>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="appstore" />
                                    <span>内容管理</span>
                                </span>
                            }
                        >
                            <Item key="5">客户查询</Item>
                            <SubMenu key="sub3" title="工具处理">
                                <Item key="7">上传中心</Item>
                                <Item key="8">编辑中心</Item>
                            </SubMenu>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Row type="flex" justify="space-between" align="middle">
                            <Icon
                                style={trigger}
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <div>
                                <span>欢迎！张张你大爷</span>
                                <Dropdown overlay={
                                    (
                                        <Menu style={{marginRight:'12px'}}>
                                            <Item>消息</Item>
                                            <Item>设置</Item>
                                            <Item>退出</Item>
                                        </Menu>
                                    )
                                }>
                                    <Icon
                                        style={trigger}
                                        type='setting'
                                    />
                                </Dropdown>
                            </div>

                        </Row>
                    </Header>
                    <Content>
                        Content
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
export default SiderDemo;
const trigger = {
    fontSize: '20px',
    padding: '0 18px',
    cursor: 'pointer',
    lineHeight: '64px',
    transition: 'color 0.3s'
}