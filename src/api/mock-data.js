/**
 * @desc 假数据的模板
 */

module.exports = {
	"navMenus": {
		"msg": "操作成功",
		"code": "200",
		"state": "ok",
		"data": [
			{
				name: "首页",
				path: "/home",
				icon: "home"
			}, {
				name: "面试题",
				path: "/interview",
				icon: "snippets",
				children: [
					{
						name: "前端",
						path: "/interview/front"
					},
					{
						name: "后端",
						path: "/interview/end"
					}
				]
			}, {
				name: "内容管理",
				path: "/cont",
				icon: "unordered-list",
				children: [
					{
						name: "客户查询",
						path: "/cont/user"
					},
					{
						name: "表格拖拽",
						path: "/cont/dragTable"
					}
				]
			}, {
				name: "工具处理",
				path: "/deal",
				icon: "form",
				children: [{
					name: "上传中心",
					path: "/deal/uploader"
				},
				{
					name: "编辑中心",
					path: "/deal/editor"
				},
				{
					name: "甘特图",
					path: "/deal/gannt",
				}]
			}
		]
	},
	'listAddress': {
		"msg": "操作成功",
		"code": "200",
		"state": "ok",
		"data|6-9": [{
			"province": "@province"
		}]
	},
	'userLists': {
		"msg": "操作成功",
		"code": "200",
		"state": "ok",
		"data|6-15": [{
			"name": "@cname",
			"address": "@county(true)",
			"date": "@date",
			"status|1": ["0", "1"],
			"id|+1": 0
		}]
	}
}
