import Vue from 'vue'

new Vue({
    el: '#root',
    template: `
    <div>
      <div v-html="html"></div>
      <div v-cloak>{{text}}</div>  //目前webpack构建项目一般都用不到，只有单独引入vuejs文件在body上写，才会用，隐藏{{text}}这种现实效果，等编译完才会显示
      <div v-once>{{text}}</div>  //只会改变一次
      <div v-pre>{{text}}</div>
      <div v-show="active"></div>
      <div v-if="active">woshi active</div>
      <div v-else-if="text===1">wobushi</div>
      <div v-else>123123123</div>
      <div>Text: {{text}}</div>
      <div v-if="text === 0">Else Text: {{text}}</div>
      <div v-else>else content</div>
      <div v-html="html"></div>
      <input type="text" v-model="text">
      <input type="checkbox" v-model="active">
      <div>
        <input type="checkbox" :value="1" v-model="arr">
        <input type="checkbox" :value="2" v-model="arr">
        <input type="checkbox" :value="3" v-model="arr">
      </div>
      <div>
        <input type="radio" value="one" v-model="picked">
        <input type="radio" value="two" v-model="picked">
      </div>
      <ul>
        <li v-for="(item, index) in arr" :key="item">{{item}}:{{index}}</li>
      </ul>
      <ul>
        <li v-for="(val, key, index) in obj">{{val}}:{{key}}:{{index}}</li>
      </ul>
    </div>
  `,
    data: {
        arr: [2, 3],
        obj: {
            a: '123',
            b: '456',
            c: '789'
        },
        picked: '',
        text: 0,
        active: false,
        html: '<span>this is html</span>'
    }
})
