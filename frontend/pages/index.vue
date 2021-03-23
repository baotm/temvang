
<script>
import BangGia from '../components/widgets/Bang-gia.vue'
import GiavangTradingView from '../components/widgets/giavang-trading-view.vue'
/**
 * Starter component
 */
export default {
  components: { BangGia },

  data () {
    return {

      title: 'Welcome',
      items: [{
        text: 'Home',
        href: '/',
      },
      {
        text: 'Trang chủ',
        href: '/',
        active: true
      }
      ],
    }
  }
}

</script>

<template>
  <div>
    <PageHeader
      :title="title"
      :items="items"
    />
    <div class="row">
      <div class="col-xl-4 col-lg-12">
        <bang-gia />
      </div>
      <div class="col-xl-4 col-lg-12">
        <bang-gia-mihong />
      </div>
      <div class="col-xl-4 col-lg-12">
        <giavang-trading-view />
      </div>
    </div>
  </div>
</template>
