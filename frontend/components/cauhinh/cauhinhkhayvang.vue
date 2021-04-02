
<template>
  <div>
    <div class="card">
      <div class="card-body">
        <b-button
          class="btn btn-danger mb-2 float-right mb-3"
          v-b-modal.taomoikhayvang
        >
          <i class="mdi mdi-plus-circle mr-2"></i> Add New
        </b-button>

        <h4 class="header-title mt-1">Cấu hình khay vàng</h4>

        <div class="table-responsive mb-0">
          <b-table
            class="text-center"
            bordered
            fixed
            hover
            :busy="!khays"
            head-variant="light"
            :items="khays"
            :fields="fields"
            :show-empty="true"
          >
            <template #cell(stt)="data">
              {{ data.index + 1 }}
            </template>
            <template #cell(sanpham)="data">
              {{ data.item.sanphams.length }}
            </template>

            <template #cell(tool)="data">

              <b-button
                variant="success"
                v-b-modal.chinhsuakhayvang
                @click="setChinhsua(data)"
              >
                <i class="fe-edit"></i>
              </b-button>
              <b-button
                variant="warning"
                @click="deleteItem(data.item._id)"
              >
                <i class="fe-trash-2"></i>
              </b-button>
            </template>
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
          </b-table>

        </div>
        <!-- end table-responsive-->
      </div>
      <!-- end card-body-->
    </div>
    <div>
      <!-- modal tao moi -->
      <b-modal
        id="taomoikhayvang"
        title="Tạo mới khay vàng"
        @ok="taomoiOK"
        ref="taomoikhayvang"
        v-if="ov_taomoikhay"
      >
        <b-overlay rounded="sm">

          <b-form autocomplete="off">
            <b-form-group label="Tên Khay:">
              <b-form-input
                v-model="khay.ten"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Tên hiển thi:">
              <b-form-input
                v-model="khay.hienthi"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Vị trí Khay">
              <b-form-select
                v-model="khay.vitri"
                :options="optionDanhsachkhays"
              ></b-form-select>
            </b-form-group>

            <b-form-group label="Mô tả:">
              <b-form-input
                v-model="khay.mota"
                required
              ></b-form-input>
            </b-form-group>

          </b-form>
        </b-overlay>
      </b-modal>
      <!-- end modal tao moi  -->
      <!-- modal edit  -->
      <b-modal
        id="chinhsuakhayvang"
        title="Chỉnh Khay vàng"
        ref="chinhsuakhayvang"
        @ok="chinhsuakhayvangOK"
      >
        <b-form autocomplete="off">
          <b-form-group label="Tên Khay:">
            <b-form-input
              v-model="tempkhay.ten"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Tên hiển thi:">
            <b-form-input
              v-model="tempkhay.hienthi"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Vị trí Khay">
            <b-form-select
              v-model="tempkhay.vitri"
              :options="optionDanhsachkhays"
            ></b-form-select>
          </b-form-group>

          <b-form-group label="Mô tả:">
            <b-form-input
              v-model="tempkhay.mota"
              required
            ></b-form-input>
          </b-form-group>

        </b-form>
      </b-modal>
      <!-- end modal edit -->
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      optionDanhsachkhays: [],
      danhsachkhays: null,
      ov_taomoikhay: false,
      state_tentaisan: null,
      khays: null,

      fields: [
        {
          key: 'stt',
          label: 'Stt',
        },
        {
          key: 'ten',
          label: 'Tên',
          sortable: true
        },
        {
          key: 'hienthi',
          label: 'Hiển thị'
        }, {
          key: 'vitri',
          label: 'Vị Trí'
        }, {
          key: 'sanpham',
          label: 'Số lượng sản phẩm',
          sortable: true
        }, {
          key: 'mota',
          label: 'Mô tả'
        },
        {
          key: 'tool',
          label: 'Tool'
        }
      ],
      tempkhay: {
        ten: '',
        hienthi: '',
        mota: '',
        vitri: ''
      },
      khay: {
        ten: '',
        hienthi: '',
        mota: '',
        vitri: ''
      },
    };
  },
  methods: {
    setChinhsua (data) {
      this.tempkhay = {
        ten: data.item.ten,
        hienthi: data.item.hienthi,
        mota: data.item.mota,
        vitri: data.item.vitri,
        id: data.item._id

      }
    },
    async taomoiOK (modal) {

      modal.preventDefault();
      try {
        this.ov_taomoikhay = true;
        await this.$strapi.$khays.create(this.khay);
        this.ov_taomoikhay = false;
        this.khay = {
          ten: '',
          hienthi: '',
          mota: '',
          vitri: ''
        }
        this.$refs['taomoikhayvang'].hide()
        this.$nuxt.refresh()
      } catch (error) {
        this.$bvToast.toast(`Lỗi đã có`, {
          title: 'Thông báo',
          variant: 'warning',
          autoHideDelay: 2000,
        })
        this.ov_taomoikhay = false;


      }

    },
    async chinhsuakhayvangOK (modal) {
      modal.preventDefault();

      try {
        await this.$strapi.$khays.update(this.tempkhay.id, {

          ten: this.tempkhay.ten,
          hienthi: this.tempkhay.hienthi,
          mota: this.tempkhay.mota,
          vitri: this.tempkhay.vitri
        })
        this.tempkieutaisan = {
          ten: '',
          hienthi: '',
          mota: '',
          vitri: ''
        }
        this.$refs['chinhsuakhayvang'].hide()
        this.$nuxt.refresh()
      } catch (error) {
        this.$bvToast.toast(`Tên tài sản đã có`, {
          title: 'Thông báo',
          variant: 'warning',
          autoHideDelay: 2000,
        })
        this.ov_taomoi = false;
        this.state_tentaisan = false;

      }
    },
    async deleteItem (id) {
      this.$bvModal.msgBoxConfirm('Bạn muốn xóa ', {
        title: 'Xác nhận',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true
      }).then(value => {

        if (value) {
          this.$strapi.$cauhinhbanggias.delete(id).then(a => {
            this.$nuxt.refresh()
          })

        }
      })
    }
  },
  async fetch () {
    this.ov_taomoikhay = false;
    this.khays = await this.$strapi.$khays.find();
    this.danhsachkhays = await this.$strapi.$danhsachkhays.find()

    let optionsK = []
    this.danhsachkhays.forEach(item => {
      optionsK.push({
        value: item.vitri,
        text: item.hienthi
      })
    })
    this.optionDanhsachkhays = optionsK
    this.ov_taomoikhay = true;

  }
}
</script>

<style>
</style>
