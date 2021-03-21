
<template>
  <div class="card">
    <div class="card-body">
                          <a href="javascript:void(0);" class="btn btn-danger mb-2 float-right mb-3"><i class="mdi mdi-plus-circle mr-2"></i> Add New</a>
      <h4 class="header-title mt-1">Loại tài sản và giá</h4>

      <div class="table-responsive mb-0">
        <table
          v-if="kieubanggia"
          class="table table-centered mb-0 font-14"
        >
          <thead class="thead-light">
            <tr>
              <th>Stt</th>
              <th>Loại Hàng</th>
              <th>Tên Hiển thị</th>
              <th>Giá Mua</th>
              <th>Giá Bán</th>
              <th>Kích Hoạt</th>
              <th>Ghi Chú</th>
              <th>Chỉnh Sửa</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(items, index) in kieubanggia" :key="items._id">
              <td>{{ index + 1 }}</td>
              <td>{{ items.ten }}</td>
              <td>{{ items.hienthi }}</td>
              <td>
                <b-form-checkbox
                  v-model="items.cauhinhmua"
                  name="check-button"
                  switch
                >
                </b-form-checkbox>
              </td>
              <td>
                <b-form-checkbox
                  v-model="items.cauhinhban"
                  name="check-button"
                  switch
                >
                </b-form-checkbox>
              </td>
              <td>
                <b-form-checkbox
                  v-model="items.active"
                  name="check-button"
                  switch
                >
                </b-form-checkbox>
              </td>

              <td>{{ items.ghichu }}</td>
            <td>
                        <b-button variant="info">
                            <i class="fe-edit"></i>
                         
                        </b-button><b-button variant="danger" class="ml-1">
                            <i class="fe-trash-2"></i>
                         
                        </b-button>
                        
                        </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- end table-responsive-->
    </div>
    <!-- end card-body-->
  </div>
</template>

<script>
import Switches from "vue-switches";
export default {
  components: { Switches },
  data() {
    return {
      kieubanggia: null,
    };
  },
  async fetch() {
    // this.kieubanggia = await this.$strapi.$cauhinhbanggias.find();
  },
  async mounted() {
    this.kieubanggia = await this.$strapi.$cauhinhbanggias.find();
    console.log(this.kieubanggia);
  },
};
</script>

<style>
</style>
