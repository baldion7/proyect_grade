var array_equiment = [];
var copy_array_equiment = [];
var arrar_temp_equiment = [];
var newSize = 5;
var totalPages = 0;
var contpage = 1;
var stopInterval = false;
var cD = 0;
var intervalcontinua;
var totapa;
var array_users_update = [];
var indextemp;
var modal_img;
var img_base64;
$(document).ready(function () {

    consult_extra_new()

    var intervalinicial = setInterval(function () {
        chageequiment();
        if (arrar_temp_equiment.length > 0) {
            copy_array_equiment = arrar_temp_equiment;
            array_equiment = arrar_temp_equiment;
            console.log(array_equiment)
            create_page();
        }

        if (stopInterval) {

            clearInterval(intervalinicial);
        }

        if (arrar_temp_equiment = !null || arrar_temp_equiment > 0) {

            stopInterval = true;
        }
    }, 100);

    intervalcontinua = setInterval(function () {
        if (JSON.stringify(copy_array_equiment) === JSON.stringify(arrar_temp_equiment)) {
            chageequiment(array_equiment);
        } else {
            array_equiment = arrar_temp_equiment;
            copy_array_equiment = array_equiment;
            if (array_equiment.length > 0) {
                create_page();
            }

        }
    }, 1000);

    $("#cogs").click(function () {
        if (cD == 0) {
            cD++;
            $(".display_content_modules").css({
                "margin-right": "0", "transition-duration": "2s"
            });
            $(".conteiner_form_users").css({
                "margin-right": " 15.313rem", "transition-duration": "2s"
            });
        } else {
            cD--;
            $(".display_content_modules").css({
                "margin-right": " 15.313rem"
            });
            $(".conteiner_form_users").css({
                "margin-right": " 0", "transition-duration": "2s"
            });
        }
    });

    newSize = parseInt($("#select_equiment").val());

    jQuery.extend(jQuery.validator.messages, {
        required: "Este campo es obligatorio",
        email: "Por favor, escribe una dirección de correo válida",
        url: "Por favor, escribe una URL válida.",
        date: "Por favor, escribe una fecha válida.",
        dateISO: "Por favor, escribe una fecha (ISO) válida.",
        number: "Por favor, escribe un número entero válido.",
        digits: "Por favor, escribe sólo dígitos.",
        creditcard: "Por favor, escribe un número de tarjeta válido.",
        equalTo: "Las contraseñas no coinciden.",
        accept: "Por favor, escribe un valor con una extensión aceptada.",
        uniqueEmail: "Este correo electrónico ya está registrado en la base de datos",
        maxlength: jQuery.validator.format("Por favor, no escribas más de {0} caracteres."),
        minlength: jQuery.validator.format("Por favor, no escribas menos de {0} caracteres."),
        rangelength: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
        range: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1}."),
        max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}."),
        min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}."),
        validPassword: "La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.",
    });

    $(".btn-back-to").click(function () {
        $("#display_update_users").hide();
        $("#display_new_users").hide();
        $("#display_traceability").hide();
        $("#display_user_view").hide();
        $("#content_users").show();
        $("#form_update_users").trigger("reset");
        $("#form_new_users").trigger("reset");
    });

    $(".btn-view-user").click(function () {
        $("#display_user_view").hide();
    });

    $(document).on("click", ".ps-delete-btn-equipment", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#delete_display").modal("show");
    });

    $(document).on("click", ".btn-view-equipment", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#content_users").hide();
        $("#display_user_view").show();
        let action = "view"
        consult_user(action)
    });

    $("#btn_new_equiment").click(function () {
        $("#display_new_equipment").show();
        $("#content_equipment").hide();
    });

    $(document).on("click", ".btn-edit-equipment", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#display_update_users").show();
        $("#content_users").hide();
        let action = "update"
        consult_user(action)

    });

    $("#select_equiment").on("change", function () {
        newSize = parseInt($("#select_equiment").val());
        create_page(newSize);
        $("#cards_content_equiment").pagination("refresh");
    });

    $("#btn-pagination-equiment-iz").on("click", function () {
        $("#cards_content_equiment").pagination("previous");
        $("#cards_content_equiment").pagination("refresh");
        if (contpage > 1) {
            contpage -= 1;
        }
        $("#paginacion_equiment_all").val(contpage + "")
    });

    $("#btn-pagination-equiment-de").on("click", function () {
        $("#cards_content_equiment").pagination("next");
        $("#cards_content_equiment").pagination("refresh");
        if (contpage < totapa) {
            contpage += 1;
        }
        $("#paginacion_equiment_all").val(contpage + "")
    });

    $("#paginacion_equiment_all").on("change", function (event) {
        const pageNumber = parseInt($(this).val());
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
            $("#cards_content_equiment").pagination("go", pageNumber);
        } else if (!isNaN(pageNumber) && pageNumber > totalPages) {
            $("#cards_content_equiment").pagination("go", totalPages);
            $("#paginacion_equiment_all").val(totalPages);
        } else if (!isNaN(pageNumber) && pageNumber <= 0) {
            $("#cards_content_equiment").pagination("go", 1);
            $("#paginacion_equiment_all").val(1);
        }
    });

    $("#form_new_equipment").validate({
        ignore: function(index, element) {
            return $(element).hasClass('oculto');
        },
        rules: {
            input_img_new_equipment_name: {
                required: true,
            }, name_equipment_new: {
                required: true,
            }, Maker_equipment_new: {
                required: true,
            }, select_new_equipment_classification: {
                required: true,
            }, country_user_new: {
                required: true,
            }, Model_equipment_new: {
                required: true,
            }, brand_equipment_new: {
                required: true,
            }, price_equipment_new: {
                required: true, minlength: 3,number: true,digits: true,
            }, campus_new_equipment: {
                required: true,
            }, area_new_equipment: {
                required: true,
            }, building_new_equipment: {
                required: true,
            }, floor_new_equipment: {
                required: true,
            }, space_new_equipment: {
                required: true,
            }, date_shoping_new_equipment: {
                required: true,
            }, fuction_new_equipment: {
                required: true,
            }, img_new_equipment_name: {
                required: true,
            }
        }, errorElement: "span",

        submitHandler: function () {
            $("#modal_new_user").modal("show");
        },

    });

    $("#modal_create_user").click(function () {
        let Named = $("#input_new_equipment_name").val();
        let Marker = $("#input_new_equipment_Maker").val();
        let classificationId = $("#input_new_equipment_classification").val();
        let Model = $("#input_new_equipment_Model").val();
        let Brand = $("#input_new_equipment_brand").val();
        let Price = $("#input_new_users_price").val();
        let spaceId = $("#input_new_equipment_space").val();
        let DataShoping = $("#date_shoping_new_equipment").val();
        let Functionn = $("#fuction_new_equipment").val();
        let ImgEquipment = img_base64;
        var file = $('#imgInput')[0].files[0];


        $.ajax({
            url: "/api/equipment", type: "post", data: {
               name:Named,
                maker:Marker,
                price:Price,
                model:Model,
                brand:Brand,
                datashoping:DataShoping,
                fuction:Functionn,
                imgequipment:ImgEquipment,
                spaceid:spaceId,
                classificationid:classificationId,
            }, success: function (respuesta) {
                console.log("hola")
                console.log(respuesta)
            }, error: function (error) {
                console.log(error)
            }

        });
        $(".btn-back-to").click()
    });

    $("#modal-edit").click(function () {
        let name_user = $("#input_update_users_name").val();
        let lastname = $("#input_update_users_lastname").val();
        let document_type = $("#input_update_users_document_type").val();
        let number_ducument = $("#input_update_users_number_ducument").val();
        let country = $("#input_update_users_country").val();
        let phone_number = $("#input_update_users_phone_number").val();
        let email = $("#input_update_users_email").val();
        let charge = $("#input_update_users_charge").val();
        let rol = $('input[name="rol_update_user"]:checked').val();

        $.ajax({
            url: "/api/users/" + array_users_update.id, type: "patch", data: {
                name: name_user,
                lastname: lastname,
                document_type: document_type,
                ducument: number_ducument,
                country: country,
                phone_number: phone_number,
                email: email,
                charge: charge,
                rol: rol,
            }, success: function (respuesta) {

            }, error: function (error) {
                console.log(error)
            }
        });
        $(".btn-back-to").click()
    });

    $('#user_company_all').click(function () {
        $('.user-company').prop('checked', false)
        // updatePagination(filter,status_user_list)
    })

    $('#search_users').keyup(function () {
        var search = $('#search_users').val();
        if (search.length > 2) {
            searchuser(search);
            create_page(newSize);
        }
        if ($('#search_users').val().trim() == '') {
            array_equiment = arrar_temp_equiment;
            searchuser(search);
            create_page(newSize);
        }
    })

    $("#modal_delete_user").click(function () {
        deleteuser()
    })

    $("#logout").click(function () {
        $.ajax({
            url: "/api/logout", type: "get", success: function () {
                location.reload();
            },
        });
    })


    $("#btn_activate_modal_new_equipment_img").click(function (){
      modal_img="nuevo";
    })
    $("#btn_save_img_user").click(function (){
        var url_img = $("#imgInput").val();
        console.log($("#imgInput"));
        $("#input_img_new_equipment").val(url_img);

    });

