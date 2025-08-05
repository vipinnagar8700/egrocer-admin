<template>
    <header class="mb-3">

        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a href="javascript:void(0)" class="burger-btn d-block">

                    <i class="fa fa-bars" aria-hidden="true"></i>
                </a>

                <div class="d-flex justify-content-start align-items-center">
                    <div class="me-2" v-if="$isDemo == 1 && windowWidth < this.$mobileWidth"><span class="badge bg-danger">{{ __('demo_mode') }}</span></div>
                    <a href="javascript:void(0)" class="navbar-toggler navbar-toggler"
                       data-bs-toggle="collapse"
                       data-bs-target="#navbarSupportedContent"
                       aria-controls="navbarSupportedContent"
                       aria-expanded="false"
                       aria-label="Toggle navigation" @click="isToggle = !isToggle;">
                        <i v-if="isToggle === true" class="fa fa-times" aria-hidden="true"></i>
                        <i v-else class="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </a>
                </div>


                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown me-2" v-if="$isDemo == 1 && windowWidth > this.$mobileWidth" >
                            <div class="d-flex gap-2 align-items-center mt-2"><span class="badge bg-danger">{{ __('demo_mode') }}</span></div>
                        </li>



                        <li class="nav-item dropdown me-1">
                            <div class="theme-toggle d-flex gap-2 align-items-center mt-2">
                                <label for="userTheme" style="cursor: pointer">
                                    <template v-if="userTheme === 'theme-dark'" >
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="m17.75 4.09l-2.53 1.94l.91 3.06l-2.63-1.81l-2.63 1.81l.91-3.06l-2.53-1.94L12.44 4l1.06-3l1.06 3l3.19.09m3.5 6.91l-1.64 1.25l.59 1.98l-1.7-1.17l-1.7 1.17l.59-1.98L15.75 11l2.06-.05L18.5 9l.69 1.95l2.06.05m-2.28 4.95c.83-.08 1.72 1.1 1.19 1.85c-.32.45-.66.87-1.08 1.27C15.17 23 8.84 23 4.94 19.07c-3.91-3.9-3.91-10.24 0-14.14c.4-.4.82-.76 1.27-1.08c.75-.53 1.93.36 1.85 1.19c-.27 2.86.69 5.83 2.89 8.02a9.96 9.96 0 0 0 8.02 2.89m-1.64 2.02a12.08 12.08 0 0 1-7.8-3.47c-2.17-2.19-3.33-5-3.49-7.82c-2.81 3.14-2.7 7.96.31 10.98c3.02 3.01 7.84 3.12 10.98.31Z"></path>
                                        </svg>
                                    </template>
                                    <template v-else>
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--system-uicons" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 21 21">
                                            <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M10.5 14.5c2.219 0 4-1.763 4-3.982a4.003 4.003 0 0 0-4-4.018c-2.219 0-4 1.781-4 4c0 2.219 1.781 4 4 4zM4.136 4.136L5.55 5.55m9.9 9.9l1.414 1.414M1.5 10.5h2m14 0h2M4.135 16.863L5.55 15.45m9.899-9.9l1.414-1.415M10.5 19.5v-2m0-14v-2" opacity=".3"></path>
                                                <g transform="translate(-210 -1)">
                                                    <path d="M220.5 2.5v2m6.5.5l-1.5 1.5"></path>
                                                    <circle cx="220.5" cy="11.5" r="4"></circle>
                                                    <path d="m214 5l1.5 1.5m5 14v-2m6.5-.5l-1.5-1.5M214 18l1.5-1.5m-4-5h2m14 0h2"></path>
                                                </g>
                                            </g>
                                        </svg>
                                    </template>
                                </label>
                                <div class="form-check form-switch fs-6">
                                    <input class="form-check-input me-0" type="checkbox" id="userTheme" style="cursor: pointer" true-value="theme-dark" false-value="theme-light" v-model="userTheme" @change="toggleTheme">
                                    <label class="form-check-label"></label>
                                </div>
                            </div>
                        </li>

                        <li class="nav-item dropdown me-2">
                            <div class="d-flex gap-2 align-items-center mt-2">

                                <button type="button" class="badge bg-success" @click="popoverShow = true" id="confirmButton" ref="confirmButton" title="Clear">
                                    <b-spinner v-if="isSystemRefreshing" small label="Spinning"></b-spinner>
                                    <i v-else class="fa fa-refresh" :class="{'fa-spin': isSystemRefreshing}"></i>
                                </button>


                                <b-popover
                                    target="confirmButton"
                                    triggers="click"
                                    :show.sync="popoverShow"
                                    placement="auto"
                                    container="my-container"
                                    ref="popover"
                                >
                                    <template #title>
                                        <div class="d-flex align-content-center justify-content-sm-between">
                                            <span> Confirmation</span>
                                            <button type="button" @click="popoverShow = false"  class="close" aria-label="Close">
                                                <span class="d-inline-block" aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </template>
                                    <template #default>
                                        <h6>Are you sure you want to proceed?</h6>

                                        <span>cache:clear</span>,
                                        <span>config:clear</span>,
                                        <span>route:clear</span>,
                                        <span>view:clear</span>,

                                        <b-spinner v-if="isSystemRefreshing" small label="Spinning"></b-spinner>

                                        <hr/>
                                        <div class="d-flex align-content-center justify-content-sm-between">
                                            <b-button @click="popoverShow = false" size="sm" variant="outline-danger">Cancel</b-button>
                                            <b-button @click="clearCache" size="sm" variant="primary" :disabled="isSystemRefreshing">
                                                <b-spinner v-if="isSystemRefreshing" small label="Spinning"></b-spinner>
                                                Submit
                                            </b-button>
                                        </div>
                                    </template>

                                </b-popover>

                            </div>
                        </li>

                        <li v-if="this.$websiteUrl" class="nav-item dropdown me-2">
                            <a class="nav-link" :href="this.$websiteUrl" target="__blank">
                                <i class="fa fa-solid fa-globe fs-4 text-gray-600"></i>
                            </a>
                        </li>

                        <li class="nav-item dropdown me-1">
                            <a class="nav-link active dropdown-toggle" href="#" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                <i class="bi bi-envelope fs-4 text-gray-600"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <h6 class="dropdown-header">Messages</h6>
                                </li>
                                <li><a class="dropdown-item" href="#">No new message</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown me-1">
                            <a class="nav-link active dropdown-toggle" href="#" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                <i class="bi bi-bell fs-4 text-gray-600"></i><span class="badge bg-success rounded-circle position-absolute translate-middle p-2" style="bottom: 20px; left: 30px;">{{notifications_unread_count}}</span> <!-- Notification bubble -->
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end notification-dropdown" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <h6 class="dropdown-header">Notifications</h6>
                                </li>

                                <li class="dropdown-item notification-item" v-for="notification of notifications.slice(0,4)">
                                    <a class="d-flex align-items-center" @click="markAsReadNotification(notification)">

                                        <div class="notification-text ms-4">
                                            <p class="notification-title font-bold"> <router-link :to="'/orders/view/'+notification.data.order_id"> {{notification.data.text}}</router-link></p>
                                            <p class="notification-subtitle font-thin text-sm">{{ changeDateTime(notification.created_at) }}</p>
                                        </div>
                                    </a>
                                </li>
                                <li v-if="notifications.length>0">
                                    <p class="text-center py-2 mb-0" v-if="isSellerRoute"><router-link to="/seller/notification_panel">See all notification</router-link></p>
                                    <p class="text-center py-2 mb-0" v-else><router-link to="/notification_panel">See all notification</router-link></p>
                                </li>
                                <li><a class="dropdown-item" v-if="notifications.length==0">No notification available</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown me-3">
                            <div class="lang_div">
                              <select class="form-control form-select" @change="changeLanguage($event)" v-model="lang" >
                                    <!-- If languages array is empty, display default option -->
                                    <template v-if="languages.length === 0">
                                        <option value="en">English</option>
                                    </template>
                                    <!-- Otherwise, display options from the languages array -->
                                    <template v-else>
                                        <option v-for="language in languages" :key="language.code" :value="language.code" :selected="language.code === defaultLanguage.code">{{ language.name }}</option>
                                    </template>
                                </select>
                            </div>
                        </li>
                    </ul>
                    <div class="dropdown">
                        <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <div class="user-menu d-flex">
                                <div class="user-name text-end me-3">
                                    <h6 class="mb-0 text-gray-600">{{ user.username }}</h6>
                                    <p class="mb-0 text-sm text-gray-600">{{ role }}</p>
                                </div>
                                <div class="user-img d-flex align-items-center">
                                    <div class="avatar avatar-md22">
                                        <img :src="profile_url">
                                    </div>
                                </div>
                            </div>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
                            <li>
                                <h6 class="dropdown-header">Hello, {{user.username}}!</h6>
                            </li>

                            <li>
                                <router-link class="dropdown-item" to="/seller/profile" v-if="role==this.$roleSeller">
                                    <i class="icon-mid bi bi-person me-2"></i> My Profile
                                </router-link>
                                <router-link class="dropdown-item" to="/delivery_boy/profile" v-if="role==this.$roleDeliveryBoy">
                                    <i class="icon-mid bi bi-person me-2"></i> My Profile
                                </router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" to="/settings" v-if="role==this.$roleSuperAdmin">
                                    <i class="icon-mid bi bi-gear me-2"></i>Settings
                                </router-link>
                                <router-link class="dropdown-item" to="/seller/settings" v-if="role==this.$roleSeller">
                                    <i class="icon-mid bi bi-gear me-2"></i>Settings
                                </router-link>
                                <router-link class="dropdown-item" to="/delivery_boy/settings" v-if="role==this.$roleDeliveryBoy">
                                    <i class="icon-mid bi bi-gear me-2"></i>Settings
                                </router-link>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li>
                                <a class="dropdown-item" @click="logout()"><i class="icon-mid bi bi-box-arrow-left me-2"></i> Logout</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </nav>




    </header>
