

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title">Thêm 1 sản phẩm vào dữ liệu</h4>
            <p class="sub-header">
              Cố gắng kiểm tra kĩ về trọng lượng, giá tiền công, vì mọi
              <code>sai sót</code> đều phải trả giá
            </p>
            <div class="row">
              <div class="col-12">
                <b-form-group>
                  <b-form-input>das</b-form-input>
                </b-form-group>
                <b-form-group
                  id="example text"
                  
                  label="Text"
                >
                  <b-form-input
                    for="text"
                    value="Some text value..."
                  ></b-form-input>
                </b-form-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * Starter component
 */
export default {
  head() {
    return {
      title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
    };
  },
  data() {
    return {
      title: "Thêm Sản Phẩm",
      items: [
        {
          text: "Home",
          href: "/",
        },
        {
          text: "Sản phẩm",
          href: "/sanpham",
        },
        {
          text: "Thêm mới",
          href: "/",
          active: true,
        },
      ],
    };
  },
};
</script>