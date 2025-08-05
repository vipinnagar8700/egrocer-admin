<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" scrollable no-close-on-backdrop no-fade static>
        <div slot="modal-footer">
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">{{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
            <b-button variant="secondary" @click="hideModal">{{ __('cancel') }}</b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="form-group">
                    <label for="question">{{ __('query') }}</label>
                    <input class="form-control" name="query" id="question" v-model="faq.question" placeholder="Add a Query...">
                </div>
                <div class="form-group ">
                    <label for="answer">{{ __('answer') }}</label>
                    <textarea class="form-control" name="answer" id="answer" v-model="faq.answer" placeholder="Add a Answer..." ></textarea>
                </div>
            </div>
            <button ref="dummy_submit" style="display:none;"></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';

export default {
    props: ['record'],
    data : function(){
        return {
            isLoading: false,
            faq:{
                id: this.record ? this.record.id : null ,
                question: this.record ? this.record.question : "" ,
                answer: this.record ? this.record.answer : "" ,
            },
        };
    },
    computed: {
        modal_title: function(){
            let title = this.faq.id ?  __('edit') :  __('add') ;
            title +=  " ";
            title +=  __('frequently_asked_questions');
            return title;
        },
    },
    methods: {
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },

        saveRecord: function(){
            let vm = this;
            this.isLoading = true;
            let formObject = this.faq;
            let formData = new FormData();
            for(let key in formObject){
                formData.append(key, formObject[key]);
            }
            let url = this.$apiUrl + '/faqs/save';
            if(this.faq.id){
                url = this.$apiUrl + '/faqs/update';
            }
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('faqSaved', data.message);
                    this.hideModal();
                }else{
                    vm.showError(data.message);
                    vm.isLoading = false;
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
    },
    mounted(){
        this.showModal();
    }
}
</script>

<style scoped>

</style>
