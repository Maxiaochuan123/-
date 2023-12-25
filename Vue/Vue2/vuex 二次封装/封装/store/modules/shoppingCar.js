export default {
	namespaced: true, // 必须开启命名空间
	state: {
		name: '张三'
	},
	getters: {
		nameComputed(state) {
			return state.name + '^'
		}
	},
	mutations: {
		SET_NAME(state, val) {
			state.name = val
		}
	}
}