// Escuchar cambios en el input
    $("#imgInput").change(function (){
        var $inputImagen = $('#imgInput');
        console.log("hola")
        // Verificar si se seleccionó una imagen
        if ($inputImagen[0].files && $inputImagen[0].files[0]) {
            // Crear objeto FileReader
            const reader = new FileReader();

            // Escuchar evento load del FileReader
            reader.onload = (event) => {
                // Crear imagen y asignar URL del FileReader
                const $imagen = $('<img>').attr('src', event.target.result).addClass('img_previous_equiment');

                // Agregar imagen al contenedor de previsualización
                $('.container-modal-image').empty().append($imagen);
                $("#user_img_profile_icon-new").html(`<img class="img_input_equiment_previous" src="${event.target.result}" alt="">`)
                const arrayBuffer = event.target.result;
                const bytes = new Uint8Array(arrayBuffer);
                let binary = '';
                bytes.forEach((byte) => {
                    binary += String.fromCharCode(byte);
                });
                img_base64 = btoa(binary);

            };
            console.log($inputImagen[0].files[0])
            // Leer archivo de imagen como URL base64
            reader.readAsDataURL($inputImagen[0].files[0]);
        }

        var imagen = $("#imgInput")[0].files[0];
        var lector = new FileReader();
        lector.onloadend = function() {
            var base64 = btoa(lector.result);
            img_base64=base64
            console.log(img_base64)
        };
        lector.readAsBinaryString(imagen);
    });

    $("#input_new_equipment_campus").change(function () {
        let id=$("#input_new_equipment_campus").val()
        $.ajax({
            url: "/api/building/"+id,
            type: "post",
            success: function (response) {
                let imprimi;
                response.forEach(function(opcion) {
                    console.log(opcion)
                    imprimi+=`<option value=${opcion.Id}>${opcion.Name}</option>`;
                });
                $("#input_new_equipment_building").html(`<option value="1" id="input_new_users_rol" selected disabled></option>`);
                $("#input_new_equipment_building").append(imprimi)
            }, error: function (error) {
                console.log(error)
            }
        });
    })

    $("#input_new_equipment_building").change(function () {
        let id=$("#input_new_equipment_building").val()
        $.ajax({
            url: "/api/floor/"+id,
            type: "post",
            success: function (response) {
                let imprimi;
                response.forEach(function(opcion) {
                    console.log(opcion)
                    imprimi+=`<option value=${opcion.Id}>${opcion.Floornumber}</option>`;
                });
                $("#input_new_equipment_floor").html(`<option value="1" id="input_new_users_rol" selected disabled></option>`);
                $("#input_new_equipment_floor").append(imprimi)
            }, error: function (error) {
                console.log(error)
            }
        });
    })
    $("#input_new_equipment_floor").change(function () {
        let id=$("#input_new_equipment_floor").val()
        $.ajax({
            url: "/api/area/"+id,
            type: "post",
            success: function (response) {
                let imprimi;
                response.forEach(function(opcion) {
                    console.log(opcion)
                    imprimi+=`<option value=${opcion.Id}>${opcion.Name}</option>`;
                });
                $("#input_new_equipment_area").html(`<option value="1" id="input_new_users_rol" selected disabled></option>`);
                $("#input_new_equipment_area").append(imprimi)
            }, error: function (error) {
                console.log(error)
            }
        });
    })
    $("#input_new_equipment_area").change(function () {
        let id=$("#input_new_equipment_area").val()
        $.ajax({
            url: "/api/space/"+id,
            type: "post",
            success: function (response) {
                let imprimi;
                response.forEach(function(opcion) {
                    console.log(opcion)
                    imprimi+=`<option value=${opcion.Id}>${opcion.Technicallocation}</option>`;
                });
                $("#input_new_equipment_space").html(`<option value="1" id="input_new_users_rol" selected disabled></option>`);
                $("#input_new_equipment_space").append(imprimi)
            }, error: function (error) {
                console.log(error)
            }
        });
    })

});

