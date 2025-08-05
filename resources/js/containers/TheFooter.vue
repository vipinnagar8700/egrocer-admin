<template>
    <footer>
        <div class="footer clearfix mb-0 text-muted ">
            <div class="float-start">
                <a href="javascript:void(0)" class="text-primary font-weight-normal" v-html="copyrightDetails"></a>
            </div>
            <div v-if="currentVersion !== ''" class="float-end">
                <p>
                  Version :- 
                  <a href="javascript:void(0)">{{ $currentVersion }}</a>
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
     copyrightDetails: window.copyrightDetails,
     currentVersion:window.currentVersion
    };
  }
}
</script>
