<template>
	<div class="discussion_head">
		<button class="icon_back" @click="goExplore"></button>
		<div class="discussion_title">{{ disData.headTitle }}</div>
		<button class="icon_bar"></button>
	</div>
	<div class="discussion_body">
		<div class="discussion_h1">
			<span>{{ disData.title }}</span>
			<div class="discussion_iconBox">
				<button :class="['icon_heart', disData.isHeart ? 'on' : '']" @click="heartHandler"></button>
				<button :class="['icon_collect', disData.isCollect ? 'on' : '']" @click="collectHandler"></button>
			</div>
		</div>
		<div class="discussion_identity">
			<template v-if="disData.nameSrc == ''">
				<div class="discussion_identity_pic" :data-txt="disData.namePic" :style="'--bg:' + disData.nameColor">
				</div>
			</template>
			<template v-else>
				<img class="discussion_identity_pic" :src="'./images/' + disData.nameSrc" alt="">
			</template>

			<div class="discussion_identity_info">
				<div class="name">{{ disData.name }}</div>
				<div class="date">{{ disData.date }}</div>
			</div>
		</div>
		<div class="discussion_content">
			<span>文章內容</span>
			<textarea readonly>{{ disData.detail }}</textarea>
		</div>
		<div class="discussion_func">
			<button :class="['oldnew', isNew ? 'on' : '']" @click="oldnew">新到舊</button>
			<button :class="['oldnew', isNew ? '' : 'on']" @click="oldnew">舊到新</button>
		</div>
		<div class="discussion_group">
			<div class="discussion_item" v-for="(item, index) in showMsg" :key="index">
				<template v-if="item.nameSic == ''">
					<div class="pic" :data-txt="item.namePic"
						:style="'--bg:' + item.nameBg + ';--co:' + item.nameTx + ';'">
					</div>
				</template>
				<template v-else>
					<img class="pic" :src="'./images/' + item.nameSrc" alt="">
				</template>

				<div class="discussion_item_info">
					<div class="title">{{ item.title }}</div>
					<div class="date">{{ item.date }}</div>
					<div class="txt">{{ item.detail }}</div>
				</div>
				<div class="discussion_item_icon">
					<span v-if="item.isHeart">{{ item.heartCount }}</span>
					<button :class="['icon_heart', item.isHeart ? 'on' : '']" @click="msgHeart(item.msgId)"></button>
				</div>
			</div>
		</div>
	</div>
	<div class="discussion_footer">
		<input type="text" placeholder="留言" v-model="msg">
		<button class="icon_send" @click="send"></button>
	</div>
</template>

