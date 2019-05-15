import Vue from 'vue'

const component = {
    model: {
        prop: 'value1',
        event: 'change'
    },
    props: ['value1'],
    template: `
    <div>
      <input type="text" @input="handleInput" :value="value1">
    </div>
  `,
    methods: {
        handleInput(e) {
            this.$emit('change', e.target.value)
        }
    }
}

new Vue({
    components: {
        CompOne: component
    },
    el: '#root',
    data() {
        return {
            value: '123'
        }
    },
    methods: {
        handleInput1(a){
            console.log(12312312);
        }
    },
    template: `
    <div>
      <comp-one v-model="value"  ></comp-one>
    </div>
  `
})
