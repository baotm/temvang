<script>
/**
 * Right-sidebar component
 */
export default {
    data() {
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
        handleRightBarClick(e, el) {
            this.$parent.hideRightSidebar();
        },
        middleware(event, el) {
            return !event.target.classList.contains("toggle-right");
        },
        changeLayout(layout) {
            this.$store.dispatch('layout/changeLayoutType', {
                layoutType: layout
            })
        },
        changeWidth(width) {
            this.$store.dispatch('layout/changeLayoutWidth', {
                layoutWidth: width
            });
        },
        changeTopbartype(value) {
            this.$store.dispatch('layout/changeTopbar', {
                topbar: value
            });
        },
        changeType(type) {
            this.$store.dispatch('layout/changeLeftSidebarType', {
                leftSidebarType: type
            });
        },
        changeSize(size) {
            this.$store.dispatch('layout/changeLeftSidebarSize', {
                leftSidebarSize: size
            });
        },
        changemenuPosition(position) {
            this.$store.dispatch('layout/changeMenuPosition', {
                menuPosition: position
            });
        },
        enableInfo() {
            if (this.checked)
                document.body.setAttribute('data-sidebar-showuser', 'true')
            else
                document.body.removeAttribute('data-sidebar-showuser')
        },
        reset() {
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
    <div class="right-bar" v-click-outside="config">
        <simplebar class="h-100">
            <b-tabs content-class="pt-0" justified class="nav-bordered">
            
                <b-tab active>
                    <template v-slot:title>
                        <i class="mdi mdi-cog-outline d-block font-22 my-1"></i>
                    </template>

                    <h6 class="font-weight-medium px-3 m-0 py-2 font-13 text-uppercase bg-light">
                        <span class="d-block py-1">Theme Settings</span>
                    </h6>

                    <div class="p-3">
                        <div class="alert alert-warning" role="alert">
                            <strong>Customize </strong> the overall color scheme, sidebar
                            menu, etc.
                        </div>

                        <h6 class="font-weight-medium font-14 mt-4 mb-2 pb-1">
                            Layout
                        </h6>
                        <b-form-radio-group v-model="layout" stacked @input="changeLayout($event)">
                            <b-form-radio value="vertical" class="mb-1">Vertical</b-form-radio>
                            <b-form-radio value="horizontal" class="mb-1">Horizontal</b-form-radio>
                            <b-form-radio value="detached" class="mb-1">Detached</b-form-radio>
                            <b-form-radio value="two-column" class="mb-1">Two Column</b-form-radio>
                        </b-form-radio-group>

                        <!-- Width -->
                        <h6 class="font-weight-medium font-14 mt-4 mb-2 pb-1">Width</h6>
                        <b-form-radio-group v-model="width" stacked @input="changeWidth($event)">
                            <b-form-radio value="fluid" class="mb-1">Fluid</b-form-radio>
                            <b-form-radio value="boxed">Boxed</b-form-radio>
                        </b-form-radio-group>

                        <!-- Topbar -->
                        <h6 class="font-weight-medium font-14 mt-4 mb-2 pb-1">Topbar</h6>
                        <b-form-radio-group v-model="topbar" stacked @input="changeTopbartype($event)">
                            <b-form-radio value="dark" class="mb-1">Dark</b-form-radio>
                            <b-form-radio value="light" class="mb-1">Light</b-form-radio>
                        </b-form-radio-group>

                        <!-- Menu positions -->
                        <h6 class="font-weight-medium font-14 mt-4 mb-2 pb-1">
                            Menus Positon <small>(Leftsidebar and Topbar)</small>
                        </h6>
                        <b-form-radio-group v-model="menu" stacked @input="changemenuPosition($event)">
                            <b-form-radio value="fixed" class="mb-1">Fixed</b-form-radio>
                            <b-form-radio value="scrollable" class="mb-1">Scrollable</b-form-radio>
                        </b-form-radio-group>
                        <div v-if="layout !== 'horizontal'">
                            <!-- Left Sidebar-->
                            <h6 class="font-weight-medium font-14 mt-4 mb-2 pb-1">
                                Left Sidebar Color
                            </h6>
                            <b-form-radio-group v-model="sidebarType" stacked @input="changeType($event)">
                                <b-form-radio value="dark" class="mb-1">Dark</b-form-radio>
                                <b-form-radio value="light" class="mb-1">Light</b-form-radio>
                                <b-form-radio value="brand" class="mb-1">Brand</b-form-radio>
                                <b-form-radio value="gradient" class="mb-1">Gradient</b-form-radio>
                            </b-form-radio-group>

                            <!-- size -->
                            <h6 class="font-weight-medium font-14 mt-4 mb-2 pb-1">
                                Left Sidebar Size
                            </h6>
                            <b-form-radio-group v-model="sidebarSize" stacked @input="changeSize($event)">
                                <b-form-radio value="default" class="mb-1">Default</b-form-radio>
                                <b-form-radio value="condensed" class="mb-1">Condensed <small>(Extra Small size)</small></b-form-radio>
                                <b-form-radio value="compact" class="mb-1">Compact <small>(Small size)</small></b-form-radio>
                            </b-form-radio-group>
                        </div>
                        <!-- User info -->
                        <h6 class="font-weight-medium font-14 mt-4 mb-2 pb-1">
                            Sidebar User Info
                        </h6>
                        <b-form-checkbox v-model="checked" name="check-button" switch @input="enableInfo()">
                            Enable
                        </b-form-checkbox>

                        <button class="btn btn-primary btn-block mt-4" id="resetBtn" @click="reset()">
                            Reset to Default
                        </button>

                        <a href="https://wrapbootstrap.com/theme/minton-admin-dashboard-landing-template-WB0858DB6?ref=themesbrand" class="btn btn-danger btn-block mt-2" target="_blank"><i class="mdi mdi-basket mr-1"></i> Purchase Now</a>
                    </div>
                </b-tab>
            </b-tabs>
            <!-- Nav tabs -->
        </simplebar>
        <!-- end slimscroll-menu-->
    </div>
    <!-- /Right-bar -->

    <!-- Right bar overlay-->
    <div class="rightbar-overlay"></div>
</div>
</template>