<script>
module.exports={
	data() {
		return {
			disData: {},
			msg: "",
			isNew: true,
		};
	},
	mounted() {
		if (this.$store.state.discussionData==null) {
			this.$router.push('/explore');
		} else {
			this.disData=this.$store.state.discussionData
		}
	},
	computed: {
		showMsg() {
			if (!this.disData.msg) return
			if (this.isNew) {
				return [...this.disData.msg].reverse();
			} else {
				return this.disData.msg
			}
		}
	},
	methods: {
		msgHeart(s) {
			let p=this.$store.state.discussionPage
			let lsData;
			let objData;
			let ii=this.disData.id;
			if (p=='explore') {
				lsData=localStorage.getItem('exploreData');
			} else if (p=='schedule') {
				lsData=localStorage.getItem('scheduleData');
			} else if (p=='discuss') {
				lsData=localStorage.getItem('discussData');
			}
			objData=JSON.parse(lsData);
			// 
			for (let i=0; i<objData.length; i++) {
				if (objData[i].id==ii) {
					for (let j=0; j<objData[i].msg.length; j++) {
						if (objData[i].msg[j].msgId==s) {
							objData[i].msg[j].isHeart=!this.disData.msg[j].isHeart
							this.disData.msg[j].isHeart=!this.disData.msg[j].isHeart
						}
					}
				}
			}
			if (p=='explore') {
				localStorage.setItem('exploreData', JSON.stringify(objData));
			} else if (p=='schedule') {
				localStorage.setItem('scheduleData', JSON.stringify(objData));
			} else if (p=='discuss') {
				localStorage.setItem('discussData', JSON.stringify(objData));
			}
		},
		getDate() {
			const currentDate=new Date();
			const year=currentDate.getFullYear();
			const month=currentDate.getMonth()+1;
			const day=currentDate.getDate();
			return year+"/"+month+"/"+day
		},
		collectHandler() {
			let p=this.$store.state.discussionPage
			let lsData;
			let objData;
			let i=this.disData.id;
			if (p=='explore') {
				lsData=localStorage.getItem('exploreData');
			} else if (p=='schedule') {
				lsData=localStorage.getItem('scheduleData');
			} else if (p=='discuss') {
				lsData=localStorage.getItem('discussData');
			}
			objData=JSON.parse(lsData);
			objData.forEach(element => {
				if (element.id==i) {
					element.isCollect=!this.disData.isCollect
					this.disData.isCollect=!this.disData.isCollect

				}
			});
			if (p=='explore') {
				localStorage.setItem('exploreData', JSON.stringify(objData));
			} else if (p=='schedule') {
				localStorage.setItem('scheduleData', JSON.stringify(objData));
			} else if (p=='discuss') {
				localStorage.setItem('discussData', JSON.stringify(objData));
			}
		},
		heartHandler() {
			let p=this.$store.state.discussionPage
			let lsData;
			let objData;
			let i=this.disData.id;
			if (p=='explore') {
				lsData=localStorage.getItem('exploreData');
			} else if (p=='schedule') {
				lsData=localStorage.getItem('scheduleData');
			} else if (p=='discuss') {
				lsData=localStorage.getItem('discussData');
			}
			objData=JSON.parse(lsData);
			objData.forEach(element => {
				if (element.id==i) {
					element.isHeart=!this.disData.isHeart
					this.disData.isHeart=!this.disData.isHeart
					if (element.isHeart) {
						element.thumb=element.thumb+1
					} else {
						element.thumb=element.thumb-1
					}
				}
			});
			if (p=='explore') {
				localStorage.setItem('exploreData', JSON.stringify(objData));
			} else if (p=='schedule') {
				localStorage.setItem('scheduleData', JSON.stringify(objData));
			} else if (p=='discuss') {
				localStorage.setItem('discussData', JSON.stringify(objData));
			}
		},
		oldnew() { this.isNew=!this.isNew },
		goExplore() { this.$router.push('/explore'); },
		send() {
			if (this.msg=="") return
			let p=this.$store.state.discussionPage;
			let lsData;
			let objData;
			let i=this.$store.state.discussionData.id;
			if (p=='explore') {
				lsData=localStorage.getItem('exploreData');
			} else if (p=='schedule') {
				lsData=localStorage.getItem('scheduleData');
			} else if (p=='discuss') {
				lsData=localStorage.getItem('discussData');
			}
			objData=JSON.parse(lsData);
			objData.forEach(element => {
				if (element.id==i) {
					element.msg.push({
						msgId: this.$store.state.discussionData.msg.length+1,
						namePic: "hi",
						nameSrc: "id_pic.jpg",
						nameBg: "rgba(246, 222, 151, 1)",
						nameTx: "rgba(0, 0, 0, 1)",
						title: "五條悟",
						date: this.getDate(),
						detail: this.msg,
						heartCount: 1,
						isHeart: false
					})
					this.disData.msg.push({
						msgId: this.$store.state.discussionData.msg.length+1,
						namePic: "hi",
						nameSrc: "id_pic.jpg",
						nameBg: "rgba(246, 222, 151, 1)",
						nameTx: "rgba(0, 0, 0, 1)",
						title: "五條悟",
						date: this.getDate(),
						detail: this.msg,
						heartCount: 1,
						isHeart: false
					})
				}
			});
			if (p=='explore') {
				localStorage.setItem('exploreData', JSON.stringify(objData));
			} else if (p=='schedule') {
				localStorage.setItem('scheduleData', JSON.stringify(objData));
			} else if (p=='discuss') {
				localStorage.setItem('discussData', JSON.stringify(objData));
			}
			this.msg=""
		}
	},
};
</script>