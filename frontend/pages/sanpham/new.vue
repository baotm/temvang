

<template>
  <div>
    <PageHeader
      :title="title"
      :items="items"
    />
    <b-overlay :show="ov_optionsReady">

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h4 class="header-title">Thêm 1 sản phẩm vào dữ liệu</h4>
              <p class="sub-header">
                Cố gắng kiểm tra kĩ về trọng lượng, giá tiền công, vì mọi
                <code>sai sót</code> đều phải trả giá
              </p>
              <div class="row">
                <div class="col-12">
                  <b-form
                    validated
                    @submit.prevent="themsanpham"
                    autocomplete="off"
                  >
                    <b-form-row>
                      <b-col>
                        <b-form-group label="Tên sản phẩm">
                          <b-form-input
                            v-model="sanpham.ten"
                            required
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group label="Trọng lượng tổng">
                          <b-form-input
                            required
                            v-model="sanpham.trongluongtong"
                            v-mask='"######"'
                          ></b-form-input>
                          <b-form-text>
                            Trọng lượng : {{formatN(sanpham.trongluongtong)}}
                          </b-form-text>
                        </b-form-group>
                        <b-form-group label="Trọng lượng hột">
                          <b-form-input
                            required
                            v-mask='"######"'
                            v-model="sanpham.trongluonghot"
                          ></b-form-input>
                          <b-form-text>
                            Trọng lượng : {{formatN(sanpham.trongluonghot)}}
                          </b-form-text>
                        </b-form-group>
                        <b-form-group label="Tiền công nhập">
                          <b-form-input
                            v-mask='"######"'
                            v-model="sanpham.tiencongnhap"
                            @change="x2tiencong"
                          ></b-form-input>

                        </b-form-group>
                        <b-form-group
                          required
                          label="Tiền công xuất"
                        >
                          <b-form-input
                            required
                            v-mask='"######"'
                            v-model="sanpham.tiencongxuat"
                          ></b-form-input>
                        </b-form-group>

                      </b-col>
                      <b-col>
                        <b-form-group label="Kiểu sản phẩm">
                          <b-form-select
                            required
                            ref="sanpham_new_kieusanpham"
                            v-model="sanpham.kieusanpham"
                            :options="optionKieusanpham"
                            @change="taomasanpham"
                          ></b-form-select>
                        </b-form-group>
                        <b-form-group label="Nhà cung cấp">
                          <b-form-select
                            required
                            ref="sanpham_new_nhacungcap"
                            v-model="sanpham.nhacungcap"
                            :options="optionNhacungcap"
                          ></b-form-select>
                        </b-form-group>
                        <b-form-group label="Loại vàng">
                          <b-form-select
                            required
                            ref="sanpham_new_loaivang"
                            v-model="sanpham.loaivang"
                            :options="optionLoaivang"
                          ></b-form-select>
                        </b-form-group>
                        <b-form-group label="Vị trí khay">
                          <b-form-select
                            required
                            ref="sanpham_new_khayvang"
                            @change="toggleInputComplete"
                            v-model="sanpham.khayvang"
                            :options="optionKhayvang"
                          ></b-form-select>
                        </b-form-group>

                        <b-form-group label="Mã vạch">
                          <b-form-input
                            disabled
                            v-model="sanpham.mavach"
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col>
                        <h4 class="title">Review</h4>
                        <b-list-group v-if="inputComplete">

                          <b-list-group-item>Tên : {{sanpham.ten}}<br /> Mã vạch : {{sanpham.mavach}}</b-list-group-item>
                          <b-list-group-item>Trọng lượng tổng : {{formatN(sanpham.trongluongtong)}}<br />Trọng lượng hột : {{formatN(sanpham.trongluonghot)}} <br />Trọng lượng Vàng : {{formatN(sanpham.trongluongtong-sanpham.trongluonghot)}}</b-list-group-item>
                          <b-list-group-item>Tiền công nhập : {{sanpham.tiencongnhap}} - Tiền công <code>Xuất</code> : {{sanpham.tiencongxuat}}</b-list-group-item>
                          <b-list-group-item>Kiểu sản phẩm : {{getkieusanpham}}<br />Loại vàng : {{getloaivang}} <br />Nhà cung cấp : {{getnhacungcap}}</b-list-group-item>
                          <b-list-group-item>Khay sản phẩm : {{getkhayvang}}</b-list-group-item>

                        </b-list-group>
                        <br />
                        <b-row>
                          <b-col>
                            <b-button
                              variant="primary"
                              block
                              :disabled="!inputComplete"
                              type="submit"
                            >Thêm mới</b-button>

                          </b-col>

                        </b-row>
                      </b-col>
                    </b-form-row>
                  </b-form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>
<script>
/**
 * Starter component
 */
