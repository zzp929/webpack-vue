import Vue from 'vue'

new Vue({
    el: '#root',
    template: `
    <div>
    <p>name:{{firstName+' '+lastName}}</p>
    <p>{{name}}</p>
    <p>{{getName()}}</p>
    <p>{{number}}</p>
    <p>{{fullName}}</p>
    <input type="text" v-model="number">
</div>
    `,
    data() {
        return {
            firstName: 'zhipeng',
            lastName: 'zhou',
            number: 0
        }
    },

    // computed中计算比在methods中计算性能更好，不会每次都刷新，只有引用到的属性发生变化才会刷新
    //尽量不要去修改某一个属性的值，只做到拼接获取数据，计算
    computed: {
        name() {
            console.log(222);
            return `${this.firstName} ${this.lastName}`
        }
    },
    watch: {
        // firstName(newName, oldName) {
        //     this.fullName = newName + ' ' + this.lastName
        // },
        firstName: {
            handler(newName, oldName) {
                this.fullName = newName + ' ' + this.lastName
            },
            immediate: true,        //这样写的好处就是上来就会计算一次，否则只有当改变的时候采用watch
            deep: true           //应用于监听对象属性，可以深层监听
        }
    },
    methods: {
        getName() {
            console.log(111);
            return `${this.firstName} ${this.lastName}`
        }
    }
})