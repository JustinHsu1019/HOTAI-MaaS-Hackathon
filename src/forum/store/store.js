// 創建 Vuex Store
const store=Vuex.createStore({
	state: {
		version:1.16,
		exploreData: [
			{
				id: 0,
				title: "日本行五天六夜推薦景點？？",
				name: "煞氣的鯊魚",
				namePic: "",
				nameSrc:"",
				nameColor: "rgba(29, 115, 244, 1)",
				detail: "哈囉各位大大，本鯊魚這次要到日本吃生魚片，不知道大家有沒有推薦的餐廳......",
				tag: ["自由行", "六日遊", "小資旅遊", "假資料1"],
				thumb: 256,
				picSrc: "explore_pic1.jpg",
				msg: [],
				isCollect: true,
				isHeart: true,
				date: "2024/09/22",
			},
			{
				id: 1,
				title: "台北在地小吃分享",
				name: "網紅我最紅",
				namePic: "",
				nameSrc:"",
				nameColor: "rgba(30, 30, 30, 1)",
				detail: "我是你們最愛的網紅！紛絲好久不見，今天要為大家帶來的是......",
				tag: ["輕旅行", "府中站", "在地小吃", "假資料1", "假資料2", "假資料3", "假資料4", "假資料5", "假資料6"],
				thumb: 500,
				picSrc: "explore_pic2.jpg",
				msg: [],
				isCollect: false,
				isHeart: false,
				date: "2024/09/22",
			},
		],
		scheduleData: [
			{
				id: 0,
				title: "我很喜歡這次一加一推薦的......",
				name: "壹人粉",
				namePic: "1+1",
				nameSrc:"",
				nameColor: "rgba(145, 166, 85, 1)",
				detail: "一加一真的是一生推，我覺得他們拍的影片都品味，景點安排也很舒服，不知道...",
				tag: ["自由行", "六日遊", "小資輕旅", "測試"],
				thumb: 256,
				picSrc: "",
				msg: [],
				isCollect: false,
				isHeart: false,
				date: "2024/09/22",
			},
			{
				id: 1,
				title: "這次去沖繩遇到kar特！",
				name: "網紅我最紅",
				namePic: "網",
				nameSrc:"",
				nameColor: "rgba(255, 8, 8, 1)",
				detail: "我是你們最愛的網紅！這次太幸運拉，居然偶遇Kar特，他人超好的還願意跟我合照......",
				tag: ["輕旅行", "沖繩", "網紅", "假資料1", "假資料2", "假資料3", "假資料4", "假資料5", "假資料6"],
				thumb: 500,
				picSrc: "",
				msg: [],
				isCollect: false,
				isHeart: false,
				date: "2024/09/22",
			},
			{
				id: 2,
				title: "那個女生今天到我家的店？？",
				name: "這個男生",
				namePic: "boy",
				nameSrc:"",
				nameColor: "rgba(66, 25, 107, 1)",
				detail: "哈囉各位大大，有人知道那個女生這次影片中的店是我家的店嗎？......",
				tag: ["請益", "那個女生", "提問", "假資料1", "假資料2",],
				thumb: 50,
				picSrc: "schedule_pic1.jpg",
				msg: [],
				isCollect: false,
				isHeart: false,
				date: "2024/09/22",
			},
			{
				id: 3,
				title: "大家喜歡去趣app嗎？",
				name: "去趣小幫手",
				namePic: "",
				nameSrc:"",
				nameColor: "rgba(0, 157, 223, 1)",
				detail: "我是去趣小幫手，不知道大家使用去趣app還習慣嗎？......",
				tag: ["請益", "小助手", "規劃行程", "假資料1", "假資料2",],
				thumb: 520,
				picSrc: "schedule_pic2.jpg",
				msg: [],
				isCollect: false,
				isHeart: false,
				date: "2024/09/22",
			},
		],
		discussData: [
			{
				id: 0,
				title: "韓國行五天六夜推薦景點？？",
				name: "煞氣的鯊魚",
				namePic: "",
				nameSrc:"",
				nameColor: "rgba(29, 115, 244, 1)",
				detail: "哈囉各位大大，本鯊魚這次要到韓國吃生章魚腳，不知道大家有沒有推薦的餐......",
				tag: ["自由行", "六日遊", "小資輕旅", "假資料1"],
				thumb: 256,
				picSrc: "discuss_pic1.jpg",
				msg: [],
				isCollect: false,
				isHeart: false,
				date: "2024/09/22",
			},
			{
				id: 1,
				title: "台北小吃一日遊行程安排",
				name: "網紅我最紅",
				namePic: "網",
				nameSrc:"",
				nameColor: "rgba(255, 8, 8, 1)",
				detail: "我是你們最愛的網紅！紛絲好久不見，今天要為大家帶來的是......",
				tag: ["輕旅行", "府中站", "在地小吃", "假資料1", "假資料2", "假資料3", "假資料4", "假資料5", "假資料6"],
				thumb: 500,
				picSrc: "discuss_pic2.jpg",
				msg: [],
				isCollect: false,
				isHeart: false,
				date: "2024/09/22",
			},
			{
				id: 2,
				title: "請問大家如何規劃行程的呢？",
				name: "匿名",
				namePic: "",
				nameSrc:"",
				nameColor: "rgba(217, 217, 217, 1)",
				detail: "哈囉各位大大，我是安排行程新手，最近剛出新手村......",
				tag: ["請益", "個人行", "規劃行程", "假資料1", "假資料2",],
				thumb: 50,
				picSrc: "",
				msg: [],
				isCollect: false,
				isHeart: false,
				date: "2024/09/22",
			},
			{
				id: 3,
				title: "大家喜歡去趣app嗎？",
				name: "去趣小幫手",
				namePic: "",
				nameSrc:"",
				nameColor: "rgba(0, 157, 223, 1)",
				detail: "我是去趣小幫手，不知道大家使用去趣app還習慣嗎？......",
				tag: ["請益", "小助手", "規劃行程", "假資料1", "假資料2",],
				thumb: 520,
				picSrc: "schedule_pic2.jpg",
				msg: [],
				isCollect: false,
				isHeart: false,
				date: "2024/09/22",
			},
		],
		inpFilter: "",
		tags: [],
		tagFilter: "",
		showCount: 0,
		discussionPage: "",
		discussionData: null
		// 			headTitle: "自由討論區",
		// 			title: "大家喜歡去趣app嗎？",
		// 			name: "去趣小幫手",
		// 			date: "2024/09/22",
		// 			namePic: "趣",
		// 			nameColor: "rgba(0, 157, 223, 1)",
		// 			detail: `咦～這邊有沒有剛加入去趣的新成員呢？
		// 有的話舉手🙋
		// 這次小幫手要來搜集大家使用的想法跟心得了😍
		// 如果大家喜歡去趣以及和泰的服務，
		// 請記得不吝嗇給我們五顆星喔🌟
		// 有任何問題也歡迎到客服來找小幫手，
		// 我們會盡快回覆你的！`,
		// 			tag: ["請益", "小助手", "規劃行程", "假資料1", "假資料2",],
		// 			thumb: 520,
		// 			picSrc: "schedule_pic2.jpg",
		// 			msg: [
		// 				{
		// 					namePic: "艾利",
		// 					nameBg: "rgba(246, 222, 151, 1)",
		// 					nameTx: "rgba(0, 0, 0, 1)",
		// 					title: "高雄地頭蛇艾莉西雅",
		// 					date: "2024/09/22",
		// 					detail: "舉手！！有了去趣我不用在忠孝東路走九遍了，他推薦我好多新景點，下次要去重新路一段！",
		// 					heartCount: 100,
		// 					isHeart: true
		// 				}
		// 			]

	},
	mutations: {
		set_InpFilter(state, str) { state.inpFilter=str },
		set_TagFilter(state, str) { state.tagFilter=str },
		reset_Tags(state, arr) { state.tags=arr },
		set_Tags(state, str) { state.tags.push(str) },
		set_ShowCount(state, num) { state.showCount=num },
		set_DiscussionData(state, obj) { state.discussionData=obj },
		set_DiscussionPage(state, str) { state.discussionPage=str },
	},
	actions: {
		setInpFilter({ commit }, str) {
			commit('set_InpFilter', str);
		},
		setTagFilter({ commit }, str) {
			commit('set_TagFilter', str);
		},
		resetTags({ commit }, arr) {
			commit('reset_Tags', arr);
		},
		setTags({ commit }, str) {
			commit('set_Tags', str);
		},
		setShowCount({ commit }, num) {
			commit('set_ShowCount', num);
		},
		setDiscussionData({ commit }, obj) {
			commit('set_DiscussionData', obj)
		},
		setDiscussionPage({ commit }, str) {
			commit('set_DiscussionPage', str)
		}
	},
});

