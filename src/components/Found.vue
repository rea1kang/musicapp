<template>
	<div class="found">
		
		<div class="logo fl">
            <img class="auto-img" src="../assets/arc.png"/>
		</div>
		
		<!--轮播图-->
      <van-swipe class="banner" :autoplay="3000" indicator-color="red">
        <van-swipe-item><img class="auto-img" src="../assets/banner1.png"></van-swipe-item>
        <van-swipe-item><img class="auto-img" src="../assets/banner2.png"></van-swipe-item>
        <van-swipe-item><img class="auto-img" src="../assets/banner3.png"></van-swipe-item>
        <van-swipe-item><img class="auto-img" src="../assets/banner4.png"></van-swipe-item>
      </van-swipe>
       
       <!--导航栏-->
	   <div class="tab clearfix">
	         <div class="fl">
	         	<router-link class="icon1" to=""></router-link>
	         	<div>每日推荐</div>
	         </div>
	         <div class="fl">
	         	<router-link class="icon2" to=""></router-link>
	         	<div>歌单</div>
	         </div>
	         <div class="fl">
	         	<router-link class="icon3" to=""></router-link>
	         	<div>排行榜</div>
	         </div>
	         <div class="fl">
	         	<router-link class="icon4" to=""></router-link>
	         	<div>电台</div>
	         </div>
	   </div>
	   
	   <!--歌单-->
	   <div class="songs clearfix">
	      <div class="title fl">推荐歌单</div>
	      
	      <div class="songlist fl" v-for="(item,index) in songlist" :key="index" 
	      	@click="goState({name: 'Songs', query: {id: item.id}})">
	      	
	         <img class="auto-img" :src="item.coverImgUrl"/>

	         <div class="text">{{item.title}}</div>
	      </div>
	      	      
	    </div>
	    
	    
	    
      
	</div>
</template>

<script>
	import { Search, Swipe, SwipeItem } from 'vant';
	
	export default{
		name: 'found',
		
		data(){
			return{
	           songlist: ''
			};
		},
		
		components:{
			[Search.name]:Search,
			[Swipe.name]:Swipe,
			[SwipeItem.name]:SwipeItem
		},
		
		created(){
            this.axios.post('https://api.itooi.cn/music/netease/highQualitySongList?key=579621905&cat=华语&limit=6').then((a) => {
//				console.log('a',a.data.data.playlists);
				this.songlist = a.data.data.playlists;
			});
		},
		
		methods:{
			goState(path){
				this.$router.push(path);
			}
		}
		
	}
</script>

<style lang="less" scoped>
 .found{
 	.logo{
 		width: 2.5rem;
 		margin: .1rem .18rem;
 	}
 	
 	.banner{
 		width: calc(100% - .4rem);
 		border-radius: 0.155rem;
 		margin: .2rem;
 	}
 	
 	 .tab{
      color: #787878;
      width: 100%;
      background-color: #FFF;
      padding: .2rem 0;
      border-bottom: 1px solid #F7F7F7;
      >div{
      	width: 25%;
      	text-align: center;
      	padding: 0.1rem 0;

      	 .icon1{
      	  display: block;
          width: 0.8rem;
          height: 0.8rem;
          margin: 0 auto;
          background: url(../assets/logo1.png) no-repeat;
		  background-size: cover;
		  margin-bottom: .15rem;
      	}
      	 .icon2{
      	  display: block;
          width: 0.8rem;
          height: 0.8rem;
          margin: 0 auto;
          background: url(../assets/logo6.png) no-repeat;
		  background-size: cover;
		  margin-bottom: .15rem;
      	}
      	 .icon3{
      	  display: block;
          width: 0.8rem;
          height: 0.8rem;
          margin: 0 auto;
          background: url(../assets/logo3.png) no-repeat;
		  background-size: cover;
		  margin-bottom: .15rem;
      	}
      	.icon4{
      	  display: block;
          width: 0.8rem;
          height: 0.8rem;
          margin: 0 auto;
          background: url(../assets/logo4.png) no-repeat;
		  background-size: cover;
		  margin-bottom: .15rem;
      	}
      }
    }
    
    .songs{
    	margin-bottom: 1rem;
    	
      .title{
      	font-size: .3rem;
      	margin: .2rem;
      	font-weight: 500;
      	width: 100%;
      }
      
      .songlist{
      	width: 27%;
      	padding: .2rem .2rem;
      	img{
      	  border-radius: 0.1rem;
      	}
      	.text{
      	  height: .7rem;
          padding-top: .1rem;
         
      	}
      }
    }
 	
 }

</style>