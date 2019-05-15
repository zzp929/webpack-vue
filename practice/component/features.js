import Vue from 'vue'

const component = {
    //   template: `
    //   <div :style="style">
    //       <div class="header">
    //         <slot name="header"></slot>
    //       </div>
    //       <div class="body">
    //           <slot name="body"></slot>
    //       </div>
    //   </div>
    // `,
    template: `
    <div :style="style">
       <slot :value="value" aaa="222"></slot>
    </div>
    `,
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
        console.log(this.$refs.comp)
        console.log(this.$refs.span)
    },
    template: `
    <div>
      <comp-one ref="comp">
        <p slot-scope="props" ref="span">{{props.value}}----{{props.aaa}}----{{value}}</p>
      </comp-one>
    </div>
  `
})