function create_page() {
    $("#cards_content_equiment").pagination({
        dataSource: array_equiment,
        pageSize: newSize,
        showPageNumbers: true,
        showNavigator: true,
        totalPage: true,
        callback: function (data, pagination) {
            $("#cards_content_equiment").empty();
            data.forEach(function (item) {
                let isoDateString = item.createdAt;
                let date = new Date(isoDateString);
                let formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
                $("#cards_content_equiment").append(`<div class='cards-content-module'>
  <div class='content-display-module-cards'>
      <div >
          <div class='content-img-cards'>
              <div>
                  <div class='conteinder-user-name-img'>
                      <div class='display-img-cards'>
                          <div class="img-user-traza">
                             <img src="data:image/png;base64,${item.ImgEquipment}" alt="">
                          </div>
                      </div>
                      <label class='label-spna-font'>
                          <label class='label-spna-font'>${item.classification.Classification}</label>
                          <BR>
                             <label class='styles-cards-font'>${item.Name}</label>
                             <br>
                             <label class='styles-cards-font colorblue'>referencia</label>
                             <br>
                             <label class='styles-cards-font colorblue'>${item.Numparts}</label>
                          </label>
                      <br>
                  </div>
              </div>
          </div>
      </div>
      <div id='user_data_personal_staff' >
          <div>
          <label class='label-spna-font'>Ubicacion del equipo</label>
              <BR>
              <label class='styles-cards-font'><i class="fa-solid fa-building-columns"></i> </i>Sede: ${item.space.area.floor.building.campus.Name}</label>
              <BR>
              <label class='styles-cards-font'><i class="fa-solid fa-building"></i> </i>Edificio: ${item.space.area.floor.building.Name}</label>
              <BR>
              <label class='styles-cards-font'><i class="fas fa-elevator"></i> </i>Piso: ${item.space.area.floor.Floornumber}</label>
              <BR>
               <label class='styles-cards-font'><i class="fas fa-map-marker"></i> </i>Area: ${item.space.area.Name}</label>
               <BR>
               <label class='styles-cards-font'><i class="fas fa-layer-group"></i> </i>Espacio: ${item.space.Location}</label>
         </div>
     </div>
      <div id='user_data_rol' >
          <div>
              <label class='label-spna-font'>Datos de ingreso</label>
              <BR>
              <label class='styles-cards-font'><i class="fa-solid fa-user"></i> ${item.user.Name} ${item.user.Lastname}</label>
              <label class='styles-cards-font'><i class="fa-regular fa-calendar-plus"></i> ${formattedDate}</label>

          </div>
      </div>                                                 
          <div class='dropdown'>
              <button class='dropdown-btn'>
                  <img src='img/drop.png' >
              </button>
              <div class='dropdown-content'>
              <a type class='btn-view-user cursor-pointer-styles' data-index="${item.Id}">
              <i class="fa-solid fa-bullseye">
                      </i> Visualizar</a>
                  <a type class='btn-edit-user cursor-pointer-styles' data-index="${item.Id}">
                      <i class="fas fa-pencil-alt">
                      </i> Editar</a>
                  <a data-index="${item.Id}" class='ps-delete-btn-equipment cursor-pointer-styles'>
                      <i class="fa-solid fa-trash-can"></i> Eliminar</a>
                  <a type class='ps-traceability-btn cursor-pointer-styles' data-index="${item.Id}"><i class="fas fa-history"></i>
                      Trazabilidad</a>
              </div>
          </div>
      </div>
  </div>
</div>`);
            });
        },
    });
    totalPages = $("#cards_content_equiment").pagination("getTotalPage");
    $("#paginacion_equiment_all").html(totalPages);
    totapa = totalPages;
}

