var app1 = new Vue({
  el: '#app-1',/* #app-1 要素に対して Vue を適用する */
  data: {
    message: 'Hello world!'
  } /* message という名前のデータを定義する */
})

var app2 = new Vue({
  el: '#app-2',
  watch: {
    message: function(newVal, oldVal) {
      this.error.require = (newVal.length < 1) ? true : false;
      this.error.tooLong = (newVal.length > 5) ? true : false;
    }
  },
  data: {
    message: 'テキスト',
    error: {
      require: false,
      tooLong: false
    }
  }
})

var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: false
  }
})

var app4 = new Vue({
  el: '#app-4',
  data: {
    block: false
  },
  methods: {
    change: function(e) {
      this.block = e.target.checked
    }
  }
})

var app5 = new Vue({
  el: '#app-5',
  data: { colorList: [ 'Red', 'Green', 'Blue' ] }
})