</template>

<script>
import Auth from '../Auth.js';
import axios from "axios";
export default {

    data : function(){
        return {
            lang: 'en',
            user: Auth.user,
            role: Role,
            profile_url: 
                Role === 'Seller' ? Auth.user.seller.logo_url :
                Role === 'Delivery Boy' ? this.$baseUrl + '/images/admin_logo.png' :
                this.$baseUrl + '/images/admin_logo.png',
            notifications : [],

            userTheme: "theme-light",
            isToggle:false,

            popoverShow: false,
            isSystemRefreshing: false,

            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            languages: [],
            notifications_unread_count:0,
            defaultLanguage: [],
        };
    },
     computed: {
        isSellerRoute() {
        // Use this.$route to access the current route
        return this.$route.path.startsWith('/seller/');
        },
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('DOMContentLoaded', this.onResize);
    },
    mounted: function () {

        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
            window.addEventListener('DOMContentLoaded', this.onResize);
        })

        //const initUserTheme = this.getMediaPreference() || this.getTheme();
        const initUserTheme = this.getTheme();
        this.setTheme(initUserTheme);

        if(window.localStorage.getItem('lang')){
            this.lang = window.localStorage.getItem('lang');
        }

        this.timer = setInterval(() => {
            this.getNotifications();
        }, 40000); // 40 seconds

        this.getLanguage();
    },
    created() {
        this.getNotifications();
    },
     
    methods: {
        logout() {
            let role_id = Auth.user.role_id;
            Auth.logout();
            setTimeout(()=>{
                if (role_id === 3) {
                    this.$router.push('/seller/login');
                } else if (role_id === 4) {
                    this.$router.push('/delivery_boy/login');
                } else {
                    this.$router.push('/login');
                }
                // window.location.reload();
            },500);
        },
      changeLanguage(event) {
    // Update the selected language based on the change event
    this.lang = event.target.value;
    window.localStorage.setItem('lang', this.lang);
    this.isLoading = true;
    let data = {
        language: this.lang
    };
    axios.post(this.$apiUrl + '/change_language', data)
        .then((response) => {
            this.isLoading = false;
            // Check if the selected language is Arabic, and add the 'rtl' class to the body
            if (this.lang === 'ar') {
                document.body.classList.add('rtl');
            } else {
                // Remove 'rtl' class for other languages
                document.body.classList.remove('rtl');
            }
            // No need to reload the page, just update the default language
            this.updateDefaultLanguage(this.lang);
            window.location.reload();
        });
},
updateDefaultLanguage(newDefaultLanguage) {
    // Update the default language in the languages array
    this.languages.forEach(language => {
        if (language.code === newDefaultLanguage) {
            language.is_default = 1;
        } else {
            language.is_default = 0;
        }
    });
},
getLanguage() {
    this.isLoading = true;
    let data = {
        params: {
            system_type: 4
        }
    };
    axios.get(this.$apiUrl + '/system_languages', data)
        .then((response) => {
            this.isLoading = false;
            let data = response.data;
            if (data && Array.isArray(data.data)) {
                this.languages = data.data;
                this.totalRows = this.languages.length;
            } else {
                this.languages = [];
                this.totalRows = 0;
            }

            // Find the default language and set it as the initial value of selectedLanguage
            const defaultLanguage = this.languages.find(language => language.is_default === 1);
            if (defaultLanguage) {
                this.selectedLanguage = defaultLanguage.code;
                window.localStorage.setItem('lang', this.selectedLanguage);
            }
            console.log(defaultLanguage.code);
        })
        .catch((error) => {
            this.isLoading = false;
            console.error('Error fetching languages:', error);
        });
},
        getNotifications(event){
            axios.get(this.$apiUrl + '/get_top_notifications')
                .then((response) => {
                    this.notifications = response.data.data.notifications;
                    this.notifications_unread_count = response.data.data.unread;
                });
        },
        markAsReadNotification(notification){
            if(notification.read_at == null) {
                axios.get(this.$apiUrl + '/notification_read?id=' + notification.id)
                    .then((response) => {
                        this.getNotifications();
                    });
            }
        },
        changeDateTime(dateTime){
            return moment(dateTime).fromNow();
        },
        setTheme(theme) {
            sessionStorage.setItem("user-theme", theme);
            this.userTheme = theme;
         
            document.body.className = theme;
        },

        getMediaPreference() {
            const hasDarkPreference = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            if (hasDarkPreference) {
                return "theme-dark";
            } else {
                return "theme-light";
            }
        },

        getTheme() {
            let user_theme = sessionStorage.getItem("user-theme");
            this.userTheme = user_theme;
            return user_theme;
        },
        toggleTheme() {
            const activeTheme = sessionStorage.getItem("user-theme");
            if (activeTheme === "theme-light" || activeTheme == "" || activeTheme == "undefined" || activeTheme == "null") {
                this.setTheme("theme-dark");
            } else {
                this.setTheme("theme-light");
            }
        },
        onResize() {
            this.windowHeight = window.innerHeight;
            this.windowWidth = window.innerWidth
        },

        clearCache(){

            let vm = this;

            vm.isSystemRefreshing = true;
            axios.get(this.$baseUrl + '/clear')
                .then((response) => {
                    let data = response.data;
                    if (data.status === 1) {

                        setTimeout( () => {
                            vm.showMessage("success", data.message);
                            vm.isSystemRefreshing = false;
                            vm.popoverShow = false;
                            window.location.reload();
                            
                        }, 2000);

                    } else {
                        vm.showError(data.message);
                        vm.isSystemRefreshing = false;
                    }
                }).catch(error => {
                    vm.isSystemRefreshing = false;
                    if (error?.request?.statusText) {
                        vm.showError(error.request.statusText);
                    }else if (error.message) {
                        vm.showError(error.message);
                    } else {
                        vm.showError(__('something_went_wrong'));
                    }
            });
        }
    }
}
</script>
<style>

