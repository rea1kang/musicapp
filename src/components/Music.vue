<template>
	<div class="music">
	   
	   <!-- 路由 -->
	   <router-view></router-view>


	   <!--底部导航-->
	   <div class="tab clearfix">
	         <div class="fl">
	         	<router-link class="icon1" to="/found"></router-link>
	         	<div>发现</div>
	         </div>
	         <div class="fl">
	         	<router-link class="icon2" to="/videos"></router-link>
	         	<div>视频</div>
	         </div>
	         <div class="fl">
	         	<router-link class="icon4" to="/search"></router-link>
	         	<div>搜索</div>
	         </div>

	   </div>
	</div>
</template>

<script>	
	export default{
		name: 'music',
		
	}
</script>

<style lang="less" scoped>
  .music{
  	font-size: .2rem;
    .tab{
      color: #ABABAB;
      width: 100%;
      background-color: #FFF;
      position: fixed;
      bottom: 0;
      left: 0;
      
      .active{
      	color: #FF1E1B;
      }
      >div{
      	color: #FF1E1B;
      	width: 33.333%;
      	text-align: center;
      	padding: 0.1rem 0;

      	 .icon1{
      	  display: block;
          width: 0.5rem;
          height: 0.5rem;
          margin: 0 auto 0.04rem;
          background-color: #FF1E1B;
          background: url(../assets/t_actionbar_discover_normalred.png) no-repeat;
		  background-size: cover;
      	}
      	 .icon2{
      	  display: block;
          width: 0.5rem;
          height: 0.5rem;
          margin: 0 auto 0.04rem;
          background: url(../assets/t_actionbar_video_normalred.png) no-repeat;
		  background-size: cover;
      	}
      	 .icon3{
      	  display: block;
          width: 0.5rem;
          height: 0.5rem;
          margin: 0 auto 0.04rem;
          background: url(../assets/t_actionbar_music_normalred.png) no-repeat;
		  background-size: cover;
      	}
      	.icon4{
      	  display: block;
          width: 0.5rem;
          height: 0.5rem;
          margin: 0 auto 0.04rem;
          background: url(../assets/t_actionbar_video_search.png) no-repeat;
		  background-size: cover;
      	}
      }
    }
  
}
</style>