<template>
	<div class="leftNav">
		<button class="leftNav_back" @click="closeLeftNav"></button>
		<label class="searchInp">
			<i class="searchInp_icon"></i>
			<input type="text" placeholder="搜尋標籤" v-model="filterInp">
		</label>
		<div class="leftNav_title">推薦標籤</div>
		<ul class="leftNav_group">
			<li class="leftNav_item" v-for="(item, index) in showTag" :key="index" @click="navHandler(item)">
				# {{ item }}
			</li>
		</ul>
	</div>
</template>

<script>
module.exports={
	data() {
		return {
			filterInp: "",
			navList: []
		};
	},
	mounted() { },
	computed: {
		showTag() {
			this.navList=this.$store.state.tags;
			let showObj=[]
			if (this.filterInp!=="") {
				this.navList.forEach(element => {
					if (element.indexOf(this.filterInp)!==-1) {
						showObj.push(element);
					}
				});
			} else {
				showObj=this.navList
			}


			return showObj
		}
	},
	methods: {
		closeLeftNav() {
			this.$emit('close-leftnav', false);
		},
		navHandler(s){
			this.$emit('nav-handler', s);
		}
	},
};
</script>