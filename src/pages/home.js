import React from 'react';
import { Row, Card, Col } from 'antd';
class Home extends React.Component {
    render() {
        return (
            <div>
                <Row gutter={16} style={{marginBottom:"15px"}}>
                    <Col span={12}>
                        <Card bordered={false}>
                            Card content
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false}>
                            Card content
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16} style={{marginBottom:"15px"}}>
                    <Col span={12}>
                        <Card bordered={false}>
                            Card content
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false}>
                            Card content
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16} style={{marginBottom:"15px"}}>
                    <Col span={12}>
                        <Card bordered={false}>
                            Card content
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false}>
                            Card content
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Home;