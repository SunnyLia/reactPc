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
				children: [],
				path: "/home",
				icon: "home"
			}, {
				name: "内容管理",
				path: "/user",
				icon: "appstore",
				children: [
					{
						name: "客户查询",
						path: "/user",
						children: []
					},
					{
						name: "工具处理",
						path: "/uploader",
						children: [{
							name: "上传中心",
							path: "/uploader"
						},
						{
							name: "编辑中心",
							path: "/editor"
						}]
					}
				]
			}
		]
	}
}
