
<template>
  <div>
    <div class="card">
      <div class="card-body">
        <b-button
          class="btn btn-danger mb-2 float-right mb-3"
          v-b-modal.taomoinhacungcap
        >
          <i class="mdi mdi-plus-circle mr-2"></i> Add New
        </b-button>

        <h4 class="header-title mt-1">Nhà cung cấp</h4>

        <div class="table-responsive mb-0">
          <b-table
            bordered
            hover
            :busy="!listnhacungcap"
            head-variant="light"
            :items="listnhacungcap"
            :fields="fields"
            :show-empty="true"
          >
            <template #cell(stt)="data">
              {{ data.index + 1 }}
            </template>

      
            <template #cell(tool)="data">

              <b-button
                variant="success"
                v-b-modal.chinhsuanhacungcap
                @click="setChinhsuanhacungcap(data)"
              >
                <i class="fe-edit"></i>
              </b-button>
              <b-button
                variant="warning"
                @click="deleteItemnhacungcap(data.item._id)"
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
        id="taomoinhacungcap"
        title="Tạo mới nhà cung cấp"
        @ok="taomoiOKnhacungcap"
        ref="taomoinhacungcap"
      >
        <b-overlay
          :show="ov_nhacungcaotaomoi"
          rounded="sm"
        >

          <b-form autocomplete="off">
            <b-form-group label="Tên nhà cung cấp:">
              <b-form-input
                :state="state_nhacungcap"
                v-model="nhacungcap.ten"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Tên hiển thi:">
              <b-form-input
                v-model="nhacungcap.hienthi"
                required
              ></b-form-input>
            </b-form-group>
         
  <b-form-group label="Điện thoại:">
              <b-form-input
                v-model="nhacungcap.dienthoai"
                required
              ></b-form-input>
            </b-form-group>
           <b-form-group label="Địa chỉ">
              <b-form-input
                v-model="nhacungcap.diachi"
                required
              ></b-form-input>
            </b-form-group>
         
            <b-form-group label="Ghi Chú:">
              <b-form-input
                v-model="nhacungcap.ghichu"
                required
              ></b-form-input>
            </b-form-group>

          </b-form>
        </b-overlay>
      </b-modal>
      <!-- end modal tao moi  -->
      <!-- modal edit  -->
      <b-modal
        id="chinhsuanhacungcap"
        title="Chỉnh sửa nhà cung cấp"
        ref="chinhsuanhacungcap"
        @ok="chinhsuaOKnhacungcap"
      >
        <b-form autocomplete="off">
          <b-form-group label="Tên nhà cung cấp sản:">
            <b-form-input
              v-model="tempnhacungcap.ten"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Tên hiển thi:">
            <b-form-input
              v-model="tempnhacungcap.hienthi"
              required
            ></b-form-input>
          </b-form-group>
         
          <b-form-group label="Số điện thoại:">
            <b-form-input v-model="tempnhacungcap.dienthoai"></b-form-input>
          </b-form-group>

          <b-form-group label="Địa chỉ:">
            <b-form-input v-model="tempnhacungcap.diachi"></b-form-input>
          </b-form-group>

          <b-form-group label="Ghi Chú:">
            <b-form-input v-model="tempnhacungcap.ghichu"></b-form-input>
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
      ov_nhacungcaotaomoi: false,
      state_nhacungcap: null,
      listnhacungcap: null,

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
          key: 'diachi',
          label: 'Địa chỉ',
          sortable: true
        }, {
          key: 'dienthoai',
          label: 'Sdt',
          sortable: true
        },  {
          key: 'ghichu',
          label: 'Ghi chú'
        },
        {
          key: 'tool',
          label: 'Tool'
        }
      ],
      tempnhacungcap: {
        id: '',
        ghichu: '',
        diachi: '',
        dienthoai: '',
        ten: '',
        hienthi: ''
      },
      nhacungcap: {
        id: '',
        ghichu: '',
        diachi: '',
        dienthoai: '',
        ten: '',
        hienthi: ''
      },
    };
  },
  methods: {
    setChinhsuanhacungcap (data) {
      this.tempnhacungcap = {
        id: data.item._id,
        ghichu: data.item.ghichu,
        dienthoai: data.item.dienthoai,
        ten: data.item.ten,
        hienthi: data.item.hienthi,
        diachi:data.item.diachi
      }
    },
    async taomoiOKnhacungcap (modal) {

      modal.preventDefault();
      try {
        this.ov_nhacungcaotaomoi = true;
        await this.$strapi.$cauhinhnhacungcaps.create(this.nhacungcap);
        this.ov_nhacungcaotaomoi = false;
        this.nhacungcap = {
        id: '',
        ghichu: '',
        diachi: '',
        dienthoai: '',
        ten: '',
        hienthi: ''
        }
        this.$refs['taomoinhacungcap'].hide()
        this.$nuxt.refresh()
      } catch (error) {
        this.$bvToast.toast(`Tên tài sản đã có`, {
          title: 'Thông báo',
          variant: 'warning',
          autoHideDelay: 2000,
        })
        this.ov_nhacungcaotaomoi = false;
        this.state_nhacungcap = false;

      }

    },
    async chinhsuaOKnhacungcap (modal) {
      modal.preventDefault();

      try {
        await this.$strapi.$cauhinhnhacungcaps.update(this.tempnhacungcap.id, {
          ghichu: this.tempnhacungcap.ghichu,
          diachi: this.tempnhacungcap.diachi,
          dienthoai: this.tempnhacungcap.dienthoai,
          ten: this.tempnhacungcap.ten,
          hienthi: this.tempnhacungcap.hienthi
        })
        this.tempnhacungcap = {
            id: '',
        ghichu: '',
        diachi: '',
        dienthoai: '',
        ten: '',
        hienthi: ''
        }
        this.$refs['chinhsuanhacungcap'].hide()
        this.$nuxt.refresh()
      } catch (error) {
        this.$bvToast.toast(`Tên tài sản đã có`, {
          title: 'Thông báo',
          variant: 'warning',
          autoHideDelay: 2000,
        })
        this.ov_nhacungcaotaomoi = false;
        this.state_nhacungcap = false;

      }
    },
    async deleteItemnhacungcap (id) {
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
          this.$strapi.$cauhinhnhacungcaps.delete(id).then(a => {
            this.$nuxt.refresh()
          })

        }
      })
    }
  },
  async fetch () {
    this.listnhacungcap = await this.$strapi.$cauhinhnhacungcaps.find();
  }
}
</script>

<style>
</style>
