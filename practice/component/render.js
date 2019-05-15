import Vue from 'vue'

const component = {
    props: ['props1'],
    name: 'comp',
    // template: `
    //   <div :style="style">
    //     <slot></slot>
    //   </div>
    // `,
    render(h) {
        //h和this.$createElement同样的效果，创建节点
        return h('div',
            {
                style: this.style,
            },
            this.$slots.default   //插入插槽的写法，，default是没有名字的插槽，有名字写名字
        )
    },
    data() {
        return {
            style: {
                width: '200px',
                height: '200px',
                border: '1px solid #aaa'
            },
            value: 'component value'
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
    mounted() {
        console.log(this.$refs.comp.value, this.$refs.span)
    },
    methods: {
        handleClick() {
            console.log('clicked')
        }
    },
    // template: `
    //   <comp-one ref="comp">
    //     <span ref="span">{{value}}</span>
    //   </comp-one>
    // `,
    render(createElement) {
        return createElement(
            'comp-one',
            {
                ref: 'comp',
                props: {
                    props1: this.value
                },
                // on: {
                //   click: this.handleClick
                // },
                nativeOn: {
                    click: this.handleClick
                }
            },
            [
                createElement('span', {
                    ref: 'span',
                    slot: 'header',
                    // domProps:{
                    //   interHtml:'12321'
                    // },
                    attrs: {
                        id: 'test-id'
                    }
                }, this.value)
            ]
        )
    }
})
