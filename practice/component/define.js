import Vue from 'vue'

const CompOne = {
    props: {
        active: {
            // type: Boolean,
            // default: false,
            require: true,
            validate(value) {
                return typeof value === 'boolean'
                //    检验传过来的参数是否符合
            }
        },
        propOne: String
    },
    template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handelChange">{{propOne}}</span>
      <span v-show="active">woshi asdasjdajsghkdkjhahjdks</span>
    </div>
  `,
    data() {
        // data中return返回的必须是新创建的fun，不能是公共的
        return {
            text: 0
        }
    },
    methods: {
        handelChange() {
            this.$emit('change')
        }
    }
};

// Vue.component('CompOne')  //全局注册组件

new Vue({
    components: {
        CompOne
    },
    el: '#root',
    template: `
    <div>
      <Comp-one ref="comp1" :active="true" :propOne="prop1" @change="handelClick"></Comp-one>
      <Comp-one ref="comp2"  :propOne="prop1" @change="handelClick"></Comp-one>
    </div>
  `,
    mounted() {
        console.log(this.$refs.comp1);
    },
    data: {
        prop1: 'text1'
    },
    methods: {
        handelClick() {
            this.prop1 += 1
        }
    }
})
