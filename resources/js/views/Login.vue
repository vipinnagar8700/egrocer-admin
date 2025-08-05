<template>
    <div class="auth" :style="{ backgroundImage: 'url('+ $panelLoginBackgroundImg + ')' }">
        <div class="login-wrapper">
            <div class="auth-section">
                <div class="auth-card">
                    <div class="auth-logo">
                        <a href="javascript:void(0)" style="display: flex; align-items: center; justify-content: flex-start;">
                            <img v-if="$appLogo != ''" :src="$storageUrl+$appLogo" style="height: 70px; width: 70px;" alt='Logo'/>
                            <img v-else :src="$baseUrl + '/images/logo.png'" style="height: 70px; width: 70px;" alt='Logo'/>
                            <h2 style="margin: 10px;">{{ $appName }}</h2>
                        </a>
                    </div>
                    <h4>Welcome Back!</h4>
                    <p class="auth-subtitle text-primary">Please login to your Account</p>
                    <form @submit.prevent="loginCheck()">
                        <div class="form-group position-relative has-icon-left mb-4">
                            <input type="email" class="form-control form-control-xl" placeholder="Email Address" required
                                   v-model="user.email">
                            <div class="form-control-icon">
                                <i class="bi bi-person"></i>
                            </div>
                        </div>
                        <div class="form-group position-relative has-icon-left">
                            <input :type="showPassword ? 'text' : 'password'" class="form-control form-control-xl" placeholder="Password" required
                                   v-model="user.password">
                            <div class="form-control-icon">
                                <i class="bi bi-shield-lock"></i>
                            </div>

                            <button type="button" v-on:click="showPassword = !showPassword"
                                    class="btn btn-sm btn-outline-light font-bold text-primary"
                                    style="margin-top: -45px;position: absolute; right: 10px;" >
                                {{ showPassword ? 'Hide' : 'Show' }}

                            </button>

                        </div>
                        <div class="mb-4 text-end" style="margin-top: 35px;">
                            <router-link class="font-bold" to="/forgot-password"><span>Forgot Password?</span></router-link>
                        </div>
                       
                        <button class="btn btn-primary btn-block btn-lg shadow-lg mt-5 auth-btn">
                            Login
                            <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                            <span v-else class="bi bi-arrow-right"></span>
                        </button>

                        <hr>
                        <router-link to="/seller/login" class="btn btn-primary btn-block btn-lg shadow-lg mt-2">
                            Seller Panel</router-link>
                        <router-link to="/delivery_boy/login" class="btn btn-primary btn-block btn-lg shadow-lg mt-2">
                            Delivery Boy Panel</router-link>

                      
                    </form>
                    <div class="auth-copyright">
                        <a href="javascript:void(0)" class="text-primary font-weight-normal" v-html="copyrightDetails"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Auth from '../Auth.js';

export default {
    components: {
    },
    data: function () {
        return {
            isLoading: false,
            user: {
                email: (this.$isDemo === 1 || this.$isDemo === '1') ? 'admin@gmail.com' : '',
                password: (this.$isDemo === 1 || this.$isDemo === '1') ? '123456' : '',
                type:1
            },
            showPassword: false,
            loggedUser: Auth.user,
            setting:"",
            copyrightDetails: window.copyrightDetails,
        };
    },
  
    mounted() {
        if (this.loggedUser) {
            this.$router.push('/dashboard');
        }else{
            this.$router.push('/login').catch(()=>{});
        }
        let user_theme = sessionStorage.getItem("user-theme");
            this.userTheme = user_theme;
            document.body.className = user_theme;
    },
    methods: {

        loginCheck: function () {
            let vm = this;
            this.isLoading = true;

            let url = this.$apiUrl + '/login';
            axios.post(url, this.user).then(res => {
                vm.isLoading = false;
                let data = res.data;
                if (data.status === 1) {
                    Auth.login(data.data.access_token, data.data.user);
                    this.$router.push('/dashboard');
                   
                } else {
                    vm.showError(data.message);
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }

            });
        }
    }
}
</script>
<style scoped>

</style>
