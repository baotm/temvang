
<template>
<div class="card">
    <div class="card-body">
        <b-dropdown class="float-right" variant="black" toggle-class="arrow-none card-drop" right>
            <template v-slot:button-content>
                <i class="mdi mdi-dots-horizontal"></i>
            </template>
            <!-- item-->
            <b-dropdown-item>Settings</b-dropdown-item>
            <!-- item-->
            <b-dropdown-item>Download</b-dropdown-item>
            <!-- item-->
            <b-dropdown-item>Upload</b-dropdown-item>
            <!-- item-->
            <b-dropdown-item>Action</b-dropdown-item>
        </b-dropdown>

        <h4 class="header-title">Revenue Report</h4>

        <div class="mt-3 text-center">
            <div class="row pt-2">
                <div class="col-4">
                    <p class="text-muted font-15 mb-1 text-truncate">Target</p>
                    <h4>$12,365</h4>
                </div>
                <div class="col-4">
                    <p class="text-muted font-15 mb-1 text-truncate">Last week</p>
                    <h4><i class="fe-arrow-down text-danger"></i> $365</h4>
                </div>
                <div class="col-4">
                    <p class="text-muted font-15 mb-1 text-truncate">Last Month</p>
                    <h4><i class="fe-arrow-up text-success"></i> $8,501</h4>
                </div>
            </div>

            <div dir="ltr">
              <b-table striped hover :items="items"></b-table>
            </div>
        </div>
    </div>
</div>
<!-- end card-box -->
</template>


<script>
export default {
data(){
  return{

  }
}
}

</script>

<style>

</style>