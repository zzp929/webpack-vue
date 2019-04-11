<template>
    <div id="text">
        {{text}}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                text: 'hello'
            }
        }
    }
</script>

<style>
    #text {
        color: red;
    }
</style>