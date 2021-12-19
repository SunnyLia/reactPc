import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Row, Dropdown, Tabs, Breadcrumb } from 'antd';
import { getNavMenu } from '../redux/action';
import 'antd/dist/antd.css';
// import { Link } from 'react-router-dom';
import Main from '../router';
const { Header, Sider, Content } = Layout;
const { SubMenu, Item } = Menu;
class SiderDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            activeKey: "/home"
        }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    menuChange = (path, name) => {
        const { location, history } = this.props;
        if (location.pathname != path) {
            history.push(path)
        }
    }
    loginOut = () => {
        sessionStorage.removeItem("user");
        this.props.history.push("/login")
    }
    componentDidMount() {
        const { getNavMenu, location } = this.props;
        getNavMenu();
        if (location && location.pathname) {
            this.setState({
                activeKey: location.pathname
            })
        }
    }

    // 根据路由获取当前展开的subMenu
    getOpenKeys = () => {
        const { location } = this.props;
        let pathName = (location.pathname).split("/");
        let openKey = [], d = "";
        for (let i = 1; i < pathName.length - 1; i++) {
            d += "/" + pathName[i]
            openKey.push(d)
        }
        return openKey;
    };
    // 获取menu节点
    getMenuNode = (data) => {
        if (data.length) {
            return data.map(item => {
                if (item.children) {
                    return (<SubMenu key={item.path} title={<><Icon type={item.icon} />{item.name}</>}>
                        {this.getMenuNode(item.children)}
                    </SubMenu>)
                } else {
                    return (<Item key={item.path} onClick={this.menuChange.bind(this, item.path, item.name)}>{item.icon ? <Icon type={item.icon} /> : null}{item.name}</Item>)
                }
            })
        } else {
            return null
        }
    }
    getBreadcrumb = (data) => {
        const { location } = this.props;
        let pathUrl = []
        data.some(item => {
            if (item.path == location.pathname) {
                pathUrl.unshift(item.name)
                return true
            }
            if (item.children) {
                let url = this.getBreadcrumb(item.children);
                if (url.length) {
                    pathUrl.unshift(item.name)
                    pathUrl = pathUrl.concat(url)
                    return true
                }
            }
        })
        return pathUrl
    }
    render() {
        const { navMenus, location } = this.props;
        const { activeKey, collapsed } = this.state;
        // let breadcrumbs = this.getBreadcrumb(navMenus);
        let breadcrumbs = []
        return (
            <Layout style={{ height: '100%', width: '100%' }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div style={{ textAlign: 'center' }}>
                        <img style={{ width: '65px', borderRadius: '50%' }} src="https://hbimg.huabanimg.com/322e523731a5022eed6c9da7a573ddee230d06b11bc5-lQSMDi_fw658" />
                    </div>
                    <Menu theme="dark" mode="inline"
                        // defaultSelectedKeys={[location.pathname]}
                        selectedKeys={[activeKey]}
                        defaultOpenKeys={this.getOpenKeys()}
                    >
                        {this.getMenuNode(navMenus)}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Row type="flex" justify="space-between" align="middle">
                            <Icon
                                style={trigger}
                                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <div>
                                <span>欢迎！张张你大爷</span>
                                <Dropdown overlay={
                                    (
                                        <Menu style={{ marginRight: '12px' }}>
                                            <Item>消息</Item>
                                            <Item>设置</Item>
                                            <Item onClick={this.loginOut}>退出</Item>
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
                    <Content style={{ padding: '20px' }}>
                        <Breadcrumb>
                            {breadcrumbs.map((item, ind) => <Breadcrumb.Item key={ind}>{item}</Breadcrumb.Item>)}
                        </Breadcrumb>
                        <Main />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        navMenus: state.comDatas
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getNavMenu: () => dispatch(getNavMenu())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SiderDemo);
const trigger = {
    fontSize: '20px',
    padding: '0 18px',
    cursor: 'pointer',
    lineHeight: '64px',
    transition: 'color 0.3s'
}