import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './gantt.css';
import _ from 'lodash'

export default class Gantt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: {
                data: [
                    
                ],
            },
            hasData: true,
            page: 1
        }
        // this.getData()
    }
    getData = () => {
        let { tasks: { data }, page } = this.state
        for (let ind = 0; ind < 15; ind++) {
            data.push({
                id: ind + (page) * 15, text: `Task #${ ind + (page-1) * 15}`, end_date: '17-08-2019', start_date: '15-08-2019', "progress": 0.3
            })
        }
        this.setState({
            tasks: {
                data: data
            }
        }, () => {
            console.log(123, this.state.tasks);
            gantt.parse(this.state.tasks);
            this.state.page++;
            // gantt.refreshData();
            // gantt.render()
        })
    }
    handleScroll = (val) => {
        const doms = document.getElementsByClassName('gantt_data_area')[0];
        // console.log(345, doms.scrollTop,doms.clientHeight,doms.scrollHeight); //滚动只剩下60的时候加载
        if (doms.scrollHeight - doms.clientHeight - doms.scrollTop <= 60) {
            // console.log(123,this);
            this.getData()
        }
    }
    componentDidMount() {

        // gantt.render();
        let { tasks, hasData } = this.state
        gantt.config.drag_links = false;
        gantt.config.drag_move = false;
        gantt.config.drag_resize = false;//两边不可拖动 
        gantt.config.date_format = "%Y-%m-%d %H:%i"; //日期格式
        // 设置表头及高度
        gantt.config.scales = [
            { unit: "month", step: 1, format: "%M" },
            { unit: "year", step: 1, format: "%Y" },
            { unit: "day", format: "%d %M" }
        ];
        gantt.config.scale_height = 3 * 28;

        // 设置悬浮提示
        gantt.plugins({
            tooltip: true
        });
        gantt.attachEvent("onGanttReady", function () {
            var tooltips = gantt.ext.tooltips;
            tooltips.tooltip.setViewport(gantt.$task_data);
        });

        // 设置今天标志线
        gantt.plugins({
            marker: true
        });
        var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
        var today = new Date(2019, 8, 15);
        gantt.addMarker({
            start_date: today,
            css: "today",
            text: "Today",
            title: "Today: " + dateToStr(today)
        });

        // 全屏
        gantt.plugins({
            fullscreen: true
        });
        gantt.attachEvent("onTemplatesReady", function () {
            var toggle = document.createElement("i");
            toggle.className = "fa fa-expand gantt-fullscreen";
            gantt.toggleIcon = toggle;
            gantt.$container.appendChild(toggle);
            toggle.onclick = function () {
                gantt.ext.fullscreen.toggle();
            };
        });
        // gantt.config.drag_progress = false;
        // gantt.config.start_date = new Date('2019-01-01');
        // gantt.config.end_date = new Date('2019-12-31');
        // gantt.config.grid_elastic_columns = true;
        // gantt.config.grid_width = 200;
        // gantt.config.scale_unit = "month";  //时间坐标轴单位“minute”, “hour”, “day”, “week”, “quarter”, “month”, “year”
        // gantt.config.date_scale = "%d,%D";//日期格式 先数字后文字 
        // gantt.config.row_height = 50; //甘特图的行高
        // gantt.config.scale_height = 20;//甘特图的表头高度
        // gantt.config.scroll_on_click = false;
        // gantt.config.max_column_width = 60;
        // gantt.config.duration_unit = "day";
        // gantt.config.scale_height = 20 * 3;
        // //gantt.config.row_height = 28;
        // gantt.config.readonly = true;//只读模式
        // gantt.config.subscales = [{  //时间坐标为月份的时候  先显示年份再月份
        //     unit: "month",
        //     step: 1,
        //     date: "%Y,%F"
        // }];
        //配置显示列   //name:绑定数据的名称  align：对其方式  label显示在表头的名称
        gantt.config.columns = [
            { name: "text", tree: true, width: '*', align: "center", label: "计划名称", resize: true },
        ];
        //显示到进度条上的文本   计划名称和任务进度百分比
        gantt.templates.task_text = function (start, end, task) {
            return "<b style='text-align:left;'>计划名称:</b> " + task.text + "    <span style='text-align:left;'>" + "完成计划：" + Math.round(task.progress * 100) + "% </span>";
        };
        gantt.config.preserve_scroll = false;
        gantt.init(this.ganttContainer);
        gantt.parse(tasks);

        let tag = false;
        let timer;
        document.getElementsByClassName('gantt_data_area')[0].addEventListener("scroll", (val) => {
            if (tag == true) { clearTimeout(timer) }

            tag = true;
            timer = setTimeout(() => {
                this.handleScroll(val)
                tag = false;
            }, 300)
        }, true);

        this.getData()
    }

    render() {
        return (
            <div
                ref={(input) => { this.ganttContainer = input }}
                style={{ width: '900px', height: '500px' }}
            ></div>
        );
    }
}