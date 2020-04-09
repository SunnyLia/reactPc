import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Row, Dropdown, Tabs } from 'antd';
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
            panes: [
                { 
                    title: '首页', 
                    key: "/home", 
                    close: false,
                }
            ],
            activeKey: "/home"
        }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    menuChange = (path, name) => {
        if (this.props.location.pathname != path) {
            this.props.history.push(path)
            this.add(path, name)
        }
    }
    loginOut = () => {
        sessionStorage.removeItem("user");
        this.props.history.push("/login")
    }
    componentDidMount() {
        this.props.getNavMenu();
        // console.log(this.props);
        if(this.props.location && this.props.location.pathname){

            this.setState({
                activeKey:this.props.location.pathname
            })
        }
    }
    add = (path, name) => {
        var flag = this.state.panes.some(v => v.key == path);
        if (!flag) {
            this.state.panes.push({
                title: name,
                key: path,
                close: true
            });
        }
        this.setState({
            panes: this.state.panes,
            activeKey: path
        });
    };
    remove = targetKey => {
        let { panes, activeKey } = this.state
        if (targetKey === activeKey) {
            panes.forEach((pane, i) => {
                if (pane.key === targetKey) {
                    let nextTab = panes[i + 1] || panes[i - 1];
                    activeKey = nextTab.key
                }
            });
            this.props.history.push(activeKey)
        }
        this.setState({
            panes: panes.filter(tab => tab.key !== targetKey),
            activeKey: activeKey
        });
    };
    onChange = activeKey => {
        this.props.history.push(activeKey)
        this.setState({ activeKey });
    };
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    render() {
        let pathName = (this.props.location.pathname);
        let openKey = pathName.substring(0,pathName.lastIndexOf("/"))
        
        return (
            <Layout style={{ height: '100%', width: '100%' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div style={{ textAlign: 'center' }}>
                        <img style={{ width: '65px', borderRadius: '50%' }} src="https://hbimg.huabanimg.com/322e523731a5022eed6c9da7a573ddee230d06b11bc5-lQSMDi_fw658" />
                    </div>
                    <Menu theme="dark" mode="inline"
                        // defaultSelectedKeys={pathName == "/" ? this.state.activeKey : pathName}
                        selectedKeys={[this.state.activeKey]}
                        openKeys={[openKey]}
                    >
                        {
                            this.props.navMenus.length > 0 ? this.props.navMenus.map((v, i) => {
                                return (
                                    v.children && v.children.length > 0 ?
                                        (
                                            <SubMenu key={v.path}
                                                title={
                                                    <span>
                                                        <Icon type={v.icon} />
                                                        <span>{v.name}</span>
                                                    </span>
                                                }
                                            >
                                                {
                                                    v.children && v.children.map((val, ind) => {
                                                        return (
                                                            val.children && val.children.length > 0 ?
                                                                (
                                                                    <SubMenu key={val.path} title={val.name}>
                                                                        {
                                                                            val.children && val.children.map((value) => {
                                                                                return (
                                                                                    <Item key={value.path} onClick={this.menuChange.bind(this, value.path, value.name)}>
                                                                                        {/* <Link to={value.path}> */}
                                                                                        {value.name}
                                                                                        {/* </Link> */}
                                                                                    </Item>
                                                                                )
                                                                            })
                                                                        }
                                                                    </SubMenu>
                                                                ) : (
                                                                    <Item key={val.path} onClick={this.menuChange.bind(this, val.path, val.name)}>
                                                                        {/* <Link to={val.path}> */}
                                                                        {val.name}
                                                                        {/* </Link> */}
                                                                    </Item>
                                                                )
                                                        )
                                                    })
                                                }
                                            </SubMenu>
                                        ) : (
                                            <Item key={v.path} onClick={this.menuChange.bind(this, v.path, v.name)}>
                                                {/* <Link to={v.path}> */}
                                                <Icon type={v.icon} />
                                                <span>{v.name}</span>
                                                {/* </Link> */}
                                            </Item>
                                        )
                                )
                            }) : null
                        }
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
                        <Tabs
                            hideAdd
                            onChange={this.onChange}
                            activeKey={this.state.activeKey}
                            type="editable-card"
                            onEdit={this.onEdit}
                        >
                            {this.state.panes.map(pane => (
                                <Tabs.TabPane tab={pane.title} key={pane.key} closable={pane.close}></Tabs.TabPane>
                            ))}
                        </Tabs>
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