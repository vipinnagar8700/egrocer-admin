<template>
    <div id="app">
        <div id="sidebar" class="active">
            <div class="sidebar-wrapper active">
                <div class="sidebar-header">
                    <div class="d-flex justify-content-between">
                        <div class="logo">
                            <router-link to="/delivery_boy" style="display: flex; align-items: center; justify-content: flex-start;">
                                <img class="container-logo" v-if="$appLogo != ''" :src="$storageUrl+$appLogo" alt='Logo' srcset=""/>
                                <img class="container-logo" v-else :src="$baseUrl + '/images/logo.png'" alt='Logo' srcset=""/>
                                {{ $appName }}
                            </router-link>
                        </div>


                        <div class="toggler">
                            <a href="javascript:void(0)" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
                        </div>

                    </div>
                </div>
                <div class="sidebar-menu">
                    <ul class="menu">
                      



                        <template v-for="item in sidebarItems">

                            <li class="sidebar-item" :class="{ 'active' : isActive(item.url) || subIsActive(item), 'has-sub' : isHasSub(item) }"
                                v-if=" item.role==true ? ($role('Super Admin') && (item.name=='Role' || item.name=='System Users')) : (item.permission && $can(item.permission) )">
                               

                                <template v-if="isHasSub(item)">
                                    <a class="sidebar-link">
                                        <i :class="`fa fa-${item.icon}`"></i>
                                        <span>{{ item.name }}</span>
                                    </a>
                                    <ul class="submenu" :class="{ 'active' : subIsActive(item) } ">
                                        <template v-for="sub in item.submenu">
                                            <li class="submenu-item" :class="{ 'active' : isActive(sub.url) } " :key="sub.key">
                                                <router-link :to="sub.url">
                                                    {{ sub.name }}
                                                </router-link>
                                            </li>
                                        </template>
                                    </ul>
                                </template>
                                <template v-else>
                                    <router-link class="sidebar-link" :to="item.url">
                                        <i :class="`fa fa-${item.icon}`"></i>
                                        <span>{{ item.name }}</span>
                                    </router-link>
                                </template>
                            </li>
                        </template>

                    </ul>
                </div>
                <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
            </div>
        </div>

        <vertical-header></vertical-header>

        <div id="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import TheSidebar from './TheSidebar'

import TheFooter from './TheFooter'
import VerticalHeader from './VerticalHeader'
import Auth from "../Auth";
import axios from "axios";

