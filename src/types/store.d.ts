interface State {
  menus: MenusObj[];
  websites: WebsitesObj[];
  banners: BannerObj[];
  nickname: string;
  img: string;
  MdStatistics: MdStatisticsRes;
}

//menusObj
interface MenusObj {
  parentId: number;
  id: number;
  name: string;
  location: string;
  title: string;
  icon?: string;
  children?: MenusObj[];
}
interface NewMenus {
  [key: number]: MenusObj;
}
//websiteObj
interface WebsitesObj {
  id?: number;
  parentId?: number;
  title?: string;
  name?: string;
  description?: string;
  link?: string;
  icon?: string;
  children?: WebsitesObj[];
}
interface NewWebSites {
  [keu: number]: WebsitesObj;
}
//bannerObj
interface BannerObj {
  id: number;
  location: string;
  img: string;
  createTime: string;
  description: string;
}

//editBlogObj
interface editBlogObj {
  title: string;
  content: string;
}
