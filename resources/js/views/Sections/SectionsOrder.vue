<template>
    <div>
        <div class="page-heading">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>{{ __('sections_order') }}</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('sections_order') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="card">
                        <div class="card-header">
                            <h4>{{ __('sections_order_list') }}</h4>
                        </div>
                        <div class="card-body">
                            <b-row>
                                <b-col md="6">
                                    <div class="mb-2 d-flex justify-content-between align-items-center">
                                        <div class="form-check form-switch">
                                            <label> <input type="checkbox" v-model="editable" class="form-check-input"> {{ __('enable_drag_and_drop') }}</label>
                                        </div>
                                        <button type="button" class="btn btn-sm btn-primary" @click="orderList">{{ __('sort_by_original_order') }}</button>
                                    </div>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col md="6" style="overflow-y:scroll;height:450px;">

                                    <ul id="sortable-row" class="list-group">
                                        <draggable class="list-group" tag="ul" v-model="list" v-bind="dragOptions" :move="onMove" :options="{ animation:200 }" @start="isDragging=true" @end="isDragging=false"
                                        @change="updateList()">
                                            <li v-for="section in list" :key="section.row_order" class="list-group-item d-flex justify-content-between align-items-center">
                                                <span>
                                                    <span class="text-left mr-2">{{ section.row_order }}</span>
                                                    <span class="text-left mr-2">-</span>
                                                    <span class="text-left mr-2">{{ section.id }} </span>
                                                    <span class="text-left mr-2">{{ section.title }} <br> {{ section.description }} </span>
                                                </span>
                                                <span><i class="fa fa-arrows"></i></span>
                                            </li>
                                        </draggable>
                                    </ul>
                                </b-col>
                            </b-row>
                            <b-row>
                                <div class="col-md-6 mt-4">
                                    <button type="type" @click="updateSectionsOrder()" class="btn btn-success" :disabled="isLoading">
                                        {{ __('save_order') }} <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                    </button>
                                </div>
                            </b-row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable';
import axios from "axios";
export default {
    components: {
        draggable,
    },
    data: function() {
        return {
            sections: [],
            list: [],
            editable: true,
            isDragging: false,
            delayedDragging: false,
            isLoading: false,
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 0,
                group: "description",
                disabled: !this.editable,
                ghostClass: "ghost"
            };
        },
        listString() {
            return JSON.stringify(this.list, null, 2);
        },
        list2String() {
            return JSON.stringify(this.list2, null, 2);
        }
    },
    watch: {
        isDragging(newValue) {
            if (newValue) {
                this.delayedDragging = true;
                return;
            }
            this.$nextTick(() => {
                this.delayedDragging = false;
            });
        }
    },

    created: function() {
        this.$eventBus.$on('categorySaved', (message) => {
            this.showMessage("success", message);
            this.getSections();
        });
        this.getSections();
    },
    methods: {
        orderList() {
            this.getSections();
        },
        onMove({ relatedContext, draggedContext }) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (
                (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            );
        },
        updateList(){
            this.list.map((section, index) => {
                section.row_order = index + 1;
            });
        },
        getSections(){
            axios.get(this.$apiUrl + '/sections/row_order')
                .then((response) => {
                    let data = response.data;
                    this.list = data.data.map((section, index) => {
                        return {
                            id:section.id,
                            title:section.title,
                            description:section.short_description,
                            row_order: section.row_order,
                            fixed: false
                        };
                    })
                    this.sections = data.data;
                }).catch(error => {
                this.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },
        updateSectionsOrder(){
            this.isLoading = true;
            let formData = this.list;
            let url = this.$apiUrl + '/sections/updateOrder';
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    this.isLoading = false;
                    this.getSections();
                }else{
                    this.showError(data.message);
                    this.isLoading = false;
                }
            }).catch(error => {
                this.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },
    }
};
</script>
<style scoped>
.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.list-group {
    min-height: 20px;
}

.list-group-item {
    cursor: move;
}

.list-group-item i {
    cursor: pointer;
}
</style>
