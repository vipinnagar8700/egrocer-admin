<template>
    <div>
        <div id="error">


            <div class="error-page container">
                <div class="col-md-8 col-12 offset-md-2">
                    <div class="text-center">
                        <img class="img-error" :src="img_url" alt="Not Found">
                        <h1 class="error-title">System Error</h1>
                        <p class="fs-5 text-gray-600">The website is currently unavailable. Try again later or contact the
                            developer.</p>
                        <button type="button" class="btn btn-lg btn-outline-primary mt-3" @click="$router.go(-1)">Go Back</button>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
import Auth from "../../Auth";

export default {
    data : function(){
        return {
            img_url: this.$baseUrl + '/images/error-500.png'
        };
    },
};
</script>
