
<template>
  <div>
    <div class="card">
      <div class="card-body">
        <b-button
          class="btn btn-danger mb-2 float-right mb-3"
          v-b-modal.loaihangtaomoi
        >
          <i class="mdi mdi-plus-circle mr-2"></i> Add New
        </b-button>

        <h4 class="header-title mt-1">Loại hàng hóa</h4>

        <div class="table-responsive mb-0">
          <b-table
            bordered
            hover
            :busy="!kieuloaihang"
            head-variant="light"
            :items="listkieuloaihang"
            :fields="fields"
            :show-empty="true"
          >
            <template #cell(stt)="data">
              {{ data.index + 1 }}
          
            </template>

            <template #cell(tool)="data">
              <b-button
                variant="success"
                v-b-modal.loaihangchinhsua
                @click="setChinhsualoaihang(data)"
              >
                <i class="fe-edit"></i>
              </b-button>
              <b-button
                variant="warning"
                @click="deleteItemloaihang(data.item._id)"
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
        id="loaihangtaomoi"
        title="Tạo mới loại tài sản và giá"
        @ok="taomoiOKloaihang"
        ref="loaihangtaomoi"
      >
        <b-overlay :show="ov_loaihangtaomoi" rounded="sm">
          <b-form autocomplete="off">
            <b-form-group label="Tên tài sản:">
              <b-form-input
                :state="state_tenloaihang"
                v-model="kieuloaihang.ten"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Tên hiển thi:">
              <b-form-input
                v-model="kieuloaihang.hienthi"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Tên viết tắt:">
              <b-form-input
                v-model="kieuloaihang.viettat"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Mô tả :">
              <b-form-input v-model="kieuloaihang.mota" required></b-form-input>
            </b-form-group>
          </b-form>
        </b-overlay>
      </b-modal>
      <!-- end modal tao moi  -->
      <!-- modal edit  -->
      <b-modal
        id="loaihangchinhsua"
        title="Chỉnh sửa loại tài sản và giá"
        ref="loaihangchinhsua"
        @ok="loaihangchinhsuaOK"
      >
        <b-form autocomplete="off">
          <b-form-group label="Tên tài sản:">
            <b-form-input
              v-model="tempkieuloaihang.ten"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Tên hiển thi:">
            <b-form-input
              v-model="tempkieuloaihang.hienthi"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Mô tả :">
            <b-form-input
              v-model="tempkieuloaihang.mota"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Viết tắt">
            <b-form-input
              v-model="tempkieuloaihang.viettat"
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
  data() {
    return {
      ov_loaihangtaomoi: false,
      state_tenloaihang: null,
      listkieuloaihang: null,
      fields: [
        {
          key: "stt",
          label: "Stt",
        },
        {
          key: "ten",
          label: "Tên",
        },
        {
          key: "hienthi",
          label: "Hiển thị",
        },
        {
          key: "mota",
          label: "Mô tả",
        },
        {
          key: "viettat",
          label: "Viết tắt",
        },
        {
          key: "tool",
          label: "Tool",
        },
      ],
      tempkieuloaihang: {
        ten: "",
        hienthi: "",
        viettat: "",
        ten: "",
      },
      kieuloaihang: {
        ten: "",
        hienthi: "",
        viettat: "",
        ten: "",
      },
    };
  },
  methods: {
    setChinhsualoaihang(data) {
      this.tempkieuloaihang = {
        id: data.item._id,
        mota: data.item.mota,
        viettat: data.item.viettat,
        ten: data.item.ten,
        hienthi: data.item.hienthi,
      };
    },
    async taomoiOKloaihang(modal) {
      modal.preventDefault();
      try {
        this.ov_loaihangtaomoi = true;
        console.log(this.kieuloaihang)
        await this.$strapi.$cauhinhmathangs.create(this.kieuloaihang);
        this.ov_loaihangtaomoi = false;
        this.kieuloaihang = {
          ten: "",
          hienthi: "",
          viettat: "",
          ten: "",
        };
        this.$refs["loaihangtaomoi"].hide();
        this.$nuxt.refresh();
      } catch (error) {
        this.$bvToast.toast(`Tên tài sản đã có`, {
          title: "Thông báo",
          variant: "warning",
          autoHideDelay: 2000,
        });
        this.ov_loaihangtaomoi = false;
        this.state_tenloaihang = false;
      }
    },
    async loaihangchinhsuaOK(modal) {
      modal.preventDefault();
    console.log(this.tempkieuloaihang)
      try {
        await this.$strapi.$cauhinhmathangs.update(this.tempkieuloaihang.id, 
          this.tempkieuloaihang
        );
        this.tempkieutaisan = {
        ten: "",
        hienthi: "",
        viettat: "",
        ten: "",
        };
        this.$refs["loaihangchinhsua"].hide();
        this.$nuxt.refresh();
      } catch (error) {
          console.log(error)
        this.$bvToast.toast(`Tên tài sản đã có`, {
          title: "Thông báo",
          variant: "warning",
          autoHideDelay: 2000,
        });
        this.ov_loaihangtaomoi = false;
        this.state_tenloaihang = false;
      }
    },
    async deleteItemloaihang(id) {
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
              console.log(value )
            this.$strapi.$cauhinhmathangs.delete(id).then((a) => {
              this.$nuxt.refresh();
            });
          }
        });
    },
  },
  async fetch() {
    this.listkieuloaihang = await this.$strapi.$cauhinhmathangs.find();
  },
};
</script>

<style>
</style>
