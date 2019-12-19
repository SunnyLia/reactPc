import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Row, Dropdown } from 'antd';
import { getNavMenu } from '../redux/action';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import Main from '../router';
const { Header, Sider } = Layout;
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

    loginOut = () => {
        sessionStorage.removeItem("user");
        this.props.history.push("/login")
    }
    componentDidMount() {
        this.props.getNavMenu()
    }
    render() {
        console.log(this.props.navMenus);

        return (
            <Layout style={{ height: '100%', width: '100%' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div style={{ textAlign: 'center' }}>
                        <img style={{ width: '65px', borderRadius: '50%' }} src="https://hbimg.huabanimg.com/322e523731a5022eed6c9da7a573ddee230d06b11bc5-lQSMDi_fw658" />
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        {
                            this.props.navMenus.length > 0 ? this.props.navMenus.map((v, i) => {
                                return (
                                    v.children.length > 0 ?
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
                                                    v.children.map((val, ind) => {
                                                        return (
                                                            val.children.length > 0 ?
                                                                (
                                                                    <SubMenu key={val.path} title={val.name}>
                                                                        {
                                                                            val.children.map((value) => {
                                                                                return (<Item key={value.path}><Link to={value.path}>{value.name}</Link></Item>)
                                                                            })
                                                                        }
                                                                    </SubMenu>
                                                                ) : (<Item key={val.path}><Link to={val.path}>{val.name}</Link></Item>)
                                                        )
                                                    })
                                                }
                                            </SubMenu>
                                        ) : (
                                            <Item key={v.path}>
                                                <Link to={v.path}>
                                                    <Icon type={v.icon} />
                                                    <span>{v.name}</span>
                                                </Link>
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
                    <Main />
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