<template>
	<div class="listening">
	
	 <audio :src="getSong.url" ref="size" autoplay="autoplay" @canplay="getDuration" @timeupdate="updateTime"></audio>
	 
	  <!--头部-->
	  <div class="head clearfix">
		<div class="return">
			<div class="icon" @click="goClick"></div>
		</div>

		<!--歌名-->
		<div class="title">
			<div class="name">{{getSong.name}}</div>
			<div class="nother">{{getSong.singer}}</div>
		</div>
		
		<!--暂停/播放杆-->
		<div class="things" ref="things">
	 	  <img class="auto-img" src="../assets/b2_.png"/>	
	 	</div>
	 </div>
	 
	 <!--转盘-->
	 <div class="disc">
	 		 	
	 	<div class="discimg" ref="disc">
	 		<div class="img">
	 			<img ref="img" class="auto-img imgsize" :src="getSong.pic"/>
	 		</div>
	 	</div>

	 </div>
	 
	 <!--歌曲进度条-->
	 <div class="songprogress">
	 	<!--开始时间-->
	 	<div class="time time2">{{currenttime}}</div>
	 	<div id="taio"></div>
		<div id="round" ref="round"></div>
		<div id="scroll" ref="scroll"></div>
	 	<!--结束时间-->
	 	<div class="time time2">{{duration}}</div>
	 </div>
	 
	 
	 <!--按钮-->
	 <div class="btn">
	 	<div class="flex">
	 		<div class="flex-item">
	 			<img class="auto-img" src="../assets/bar.png"/>
	 		</div>
	 		<div class="flex-item" @click="last">
	 			<img class="auto-img" src="../assets/last.png"/>
	 		</div>
	 		<div class="flex-item" @click="playMusic">
	 			<img ref="imgbtn" class="auto-img" src="../assets/pause.png"/>
	 		</div>
	 		<div class="flex-item" @click="next">
	 			<img class="auto-img" src="../assets/next.png"/>
	 		</div>
	 		<div class="flex-item">
	 			<img class="auto-img" src="../assets/b25.png"/>
	 		</div>
	 	</div>
	 </div>
	
	</div>
</template>

<script>

	
	export default{
		name: 'listening',
		
		data() {
			return{
               getSong: [],
               //歌曲总时长
               duration: '',
               //当前时间
			   currenttime: '',
			   song: [],
			   index: 0
			}
		},
		
		
	   created() {
			// console.log(this.$route.query);		
			this.songId = this.$route.query.id;

			this.index = this.$route.query.index;

		    this.axios.post('https://api.itooi.cn/music/netease/song?key=579621905&id='+ this.songId).then((c) => {
//	 		console.log('c', c.data.data);
	 		this.getSong = c.data.data;
		 });
		 
		   var songs = localStorage.getItem('songs');

		   songs = songs == undefined ? [] : JSON.parse(songs);

		//    console.log('songs',songs);

		   this.song = songs;


			
	   },
		
		methods: {
			goState(path){
				this.$router.push(path);
			},

			goClick() {
				this.$router.go(-1);
			},
			
			//播放/暂停		
			playMusic(){
				//获取音频标签
				var audio1 = this.$refs.size;
				//获取转盘
				var disc = this.$refs.disc;
				//获取img标签
				var imgbtn = this.$refs.imgbtn;

				var rounds = this.$refs.round;

				var scrolls = this.$refs.scroll;

				var time1=setInterval(()=>{
				
				let a=(audio1.currentTime/audio1.duration)*277.5
								scrolls.style.width=a+'px'
								rounds.style.left=(43+a)+'px'
				},100)

				if(audio1.paused){
					let a=(audio1.currentTime/audio1.duration)*277.5
					scrolls.style.width=a+'px'
					rounds.style.left=(43+a)+'px'

					audio1.play();
					disc.style.animationPlayState = 'running';
					
					this.$refs.things.style.transform = 'rotate(0deg)'//指针旋转-45deg

					imgbtn.src = require('../assets/pause.png');
					
				}else{
					let a=(audio1.currentTime/audio1.duration)*277.5
					scrolls.style.width=a+'px'
					rounds.style.left=(43+a)+'px'

					audio1.pause();
					disc.style.animationPlayState = 'paused';
					
					this.$refs.things.style.transform = 'rotate(-45deg)'//指针旋转-45deg
					
					
					imgbtn.src = require('../assets/play.png');
					
				
				}

			},
			
			getDuration(){
				var disc = this.$refs.disc;

				var audio1 = this.$refs.size;

				var rounds = this.$refs.round;

				var scrolls = this.$refs.scroll;
				
				disc.style.animationPlayState = 'running';

				var time1=setInterval(()=>{

				let a=(audio1.currentTime/audio1.duration)*277.5
								scrolls.style.width=a+'px';
								rounds.style.left=(43+a)+'px';
				},100)
								
				var duration = this.$refs.size.duration;
//				console.log('duration',duration);
				
				var fen = parseInt(duration / 60);
				var miao = parseInt(duration % 60);
				
				miao = miao < 10 ? '0' + miao : miao;
				fen = fen < 10 ? '0' + fen : fen;
				
				this.duration = fen + ':' + miao;
//				console.log('this.duration',this.duration);			
			},
			
			updateTime(e){
//				console.log('e',e.target.currentTime);
                this.currenttime = e.target.currentTime;
                
                if(this.currenttime % 60 < 10){
                	this.currenttime = '0' + parseInt(this.currenttime / 60) + ':0' + parseInt(this.currenttime % 60)
                }else{
                	this.currenttime = '0' + parseInt(this.currenttime / 60) + ':' + parseInt(this.currenttime % 60)
                }
				
			},
			
			next() {
                var index = this.index + 1;
				this.index = index;
				var num = this.song[index];
				var id = num.id;

				this.axios.post('https://api.itooi.cn/music/netease/song?key=579621905&id='+ id).then((d) => {
	 		    // console.log('d', d.data.data);
				 this.getSong = d.data.data;
				});
			},

			last() {
				var index = this.index - 1;
				this.index = index;

				if(this.index < 0){
					return;
				}
				var num = this.song[index];
				var id = num.id;

				this.axios.post('https://api.itooi.cn/music/netease/song?key=579621905&id='+ id).then((d) => {
	 		    // console.log('d', d.data.data);
				 this.getSong = d.data.data;
				});

			}


		}
	}
