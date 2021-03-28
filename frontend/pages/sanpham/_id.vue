

<template>
  <div>
    <PageHeader
      :title="title"
      :items="items"
    />
    <b-overlay :show="ov_chitiet_sanpham">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-5">
                  <div class="row justify-content-center">
                    <div class="col-xl-8">
                      <div class="carousel slide product-detail-carousel">
                        <div class="carousel-inner">
                          <div class="carousel-item active">
                            <div>
                              <img
                                :src="`/images/anhsanpham/${kieuvang.hinhdaidien}`"
                                class="img-fluid"
                              />
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-7">
                  <div>
                    <div>
                      <a
                        href="#"
                        class="text-primary"
                      >{{kieuvang.hienthi}}</a>
                    </div>
                    <h4 class="mb-1">
                      {{kieuvang.hienthi}} {{loaivang.hienthi}}
                      <a
                        href="javascript: void(0);"
                        class="text-muted"
                      >
                        <i class="mdi mdi-square-edit-outline ml-2"></i>
                      </a>
                    </h4>

                    <hr />

                    <div>
                      <p>
                        {{kieuvang.mota}}
                      </p>

                      <div
                        class="mt-3"
                        v-if="sanpham"
                      >
                        <h5 class="font-size-14">Chi tiết :</h5>
                        <div class="row">
                          <div class="col-md-6">
                            <ul class="list-unstyled product-desc-list">
                              <li>
                                <i class="mdi mdi-circle-medium mr-1 align-middle"></i>
                                Vị trí Khay :
                                <nuxt-link :to="'/khay/'+sanpham.khay._id">
                                  {{sanpham.khay.hienthi}}
                                </nuxt-link>

                              </li>
                              <li>
                                <i class="mdi mdi-circle-medium mr-1 align-middle"></i>
                                Nhà cung cấp :
                                <nuxt-link :to="'/nhacungcap/'+nhacungcap._id">
                                  {{nhacungcap.hienthi}}
                                </nuxt-link>
                              </li>
                              <li>
                                <i class="mdi mdi-circle-medium mr-1 align-middle"></i>
                                Kiểu sản phẩm
                                <nuxt-link :to="'/kieusanpham/'+kieuvang._id">
                                  {{kieuvang.hienthi}}
                                </nuxt-link>
                              </li>
                              <li>
                                <i class="mdi mdi-circle-medium mr-1 align-middle"></i>
                                Tiền công nhập : {{sanpham.thongtinvatly.tiencongnhap}}
                              </li>
                              <li>
                                <i class="mdi mdi-circle-medium mr-1 align-middle"></i>
                                Tiền công xuất : {{sanpham.thongtinvatly.tiencongxuat}}
                              </li>
                            </ul>
                          </div>
                          <div class="col-md-6">
                            <ul class="list-unstyled product-desc-list">
                              <li>
                                <i class="mdi mdi-circle-medium mr-1 align-middle"></i>
                                Loại vàng
                                <nuxt-link :to="'/loaivang/'+loaivang._id">
                                  {{loaivang.hienthi}}
                                </nuxt-link>
                              </li>
                              <li>
                                <i class="mdi mdi-circle-medium mr-1 align-middle"></i>
                                Tình trạng :{{(sanpham.tinhtrang)?' Còn hàng':' Đã Bán'}}
                              </li>
                              <li>
                                <i class="mdi mdi-circle-medium mr-1 align-middle"></i>
                                Trọng lượng tổng :{{$formatSoVang(sanpham.thongtinvatly.trongluongtong)}}
                              </li>
                              <li>
                                <i class="mdi mdi-circle-medium mr-1 align-middle"></i>
                                Trọng lượng hột :{{$formatSoVang(sanpham.thongtinvatly.trongluonghot)}}
                              </li>
                              <li>
                                <i class="mdi mdi-circle-medium mr-1 align-middle"></i>
                                Trọng lượng vàng :{{$formatSoVang(sanpham.thongtinvatly.trongluongvang)}}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>

                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-3">
                        <b-button
                          block
                          variant="primary"
                        >Bán Sản Phẩm</b-button>
                      </div>
                      <div class="col-3">
                        <b-button
                          block
                          variant="primary"
                        >In Tem</b-button>
                      </div>
                      <div class="col-3">
                        <b-button
                          block
                          variant="primary"
                        >Chỉnh sửa</b-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end row -->

              <h5 class="mt-5 mb-3">Nhật kí giao dịch</h5>

            </div>
          </div>
          <!-- end card -->
        </div>
      </div>
    </b-overlay>
    <!-- end row -->
  </div>
</template>
<script>


/**
 * Product-detail component
 */
export default {
  head () {
    return {
      title: `${this.title}`,
    };
  },
  async fetch () {
    this.ov_chitiet_sanpham = true;
    this.sanpham = await this.$strapi.$sanphams.findOne(this.$route.params.id)

    let p = this.$strapi.$cauhinhnhacungcaps.findOne(this.sanpham.thongtinvatly.nhacungcap)
    let p1 = this.$strapi.$cauhinhmathangs.findOne(this.sanpham.thongtinvatly.kieusanpham)
    let p2 = this.$strapi.$cauhinhbanggias.findOne(this.sanpham.thongtinvatly.loaisanpham)
    Promise.all([p, p1, p2]).then(data => {

      this.loaivang = data[2]
      this.kieuvang = data[1]
      this.nhacungcap = data[0]
      console.log(this.sanpham)

      this.ov_chitiet_sanpham = false;
    })
  },
  data () {
    return {
      ov_chitiet_sanpham: true,
      sanpham: null,
      loaivang: {},
      kieuvang: {},
      nhacungcap: {},
      title: "Chi tiết sản phẩm",
      items: [{
        text: "Home",
      },
      {
        text: "Sản phẩm",
      },
      {
        text: "Chi tiết",
        active: true,
      },
      ],
    };
  },
  methods: {

  },
};
</script>