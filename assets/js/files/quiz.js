let radios = document.querySelectorAll("input[type='radio']");
let vm = new Vue({
  el: "#app",
  data: {
    radios,
  },
  methods: {
    test: function() {
      console.log(vm.radios);
      vm.radios.forEach((el) => {
        
      });
    }
  },
});