export default {
  head () {
    return {
      title: `${this.title} `,
    };
  },
  data () {
    return {
      inputComplete: false,
      ov_optionsReady: true,
      title: "Thêm Sản Phẩm",
      items: [
        {
          text: "Home",
          href: "/",
        },
        {
          text: "Sản phẩm",
          href: "/sanpham",
        },
        {
          text: "Thêm mới",
          href: "/",
          active: true,
        },
      ],
      sanpham: {
        ten: '',
        trongluonghot: null,
        trongluongtong: null,
        tiencongxuat: null,
        tiencongnhap: 0,
        kieusanpham: '',
        nhacungcap: '',
        loaivang: '',
        mavach: '',
        khayvang: ''
      },
      countsanpham: 0,
      kieusanpham: [],
      optionLoaivang: [],
      optionNhacungcap: [],
      optionKieusanpham: [],
      optionKhayvang: [],
    };
  },
  computed: {
    getkieusanpham () {

      let allOptions = this.$refs["sanpham_new_kieusanpham"].formOptions;
      let name = allOptions.find(e => e.value == this.sanpham.kieusanpham)
      return name.text
    },
    getloaivang () {
      let allOptions = this.$refs["sanpham_new_loaivang"].formOptions;
      let name = allOptions.find(e => e.value == this.sanpham.loaivang)
      return name.text
    },
    getnhacungcap () {
      let allOptions = this.$refs["sanpham_new_nhacungcap"].formOptions;
      let name = allOptions.find(e => e.value == this.sanpham.nhacungcap)
      return name.text

    },
    getkhayvang () {
      let allOptions = this.$refs["sanpham_new_khayvang"].formOptions;
      let name = allOptions.find(e => e.value == this.sanpham.khayvang)
      return name.text

    }
  },
  methods: {
    toggleInputComplete () {
      this.inputComplete = true;
    },
    formatN (x) {
      if (x == 0 || x == null || x == undefined) {
        return 0;
      }
      let x1 = String(x)
      if (x >= 1000) {
        return x1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "c");
      } else if (100 <= x < 1000) {
        return x1.toString().replace(/\B(?=(\d{2})+(?!\d))/g, "p");
      }


    },
    themsanpham () {
      this.ov_optionsReady = true;
      this.$bvModal.msgBoxConfirm('Bạn muốn thêm sản phẩm này ', {
        title: 'Xác nhận',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true
      }).then(value => {
        if (value) {
          let sanpham = {
            masanpham: this.sanpham.mavach,

            thongtinvatly: {
              ten: this.sanpham.ten,
              trongluonghot: parseFloat(this.sanpham.trongluonghot),
              trongluongtong: parseFloat(this.sanpham.trongluongtong),
              trongluongvang: (parseFloat(this.sanpham.trongluongtong) - parseFloat(this.sanpham.trongluonghot)),
              tiencongnhap: parseFloat(this.sanpham.tiencongnhap),
              tiencongxuat: parseFloat(this.sanpham.tiencongxuat),
              nhacungcap: this.sanpham.nhacungcap,
              loaisanpham: this.sanpham.loaivang,
              kieusanpham: this.sanpham.kieusanpham
            },
            tinhtrang: true,
            khay: this.sanpham.khayvang,

          }
          let p = this.$strapi.$countsanpham.update({ count: parseInt(this.countsanpham) + 1 })
          let p1 = this.$strapi.$sanphams.create(sanpham)
          Promise.all([p, p1]).then(data => {

            window.location.reload();
          })


        }
      })
    },


    taomasanpham () {
      //tim ra ten viet tat cua ma san pham
      let viettat;
      let i = this.kieusanpham.find(e => e._id == this.sanpham.kieusanpham)
      viettat = i.viettat;
      this.sanpham.mavach = viettat + "-" + this.countsanpham
    },
    x2tiencong () {
      if (this.sanpham.tiencongnhap != 0) {
        this.sanpham.tiencongxuat = parseInt(this.sanpham.tiencongnhap) * 2
      }
    }
  },
  async fetch () {
    this.ov_optionsReady = true;
    let loaivang = this.$strapi.$cauhinhbanggias.find({ active: true })
    let kieusanpham = this.$strapi.$cauhinhmathangs.find()
    let nhacungcap = this.$strapi.$cauhinhnhacungcaps.find()
    let khayvang = this.$strapi.$http.$get('khays/selectkhays')
    let countsanpham = this.$strapi.$countsanpham.find()
    Promise.all([loaivang, kieusanpham, nhacungcap, khayvang, countsanpham]).then(data => {
      let _loaivang = data[0];
      let __loaivang = []
      _loaivang.forEach(item => {
        __loaivang.push({
          value: item._id,
          text: item.hienthi
        })
      })
      this.optionLoaivang = __loaivang
      let _kieusanpham = data[1];
      this.kieusanpham = _kieusanpham
      let __kieusanpham = []
      _kieusanpham.forEach(item => {
        __kieusanpham.push({
          value: item._id,
          text: item.hienthi
        })
      })
      this.optionKieusanpham = __kieusanpham


      let _nhacungcap = data[2];
      let __nhacungcap = []
      _nhacungcap.forEach(item => {
        __nhacungcap.push({
          value: item._id,
          text: item.hienthi
        })
      })
      this.optionNhacungcap = __nhacungcap



      let _khayvang = data[3];
      let __khayvang = []
      _khayvang.forEach(item => {
        __khayvang.push({
          value: item._id,
          text: item.hienthi
        })
      })
      this.optionKhayvang = __khayvang
      this.countsanpham = data[4].count
    })
    this.ov_optionsReady = false;
  }
};
</script>