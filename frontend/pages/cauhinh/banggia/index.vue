<template>
<div class="">
      <PageHeader :title="title" :items="items" />
      <div class="row">
          <div class="col-12">

<cauhinhkieubanggia/>

          </div>
      </div>
</div>
</template>

<script>

export default 
{
data(){
    return{
         title: "Welcome !",
            items: [{
                    text: "Cấu hình"
                },
                {
                    text: "Bảng giá"
                },
                {
                    text: "Chi Tiết",
                    active: true
                }
            ],
    }
}
}
</script>

<style>

</style>