export default {
    name: 'TheContainerDeliveryBoy',
    components: {
        TheSidebar,

        TheFooter,
        VerticalHeader
    },
    created() {
        this.checkPermissions()
    },
    watch: {
        '$route': 'checkPermissions'
    },
    mounted() {
        //lang
        if(window.localStorage.getItem('lang')){
            this.lang = window.localStorage.getItem('lang');
        }

        function slideToggle(t,e,o){0===t.clientHeight?j(t,e,o,!0):j(t,e,o)}function slideUp(t,e,o){j(t,e,o)}function slideDown(t,e,o){j(t,e,o,!0)}function j(t,e,o,i){void 0===e&&(e=400),void 0===i&&(i=!1),t.style.overflow="hidden",i&&(t.style.display="block");var p,l=window.getComputedStyle(t),n=parseFloat(l.getPropertyValue("height")),a=parseFloat(l.getPropertyValue("padding-top")),s=parseFloat(l.getPropertyValue("padding-bottom")),r=parseFloat(l.getPropertyValue("margin-top")),d=parseFloat(l.getPropertyValue("margin-bottom")),g=n/e,y=a/e,m=s/e,u=r/e,h=d/e;window.requestAnimationFrame(function l(x){void 0===p&&(p=x);var f=x-p;i?(t.style.height=g*f+"px",t.style.paddingTop=y*f+"px",t.style.paddingBottom=m*f+"px",t.style.marginTop=u*f+"px",t.style.marginBottom=h*f+"px"):(t.style.height=n-g*f+"px",t.style.paddingTop=a-y*f+"px",t.style.paddingBottom=s-m*f+"px",t.style.marginTop=r-u*f+"px",t.style.marginBottom=d-h*f+"px"),f>=e?(t.style.height="",t.style.paddingTop="",t.style.paddingBottom="",t.style.marginTop="",t.style.marginBottom="",t.style.overflow="",i||(t.style.display="none"),"function"==typeof o&&o()):window.requestAnimationFrame(l)})}
        let sidebarItems = document.querySelectorAll('.sidebar-item.has-sub');
        for(var i = 0; i < sidebarItems.length; i++) {
            let sidebarItem = sidebarItems[i];
            sidebarItems[i].querySelector('.sidebar-link').addEventListener('click', function(e) {
                e.preventDefault();

                let submenu = sidebarItem.querySelector('.submenu');
                if( submenu?.classList?.contains('active') ) submenu.style.display = "block"
                if( submenu.style.display == "none" ) submenu?.classList?.add('active')
                else submenu?.classList?.remove('active')
                slideToggle(submenu, 300)
            })
        }
        window.addEventListener('DOMContentLoaded', (event) => {
            var w = window.innerWidth;
            if(w < 1200) {
                document.getElementById('sidebar')?.classList?.remove('active');
            }
        });
        window.addEventListener('resize', (event) => {
            var w = window.innerWidth;
            if(w < 1200) {
                document.getElementById('sidebar')?.classList?.remove('active');
            }else{
                document.getElementById('sidebar')?.classList?.add('active');
            }
        });
        document.querySelector('.burger-btn').addEventListener('click', () => {
            document.getElementById('sidebar')?.classList?.toggle('active');
        })
        document.querySelector('.sidebar-hide').addEventListener('click', () => {
            document.getElementById('sidebar')?.classList?.toggle('active');
        })
        // Perfect Scrollbar Init
        if(typeof PerfectScrollbar.default == 'function') {
            const container = document.querySelector(".sidebar-wrapper");
            const ps = new PerfectScrollbar.default(container, {
                wheelPropagation: false
            });
        }
        // Scroll into active sidebar
        document.querySelector('.sidebar-item.active').scrollIntoView(false)


    },
    data: function() {
        return {
            lang: 'en',
            sidebarItems :[
                {
                    name: __('dashboard'),
                    icon : 'tachometer-alt',
                    // url:'/delivery_boy/dashboard',
                    url:'/delivery_boy',
                    permission:'manage_dashboard'
                },
                {
                    name: __('orders'),
                    icon :'shopping-cart',
                    url:'/delivery_boy/orders',
                    permission:'order_list'
                },
                {
                    name: __('withdrawal_requests'),
                    icon : 'credit-card',
                    url:'/delivery_boy/withdrawal_requests',
                    permission:'product_sales_reports',
                },
                {
                    name: __('fund_transfers'),
                    icon : 'exchange-alt',
                    url:'/delivery_boy/fund_transfers',
                    permission:'order_list'
                },
                {
                    name: __('delivery_boy_cash'),
                    icon : 'money',
                    url:'/delivery_boy/cash_collection',
                    permission:'order_list'
                },
            ]
        }
    },
    methods: {
        subIsActive(item) {
            const paths = Array.isArray(item.submenu) ? item.submenu : [];
            return paths.some(path => {
                return this.$route.path.indexOf(path.url) === 0;
            });
        },
        isActive(url) {
            if(this.$route.path == url){
                return true;
            }
            return false;
        },
        isHasSub(item){
            if(item.hasOwnProperty("submenu")){
                if(item.submenu.length > 0){
                    return true;
                }
            }
            return false;
        },
        changeLanguage(event){
            this.lang = event.target.value;
            window.localStorage.setItem('lang', this.lang);
            this.isLoading = true
            let data = {
                language : this.lang
            }
            axios.post(this.$apiUrl + '/change_language',data)
                .then((response) => {
                    this.isLoading = false;
                    window.location.reload();
                });
        },
        checkPermissions() {
            var current_path = this.$route.path;
            var permission = '';
            this.sidebarItems.forEach(menu => {
                //Only Main Categories
                if(menu.submenu && menu.submenu.length>0) {

                    menu.submenu.forEach(submenu => {
                        if(submenu.url == current_path){
                            permission = submenu.permission;
                        }
                    });

                }else{

                    if(menu.url == current_path){
                        permission = menu.permission;
                    }
                }
            });


            if(Auth.check() && UserPermissions.length ==0){
                //this.$router.push({path:'/login'});
                if(window.localStorage.getItem('loginCheck') == 1){
                    Auth.logout();
                }
                window.localStorage.setItem('loginCheck',1);
                window.location.reload();
            }else if(Auth.check() && permission && !this.$can(permission)){
                this.$router.push({path:'/unauthorized'});
            }

        }

    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
