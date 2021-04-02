<template>
  <div class="">
    <PageHeader
      :title="title"
      :items="items"
    />
    <div class="row">
      <div class="col-12">
        <cauhinhnhacungcap />

      </div>
      <div class="col-12">
        <cauhinhloaihang />
      </div>
      <div class="col-12">
        <cauhinhkieubanggia />

      </div>
      <div class="col-12">
        <cauhinhkhayvang />
      </div>
    </div>
  </div>
</template>

<script>

export default
  {
    data () {
      return {
        title: "Welcome !",
        items: [
          {
            text: "Trang chủ",
          },
          {
            text: "Cấu hình",
          },
          {
            text: "Toàn bộ",
            active: true,
          },
        ],
      };
    },
  };
</script>

<style>
</style>