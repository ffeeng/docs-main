export namespace Search {
  export interface Group {
    /**
     * 搜索组标题
     * @example '服务商指南'
     */
    text: string
    /**
     * 搜索组类型 GroupType.ISP
     * @example
     */
    type: GroupType
    /**
     * 搜索组目录下的子项
     */
    items: Item[]
  }
  export interface Item {
    /**
     * 搜索子项内容
     * @example '获取授权用户的 id，昵称，头像等信息'
     */
    text: string
    /**
     * 搜索子项链接
     * @example '/server/user/userinfo.html#base'
     */
    link: string
    /**
     * 搜索子项内容类型
     * @example TextType.Text
     */
    textType: TextType
    /**
     * 搜索子项路由标题
     * @example '个人文档,获取文档列表'
     */
    routeTitle: string
    /**
     * 搜索子项所属的组类型
     * @example GroupType.ISP
     */
    groupType?: GroupType
  }
  export enum GroupType {
    // 产品介绍
    Product,
    // 控制台
    Console,
    // Web SDK
    WebSDK,
    // callback
    Callback,
    // API
    API,
    // question
    Question,
    // Log
    Log
  }
  export enum TextType {
    // 页面
    Page,
    // 标题
    Title,
    // 文本
    Text,
    // 表格
    Table,
    // 代码
    Code
  }
}
