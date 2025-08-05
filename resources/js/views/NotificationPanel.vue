<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>Notification</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">Notification</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
              
                 <div class="card">

                        <div class="card-header">
                            <h4>{{ __('notifications') }}</h4>
                            
                        </div>

                        <div class="card-body">

                            <b-row class="mb-2">
                                <b-col md="3" offset-md="8">
                                    <h6 class="box-title">{{ __('search') }}</h6>
                                    <b-form-input
                                        id="filter-input"
                                        v-model="filter"
                                        type="search"
                                        :placeholder="__('search')"
                                    ></b-form-input>
                                </b-col>
                                <b-col md="1" class="text-center">
                                    <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getNotifications()">
                                        <i class="fa fa-refresh" aria-hidden="true"></i>
                                    </button>
                                </b-col>
                            </b-row>
                            <b-table
                                :items="notifications"
                                :fields="fields"
                                :filter="filter"
                                :filter-included-fields="filterOn"
                                :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc"
                                :sort-direction="sortDirection"
                                :bordered="true"
                                :busy="isLoading"
                                stacked="md"
                                show-empty
                                small>
                                <template #table-busy>
                                    <div class="text-center text-black my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>

       <template #cell(title)="row">
    <router-link :to="'/orders/view/' + row.item.data.order_id"
                 :style="{ fontWeight: row.item.read_at == null ? 'bold' : 'normal' }"
                 @click.prevent="markAsRead(row.item, $event)">
        {{ row.item.data.text }}
    </router-link>
</template>
                               
                            </b-table>
                            <b-row>
                                <b-col  md="2" class="my-1">

                                    <b-form-group
                                        :label="__('per_page')"
                                        label-for="per-page-select"
                                        label-align-sm="right"
                                        label-size="sm"
                                        class="mb-0">
                                        <b-form-select
                                            id="per-page-select"
                                            v-model="perPage"
                                            :options="pageOptions"
                                            size="sm"
                                            class="form-control form-select"
                                        ></b-form-select>
                                    </b-form-group>
                                </b-col>
                                <b-col  md="4" class="my-1" offset-md="6">
                                    <label>{{__('total_records')}} :- {{ totalRows }} </label>
                                    <b-pagination
                                        v-model="currentPage"
                                        :total-rows="totalRows"
                                        :per-page="perPage"
                                        align="fill"
                                        size="sm"
                                        class="my-0"
                                    ></b-pagination>
                                </b-col>
                            </b-row>

                        </div>
                    </div>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    components: {
       // InfiniteLoading,
    },
    data: function() {
        return {
             fields: [
            
                { key: 'title', label: __('title'),  class: 'text-center' },
               
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            page: 1,
            isLoading: false,
            notifications: [],
        }
    },
    computed: {
sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        }
    },
    mounted() {
 this.totalRows = this.notifications.length
    },
    created: function() {
        this.getNotifications();
    },
      watch: {
        currentPage() {
            this.getNotifications();
        },
        perPage() {
            this.getNotifications();
        },
    },
    methods: {
      
     
          getNotifications() {
            this.isLoading = true
            let param = {
                page: this.currentPage,
                per_page: this.perPage
            }
            axios.get(this.$apiUrl + '/panel_notification', {
                params: param
            }).then((response) => {
                this.isLoading = false;
                let data = response.data;
                this.notifications =data.data;
                this.totalRows =  response.data.total

            });
        },
          async markAsRead(item, event) {
      if (item.read_at === null) {
        try {
          await axios.post('/api/mark-as-read', { order_id: item.data.order_id });
          item.read_at = new Date().toISOString(); // Update locally for immediate UI change
          this.$router.push('/orders/view/' + item.data.order_id); // Manually navigate
        } catch (error) {
          console.error("Failed to mark as read", error);
        }
      }
    }

    }
};
</script>
