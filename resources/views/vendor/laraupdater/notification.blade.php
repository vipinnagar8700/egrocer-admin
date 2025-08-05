<!doctype html>
<html lang="{{ app()->getLocale() }}">

<head>
   <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<!--    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet">-->
<!--    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"></script>-->
    <style>
        /*.toast-header{
            background-color: #37a279!important;
            color: #ffffff!important;
        }

        .update_btn{
            background-color: #37a279;
            border-color: #37a279;
        }

        .update_btn:hover{
            background-color: #37a279;
            border-color: #37a279;
        }

        #update_description{
            color: #37a279;
        }

        .toast-body{
            background-color: #ffff;
        }

        #update_version{
            background-color: #107c53!important;
            color: #ffffff!important;
        }*/
        #update_notification{
            display:none !important;
        }
    </style>
</head>

<body>

<!--<div id="update_notification" class="toast" style="display:none; position: absolute; bottom: 10px; right: 10px;"></div>-->
    <div id="update_notification" class="toast" style="display:none; position: fixed; z-index: 5; bottom: 10px; right: 10px;">
        <div class="toast-header">
            <strong class="me-auto">
                {{-- {{__("laraupdater.Update_Available")}} --}}
                Update Available
            </strong>
            <span id="update_version" class="badge rounded-pill bg-info text-dark"></span>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            <span id="update_description"></span>
            <hr>
            <button type="button" onclick="update();" class="btn btn-info btn-sm update_btn">
                <!--{trans('laraupdater.Update_Now')}}-->
                Update Now
            </button>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            $.ajax({
                type: 'GET',
                url: 'updater.check',
                async: false,
                success: function(response) {
                    if(response != ''){
                        $('#update_version').text(response.version);
                        $('#update_description').html(response.description);
                        $('#update_notification').hide();
                    }
                }
            });

            $('.btn-close').click(function() {
                $('#update_notification').hide();
            });
        });

        function update() {
            $("#update_description").show();
            /*$(".update_btn").html('{{trans("laraupdater.Updating")}}');*/
            $(".update_btn").html('Updating...');
            $.ajax({
                type: 'GET',
                url: 'updater.update',
                success: function(response) {
                    if(response != ''){
                        /*$('#update_description').append(response);
                        $(".update_btn").html('{{trans("laraupdater.Updated")}}');
                        $(".update_btn").attr("onclick","");*/

                        $('#update_description').append("Congratulation System Updated Successfully");
                        $(".update_btn").hide();
                        setTimeout(()=>{
                            $('#update_notification').hide();
                        },2000);
                        setTimeout(() => {
                              window.location.href = window.baseUrl + '/migration';
                          }, 2000); 
                    }
                },
                error: function(response) {
                    if(response != ''){
                        /*$('#update_description').append(response);*/
                        /*$(".update_btn").html('{{trans("laraupdater.error_try_again")}}');*/
                        $('#update_description').append("Something went wrong! Try Again");
                        $(".update_btn").hide();
                        setTimeout(()=>{
                            $('#update_notification').hide();
                        },2000);
                    }
                }
            });
        }
    </script>
</body>
</html>
