
<template>
  <b-overlay :show="ov">
    <div class="card">
      <div class="card-body">
        <div class="float-right">
          <a
            @click="toggleLock"
            href="javascript: void(0);"
            class="text-reset font-20"
          >
            <i :class="getLockStatus"></i>
          </a>
          <a
            @click="getPrice"
            href="javascript: void(0);"
            class="text-reset font-20"
          >
            <i class="mdi mdi-reload"></i>
          </a>
        </div>

        <h4 class="header-title">BẢNG GIÁ</h4>

        <div class="mt-3 text-center">
          <div dir="ltr">
            Đơn vị tính x1000
            <b-table
              :busy="!items"
              striped
              :show-empty="true"
              hover
              :fields="fields"
              :items="items"
            >
              <template #cell(giamua)="data">
                <b-form-input
                  class="price-input"
                  v-model="data.item.giamua"
                  @change="updateValue(data.item._id,'giamua',data.item.giamua)"
                  :disabled="lockStatus"
                ></b-form-input>
              </template>
              <template #cell(giaban)="data">
                <b-form-input
                  class="price-input"
                  v-model="data.item.giaban"
                  :disabled="lockStatus"
                  @change="updateValue(data.item._id,'giaban',data.item.giaban)"
                ></b-form-input>
              </template>
            </b-table>

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
      getLockStatus: 'mdi mdi-lock',
      lockStatus: true,
      ov: false,
      items: [],
      fields: [

        {
          key: 'hienthi',
          label: 'Tên',
          thStyle: {
            width: '40%'
          }
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
    toggleLock () {
      if (this.getLockStatus == "mdi mdi-lock") {
        this.getLockStatus = "mdi mdi-lock-open"
        this.lockStatus = false;
      } else {
        this.getLockStatus = "mdi mdi-lock"
        this.lockStatus = true;
      }

    },
    async getPrice () {
      this.ov = true;
      this.items = await this.$strapi.$cauhinhbanggias.find({ active: true });
      this.ov = false;
    },
    async updateValue (id, option, value) {
      this.ov = true;

      if (option === "giamua") {
        await this.$strapi.$cauhinhbanggias.update(id, {
          giamua: value
        })
      }
      if (option === "giaban") {
        await this.$strapi.$cauhinhbanggias.update(id, {
          giaban: value
        })
      }
      this.getPrice()
      this.ov = false;
    },

  },
  async fetch () {
    this.getPrice();
  }
}

</script>

<style scoped>
.price-input:focus {
  border: 1px;
  background-color: yellow;
}
.price-input {
  border: 0;
  text-align: center;
  background-color: transparent;
}
</style>