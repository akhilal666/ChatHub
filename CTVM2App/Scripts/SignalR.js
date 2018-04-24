//ready

$(document).ready(function () {
(function () {
    var chat = $.connection.chat;
  
    $.connection.hub.start()
        .done(function () {
            $.connection.hub.logging = true;
            $.connection.hub.log("Connection established");
            //chat.server.announceToEverybody("Connected!");
        })
        .fail(function () {
            writeToPage("Error connecting to SignalR");
        });

    var writeToPage = function (message) {
        $("#welcome-messages").append(message);
    }
    ////////

    function WritePage(message) {
        $("#welcome-messages").append(message);
    }
    chat.client.announce = function (message, type) {
        if (type=="string") {
            WritePage(message);

        }
        else if (type == "image") {
        
            var html = "<div class='row'><img src='" + message + "'/></div>";
            WritePage(html);
          //  alert(message);
            //var base64_string = '"'+message+'"';
            //var img = document.createElement("img");
            //// added `width` , `height` properties to `img` attributes
            //img.width = "250px";
            //img.height = "250px";
            //img.src =  base64_string;
            //var preview = document.getElementById("img_preview");
            //preview.appendChild(img);
        }
        //$("#welcome-messages").prepend( message );
        $('#txtInput').val('');
        $('#txtInput').focus();
    }
  


    $('#myModal').modal({ backdrop: 'static', keyboard: false })

    $('#btnOk').on('click', function () {

    var name = $('#txtName').val();
    if (name!=='') {
        $('#myModal').modal('hide');
        $("#click-me").on("click", function () {
            var msg = $('#txtInput').val();
            if (msg !== '') {
                name = name.substr(0, 2);
                chat.server.announceToEverybody("<div class='row'><p data-letters=" + name + " style='margin: 0 17px 10px;'><span  class=' msg badge badge-danger'>" + msg + "</span></p></div><br />","string")
            
                $('#txtInput').val('')
            }
            else if ($('#fileinput').val()!='') {
                var img=$("#imgBase64").val()
                chat.server.announceToEverybody(img,"image");
            }
            else {
                $('#txtInput').focus();
            }

          
          
            //.done(function (data) {
            //    writeToPage(data);
            //})
            //.fail(function (e) {
            //    writeToPage(e);    
            //    $('#txtInput').val('');
            //});
        })
     
    }
    })
    //file upload
    function readFile() {
       
        if (this.files && this.files[0]) {
            var FR = new FileReader();

            FR.addEventListener("load", function (e) {
                //document.getElementById("img").src = e.target.result;
                $("#imgBase64").val(e.target.result);
               //return e.target.result;
                //chat.server.announceToEverybody(e.target.result, "image");

            });

            FR.readAsDataURL(this.files[0]);
        }

    }
    document.getElementById("fileinput").addEventListener("change", readFile);
  
    $('#pic').on('click', function () {
        $('#fileinput').trigger('click');
    })

    //change in file upload
    //$('#fileinput').change(function () {
    //    var imageByte = readFile();
    //    console.log(imageByte);
    //  chat.server.announceToEverybody(imageByte);
    //})


})()
})