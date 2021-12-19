import React from 'react';
import echarts from "echarts";
import 'echarts/map/js/china';
import { Row, Card, Col } from 'antd';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null
    }
  }
  componentDidMount() {
    var myChart1 = echarts.init(document.getElementById("echarts1"));
    myChart1.setOption(this.lineRender());
    var myChart2 = echarts.init(document.getElementById("echarts2"));
    myChart2.setOption(this.barRender());
    var myChart3 = echarts.init(document.getElementById("echarts3"));
    myChart3.setOption(this.piaRender());
    var myChart4 = echarts.init(document.getElementById("echarts4"));
    myChart4.setOption(this.radarRender());
    var myChart5 = echarts.init(document.getElementById("echarts5"));
    myChart5.setOption(this.mapRender());
    var myChart6 = echarts.init(document.getElementById("echarts6"));
    myChart6.setOption(this.eradiateRender());
    this.timer = setTimeout(function () {
      window.onresize = function () {
        myChart1.resize();
        myChart2.resize();
        myChart3.resize();
        myChart4.resize();
        myChart5.resize();
        myChart6.resize();
      };
    });
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
    window.onresize = null;
  }
  eradiateRender() {
    var geoCoordMap = {
      '黑龙江': [127.9688, 45.368],
      '内蒙古': [110.3467, 41.4899],
      "吉林": [125.8154, 44.2584],
      '北京': [116.4551, 40.2539],
      "辽宁": [123.1238, 42.1216],
      "河北": [114.4995, 38.1006],
      "天津": [117.4219, 39.4189],
      "山西": [112.3352, 37.9413],
      "陕西": [109.1162, 34.2004],
      "甘肃": [103.5901, 36.3043],
      "宁夏": [106.3586, 38.1775],
      "青海": [101.4038, 36.8207],
      "新疆": [87.9236, 43.5883],
      "西藏": [91.11, 29.97],
      "四川": [103.9526, 30.7617],
      "重庆": [108.384366, 30.439702],
      "山东": [117.1582, 36.8701],
      "河南": [113.4668, 34.6234],
      "江苏": [118.8062, 31.9208],
      "安徽": [117.29, 32.0581],
      "湖北": [114.3896, 30.6628],
      "浙江": [119.5313, 29.8773],
      "福建": [119.4543, 25.9222],
      "江西": [116.0046, 28.6633],
      "湖南": [113.0823, 28.2568],
      "贵州": [106.6992, 26.7682],
      "云南": [102.9199, 25.4663],
      "广东": [113.12244, 23.009505],
      "广西": [108.479, 23.1152],
      "海南": [110.3893, 19.8516],
      '上海': [121.4648, 31.2891]
    };
    var chinaDatas = [
      [{
        name: '黑龙江', value: 0
      }], [{
        name: '内蒙古', value: 0
      }], [{
        name: '吉林', value: 0
      }], [{
        name: '辽宁', value: 0
      }], [{
        name: '河北', value: 0
      }], [{
        name: '云南', value: 0
      }], [{
        name: '广东', value: 1
      }], [{
        name: '天津', value: 0
      }], [{
        name: '山西', value: 0
      }], [{
        name: '陕西', value: 0
      }], [{
        name: '甘肃', value: 0
      }], [{
        name: '宁夏', value: 0
      }], [{
        name: '青海', value: 0
      }], [{
        name: '新疆', value: 0
      }], [{
        name: '西藏', value: 0
      }], [{
        name: '四川', value: 0
      }], [{
        name: '重庆', value: 0
      }], [{
        name: '山东', value: 0
      }], [{
        name: '河南', value: 0
      }], [{
        name: '江苏', value: 0
      }], [{
        name: '安徽', value: 0
      }], [{
        name: '湖北', value: 0
      }], [{
        name: '浙江', value: 0
      }], [{
        name: '福建', value: 0
      }], [{
        name: '江西', value: 0
      }], [{
        name: '湖南', value: 0
      }], [{
        name: '贵州', value: 0
      }], [{
        name: '广西', value: 0
      }], [{
        name: '海南', value: 0
      }], [{
        name: '上海', value: 2
      }], [{
        name: '北京', value: 3
      }]
    ];
    var convertData = function (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var toCoord = geoCoordMap[dataItem[0].name];
        var fromCoord = [116.4551, 40.2539];
        if (fromCoord && toCoord) {
          res.push([{
            coord: fromCoord,
            value: dataItem[0].value
          }, {
            coord: toCoord,
          }]);
        }
      }
      return res;
    };
    var options = {
      backgroundColor: '#080a20',
      title: {
        text: "我只是来测试的",
        x: "left"
      },
      tooltip: {
        trigger: 'item'
      },
      geo: {
        map: 'china',
        zoom: 1.2,
        roam: true,
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#132937',
            borderColor: '#0692a4'
          },
          emphasis: {
            areaColor: '#0b1c2d'
          }
        }
      },
      series: [
        // 折线样式
        {
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            period: 3,//箭头指向速度
            trailLength: 0.02,  //特效尾迹长度[0,1]
            // symbol: 'arrow', //箭头图标
            color: '#fff',
            symbolSize: 3, //图标大小
          },
          lineStyle: {
            normal: {
              color: '#3ed4ff',
              width: 0.1, //尾迹线条宽度
              opacity: 0.5, //尾迹线条透明度
              curveness: 0.3 //尾迹线条曲直度
            }
          },
          data: convertData(chinaDatas)
        },
        // 涟漪样式
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: { //涟漪特效
            brushType: 'stroke', //波纹绘制方式 stroke, fill
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{b}'
            }
          },
          symbolSize: function (val) {
            return 5 + val[2] * 5; //圆环大小
          },
          itemStyle: {
            normal: {
              color: '#3ed4ff'
            }
          },
          data: chinaDatas.map(function (dataItem) {
            return {
              name: dataItem[0].name,
              value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
            };
          }),
        }
      ]
    };
    return options;
  }
  mapRender() {
    var options = {
      title: {
        text: "我只是来测试的",
        x: "left"
      },
      tooltip: {
        formatter: function (e, t, n) {
          return e.name + "：" + e.value
        }
      },
      visualMap: {
        min: 0,
        max: 1500,
        type: 'piecewise', //piecewise分段型，continuous连续型
        text: ["信息值"],
        inRange: {
          color: ['#e0ffff', '#006edd']
        }
      },
      geo: {
        map: "china",
        zoom: 1.23,//视角缩放比例
        label: {
          normal: {
            show: true,//是否显示标签
            fontSize: "10",
            color: "rgba(0,0,0,0.7)"
          }
        },
        itemStyle: {
          normal: {
            borderColor: "rgba(0, 0, 0, 0.2)"
          }
        },
        emphasis: { //高亮状态下样式
          areaColor: '#F3B329'
        }

      },
      series: [{
        name: "信息量",
        type: "map",
        geoIndex: 0,
        data: [{
          name: "南海诸岛",
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '北京',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '天津',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '上海',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '重庆',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '河北',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '河南',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '云南',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '辽宁',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '黑龙江',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '湖南',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '安徽',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '山东',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '新疆',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '江苏',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '浙江',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '江西',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '湖北',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '广西',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '甘肃',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '山西',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '内蒙古',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '陕西',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '吉林',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '福建',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '贵州',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '广东',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '青海',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '西藏',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '四川',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '宁夏',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '海南',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '台湾',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '香港',
          value: Math.round(Math.random() * 1000)
        },
        {
          name: '澳门',
          value: Math.round(Math.random() * 1000)
        }
        ]
      }]
    };
    return options;
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
              color: "rgba(0,183,238, 1)"
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
                  color: "rgba(0,183,238, 0.4)"
                },
                {
                  offset: 1,
                  color: "#ffe"
                }
              ])
            }
          },
          barMaxWidth: 35,
          data: [620, 950, 850, 930, 1180, 1350, 1150]
        },
        {
          name: "还款",
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              color: "rgba(86,199,60, 1)"
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(86,199,60, 0.3)"
                },
                {
                  offset: 1,
                  color: "#ffe"
                }
              ])
            }
          },
          barMaxWidth: 35,
          data: [300, 470, 400, 460, 600, 670, 500]
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
          barMaxWidth: 20,
          data: [320, 532, 1201, 1500, 730, 1390, 420]
        },
        {
          name: "还款",
          type: "bar",
          markPoint: {
            data: [{ type: "max", name: "最大值" }]
          },
          barMaxWidth: 20,
          data: [620, 832, 1751, 1334, 830, 1090, 620]
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
          { name: "Mon", max: 1400 },
          { name: "Tue", max: 1400 },
          { name: "Wed", max: 1400 },
          { name: "Thu", max: 1400 },
          { name: "Fri", max: 1400 },
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
              value: [1100, 932, 901, 934, 1290, 1330, 1320],
              name: "放款",
              areaStyle: {
                normal: {
                  "color": "rgba(0,183,238, 0.3)"
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(0,183,238, 1)',
                  borderColor: "rgba(0,183,238, 0.4)",
                  borderWidth: 10
                }
              },
              lineStyle: {
                normal: {
                  color: "rgba(0,183,238, 1)",
                  width: 2,
                }
              }
            },
            {
              value: [850, 1032, 1201, 1134, 1090, 1130, 1020],
              name: "还款",
              areaStyle: {
                normal: {
                  color: "rgba(86,199,60, 0.3)"
                }
              },
              itemStyle: {
                color: 'rgba(86,199,60, 1)',
                borderColor: 'rgba(86,199,60, 0.3)',
                borderWidth: 10,
              },
              lineStyle: {
                normal: {
                  color: "rgba(86,199,60, 1)",
                  width: 2
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
        <Row gutter={16} style={{ marginBottom: "15px" }}>
          <Col span={12}>
            <Card bordered={false}>
              <div id="echarts5" style={{ height: '500px' }}></div>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false} style={{ background: '#080a20' }}>
              <div id="echarts6" style={{ height: '500px' }}></div>
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: "15px" }}>
          <Col span={12}>
            <Card bordered={false}>
              <div id="echarts1" style={{ height: '500px' }}></div>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <div id="echarts3" style={{ height: '500px' }}></div>
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: "15px" }}>
          <Col span={12}>
            <Card bordered={false}>
              <div id="echarts2" style={{ height: '500px' }}></div>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <div id="echarts4" style={{ height: '500px' }}></div>
            </Card>
          </Col>
        </Row>

      </div>
    )
  }
}
export default Home;