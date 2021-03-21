
<script>
import BangGia from '../components/widgets/Bang-gia.vue'
/**
 * Starter component
 */
export default {
  components: { BangGia },
   
    data() {
        return {
            title: 'Welcome',
            items: [{
                    text: 'Home',
                    href: '/',
                },
                {
                    text: 'Trang chủ',
                    href: '/',
                },
                {
                    text: 'Thống kê',
                    active: true,
                },
            ],
        }
    }
}

</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />
     <div class="row">
        <div class="col-xl-5 col-lg-6">
            <bang-gia/>
        </div>
     </div>
</div>
</template>
