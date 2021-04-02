<script>

import Vertical from "./vertical";

/**
 * Default Layout
 */
export default {
  head: {
    title: 'Gold v1'
  },
  components: {
    Vertical
  },
  computed: {

  },
  data () {
    return {
      printserver: this.$pnGetMessage('printserver', (data) => {
        this.$bvToast.toast("Một thành viên vừa thực hiện thao tác in tem", {
          title: `Thông báo`,
          variant: 'primary',
          solid: true
        })
      }),
      maso: '',
      triggerMaso: false,
      sanpham: null,
      sanpham_ready: false,

    }
  },
  mounted () {

    //listen realtime from pubnub
    this.$pnSubscribe({
      channels: ['printserver']
    });
    document.body.onkeypress = () => {
      this.sanpham_ready = false;
      this.$refs['modalTinhTien'].hide()
      if (event.key === "=") {

        this.triggerMaso = true;
        this.maso = "";
      } else if (event.key === "\\") {
        this.triggerMaso = false;
        this.getSanPham();
      }
    }

    document.body.onkeyup = () => {
      if (this.triggerMaso) {
        this.maso += event.key;
      }
    }
  },
  methods: {
    getSum (klv, giaban, cong) {
      return this.$formatSoTien((parseFloat(klv) * parseFloat(giaban)) + parseFloat(cong))
    },
    async getSanPham () {

      let ma = this.maso;
      ma = ma.split("=")[1]
      ma = 'DNU-25'
      this.maso = ma;

      let result = await this.$strapi.$sanphams.find({ masanpham: ma })
      this.sanpham = result[0];

      let p1 = this.$strapi.$cauhinhbanggias.find({ _id: this.sanpham.thongtinvatly.loaisanpham })
      let p2 = this.$strapi.$cauhinhnhacungcaps.find({ _id: this.sanpham.thongtinvatly.nhacungcap })

      Promise.all([p1, p2]).then(data => {
        this.sanpham.thongtinvatly._kieusanpham = (data[0])[0];
        this.sanpham.thongtinvatly._nhaccungcap = (data[1])[0];

      }).then(data => {
        this.sanpham_ready = true;
        this.$refs['modalTinhTien'].show()

      })
    }
  }
};
</script>

<template>
  <div>
    <!-- Begin page -->

    <Vertical>
      <Nuxt />
    </Vertical>
    <b-modal
      ref="modalTinhTien"
      title="Thông Tin"
      size="xl"
    >
      <table
        class="table table-bordered text-center"
        style="font-size:20px"
        v-if="sanpham_ready"
      >
        <thead>
          <tr>
            <th>Mã Số</th>
            <th>Tên</th>
            <th>Khay</th>
            <th>Ngày Thêm</th>
            <th>KLT</th>
            <th>KLH</th>
            <th>KLV</th>
            <th>Công</th>
            <th>Loại-Giá</th>
            <th>Ncc</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b-badge variant="success">{{maso}}</b-badge>
            </td>
            <td>{{sanpham.thongtinvatly.ten}}</td>
            <td><span style="text-decoration:underline dotted black;">{{sanpham.khay.hienthi}}</span></td>
            <td>{{$moment(sanpham.createdAt).format('hh:mm DD-MM-YYYY')}}</td>
            <td><b>{{$formatSoVang(sanpham.thongtinvatly.trongluongtong)}}</b></td>
            <td><b>{{$formatSoVang(sanpham.thongtinvatly.trongluonghot)}}</b></td>
            <td><b>{{$formatSoVang(sanpham.thongtinvatly.trongluongvang)}}</b></td>
            <td><code>{{sanpham.thongtinvatly.tiencongxuat}}</code></td>
            <td>
              <b-badge variant="warning">{{sanpham.thongtinvatly._kieusanpham.hienthi}}</b-badge>
              <b-badge variant="primary">{{sanpham.thongtinvatly._kieusanpham.giaban}}</b-badge>
            </td>
            <td>
              <b-badge variant="success">{{sanpham.thongtinvatly._nhaccungcap.hienthi}}</b-badge>
            </td>
          </tr>
          <tr>
            <td
              style="font-size:34px"
              colspan="10"
            >
              <code>({{ $formatSoVang(sanpham.thongtinvatly.trongluongvang)}} * {{sanpham.thongtinvatly._kieusanpham.giaban}} ) + {{sanpham.thongtinvatly.tiencongxuat}}</code>
            </td>
          </tr>

          <tr>
            <td
              style="font-size:34px"
              colspan="10"
            >
              <code>${{getSum(sanpham.thongtinvatly.trongluongvang,sanpham.thongtinvatly._kieusanpham.giaban,sanpham.thongtinvatly.tiencongxuat)}}</code>
            </td>
          </tr>
        </tbody>
      </table>

    </b-modal>
  </div>
</template>
