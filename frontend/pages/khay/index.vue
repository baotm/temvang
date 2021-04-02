<script>
/**
 * Starter component
 */
export default {

  data () {
    return {
      filter: null,
      sanphamSelected: {},
      namekhay: '',
      sanphaminkhay: '',
      tongtiencongkhay: 0,
      tongtrongluongvang: 0,
      tonggiatri: 0,
      getLockStatus: 'mdi mdi-lock',
      lockStatus: true,
      ov_ready: true,
      khays: [],
      title: 'Home',
      itemsInKhay: [],
      fields: [
        {
          key: 'stt',
          label: "#",
          sortable: true
        },

        {
          key: 'ten',
          label: 'Tên',
          sortable: true
        }, {
          key: 'ma',
          label: 'Mã', sortable: true
        }, {
          key: 'ncc',
          label: 'Ncc',
          sortable: true
        }, {
          key: 'klv',
          label: 'Vàng',
          sortable: true
        }, {
          key: 'congnhap',
          label: 'C.Nhập',
          sortable: true
        }, {
          key: 'congxuat',
          label: 'C.Xuất',
          sortable: true
        }, {
          key: 'loaivang',
          label: 'Loại',
          sortable: true
        }, {
          key: 'kieuvang',
          label: 'Kiểu',
          sortable: true
        },
        {
          key: 'total',
          label: 'Tiền',
          sortable: true
        },
        {
          key: 'ngaytao',
          label: 'NgàyTạo',
          sortable: true
        }
      ],
      items: [{
        text: 'Home'
      },
      {
        text: 'Khay',
        active: true
      }
      ],
      selected: null,
      optionsKhay: [

      ],
      listnhacungcap: [],
      listloaisanpham: [],
      listbanggia: [],
    }
  },
  methods: {
    getTotal (item) {
      let trongluongvang = item.thongtinvatly.trongluongvang;
      let giatien = item.thongtinvatly._loaisanpham.giaban
      let tiencong = item.thongtinvatly.tiencongxuat
      return (parseFloat(trongluongvang) * parseFloat(giatien)) + parseFloat(tiencong)
    },
    onRowSelected (item) {
      if (item.length > 0) {
        this.sanphamSelected = item[0]
      }

    },
    showInfo (id) {
      let result = this.khays.find(e => e.vitri === id)

      let _tongtiencong = 0;
      let _tongtrongluong = 0;
      let _tonggiatri = 0;
      result.sanphams.forEach((item, index) => {
        _tongtiencong += item.thongtinvatly.tiencongxuat;
        _tongtrongluong += item.thongtinvatly.trongluongvang
        _tonggiatri += (parseFloat(item.thongtinvatly.trongluongvang) * parseFloat(item.thongtinvatly._loaisanpham.giaban)) + item.thongtinvatly.tiencongxuat
      })
      this.namekhay = result.hienthi;
      this.sanphaminkhay = result.sanphams.length
      this.tongtiencongkhay = this.$formatSoTien(_tongtiencong * 1000)
      this.tongtrongluongvang = this.$formatSoVang(_tongtrongluong)
      this.tonggiatri = this.$formatSoTien(_tonggiatri)
      this.itemsInKhay = result.sanphams;
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
    getloaivang (id) {
      let ncc;
      this.listbanggia.forEach(item => {
        if (item._id == id) {
          ncc = item;
          return
        }
      })

      return ncc
    },
    getkieuvang (id) {
      let ncc;
      this.listloaisanpham.forEach(item => {
        if (item._id == id) {
          ncc = item;
          return
        }
      })

      return ncc
    },
    toggleLock () {
      if (this.getLockStatus == "mdi mdi-lock") {
        this.getLockStatus = "mdi mdi-lock-open"
        this.lockStatus = false;
      } else {
        this.getLockStatus = "mdi mdi-lock"
        this.lockStatus = true;
      }

    },
    setKhaysToPosition () {
      //clone

      for (let i = 0; i < this.khays.length; i++) {
        for (let j = 0; j < this.khays[i].sanphams.length; j++) {
          let result = this.getnhacungcap(this.khays[i].sanphams[j].thongtinvatly.nhacungcap);
          this.khays[i].sanphams[j].thongtinvatly._nhaccungcap = result
          //la loai vang 610
          let result1 = this.getloaivang(this.khays[i].sanphams[j].thongtinvatly.loaisanpham);
          this.khays[i].sanphams[j].thongtinvatly._loaisanpham = result1
          //la loại dây, lac,mat,nhan
          let result2 = this.getkieuvang(this.khays[i].sanphams[j].thongtinvatly.kieusanpham);
          this.khays[i].sanphams[j].thongtinvatly._kieusanpham = result2

        }
        //format value sanpham


        let myDiv = document.createElement("div")
        myDiv.setAttribute("class", "khayContent")
        let myBr = document.createElement("br")
        let mySpanName = document.createElement("span")
        let mySpanAll = document.createElement("span")

        //set value
        mySpanName.innerText = this.khays[i].hienthi;
        mySpanAll.innerText = `[${this.khays[i].sanphams.length}]`;
        myDiv.append(mySpanName)
        myDiv.append(myBr)
        myDiv.append(mySpanAll)
        document.getElementById(this.khays[i].vitri).innerHTML = myDiv.innerHTML


      }

    }
  },
  async fetch () {
    let result = await this.$strapi.$khays.find();
    //tìm ra thằng nào còn
    result.forEach((item, index) => {
      let sp = item.sanphams.filter(e => e.tinhtrang)
      result[index].sanphams = sp;
    })
    this.khays = result;
    let optionK = []
    result.forEach(item => {
      optionK.push({
        value: item.ten,
        text: item.hienthi
      })
    })
    this.optionsKhay = optionK;

    let p1 = this.$strapi.$cauhinhnhacungcaps.find();
    let p2 = this.$strapi.$cauhinhbanggias.find();
    let p3 = this.$strapi.$cauhinhmathangs.find();
    Promise.all([p1, p2, p3]).then(data => {
      this.listnhacungcap = data[0]
      this.listloaisanpham = data[2]
      this.listbanggia = data[1]
    }).then(data => {
      this.setKhaysToPosition();
    })


    this.ov_ready = false;
  }
}
</script>
<style scoped>
.tg {
  cursor: pointer;
}
.tg td {
  border-color: 1px;
  border-style: solid;
  border-width: 1px;
  color: #669;
  font-family: Arial, sans-serif;
  font-size: 14px;
  overflow: hidden;
  padding: 12px 5px;
}

.tg .tg-e6ut {
  vertical-align: top;
}
.tg .tg-hc8k {
  text-align: center;
  vertical-align: middle;
  background-color: thistle;
}
.tg .tg-hc8k:hover {
  background-color: tomato;
}
</style>
<template>
  <div>
    <PageHeader
      :title="title"
      :items="items"
    />
    <div>
      <b-overlay :show="ov_ready">
        <div class="tg-wrap">
          <table class="tg">
            <tbody>
              <tr>
                <td
                  class="tg-hc8k khay_ximen"
                  id="k_ximen"
                  @click="showInfo('k_ximen')"
                ></td>
                <td
                  id="k_mat"
                  class="tg-hc8k"
                  @click="showInfo('k_mat')"
                >Mặt</td>
                <td
                  id="k_bong"
                  class="tg-hc8k"
                  @click="showInfo('k_bong')"
                >Bông</td>
                <td
                  id="k_lac1"
                  class="tg-hc8k"
                  @click="showInfo('k_lac1')"
                >Lắc 1</td>
                <td
                  id="k_lac2"
                  class="tg-hc8k"
                  @click="showInfo('k_lac2')"
                >Lắc 2</td>
                <td
                  id="k_congtron"
                  class="tg-hc8k"
                  @click="showInfo('k_congtron')"
                >Còng 1</td>
                <td
                  id="k_congy"
                  class="tg-hc8k"
                  @click="showInfo('k_congy')"
                >Còng 2</td>
              </tr>
              <tr>
                <td
                  id="k_daycong"
                  class="tg-hc8k"
                  @click="showInfo('k_daycong')"
                >Dây Cong 1</td>
                <td
                  id="k_nhancuoi"
                  class="tg-hc8k"
                  @click="showInfo('k_nhancuoi')"
                > N.Cưới</td>
                <td
                  colspan="5"
                  rowspan="8"
                  class="tg-e6ut"
                >
                  <div class="row">
                    <div class="col-12">
                      <h4 class="text-center">Thông Tin Khay</h4>
                    </div>

                    <!-- phần info -->

                    <div class="col-12">

                      <b-form-input
                        v-model="filter"
                        type="search"
                        placeholder="Type to Search"
                      ></b-form-input>

                      <b-table
                        sticky-header
                        head-variant="dark"
                        :items="itemsInKhay"
                        :fields="fields"
                        show-empty
                        hover
                        bordered
                        selectable
                        select-mode="single"
                        @row-selected="onRowSelected"
                        :filter="filter"
                      >

                        <template #cell(stt)="data">
                          {{ data.index + 1 }}
                        </template>
                        <template #cell(ten)="data">
                          {{data.item.thongtinvatly.ten}}
                        </template>
                        <template #cell(ma)="data">
                          <b-badge variant="success"> {{data.item.masanpham}} </b-badge>

                        </template>
                        <template #cell(klv)="data">
                          {{$formatSoVang(data.item.thongtinvatly.trongluongvang)}}
                        </template>
                        <template #cell(ncc)="data">
                          {{$formatSoVang(data.item.thongtinvatly._nhaccungcap.hienthi)}}
                        </template>

                        <template #cell(congnhap)="data">
                          <code>$ {{data.item.thongtinvatly.tiencongnhap}}</code>

                        </template>
                        <template #cell(congxuat)="data">
                          <code>$ {{data.item.thongtinvatly.tiencongxuat}}</code>

                        </template>
                        <template #cell(loaivang)="data">

                          {{data.item.thongtinvatly._loaisanpham.hienthi}}
                        </template>
                        <template #cell(kieuvang)="data">
                          {{data.item.thongtinvatly._kieusanpham.hienthi}}
                        </template>

                        <template #cell(total)="data">
                          {{$formatSoTien(getTotal(data.item)) }}
                        </template>
                        <template #cell(ngaytao)="data">
                          <code> {{$moment(data.item.createdAt).format('hh:mm MM-DD-YYYY')}}</code>
                        </template>

                      </b-table>
                    </div>
                    <div
                      class="col-6"
                      style="border-top:1px solid black"
                    >
                      <table
                        class="table table-borderless table-light"
                        border="0"
                      >

                        <tbody>
                          <tr>
                            <td>Tên Khay</td>
                            <td>{{namekhay}}</td>
                            <td>Tổng Món </td>
                            <td>{{sanphaminkhay}}</td>
                          </tr>
                          <tr>
                            <td>Tổng Trọng.L.Vàng</td>
                            <td>{{tongtrongluongvang}}</td>
                            <td>Tổng tiền công</td>
                            <td>{{tongtiencongkhay}}</td>
                          </tr>
                          <tr>
                            <td>Tổng Giá.trị</td>
                            <td>{{tonggiatri}}</td>
                            <td>Số Món Đã Bán</td>
                            <td>3</td>
                          </tr>

                        </tbody>
                      </table>

                    </div>
                    <div
                      class="col-6"
                      style="border-top:1px solid black"
                    >
                      <div class="row m-1">
                        <div class="col-3">

                          <b-button
                            variant="primary"
                            block
                            disabled
                          >
                            {{sanphamSelected.masanpham||'Nothing'}}
                          </b-button>

                        </div>
                        <div
                          class="col-2 text-center mt-1"
                          style="font-size:20px"
                        >
                          <i class="fe-arrow-right"></i>
                        </div>
                        <div class="col-3">
                          <b-button
                            variant="success"
                            block
                          >Chuyển</b-button>
                        </div>
                        <div class="col-4">
                          <b-form-select
                            v-model="selected"
                            :options="optionsKhay"
                          ></b-form-select>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  id="k_daylat1"
                  class="tg-hc8k"
                  @click="showInfo('k_daylat1')"
                >Dây Lật 1</td>
                <td
                  id="k_bongem"
                  class="tg-hc8k"
                  @click="showInfo('k_bongem')"
                >BôngEm</td>
              </tr>
              <tr>
                <td
                  id="k_daylat2"
                  class="tg-hc8k"
                  @click="showInfo('k_daylat2')"
                >Dây Lật 2</td>
                <td
                  id="k_congembe"
                  class="tg-hc8k"
                  @click="showInfo('k_congembe')"
                >Còng em</td>
              </tr>
              <tr>
                <td
                  id="k_nhany"
                  class="tg-hc8k"
                  @click="showInfo('k_nhany')"
                >Nhẫn Y</td>
                <td
                  id="k_kho"
                  class="tg-hc8k"
                  @click="showInfo('k_kho')"
                >Kho</td>
              </tr>
              <tr>
                <td
                  id="k_daynu1"
                  class="tg-hc8k"
                  @click="showInfo('k_daynu1')"
                >Dây 1</td>
                <td class="tg-hc8k"></td>
              </tr>
              <tr>
                <td
                  id="k_daynu2"
                  class="tg-hc8k"
                  @click="showInfo('k_daynu2')"
                >Dây 2</td>
                <td class="tg-hc8k"></td>
              </tr>
              <tr>
                <td
                  id="k_daynu3"
                  class="tg-hc8k"
                  @click="showInfo('k_daynu3')"
                >Dây 3</td>
                <td class="tg-hc8k"></td>
              </tr>
              <tr>
                <td
                  id="k_nhannam"
                  class="tg-hc8k"
                  @click="showInfo('k_nhannam')"
                >Nhẫn Nam</td>
                <td class="tg-hc8k"></td>
              </tr>
              <tr>
                <td
                  id="k_congcohot"
                  class="tg-hc8k"
                  @click="showInfo('k_congcohot')"
                >Còng 3</td>
                <td
                  id="k_nhannu1"
                  class="tg-hc8k"
                  @click="showInfo('k_nhannu1')"
                >Nhẫn 1</td>
                <td
                  id="k_nhannu2"
                  class="tg-hc8k"
                  @click="showInfo('k_nhannu2')"
                >Nhẫn 2</td>
                <td
                  id="k_nhannu3"
                  class="tg-hc8k"
                  @click="showInfo('k_nhannu3')"
                >Nhẫn 3</td>
                <td
                  id="k_mattb"
                  class="tg-hc8k"
                  @click="showInfo('k_mattb')"
                >TB.M</td>
                <td
                  id="k_nhantb"
                  class="tg-hc8k"
                  @click="showInfo('k_nhantb')"
                >TB.N</td>
                <td
                  id="k_congtb"
                  class="tg-hc8k"
                  @click="showInfo('k_congtb')"
                >TB.Ct</td>
              </tr>
            </tbody>
          </table>

        </div>
      </b-overlay>
    </div>
  </div>

</template>