</script>

<style lang="less" scoped>

 .listening{
 	position: fixed;
 	height: 100%;
 	width: 100%;
 	background: url(../assets/bdk1.png) no-repeat;
 	background-size: cover;
 	.head{
 		width: 100%;
 		color: #fff;
      .return{
      	float: left;
		width: 0.6rem;
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
      
    .title{
    	padding-top: 0.2rem;
		width: 86%;
		text-align: center;
		.name{
			font-size: 18px;
		}
		.nother{
			font-size: 14px;
		}
	  }
	
	.things{
 		width: 2rem;
 		position: absolute;
 		left: 50%;
 		top: 5%;
 		z-index: 10;
 		margin-bottom: 1rem;
 		margin-left: -0.5rem;
 		transform-origin: 20% 22.5%;
 		transition: all 0.4s ease-in-out;

 	  }
 	       
 	}
 	
 	.disc{
 		width: 100%;
 		margin: 1.3rem 0; 		
 		.discimg{
 			margin: 0 auto;
 			height: 5rem;
 			width: 5rem;
 			background: url(../assets/b0h.png) no-repeat;
 			background-size: 100%;
 			position: relative;
 			animation: r 20s linear 0s infinite paused;
 			
 			.img{
 				width: 3.30rem;
 				height: 3.30rem; 				
 				position: absolute;
 				left: 50%;
 				top: 50%;
                margin-top: -1.65rem;
                margin-left: -1.65rem;
			
 			 .imgsize{
 			 	border-radius: 50%;
 			 }	
 			}

 		}

 	}
 	
 	@keyframes r{
 		from{
 			transform: rotate(0deg);
 		}
 		to{
 			transform: rotate(360deg);
 		}
 	}
 	
 	.songprogress{
 		// width: 100%;
 		color: #8E8F91;
 		display: flex;
		 padding: 0.3rem 0.1rem;
		 position: relative;
 		.time{
 			font-size: 14px;
 			width: 8%;
		 }

		 .time2{
			 margin-right: 0.1rem
		 }
		 
		 	#taio{
			margin: 0 0.1rem;
	    position: relative;
	    top: 0.15rem;
	    width: 79%;
	    height: 0.05333rem;
	    background: #67686A;
	}
	
	#scroll{
	    position: absolute;
	    top: 0.45rem;
	    left: 0.79rem;
	    // width: 70%;
	    height: 0.05333rem;
			background: red;
		
	}
	#round{
		background: #fff;
		border-radius: 0.13333rem;
		position: absolute;
	  top: 0.35rem;
	  left: 0.78rem;
		width:  0.25rem;
		height:  0.25rem;
		z-index: 999;
		
	}
 	}
 	
 	.btn{
 		width: 100%;
 		.flex{
 		  display: flex;
 		  width: 100%;
 		  .flex-item{
 		  	width: 1rem;
 		  	margin: 0.2rem;
 		  }
 		  
 		}
 	}

}
</style>