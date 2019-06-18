<template>
	<div class="videos">
		
        <div class="title">
              <div>推荐MV</div>
        </div>
		
		<!--视频-->
		<div class="mp4">			
			<div class="mp4msg" v-for="(item,index) in getMv" :key="index">
			  <video controls="controls">
			    <source :src="item.url" type="audio/mp4">
		     </video>
		    
		      <div class="videosinger clearfix">
		    	  <div class="singerimg fl">
		    		  <img class="auto-img yuan" :src="item.pic"/>
		    	  </div>
		    	
		    	  <div class="singername fl">{{item.singer}}</div>
		    	
		    	  <div class="videotitle fr">{{item.name}}</div>
		      </div>
		    </div>
		    
		    
		</div>
		
	</div>
</template>

<script>
	import { Search } from 'vant';
	
	export default{
		name: 'videos',
		
		data() {
			return{
              getMv: ''
			}
		},
		
		components:{
	       [Search.name]:Search,
	
	   },
	   	   
	    created(){
          this.axios.post('https://api.itooi.cn/music/netease/topMvList?key=579621905&limit=5&offset=0').then((d) => {
//	 		console.log('d',d.data.data);
	 		this.getMv = d.data.data;
	 	});
		},
		
	}
	

</script>

<style lang="less" scoped>
.videos{
  .title{
  	 color: #FFF;

  	 font-size: .3rem;
     font-weight: 500;
     width: 100%;
     background-color: #FF1E1B;
     div{
     	text-align: center;
  	    height: 0.8rem;
     	line-height: 0.8rem;
     }
  }

 .mp4{
  	margin-bottom: 1rem; 
  video{
  	/*border-radius: 0.2rem;*/
  	margin: .2rem;
  	width: calc(100% - .4rem);
  }
 
  .videosinger{
  	margin: 0 .2rem;

  	.singerimg{
  		width: .6rem;
  	  .yuan{
  	  	border-radius: 50%;
  	  }		
  	}
  	
  	.singername{
  		margin-left: .1rem;
  		font-size: .25rem;
  		height: .6rem;
  		line-height: .6rem;
  	}
  	
  	.videotitle{
  	 font-size: .25rem;
     font-weight: 500;
     height: .6rem;
     line-height: .6rem;
    }
  }
 }
 
}
</style>