<script>
/**
 * Topbar component
 */
export default {
    data() {
        return {
            languages: [{
                    flag: require("~/assets/images/flags/us.jpg"),
                    language: "en",
                    title: "English",
                },
                {
                    flag: require("~/assets/images/flags/french.jpg"),
                    language: "fr",
                    title: "French",
                },
                {
                    flag: require("~/assets/images/flags/spain.jpg"),
                    language: "es",
                    title: "Spanish",
                },
                {
                    flag: require("~/assets/images/flags/china.png"),
                    language: "zh",
                    title: "Chinese",
                },
                {
                    flag: require("~/assets/images/flags/arabic.png"),
                    language: "ar",
                    title: "Arabic",
                },
            ],
            current_language: this.$i18n.locale,
            text: null,
            flag: null,
            value: null,
        };
    },
    mounted() {
        this.value = this.languages.find((x) => x.language === this.$i18n.locale);
        this.text = this.value.title;
        this.flag = this.value.flag;
    },
    methods: {
        /**
         * Toggle menu
         */
        toggleMenu() {
            this.$parent.toggleMenu();
        },
        /**
         * Full screen
         */
        initFullScreen() {
            document.body.classList.toggle("fullscreen-enable");
            if (
                !document.fullscreenElement &&
                /* alternative standard method */
                !document.mozFullScreenElement &&
                !document.webkitFullscreenElement
            ) {
                // current working methods
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(
                        Element.ALLOW_KEYBOARD_INPUT
                    );
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        },
        /**
         * Toggle rightbar
         */
        toggleRightSidebar() {
            this.$parent.toggleRightSidebar();
        },
        /**
         * Set languages
         */
        setLanguage(locale, country, flag) {
            this.$i18n.locale = locale;
            this.current_language = locale;
            this.text = country;
            this.flag = flag;
        },
        /**
         * Horizontal-toggle menu
         */
        horizonalmenu() {
            let element = document.getElementById("topnav-menu-content");
            element.classList.toggle("show");
        },
        /**
         * Logout user
         */
        logoutUser() {
            if (process.env.auth === "firebase") {
                this.$store.dispatch("auth/logOut");
            } else if (process.env.auth === "fakebackend") {
                this.$store.dispatch("authfack/logout");
            }
            this.$router.push({
                path: "/account/login",
            });
        },
    },
};
</script>

<template>
<!-- Topbar Start -->
<div class="navbar-custom">
    <div class="container-fluid">
        <ul class="list-unstyled topnav-menu float-right mb-0">
            <li class="d-none d-lg-block">
                <form class="app-search">
                    <div class="app-search-box">
                        <div class="input-group">
                            <input type="search" class="form-control" :placeholder="$t('navbar.search.text')" id="top-search" />
                            <div class="input-group-append">
                                <button class="btn" type="submit">
                                    <i class="fe-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </li>

            <li class="dropdown d-inline-block d-lg-none">
                <a class="nav-link dropdown-toggle arrow-none waves-effect waves-light" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                    <i class="fe-search noti-icon"></i>
                </a>
                <div class="dropdown-menu dropdown-lg dropdown-menu-right p-0">
                    <form class="p-3">
                        <input type="text" class="form-control" :placeholder="$t('navbar.search.text')" aria-label="Recipient's username" />
                    </form>
                </div>
            </li>

            <li class="dropdown d-none d-lg-inline-block">
                <a class="nav-link dropdown-toggle arrow-none waves-effect waves-light" @click="initFullScreen" data-toggle="fullscreen" href="#">
                    <i class="fe-maximize noti-icon"></i>
                </a>
            </li>

           
            <li class="dropdown notification-list">
                <a href="javascript:void(0);" @click="toggleRightSidebar" class="nav-link right-bar-toggle toggle-right">
                    <i class="fe-settings noti-icon toggle-right"></i>
                </a>
            </li>
        </ul>

        <!-- LOGO -->
        <div class="logo-box">
            <nuxt-link to="/" class="logo logo-dark text-center">
                <span class="logo-sm">
                    <img src="~/assets/images/logo-sm-dark.png" alt height="24" />
                    <!-- <span class="logo-lg-text-light">Minton</span> -->
                </span>
                <span class="logo-lg">
                    <img src="~/assets/images/logo-dark.png" alt height="20" />
                    <!-- <span class="logo-lg-text-light">M</span> -->
                </span>
            </nuxt-link>

            <nuxt-link to="/" class="logo logo-light text-center">
                <span class="logo-sm">
                    <img src="~/assets/images/logo-sm.png" alt height="24" />
                </span>
                <span class="logo-lg">
                    <img src="~/assets/images/logo-light.png" alt height="20" />
                </span>
            </nuxt-link>
        </div>

        <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
                <button class="button-menu-mobile waves-effect waves-light" @click="toggleMenu">
                    <i class="fe-menu"></i>
                </button>
            </li>

            <li>
                <!-- Mobile menu toggle (Horizontal Layout)-->
                <a class="navbar-toggle nav-link" data-toggle="collapse" @click="horizonalmenu()" data-target="#topnav-menu-content">
                    <div class="lines">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </a>
                <!-- End mobile menu toggle-->
            </li>
         
        </ul>
        <div class="clearfix"></div>
    </div>
</div>
<!-- end Topbar -->
</template>
