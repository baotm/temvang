<script>
/**
 * Right-sidebar component
 */
export default {
  data () {
    return {
      config: {
        handler: this.handleRightBarClick,
        middleware: this.middleware,
        events: ["click"]
      },
      checked: false,
      layout: this.$store ?
        this.$store.state.layout.layoutType : {} || {},
      width: this.$store ?
        this.$store.state.layout.layoutWidth : {} || {},
      topbar: this.$store ? this.$store.state.layout.topbar : {} || {},
      sidebarType: this.$store ?
        this.$store.state.layout.leftSidebarType : {} || {},
      sidebarSize: this.$store ?
        this.$store.state.layout.leftSidebarSize : {} || {},
      menu: this.$store ?
        this.$store.state.layout.menuPosition : {} || {},
    };
  },
  methods: {
    handleRightBarClick (e, el) {
      this.$parent.hideRightSidebar();
    },
    middleware (event, el) {
      return !event.target.classList.contains("toggle-right");
    },
    changeLayout (layout) {
      this.$store.dispatch('layout/changeLayoutType', {
        layoutType: layout
      })
    },
    changeWidth (width) {
      this.$store.dispatch('layout/changeLayoutWidth', {
        layoutWidth: width
      });
    },
    changeTopbartype (value) {
      this.$store.dispatch('layout/changeTopbar', {
        topbar: value
      });
    },
    changeType (type) {
      this.$store.dispatch('layout/changeLeftSidebarType', {
        leftSidebarType: type
      });
    },
    changeSize (size) {
      this.$store.dispatch('layout/changeLeftSidebarSize', {
        leftSidebarSize: size
      });
    },
    changemenuPosition (position) {
      this.$store.dispatch('layout/changeMenuPosition', {
        menuPosition: position
      });
    },
    enableInfo () {
      if (this.checked)
        document.body.setAttribute('data-sidebar-showuser', 'true')
      else
        document.body.removeAttribute('data-sidebar-showuser')
    },
    reset () {
      this.width = "fluid";
      this.menu = "fixed";
      this.sidebarType = "light";
      this.sidebarSize = "default";
      this.topbar = "dark";
      this.checked = false;
    }
  },
};
</script>

<template>
  <div>
    <!-- Right Sidebar -->
    <div
      class="right-bar"
      v-click-outside="config"
    >

      <!-- end slimscroll-menu-->
    </div>
    <!-- /Right-bar -->

    <!-- Right bar overlay-->
    <div class="rightbar-overlay"></div>
  </div>
</template>
