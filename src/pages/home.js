import React from 'react';
import echarts from "echarts";
import { Row, Card, Col } from 'antd';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: null
        }
    }
    componentDidMount(){
        var myChart1 = echarts.init(document.getElementById("echarts1"));
        myChart1.setOption(this.lineRender());
        var myChart2 = echarts.init(document.getElementById("echarts2"));
        myChart2.setOption(this.barRender());
        var myChart3 = echarts.init(document.getElementById("echarts3"));
        myChart3.setOption(this.piaRender());
        var myChart4 = echarts.init(document.getElementById("echarts4"));
        myChart4.setOption(this.radarRender());
        this.timer = setTimeout(function() {
            window.onresize = function() {
                myChart1.resize();
                myChart2.resize();
                myChart3.resize();
                myChart4.resize();
            };
        });
    }
    componentWillUnmount(){
        clearTimeout(this.timer)
    }
    // 柱状折线渲染
    lineRender() {
        var options = {
          title: {
            text: "我只是来测试的",
            x: "left"
          },
          xAxis: {
            splitLine: {
              show: false
            },
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          },
          yAxis: {
            splitLine: {
              show: false
            }
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {
            x: "10%",
            x2: "10%",
            y: "10%",
            y2: "10%",
            borderWidth: 0
          },
          series: [
            {
              name: "放款",
              type: "line",
              smooth: true,
              itemStyle: {
                normal: {
                  color: "#8ec6ad"
                }
              },
              markPoint: {
                data: [{ type: "max", name: "最大值" }]
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#8ec6ad"
                    },
                    {
                      offset: 1,
                      color: "#ffe"
                    }
                  ])
                }
              },
              barMaxWidth: 35,
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            },
            {
              name: "还款",
              type: "line",
              smooth: true,
              itemStyle: {
                normal: {
                  color: "#d68262"
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#d68262"
                    },
                    {
                      offset: 1,
                      color: "#ffe"
                    }
                  ])
                }
              },
              barMaxWidth: 35,
              data: [620, 732, 701, 834, 1090, 1130, 1020]
            }
          ]
        };
        return options;
    }
    barRender() {
    var options = {
        title: {
        text: "我只是来测试的",
        x: "left"
        },
        xAxis: {
        splitLine: {
            show: false
        },
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
        splitLine: {
            show: false
        }
        },
        tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow"
        }
        },
        grid: {
        x: "10%",
        x2: "10%",
        y: "10%",
        y2: "10%",
        borderWidth: 0
        },
        series: [
        {
            name: "放款",
            type: "bar",
            itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#8ec6ad" },
                { offset: 1, color: "#ffe" }
                ])
            }
            },
            barMaxWidth: 30,
            data: [320, 532, 1201, 1500, 1390, 730, 420]
        },
        {
            name: "还款",
            type: "bar",
            markPoint: {
            data: [{ type: "max", name: "最大值" }]
            },
            itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#d68262" },
                { offset: 1, color: "#ffe" }
                ])
            }
            },
            barMaxWidth: 30,
            data: [620, 832, 1751, 1334, 1090, 830, 620]
        }
        ]
    };
    return options;
    }
    // 饼图渲染
    piaRender() {
    var options = {
        title: {
        text: "我只是来测试的",
        x: "left"
        },
        tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        calculable: true,
        series: [
        {
            name: "放款",
            type: "pie",
            roseType: "radius",
            data: [
            { value: 820, name: "Mon" },
            { value: 932, name: "Tue" },
            { value: 1001, name: "Wed" },
            { value: 1134, name: "Thu" },
            { value: 1090, name: "Fri" },
            { value: 1330, name: "Sat" },
            { value: 1420, name: "Sun" }
            ]
        }
        ]
    };
    return options;
    }
    radarRender() {
        var options = {
            title: {
            text: "我只是来测试的",
            x: "left"
            },
            tooltip: {},
            radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                color: "#fff",
                backgroundColor: "#999",
                borderRadius: 3,
                padding: [3, 5]
                }
            },
            indicator: [
                { name: "Mon", max: 1000 },
                { name: "Tue", max: 1100 },
                { name: "Wed", max: 1200 },
                { name: "Thu", max: 1200 },
                { name: "Fri", max: 1300 },
                { name: "Sat", max: 1400 },
                { name: "Sun", max: 1400 }
            ]
            },
            series: [
            {
                name: "放款 vs 还款",
                type: "radar",
                // areaStyle: {normal: {}},
                data: [
                {
                    value: [820, 932, 901, 934, 1290, 1330, 1320],
                    name: "放款",
                    areaStyle: {
                    normal: {
                        opacity: 0.9,
                        color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                        {
                            offset: 0,
                            color: "#d68262"
                        },
                        {
                            offset: 1,
                            color: "#ffe"
                        }
                        ])
                    }
                    }
                },
                {
                    value: [620, 732, 751, 834, 1090, 1130, 1020],
                    name: "还款",
                    areaStyle: {
                    normal: {
                        opacity: 0.9,
                        color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                        {
                            offset: 0,
                            color: "#8ec6ad"
                        },
                        {
                            offset: 1,
                            color: "#ffe"
                        }
                        ])
                    }
                    }
                }
                ]
            }
            ]
        };
        return options;
    }
    render() {
        return (
            <div>
                <Row gutter={16} style={{marginBottom:"15px"}}>
                    <Col span={12}>
                        <Card bordered={false}>
                            <div id="echarts1" style={{height:'500px'}}></div>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false}>
                            <div id="echarts3" style={{height:'500px'}}></div>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16} style={{marginBottom:"15px"}}>
                    <Col span={12}>
                        <Card bordered={false}>
                            <div id="echarts2" style={{height:'500px'}}></div>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false}>
                            <div id="echarts4" style={{height:'500px'}}></div>
                        </Card>
                    </Col>
                </Row>

            </div>
        )
    }
}
export default Home;