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
				path: "/dashboard",
				icon: "el-icon-menu"
			}, {
				name: "内容管理",
				path: "",
				icon: "el-icon-tickets",
				children: [
					{
						name: "客户查询",
						path: "/user",
						children: []
					},
					{
						name: "工具处理",
						path: "",
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
