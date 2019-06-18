<template>
	<div class="songs">
	  		
		<div class="head clearfix">
			<div class="return">
				<div class="icon" @click="goClick"></div>
			</div>

			<h1>歌单</h1>
			
			<div class="songmsg clearfix">
			    <div class="img fl">
				   <img class="auto-img" :src="getSongs.songListPic"/>
			   </div>
			   
			   <p class="title fl">{{getSongs.songListName}}</p>
			   
			   
			</div>
			
			<div class="text fl">{{getSongs.songListDescription}}</div>
            <div class="box fl"></div>
		</div>
		
		<div class="songlist">
			<div class="listtitle">歌曲列表</div>
			
			<div class="song clearfix" v-for="(item, index) in getSongs.songs" :key="index" 
				@click="goState({name: 'Listening', query: {id: item.id, index: index}})">
				<div class="number fl">{{+index+1}}</div>
				<div class="msg fl">
					<div class="name">{{item.name}}</div>
					<div class="songname">{{item.singer}}</div>
				</div>
			</div>

		</div>
			
	</div>
</template>

<script>
	
	export default{
		name: 'songs',
		
		data(){
			return{
				getSongs: '',
				Songs: []
			}
		},
			
		created() {
//			console.log(this.$route.query.id);
			
			var songListId = this.$route.query.id;
			
		    this.axios.post('https://api.itooi.cn/music/netease/songList?key=579621905&id='+songListId+'&limit=10&offset=0').then((b) => {
//				 console.log('b',b.data.data);

				 this.getSongs = b.data.data;

				 this.Songs = b.data.data.songs;
				//  console.log('this.songs' , this.Songs);

				 localStorage.setItem('songs',JSON.stringify(this.Songs));
			});
						
		},
		
		methods: {
			goState(path){
				this.$router.push(path);
			},

			goClick() {
				this.$router.go(-1);
			}
		}
	}
</script>

<style lang="less" scoped>
 .songs{
 	  width: 100%;
 	  	
 	.head{
 		width: 100%;
		color: #fff;
		background: url(../assets/zu.jpg) no-repeat;
 	    background-size: 100%;
 	   .return {
		float: left;
		width: 1.6rem;
		text-align: center;
		padding-left: 0.2rem;
		 .icon{
		float: left;
		height: 1.17333rem;
		line-height: 1.17333rem;
		width: 0.4rem;
		background: url(../assets/return.png) no-repeat;
		background-size: 125%;
		background-position: 50%;
		}
	  }
	  
	   h1{
		width: 70%;
		height: 1.17333rem;
		line-height: 1.17333rem;
		text-align: center;
		font-size: 20px;
	  }
	  
	  .songmsg{
	  	margin-left: 0.3rem;
	  	margin-bottom: 0.5rem;
	  	img{
	  	width: 2.2rem;
	  	height: 2.2rem;
	  }
	  
	  .title{
	  	width: 3rem;
	  	padding-left: 0.2rem;
	  	font-size: 20px;
	  	margin-top: 0;
	  }
	  	  	
	 }
	 
	  .text{
	  	font-size: 14px;
	  	padding: 0 .3rem .3rem;
	  	display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;

	  }

	  .box{
		  width: 100%;
		  height: 0.5rem;
		  background: transparent;

	  }

 	}
 	
 	.songlist{
 		.listtitle{
 			font-size: 16px;
             padding: 0.2rem;
             border-bottom: 1px solid #F1F1F1;
 		}
 		
 		.song{
 			.number{
 			  color: #999999;
 			  font-size: 18px;
 			  padding: 0.2rem;
 			  text-align: left;
 			  width: 0.34rem;
 			}
 		}
 		
 		.msg{
 			padding: 0.15rem 0;
 			.name{
 				width: 5rem;
 				font-size: 16px;
 				display: -webkit-box;
               -webkit-line-clamp: 1;
               -webkit-box-orient: vertical;
                word-break: break-all;
                text-overflow: ellipsis;
                overflow: hidden;
 			}
 			
 			.songname{
 				color: #999999;
 			}
 		}
 	}

 }
</style>