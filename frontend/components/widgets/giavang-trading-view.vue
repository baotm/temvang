
<template>
  <div>
    <b-overlay :show="ov">

      <div class="card">
        <div class="card-body">
          <div class="float-right">

            <a
              href="javascript: void(0);"
              class="text-reset font-20"
              @click="getPrice"
            >
              <i class="mdi mdi-reload"></i>
            </a>
          </div>

          <h4 class="header-title">GIÁ THỊ TRƯỜNG TỰ DO (taiem)</h4>
          <h6>Tự lấy giá lại sau : {{countdown}}</h6>
          <div class="row mt-10 price_table">
            <div class="col-6 price">{{giausd}}</div>
            <div class="col-6 price">{{giagold}}</div>
          </div>

        </div>
      </div>
    </b-overlay>
    <div class="card">
      <div class="card-body">

        <h4 class="header-title">GIÁ THỜI GIAN THỰC</h4>

        <b-img
          src='https://www.kitco.com/images/live/gold.gif'
          fluid
        >

        </b-img>

      </div>

    </div>

  </div>
  <!-- end card-box -->
</template>


<script>
export default {
  data () {
    return {
      giausd: 0,
      giagold: 0,
      ov: true,
      countdown: "",
    }
  },
  methods: {
    startTimer (duration) {
      var timer = duration,
        minutes,
        seconds;
      setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.countdown = minutes + ":" + seconds;

        if (--timer < 0) {
          timer = duration;
          this.getPrice()
        }
      }, 1000);
    },
    getPrice () {
      this.ov = true;
      let url = 'https://api.codetabs.com/v1/proxy/?quest=taiem.com.vn/site/convertgoldw.html';
      fetch(url).then(str => str.text())
        .then(str => {
          var giado = str.search('id="gold_world"');
          var giavang = str.search('id="vnd_usd"');
          let temp1, temp2;
          let s2, s3;
          //lui lai 16 ki tu
          temp1 = str.slice(giado - 20, giado);
          s2 = temp1.slice(temp1.search("value") + 7, temp1.lastIndexOf('"'));
          temp2 = str.slice(giavang - 20, giavang);
          s3 = temp2.slice(temp2.search("value") + 7, temp2.lastIndexOf('"'));
          this.giausd = s2;
          this.giagold = s3;
          this.ov = false;
        })

    }
  },
  async fetch () {
    this.getPrice();
    let fiveMinutes = 10 * 60;//10 phut
    this.startTimer(fiveMinutes)
  }
}

</script>

<style scoped>
.price {
  border: 1px solid black;
  text-align: center;
  font-size: 36px;
  margin-top: 5%;
}
</style>