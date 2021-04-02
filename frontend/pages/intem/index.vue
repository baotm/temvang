
<template>
  <div>
    <PageHeader
      title="Danh sách tem"
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
                      <h3>{{chuain}}</h3>
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

                <div class="col-11">
                  <b-button
                    @click="selectAllSanPham"
                    variant="success"
                  >
                    <i class="mdi mdi-select-group"></i>
                    Chọn tất cả
                  </b-button>
                  <b-button
                    @click="unselectAllSanPham"
                    variant="warning"
                  >
                    <i class="mdi mdi-select-all"></i>
                    Bỏ chọn
                  </b-button>
                  <b-button variant="info">
                    <div>Đã chọn : {{selected.length}}</div>

                  </b-button>

                </div>
                <div class="col-1">
                  <b-button
                    @click="intemsanpham"
                    variant="success"
                    :disabled="btnPrintStatus"
                  >
                    <i class="mdi mdi-cloud-print-outline"></i>

                  </b-button>
                </div>

              </div>

              <!-- Table -->
              <div class="table-responsive mb-0">
                <b-table
                  selectable
                  show-empty
                  ref="table-sanpham"
                  table-class="table table-centered w-100"
                  thead-tr-class="bg-light"
                  :items="listsanpham"
                  :fields="fields"
                  responsive="sm"
                  class="text-center"
                  @row-selected="onRowSelected"
                >

                  <template #cell(ten)="data">
                    <span class="tensanpham">{{ data.item.thongtinvatly.ten }}</span>

                  </template>
                  <template #cell(masanpham)="data">
                    <b-badge variant="success"> {{data.item.masanpham}} </b-badge>

                  </template>
                  <template #cell(trongluongtong)="data">

                    {{$formatSoVang(data.item.thongtinvatly.trongluongtong)}}
                  </template>
                  <template #cell(trongluonghot)="data">

                    {{$formatSoVang(data.item.thongtinvatly.trongluonghot)}}
                  </template>
                  <template #cell(tiencongnhap)="data">
                    <code>$ {{data.item.thongtinvatly.tiencongnhap}}</code>

                  </template>
                  <template #cell(tiencongxuat)="data">
                    <code>$ {{data.item.thongtinvatly.tiencongxuat}}</code>

                  </template>
                  <template #cell(X)="data">

                    {{data.item.thongtinvatly.nhacungcap}}
                  </template>
                  <template #cell(loai)="data">
                    {{data.item.thongtinvatly.loaisanpham}}
                  </template>

                  <template #cell(trongluongvang)="data">
                    {{$formatSoVang(data.item.thongtinvatly.trongluongvang)}}
                  </template>
                  <template #cell(ngaytao)="data">
                    <code> {{$moment(data.item.createdAt).format('hh:mm MM-DD-YYYY')}}</code>
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

  async fetch () {
    this.ov_tablesanpham = true;

    let p1 = this.$strapi.$cauhinhnhacungcaps.find();
    let p2 = this.$strapi.$sanphams.find({ soluongtem: 0, _limit: 24 },)
    let p3 = this.$strapi.$sanphams.count({ soluongtem_gt: 0 })
    let p4 = this.$strapi.$cauhinhbanggias.find()
    Promise.all([p1, p2, p3, p4]).then(data => {

      this.listnhacungcap = data[0]
      this.chuain = data[1].length;
      this.listsanpham = data[1]
      this.tongsanpham = data[2]
      this.listbanggia = data[3]
      //format data 

      for (let i = 0; i < this.listsanpham.length; i++) {
        //nhacungcap
        //   this.listsanpham[i].thongtinvatly.nhacungcap = this.getnhacungcap(this.listsanpham[i].thongtinvatly)
        this.listsanpham[i].thongtinvatly.nhacungcap = (this.getnhacungcap(this.listsanpham[i].thongtinvatly.nhacungcap)).hienthi
        this.listsanpham[i].thongtinvatly.loaisanpham = (this.getloaisanpham(this.listsanpham[i].thongtinvatly.loaisanpham)).hienthi

      }
      this.ov_tablesanpham = false;
    })
  },
  data () {
    return {
      listnhacungcap: [],
      listloaisanpham: [],
      listbanggia: [],
      selected: [],
      tongsanpham: 0,
      chuain: 0,
      listsanpham: [],
      ov_tablesanpham: false,
      items: [{
        text: "Home"
      },
      {
        text: "In Tem Sản Phẩm"
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
          label: 'Mã',

        }, {
          key: 'trongluongtong',
          label: 'K.L.T',

        }, {
          key: 'trongluonghot',
          label: 'K.L.H',

        }, {
          key: 'trongluongvang',
          label: 'K.L.V',

        },
        {
          key: 'tiencongnhap',
          label: 'C.Nhập',

        }, {
          key: 'tiencongxuat',
          label: 'C.Xuất',

        }, {
          key: 'X',
          label: 'X',

        },
        {
          key: 'loai',
          label: 'Loại',

        },
        {
          key: 'ngaytao',
          label: 'Ngày tạo',

        },
      ],
    };
  },
  computed: {
    btnPrintStatus () {
      if (this.selected.length > 0) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {

    onRowSelected (items) {
      this.selected = items
    },
    selectAllSanPham () {
      this.$refs["table-sanpham"].selectAllRows()
    },
    unselectAllSanPham () {
      this.$refs["table-sanpham"].clearSelected()
    },
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
    intemsanpham () {
      this.ov_tablesanpham = true
      let str = ""
      let list_id = []
      str = "intemsanpham=["
      this.selected.forEach((item, index) => {
        list_id.push(item._id)
        let t = {
          "ten": item.thongtinvatly.ten,
          "klt": this.$formatSoVang(item.thongtinvatly.trongluongtong),
          "klv": this.$formatSoVang(item.thongtinvatly.trongluongvang),
          "klh": this.$formatSoVang(item.thongtinvatly.trongluonghot),
          "c": item.thongtinvatly.tiencongxuat,
          "cty": item.thongtinvatly.nhacungcap,
          "mavach": item.masanpham,
          "loaivang": item.thongtinvatly.loaisanpham,
        }
        str += JSON.stringify(t)
        let a = this.selected.length - 1;
        if (index != a) {
          str += ","
        }
      })
      str += "]"
      this.$pnPublish(
        {
          channel: 'printserver',
          message: {
            entry: 'admin',
            update: str
          }
        }, (status, response) => {

          if (status.statusCode === 200) {
            //set tem
            let arrayPromise = []
            for (let i = 0; i < list_id.length; i++) {
              arrayPromise.push(this.$strapi.$sanphams.update(list_id[i], {
                soluongtem: 1
              }))
            }
            Promise.all(arrayPromise).then(data => {
              this.ov_tablesanpham = false
              this.$nuxt.refresh()
            })

          }
        });
    }

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