function chageequiment() {
    $.ajax({
        url: "/api/equipment",
        type: "get",
        success: function(response) {
            arrar_temp_equiment = response;

        },
        error: function(xhr, status, error) {

        }
    });
}

function deleteuser() {
    $.ajax({
        url: "/api/equipment/" + indextemp, type: "delete", success: function (response) {
        },
    });
}

function searchuser(search) {
    $.ajax({
        url: "/api/searchuser", type: "post", data: {
            search: search
        }, success: function (response) {
            array_equiment = response;
            create_page(newSize);
        }, error: function (xhr, status, error) {

        }
    });
}

function consult_user(action) {
    $.ajax({
        url: "/api/users/" + indextemp, type: "get", success: function (response) {
            array_users_update = response;
            switch (action) {
                case "update":
                    fill_inputup_date()
                    break;
                default:
                    fill_view_user()
                    break;
            }
        },
    });
}

function fill_inputup_date() {
    $("#input_update_users_name").val(array_users_update.name);
    $("#input_update_users_lastname").val(array_users_update.lastname);
    $("#input_update_users_phone_number").val(array_users_update.phone);
    $('select[name="country_user_update"] option[value="' + array_users_update.country + '"]').prop('selected', true);
    $('select[name="document_user_update"] option[value="' + array_users_update.typedocument + '"]').prop('selected', true);
    $("#input_update_users_number_ducumnet").val(array_users_update.document);
    $("#input_update_users_charge").val(array_users_update.burden);
    $("#input_update_users_email").val(array_users_update.email);
    $('input[name="rol_update_user"][value="' + array_users_update.role + '"]').prop('checked', true);

}


