<template>
	<div class="search">

		<form>
			<van-search v-model="keyWord" placeholder="请输入搜索关键词" show-action>
				<div slot="action" @click="search">搜索</div>

			</van-search>
		</form>
		<img v-show="show" class="auto-img" src="../assets/b86.png" />
		<div class="song clearfix" v-for="(item, index) in searchProducts" :key="index" 
				@click="goState({name: 'Listening', query: {id: item.id}})">
				<div class="msg fl">
					<div class="name">{{item.name}}</div>
					<div class="songname">{{item.singer}}</div>
				</div>
		</div>
	</div>
</template>

<script>
	import { Search, Toast } from 'vant';
	
	export default {
		name: 'Search',

		components: {
			[Search.name]: Search,
			[Toast.name]: Toast
		},

		data() {
			return {
				keyWord: '',
				searchProducts: [],
				show: true
			}
		},

		methods: {
			goClick() {
				this.$router.go(-1);
			},

			goState(path) {
				this.$router.push(path);
			},

			search() {
				if(this.keyWord == '' || this.keyWord == undefined) {
					this.$toast('搜索关键不能为空');
					return;

				}
				
				this.searchProducts = [];
				
				var match = new RegExp('(' + this.keyWord + ')', 'img');
				//console.log('match',match);
				this.axios.get('https://api.itooi.cn/music/netease/search?key=579621905&s=' + match + '&type=song&limit=9&offset=0').then((result) => {
//				console.log('result.data.data',result.data.data);
				this.searchProducts = result.data.data;
				
				this.show = false;

				})
			}

		}
	}
</script>

<style lang="less" scoped>
	.search {
		width: 100%;
	    .song{ 			
 			.msg{
 			padding: 0.2rem 0.3rem;
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