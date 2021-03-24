

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
                  <b-form-row>
                    <b-col>
                      <b-form-group label="Tên sản phẩm">
                        <b-form-input v-model="sanpham.ten"></b-form-input>
                      </b-form-group>
                      <b-form-group label="Trọng lượng tổng">
                        <b-form-input v-model="sanpham.trongluongtong"></b-form-input>
                      </b-form-group>
                      <b-form-group label="Trọng lượng hột">
                        <b-form-input v-model="sanpham.trongluonghot"></b-form-input>
                      </b-form-group>
                      <b-form-group label="Tiền công nhập">
                        <b-form-input
                          v-model="sanpham.tiencongnhap"
                          @change="x2tiencong"
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group label="Tiền công xuất">
                        <b-form-input v-model="sanpham.tiencongxuat"></b-form-input>
                      </b-form-group>

                    </b-col>
                    <b-col>
                      <b-form-group label="Kiểu sản phẩm">
                        <b-form-select
                          v-model="sanpham.kieusanpham"
                          :options="optionKieusanpham"
                        ></b-form-select>
                      </b-form-group>
                      <b-form-group label="Nhà cung cấp">
                        <b-form-select
                          v-model="sanpham.nhacungcap"
                          :options="optionNhacungcap"
                        ></b-form-select>
                      </b-form-group>
                      <b-form-group label="Loại vàng">
                        <b-form-select
                          v-model="sanpham.loaivang"
                          :options="optionLoaivang"
                        ></b-form-select>
                      </b-form-group>
                      <b-form-group label="Vị trí khay">
                        <b-form-select
                          v-model="sanpham.loaivang"
                          :options="optionLoaivang"
                        ></b-form-select>
                      </b-form-group>
                      <b-form-group
                        v-model="sanpham.mavach"
                        label="Mã vạch"
                      >
                        <b-input></b-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <h4 class="title">Review</h4>
                      <b-list-group>

                        <b-list-group-item>Tên : {{sanpham.ten}}<br /> Mã vạch : {{sanpham.mavach}}</b-list-group-item>
                        <b-list-group-item>Trọng lượng tổng : {{sanpham.trongluongtong}}<br />Trọng lượng hột : {{sanpham.trongluonghot}} <br />Trọng lượng Vàng : {{sanpham.trongluongtong-sanpham.trongluonghot}}</b-list-group-item>
                        <b-list-group-item>Tiền công nhập : {{sanpham.tiencongnhap}} - Tiền công <code>Xuất</code> : {{sanpham.tiencongxuat}}</b-list-group-item>
                        <b-list-group-item>Kiểu sản phẩm : {{sanpham.kieusanpham}}<br />Loại vàng : {{sanpham.loaivang}} <br />Nhà cung cấp : {{sanpham.nhacungcap}}</b-list-group-item>

                      </b-list-group>
                      <br />
                      <b-row>
                        <b-col>
                          <b-button
                            variant="primary"
                            block
                          >Thêm mới</b-button>
                        </b-col>
                        <b-col>
                          <b-button
                            block
                            variant="warning"
                          >Hủy</b-button>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-form-row>

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
        mavach: '',
        trongluonghot: 0,
        trongluongtong: 0,
        tiencongxuat: 0,
        tiencongnhap: 0,
        kieusanpham: 'daynam',
        nhacungcap: 'khs',
        loaivang: 'v9999',
        mavach: '',
      },
      optionLoaivang: [],
      optionNhacungcap: [],
      optionKieusanpham: [],

    };
  },
  methods: {
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
    let khayvang = this.$strapi.$khays.find();
    Promise.all([loaivang, kieusanpham, nhacungcap, khayvang]).then(data => {
      let _loaivang = data[0];
      let __loaivang = []
      _loaivang.forEach(item => {
        __loaivang.push({
          value: item.ten,
          text: item.hienthi
        })
      })
      this.optionLoaivang = __loaivang
      let _kieusanpham = data[1];
      let __kieusanpham = []
      _kieusanpham.forEach(item => {
        __kieusanpham.push({
          value: item.ten,
          text: item.hienthi
        })
      })
      this.optionKieusanpham = __kieusanpham


      let _nhacungcap = data[2];
      let __nhacungcap = []
      _nhacungcap.forEach(item => {
        __nhacungcap.push({
          value: item.ten,
          text: item.hienthi
        })
      })
      this.optionNhacungcap = __nhacungcap
      console.log(data[3])


      //this.optionsSelect.kieusanpham = data[1];
      //this.optionsSelect.nhacungcap = data[2];

    })
    this.ov_optionsReady = false;
  }
};
</script>