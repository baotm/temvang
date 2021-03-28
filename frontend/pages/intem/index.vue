
<template>
  <div>
    <PageHeader
      :title="title"
      :items="items"
    />
    <b-overlay :show="ov_tablesanpham">
      <div class="row">
        <div class="col-12">
          <div class="card ribbon-box">
            <div class="card-body">
              <div class="ribbon-two ribbon-two-pink">
                <span>In tem</span>
              </div>
              <div class="text-center">
                <div class="row">
                  <div class="col">
                    <div class="py-1">
                      <i class="bx bx-data font-24"></i>
                      <h3>{{tongsanpham}}</h3>
                      <p class="text-uppercase mb-1 font-13 font-weight-medium">
                        Tổng Sản Phẩm Đã in tem
                      </p>
                    </div>
                  </div>
                  <div class="col">
                    <div class="py-1">
                      <i class="bx bx-dollar font-24"></i>
                      <h3>{{daban}}</h3>
                      <p class="text-uppercase mb-1 font-13 font-weight-medium">
                        Tổng Sản Phẩm Chưa In Tem
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <b-button>In Toàn Bộ Sản Phẩm</b-button>

                </div>

              </div>

              <!-- Table -->
              <div class="table-responsive mb-0">
                <b-table
                  show-empty
                  ref="table-sanpham"
                  table-class="table table-centered w-100"
                  thead-tr-class="bg-light"
                  :items="listsanpham"
                  :fields="fields"
                  responsive="sm"
                  class="text-center"
                >

                  <template #cell(ten)="data">
                    <span class="tensanpham">{{ data.item.thongtinvatly.ten }}</span>

                  </template>
                  <template #cell(masanpham)="data">
                    <b-badge variant="success"> {{data.item.masanpham}} </b-badge>

                  </template>
                  <template #cell(trongluongvang)="data">
                    {{$formatSoVang(data.item.thongtinvatly.trongluongvang)}}
                  </template>
                  <template #cell(tinhtrang)="data">
                    <div class="text-center">
                      <i
                        class="fas fa-circle blink_me "
                        :style="[data.item.tinhtrang?{'color':'green'}:{'color':'gray'}]"
                      ></i>
                    </div>
                  </template>

                  <template #cell(tiencongxuat)="data">
                    <code> $ {{data.item.thongtinvatly.tiencongxuat}}</code>
                  </template>
                  <template #cell(ngaytao)="data">
                    <code> {{$moment(data.item.createdAt).format('hh:mm MM-DD-YYYY')}}</code>
                  </template>

                  <template #cell(tool)="data">
                    <ul class="list-inline table-action m-0">
                      <li class="list-inline-item">

                        <a
                          href="javascript:void(0);"
                          class="action-icon"
                          @click="printToPubnud(data.item._id)"
                        >
                          <i class="mdi mdi-cloud-print"></i></a>
                      </li>
                      <li class="list-inline-item">
                        <a
                          href="javascript:void(0);"
                          class="action-icon"
                        >
                          <i class="mdi mdi-square-edit-outline"></i></a>
                      </li>
                      <li class="list-inline-item">
                        <a
                          href="javascript:void(0);"
                          class="action-icon"
                          @click="delete_sanpham(data.item._id)"
                        >
                          <i class="mdi mdi-delete"></i></a>
                      </li>
                    </ul>
                  </template>
                  <template #cell(chitiet)="data">
                    <b-button
                      size="sm"
                      @click="data.toggleDetails"
                      class="mr-2"
                      variant="primary"
                    >
                      {{ data.detailsShowing ? 'Hide' : 'Show'}}
                    </b-button>

                  </template>

                  <template #row-details="data">
                    <div class="row">

                      <div class="col-6">
                        <div class="card ribbon-box">
                          <div class="card-body text-center">
                            <div class="ribbon-two ribbon-two-pink">
                              <span>Chi tiết</span>
                            </div>
                            <table class="table table-borderless table-sm tensanpham">
                              <tbody>
                                <tr>
                                  <th scope="row">Tên sản phẩm :</th>
                                  <td class="text-muted">{{data.item.thongtinvatly.ten}}</td>
                                </tr>
                                <tr>
                                  <th scope="row">Kiểu sản phẩm :</th>
                                  <td class="text-muted">
                                    <nuxt-link :to="'/sanpham/'+getkieusanpham(data.item.thongtinvatly.kieusanpham).id"> {{getkieusanpham(data.item.thongtinvatly.kieusanpham).hienthi}}</nuxt-link>

                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Mã sản phẩm :</th>
                                  <td class="text-muted">{{data.item.masanpham}}</td>
                                </tr>
                                <tr>
                                  <th scope="row">Tình trạng :</th>
                                  <i
                                    class="fas fa-circle blink_me "
                                    :style="[data.item.tinhtrang?{'color':'green'}:{'color':'gray'}]"
                                  ></i>

                                </tr>
                                <tr>
                                  <th scope="row">Loại vàng :</th>
                                  <td class="text-muted">

                                    {{getloaisanpham(data.item.thongtinvatly.loaisanpham).hienthi}}

                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Nhà cung cấp :</th>
                                  <td class="text-muted">
                                    <nuxt-link :to="'/sanpham/'+getnhacungcap(data.item.thongtinvatly.nhacungcap).id"> {{getnhacungcap(data.item.thongtinvatly.nhacungcap).hienthi}}</nuxt-link>

                                  </td>
                                </tr>

                              </tbody>
                            </table>

                          </div>
                          <!-- end card-box -->
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="card">
                          <div class="card-body text-center">

                            <table class="table table-borderless table-sm">
                              <tbody>
                                <tr>
                                  <th scope="row">Ngày thêm sản phẩm :</th>
                                  <td class="text-muted">{{$moment(data.item.createdAt).format('hh:mm DD/MM/YYYY')}}</td>
                                </tr>
                                <tr>
                                  <th scope="row">Trọng lượng tổng :</th>

                                  <td class="text-muted">

                                    <span class="badge badge-soft-success "> {{$formatSoVang(data.item.thongtinvatly.trongluongtong)}}</span>

                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Trọng lượng hột :</th>
                                  <td class="text-muted"> <span class="badge badge-soft-primary "> {{$formatSoVang(data.item.thongtinvatly.trongluonghot)}}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Trọng lượng vàng :</th>

                                  <td class="text-muted"> <span class="badge badge-soft-warning "> {{$formatSoVang(data.item.thongtinvatly.trongluongvang)}}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Tiền công nhập :</th>
                                  <td class="text-muted">$<code>{{data.item.thongtinvatly.tiencongnhap}}</code></td>
                                </tr>

                                <tr>
                                  <th scope="row">Tiền công xuất :</th>
                                  <td class="text-muted">$<code>{{data.item.thongtinvatly.tiencongxuat}}</code> </td>
                                </tr>
                              </tbody>
                            </table>

                          </div>
                          <!-- end card-box -->
                        </div>
                      </div>

                      <div class="col-12 text-center ">
                        <b-button
                          size="sm"
                          variant="warning"
                          @click="data.toggleDetails"
                        >Hide Details</b-button>

                      </div>
                    </div>

                  </template>
                </b-table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: `${this.title}`,
    };
  },
  async fetch () {
    this.ov_tablesanpham = true;
    let p7 = this.$strapi.$sanphams.find({ soluongtem: 0 })
    let p4 = this.$strapi.$sanphams.count()
    let p5 = this.$strapi.$sanphams.count({ tinhtrang: false })
    let p1 = this.$strapi.$cauhinhnhacungcaps.find();
    let p2 = this.$strapi.$cauhinhmathangs.find();
    let p3 = this.$strapi.$cauhinhbanggias.find()
    let p6 = this.$strapi.$khays.count()
    Promise.all([p1, p2, p3, p4, p5, p6, p7]).then(data => {

      this.listnhacungcap = data[0]
      this.listloaisanpham = data[1]
      this.listbanggia = data[2]
      this.title = `Danh sách sản phẩm [${data[4]}/${data[3]}]`
      this.tongsanpham = data[3]
      this.daban = data[4]
      this.khay = data[5]
      this.listsanpham = data[6]
      this.ov_tablesanpham = false;
    })
  },
  data () {
    return {
      khay: 0,
      tongsanpham: 0,
      daban: 0,
      conlai: 0,

      isBusy: false,
      listsanpham: [],
      ov_tablesanpham: false,
      title: "Danh sách sản phẩm [30/293]",
      items: [{
        text: "Home"
      },
      {
        text: "Sản phẩm"
      },
      {
        text: "Danh sách",
        active: true
      }
      ],

      fields: [
        {
          key: 'ten',
          label: 'Tên',

        }, {
          key: 'masanpham',
          label: 'Mã sản phẩm',

        }, {
          key: 'trongluongvang',
          label: 'Trọng lượng vàng',

        },
        {
          key: 'tinhtrang',
          label: 'Tình trạng',

        },
        {
          key: 'ngaytao',
          label: 'Ngày tạo',

        }, {
          key: 'tiencongxuat',
          label: 'Tiền công xuất',

        }, {
          key: 'chitiet',
          label: 'Chi tiết'
        }, {
          key: 'tool',
          label: 'Tool'
        },
      ],
      listnhacungcap: [],
      listloaisanpham: [],
      listbanggia: [],
      printserver: this.$pnGetMessage('printserver')
    };
  },
  methods: {
    /**
     * Search the table data with search input
     */
    printToPubnud (id) {
      //send msgBoxConfirm
      this.$pnPublish(
        {
          channel: 'printserver',
          message: { entry: "intemsanpham", update: "hello from nuxt" }
        },
        (status, response) => console.log(status, response)
      );
      // console.log(this.$pnGetMessage('printserver'))
    },
    delete_sanpham (id) {

      this.$bvModal
        .msgBoxConfirm("Bạn muốn xóa ", {
          title: "Xác nhận",
          size: "sm",
          buttonSize: "sm",
          okVariant: "success",
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.$strapi.$sanphams.delete(id).then((a) => {
              this.$refs["table-sanpham"].refresh();

            });
          }
        });
    },
    formatDay (d) {
      this.$moment(d).format('hh:mm dd-MM-YYYY')
    },
    getnhacungcap (id) {
      let ncc;
      this.listnhacungcap.forEach(item => {
        if (item._id == id) {
          ncc = item;
          return
        }
      })

      return ncc
    },
    getkieusanpham (id) {
      let ksp;
      this.listloaisanpham.forEach(item => {
        if (item._id == id) {
          ksp = item;
          return
        }
      })

      return ksp
    },
    getloaisanpham (id) {
      //loai vangv9999, v980
      let loaivang;
      this.listbanggia.forEach(item => {
        if (item._id == id) {
          loaivang = item;
          return
        }
      })

      return loaivang
    },


  },
  mounted () {
    this.$pnSubscribe({
      channels: ['printserver']
    });
  },
};
</script>
<style scoped>
.tensanpham {
  text-transform: capitalize;
  cursor: pointer;
}

.blink_me {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>