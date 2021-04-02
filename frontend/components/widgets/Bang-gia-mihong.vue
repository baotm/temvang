
<template>
  <b-overlay :show="ov">
    <div class="card">
      <div class="card-body">
        <div
          class="float-right"
          @click="getPrice"
        >
          <a
            href="javascript: void(0);"
            class="text-reset font-20"
          >
            <i class="mdi mdi-reload"></i>
          </a>
        </div>

        <h4 class="header-title">BẢNG GIÁ VÀNG CHÀNH MHJ </h4>

        <div class="mt-3 text-center">
          <div dir="ltr">
            <b-table
              :busy="!items"
              striped
              :show-empty="true"
              hover
              :fields="fields"
              :items="items"
            ></b-table>

          </div>
        </div>
      </div>
    </div>
  </b-overlay>

  <!-- end card-box -->
</template>


<script>
export default {
  data () {
    return {
      ov: false,
      items: [],
      fields: [
        {
          key: 'name',
          label: 'Tên'
        },
        {
          key: 'giamua',
          label: 'Giá Mua'
        }, {
          key: 'giaban',
          label: 'Giá Bán'
        }
      ]

    }
  },
  methods: {

    getPrice () {
      try {
        this.ov = true;
        // this.items = await this.$strapi.$cauhinhbanggias.find({ active: true });
        let url = 'https://api.allorigins.win/raw?url=https://giavangvietnam.com/gia-vang-mi-hong/'
        fetch(url).then(response => {
          response.text().then(data => {
            var el = document.createElement('html');
            el.innerHTML = data;
            let table = el.getElementsByClassName("lastestGoldTable")[0]
            let listtbody = table.getElementsByTagName("tbody")[1]
            let listtr = listtbody.getElementsByTagName("tr");
            let _data = []

            listtr.forEach((item, index) => {
              try {
                let name;
                if (index == 0) {
                  name = item.getElementsByClassName("goldTitle")[1]
                } else {
                  name = item.getElementsByClassName("goldTitle")[0]
                }

                let textrightclass = item.getElementsByClassName("text-right")
                let giamua = "";
                let giaban = "";
                for (let i = 0; i < textrightclass.length; i++) {

                  if (i == 0) {
                    giamua = textrightclass[i].firstElementChild.innerText;
                  } else if (i == 1) {
                    giaban = textrightclass[i].firstElementChild.innerText;
                  }
                }


                let goldTitle = name.innerText;
                _data.push({
                  name: goldTitle,
                  giamua: giamua,
                  giaban: giaban
                })
              } catch (error) {
                console.error(error)
              }

            })

            this.items = _data;
            this.ov = false;

          })
        })
      } catch (err) {

      }

    }
  },

  fetch () {
    this.getPrice();
  }
}

</script>

<style>
</style>