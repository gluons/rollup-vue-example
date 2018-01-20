<template>
	<div
		class="hello"
		:style="allStyles"
	>
		Hello, Rollup Vue!
	</div>
</template>

<script>
const styles = {
	'font-size': '16px'
};

export default {
	name: 'Hello',
	data() {
		return {
			allStyles: {
				...styles,
				'font-weight': 'bold'
			}
		};
	}
};
</script>

<style scoped>
.hello {
	color: red;
	font-feature-settings: 'liga' 1;
}
</style>