.switch-checkbox {
    display: none;
}

:root {
    --background-color-primary: #ebebeb;
    --background-color-secondary: #fafafa;
    --accent-color: #cacaca;
    --text-primary-color: #222;
    --element-size: 4rem; /* <- this is the base size of our element */
}

.switch-label {
    /* for width, use the standard element-size */
    width: var(--element-size);

    /* for other dimensions, calculate values based on it */
    border-radius: var(--element-size);
    border: calc(var(--element-size) * 0.025) solid var(--accent-color);
    padding: calc(var(--element-size) * 0.1);
    font-size: calc(var(--element-size) * 0.3);
    height: calc(var(--element-size) * 0.35);

    align-items: center;
    background: var(--text-primary-color);
    cursor: pointer;
    display: flex;
    position: relative;
    transition: background 0.5s ease;
    justify-content: space-between;
    z-index: 1;
}

.switch-toggle {
    position: absolute;
    background-color: var(--background-color-primary);
    border-radius: 50%;
    top: calc(var(--element-size) * 0.07);
    left: calc(var(--element-size) * 0.07);
    height: calc(var(--element-size) * 0.4);
    width: calc(var(--element-size) * 0.4);
    transform: translateX(0);
    transition: transform 0.3s ease, background-color 0.5s ease;
}

.switch-toggle-checked {
    transform: translateX(calc(var(--element-size) * 0.6)) !important;
}



</style>
