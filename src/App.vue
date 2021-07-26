<template>
    <div id="container">
        <h1>{{initData}}</h1>
    </div>
</template>
<script>
export default {
    data(){
        return{
            initData:'Vue开发环境运行成功'
        }
    }
}
</script>

<style scoped>
#container {
	display: flex;
	color: red;
}


</style>