function fill_view_user() {
    $("#view-user-name").html(array_users_update.name + " " + array_users_update.lastname);
    $("#view-user-document").html(array_users_update.typedocument + " " + array_users_update.document);
    $("#view-user-burden").html(array_users_update.burden);
    $("#view-user-phone").html(`<i class="fa-solid fa-mobile-screen"id="user_data_personal_staff_icon_mobil"></i>(+` + array_users_update.country + ")" + " " + array_users_update.phone);
    $("#view-user-email").html(`<i class="fa-solid fa-envelope"id="user_data_personal_staff_icon_envelope"></i>` + " " + array_users_update.email);
    $("#view-user-rol").html(array_users_update.role);
    $("#view-user-rol-date").html(array_users_update.updatedAt);
}

function consult_extra_new() {
    var imprimi
    var campus=[];
    $.ajax({
        url: "/api/campus",
        type: "get",
        success: function(response) {
            campus = response;
            console.log(campus)
            campus.forEach(function(opcion) {
                console.log(opcion)
                imprimi+=`<option value=${opcion.Id}>${opcion.Name}</option>`;
            });
            $("#input_new_equipment_campus").append(imprimi)
        },
        error: function(xhr, status, error) {

        }
    });
    var classification=[];
   var imprimi_clas;
    $.ajax({
        url: "/api/classification",
        type: "get",
        success: function(response) {
            imprimi_clas = response;
            console.log(imprimi_clas)
            imprimi_clas.forEach(function(opcion) {
                console.log(opcion)
                imprimi_clas+=`<option value=${opcion.Id}>${opcion.Classification}</option>`;
            });
            $("#input_new_equipment_classification").append(imprimi_clas)
        },
        error: function(xhr, status, error) {
        }
    });
}