<template>
	<div>
		<div @click="changeName">name: {{ name }}</div>
		<div>{{ $store.state.shoppingCar.name }}</div>
		<div>nameComputed{{ nameComputed }}</div>
	</div>
</template>

<script>
	import { mapGetters, mapState, mapMutations } from 'vuex'

	export default {
		name: '',
		data() {
			return {}
		},
		computed: {
			...mapState('shoppingCar', ['name']),
			...mapGetters('shoppingCar', ['nameComputed'])
		},
		methods: {
			...mapMutations('shoppingCar', ['SET_NAME']),

			changeName() {
				this.SET_NAME('李四')

				// 或者不通过 mapMutations
				// this.$store.commit('shoppingCar/SET_NAME', '李四')
			}
		}
	}
</script>
