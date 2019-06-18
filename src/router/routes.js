//导入路由组件
import routesComponent from './routesComponent.js';

//导出路由配置
export default [
  
  {
  	path: '/',
  	name: 'Music',
  	component: routesComponent.Music,
  	redirect: '/found',
  	children: [
  	   {
  	   	path: '/found',
  	   	name: 'Found',
  	   	component: routesComponent.Found
  	   },
  	   
  	   {
  	   	path: '/videos',
  	   	name: 'Videos',
  	   	component: routesComponent.Videos
  	   },
  	   
  	   {
  	   	path: '/my',
  	   	name: 'My',
  	   	component: routesComponent.My
  	   },
  	   
  	   {
  	   	path: '/search',
  	   	name: 'Search',
  	   	component: routesComponent.Search
  	   },
  	   
	   {
	   	path: '/songs',
	   	name: 'Songs',
	   	component: routesComponent.Songs
	   }
  	]
  	
  },
  
{
	path: '/listening',
	name: 'Listening',
	component: routesComponent.Listening
}
  

  
]
