
<template>
  <div>
    <div class="card">
      <div class="card-body">
        <b-button
          class="btn btn-danger mb-2 float-right mb-3"
          v-b-modal.taomoi
        >
          <i class="mdi mdi-plus-circle mr-2"></i> Add New
        </b-button>

        <h4 class="header-title mt-1">Loại tài sản và giá</h4>

        <div class="table-responsive mb-0">
          <b-table
            bordered
            hover
            fixed
            :busy="!kieubanggia"
            head-variant="light"
            :items="kieubanggia"
            :fields="fields"
            :show-empty="true"
          >
            <template #cell(stt)="data">
              {{ data.index + 1 }}
            </template>

            <template #cell(active)="data">

              <b-form-checkbox
                size="lg"
                disabled
                :checked="data.item.active"
                switch
              >
              </b-form-checkbox>
            </template>
            <template #cell(tool)="data">

              <b-button
                variant="success"
                v-b-modal.chinhsua
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
        id="taomoi"
        title="Tạo mới loại tài sản và giá"
        @ok="taomoiOK"
        ref="taomoi"
      >
        <b-overlay
          :show="ov_taomoi"
          rounded="sm"
        >

          <b-form autocomplete="off">
            <b-form-group label="Tên tài sản:">
              <b-form-input
                :state="state_tentaisan"
                v-model="kieutaisan.ten"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Tên hiển thi:">
              <b-form-input
                v-model="kieutaisan.hienthi"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-row>
              <b-col>
                <b-form-group label="Giá Thu Vào:">
                  <b-form-input v-model="kieutaisan.giamua"></b-form-input>
                  <b-form-text>Giá * 1000k </b-form-text>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Giá Bán Ra:">
                  <b-form-input v-model="kieutaisan.giaban"></b-form-input>
                  <b-form-text>Giá * 1000k </b-form-text>
                </b-form-group>

              </b-col>
            </b-form-row>

            <b-form-group label="Ghi Chú:">
              <b-form-input
                v-model="kieutaisan.ghichu"
                required
              ></b-form-input>
            </b-form-group>

          </b-form>
        </b-overlay>
      </b-modal>
      <!-- end modal tao moi  -->
      <!-- modal edit  -->
      <b-modal
        id="chinhsua"
        title="Chỉnh sửa loại tài sản và giá"
        ref="chinhsua"
        @ok="chinhsuaOK"
      >
        <b-form autocomplete="off">
          <b-form-group label="Tên tài sản:">
            <b-form-input
              v-model="tempkieutaisan.ten"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Tên hiển thi:">
            <b-form-input
              v-model="tempkieutaisan.hienthi"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-row>
            <b-col>
              <b-form-group label="Giá Thu Vào:">
                <b-form-input v-model="tempkieutaisan.giamua"></b-form-input>
                <b-form-text>Giá * 1000k </b-form-text>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Giá Bán Ra:">
                <b-form-input v-model="tempkieutaisan.giaban"></b-form-input>
                <b-form-text>Giá * 1000k </b-form-text>
              </b-form-group>

            </b-col>
            <b-col>
              <b-form-group label="Kích hoạt:">
                <b-form-checkbox
                  v-model="tempkieutaisan.active"
                  size="lg"
                  switch
                >
                </b-form-checkbox>
              </b-form-group>

            </b-col>
          </b-form-row>

          <b-form-group label="Ghi Chú:">
            <b-form-input v-model="tempkieutaisan.ghichu"></b-form-input>
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
      ov_taomoi: false,
      state_tentaisan: null,
      kieubanggia: null,

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
          key: 'giamua',
          label: 'Giá Mua',
          sortable: true
        }, {
          key: 'giaban',
          label: 'Giá Bán',
          sortable: true
        }, {
          key: 'active',
          label: 'Kích hoạt'
        }, {
          key: 'ghichu',
          label: 'Ghi chú'
        },
        {
          key: 'tool',
          label: 'Tool'
        }
      ],
      tempkieutaisan: {
        id: '',
        ghichu: '',
        giamua: 0,
        giaban: 0,
        active: true,
        ten: '',
        tenhienthi: ''
      },
      kieutaisan: {
        ghichu: '',
        giamua: 0,
        giaban: 0,
        active: true,
        ten: '',
        tenhienthi: ''
      },
    };
  },
  methods: {
    setChinhsua (data) {
      this.tempkieutaisan = {
        id: data.item._id,
        ghichu: data.item.ghichu,
        giamua: data.item.giamua,
        giaban: data.item.giaban,
        active: data.item.active,
        ten: data.item.ten,
        hienthi: data.item.hienthi
      }
    },
    async taomoiOK (modal) {

      modal.preventDefault();
      try {
        this.ov_taomoi = true;
        await this.$strapi.$cauhinhbanggias.create(this.kieutaisan);
        this.ov_taomoi = false;
        this.kieutaisan = {
          ghichu: '',
          giamua: 0,
          giaban: 0,
          active: true,
          ten: '',
          tenhienthi: ''
        }
        this.$refs['taomoi'].hide()
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
    async chinhsuaOK (modal) {
      modal.preventDefault();

      try {
        await this.$strapi.$cauhinhbanggias.update(this.tempkieutaisan.id, {
          ghichu: this.tempkieutaisan.ghichu,
          giamua: this.tempkieutaisan.giamua,
          giaban: this.tempkieutaisan.giaban,
          active: this.tempkieutaisan.active,
          ten: this.tempkieutaisan.ten,
          hienthi: this.tempkieutaisan.hienthi
        })
        this.tempkieutaisan = {
          id: '',
          ghichu: '',
          giamua: 0,
          giaban: 0,
          active: true,
          ten: '',
          hienthi: ''
        }
        this.$refs['chinhsua'].hide()
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
    this.kieubanggia = await this.$strapi.$cauhinhbanggias.find();
  }
}
</script>

<style>
</style>
