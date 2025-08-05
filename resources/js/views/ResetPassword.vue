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

                    <h4>Reset Your</h4>
                    <h4>Password here!</h4>

                    <form @submit.prevent="resetPassword()">
                        <div class="form-group position-relative has-icon-left">
                            <input type="password" class="form-control form-control-xl" placeholder="New Password" v-model="user.password" required>
                            <div class="form-control-icon"><i class="bi bi-shield-lock"></i></div>
                        </div>
                        <div class="form-group position-relative has-icon-left">
                            <input type="password" class="form-control form-control-xl" placeholder="Confirm New Password" v-model="user.password_confirmation" required>
                            <div class="form-control-icon"><i class="bi bi-shield-lock"></i></div>
                        </div>
                        <button class="btn btn-primary btn-block btn-lg shadow-lg mt-5 auth-btn">
                            Reset Password
                            <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                        </button>
                    </form>

                    <div class="auth-copyright">
                        <a href="javascript:void(0)" class="text-primary font-weight-normal"> @ 2022 {{$appName}}. All Right Reserved</a>
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
    data: function () {
        return {
            isLoading: false,
            user: {
                password: '',
                password_confirmation: '',
                token: '',
            },
            loggedUser: Auth.user
        };
    },
    mounted() {
        if (this.loggedUser) {
            this.$router.push('/dashboard');
        }
    },
    methods: {

        resetPassword: function () {
            this.user.token = this.$route.query.token;
            let vm = this;
            this.isLoading = true;
            let url = this.$apiUrl + '/reset-password';
            axios.post(url, this.user).then(res => {
                vm.isLoading = false;
                let data = res.data;
                if (data.status === 1) {

                    vm.showSuccess(data.message);
                    setTimeout(()=>{
                        this.$router.push('/login');
                    },1000);

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
                    this.showError(__('something_went_wrong'));
                }
            });
        }
    }
}
</script>
<style scoped>

</style>
