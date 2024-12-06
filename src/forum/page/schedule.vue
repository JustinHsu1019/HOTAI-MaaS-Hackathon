<template>

	<div class="content_group">
		<div class="content_item" v-for="(item, index) in shwoData" :key="index" @click="itemHandler(item)">
			<div class="content_item_info">
				<div class="content_item_title">{{ item.title }}</div>
				<div class="content_item_name">
					<span v-if="item.nameSrc == ''" class="txt" :data-txt="item.namePic"
						:style="'--nameBg:' + item.nameColor"></span>
					<img v-if="item.nameSrc !== ''" :src="'./images/' + item.nameSrc" alt="">
					{{ item.name }}
				</div>
				<div class="content_item_detail">{{ item.detail }}</div>
			</div>
			<div class="content_item_pic" v-if="item.picSrc">
				<img :src="'./images/' + item.picSrc" alt="">
			</div>
			<div class="content_item_foot">
				<ul class="tag">
					<template v-if="item.tag.length > 3">
						<li class="tag_item">{{ item.tag[0] }}</li>
						<li class="tag_item">{{ item.tag[1] }}</li>
						<li class="tag_item">{{ item.tag[2] }}</li>
						<li class="tag_item _num">+{{ item.tag.length - 3 }}</li>
					</template>
					<template v-else>
						<li class="tag_item" v-for="(itemTab, index) in item.tag">{{ itemTab }}</li>
					</template>
				</ul>
				<div class="iconBox">
					<i class="iconBox_icon icon_thumb" :data-num="item.thumb"></i>
					<i class="iconBox_icon icon_collect"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
module.exports={
	data() {
		return {
			dataList: []
		};
	},
	mounted() {
		let scheduleLsData=localStorage.getItem('scheduleData');
		if (!scheduleLsData) {
			localStorage.setItem('scheduleData', JSON.stringify(this.$store.state.scheduleData));
			this.dataList=this.$store.state.scheduleData;
		} else {
			this.dataList=JSON.parse(scheduleLsData);
		}
	},
	computed: {
		shwoData() {
			let objData=[];
			let filter=this.$store.state.inpFilter;
			let tagFilter=this.$store.state.tagFilter;
			if (tagFilter!=="") {
				this.dataList.forEach(element => {
					if (element.tag.indexOf(tagFilter)!==-1) {
						objData.push(element);
					}
				});
				this.$store.dispatch('setShowCount', objData.length);
				return objData;
			}
			if (filter!=="") {
				this.dataList.forEach(element => {
					if (element.title.indexOf(filter)!==-1) {
						objData.push(element);
					}
				});
			} else {
				objData=this.dataList
			}
			return objData;
		}
	},
	methods: {
		itemHandler(obj) {
			this.$store.dispatch('setDiscussionData', {
				id: obj.id,
				headTitle: "自由討論區",
				title: obj.title,
				name: obj.name,
				namePic: obj.namePic,
				nameSrc: obj.nameSrc,
				nameColor: obj.nameColor,
				date: "2024/09/22",
				detail: obj.detail,
				tag: obj.tag,
				msg: obj.msg,
				isCollect: obj.isCollect,
				isHeart: obj.isHeart,
			});
			this.$store.dispatch('setDiscussionPage', 'schedule');
			this.$router.push('/discussion');
		},
	},
};
</script>