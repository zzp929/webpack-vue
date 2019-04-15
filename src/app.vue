<template>
    <div id="text">
        {{text}}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                text: '11111'
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    #text {
        color: red;
    }
</style>