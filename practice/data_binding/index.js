import Vue from 'vue'

new Vue({
    el: '#root',
    template: `
        <div>
          <div :id="aaa" @click="handleClick">
              <p v-html="html"></p>
          </div>
          <div :class="[{ active: isActive }]"   :style="[styles, styles2]" >
             <p>{{getJoinedArr(arr)}}</p>
          </div>
          </div>
  `,
    data: {
        isActive: false,
        arr: [1, 2, 3],
        html: '<span>123</span>',
        aaa: 'main',
        styles: {
            color: '#000',
            appearance: 'none'
        },
        styles2: {
            color: 'red'
        }
    },
    methods: {
        handleClick() {
            alert('clicked') // eslint-disable-line
        },
        getJoinedArr(arr) {
            return arr.join(' ')
        }
    }
})
