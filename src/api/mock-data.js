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
				name: "内容管理",
				path: "/cont",
				icon: "appstore",
				children: [
					{
						name: "客户查询",
						path: "/cont/user"
					},
					{
						name: "工具处理",
						path: "/cont/deal",
						children: [{
							name: "上传中心",
							path: "/cont/deal/uploader"
						},
						{
							name: "编辑中心",
							path: "/cont/deal/editor"
						}]
					}
				]
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
