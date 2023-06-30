var array_equipment_update = [];
var id_input_details_valor = [];
var copy_array_equiment = [];
var arrar_temp_equiment = [];
var stopInterval = false;
var array_equiment = [];
var id_input_details = []
var id_typdetails = 0;
var img_base64 = 0;
var indextemp = 0;
var totalPages = 0;
var id_equipment = 0;
var modal_img = 0;
var contpage = 1;
var newSize = 5;
var totapa = 0;
var intervalcontinua;
var cD = 0;
var parts = [];
var value_parts = [];
$(document).ready(function () {

    $("#menu_Equipment").addClass("seccionmenusi");
    consult_extra_new()

    setTimeout(function () {

        var intervalinicial = setInterval(function () {
            chageequiment();
            if (arrar_temp_equiment.length > 0) {
                copy_array_equiment = arrar_temp_equiment;
                array_equiment = arrar_temp_equiment;
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
        $("#display_update_equipment").hide();
        $("#display_new_equipment").hide();
        $("#display_traceability").hide();
        $("#display_equipment_view").hide();
        $("#content_equipment").show();
        $("#form_update_equipment").trigger("reset");
        $("#form_new_equipment").trigger("reset");
        $("#user_img_profile_icon-new").html(` <i class="fas fa-file-image fa-1x"></i>`)
    });

    $("#btn_new_equiment").click(function () {
        $("#display_new_equipment").show();
        $("#content_equipment").hide();
    });

    $(document).on("click", ".ps-delete-btn-equipment", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#delete_display_equipment").modal("show");
    });

    $(document).on("click", ".btn-view-equipment", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#content_equipment").hide();
        $("#display_equipment_view").show();
        let action = "view"
        consult_equipment(action)
    });

    $(document).on("click", ".btn-edit-equipment", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        consult_extra_update()
        let action = "update"
        consult_equipment(action)

    });

    $("#select_equiment").on("change", function () {
        newSize = parseInt($("#select_equiment").val());
        create_page();
        $("#cards_content_equiment").pagination("refresh");
    });

    $("#btn-pagination-equiment-iz").on("click", function () {
        $("#cards_content_equiment").pagination("previous");
        $("#cards_content_equiment").pagination("refresh");
        if (contpage > 1) {
            contpage -= 1;
        }
        $("#input_pagination_equiment").val(contpage + "")
    });


    $("#btn-pagination-equiment-de").on("click", function () {
        $("#cards_content_equiment").pagination("next");
        $("#cards_content_equiment").pagination("refresh");
        if (contpage < totapa) {
            contpage += 1;
        }
        $("#input_pagination_equiment").val(contpage + "")
    });

    $("#input_pagination_equiment").on("change", function (event) {
        const pageNumber = parseInt($(this).val());
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
            $("#cards_content_equiment").pagination("go", pageNumber);
        } else if (!isNaN(pageNumber) && pageNumber > totalPages) {
            $("#cards_content_equiment").pagination("go", totalPages);
            $("#input_pagination_equiment").val(totalPages);
        } else if (!isNaN(pageNumber) && pageNumber <= 0) {
            $("#cards_content_equiment").pagination("go", 1);
            $("#input_pagination_equiment").val(1);
        }
    });

    $("#form_new_equipment").validate({
        ignore: function (index, element) {
            return $(element).hasClass('oculto');
        }, rules: {
            input_img_new_equipment_name: {
                required: true,
            }, name_equipment_new: {
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
                required: true, minlength: 3, number: true, digits: true,
            }, area_new_equipment: {
                required: true,
            }, typesequipmente_new_equipment: {
                required: true,
            }, date_shoping_new_equipment: {
                required: true,
            }, fuction_new_equipment: {
                required: true,
            }, img_new_equipment_name: {
                required: true,
            },num_stock_equipment_new:{
                required: true,
            }
        }, errorElement: "span",

        submitHandler: function () {
            $("#modal_new_equipment").modal("show");
        },

    });

    $("#form_update_equipment").validate({
        ignore: function (index, element) {
            return $(element).hasClass('oculto');
        }, rules: {
            input_img_update_equipment_name: {
                required: true,
            }, name_equipment_update: {
                required: true,
            }, select_update_equipment_classification: {
                required: true,
            }, country_user_update: {
                required: true,
            }, Model_equipment_update: {
                required: true,
            }, brand_equipment_update: {
                required: true,
            }, price_equipment_update: {
                required: true, minlength: 3, number: true, digits: true,
            }, area_update_equipment: {
                required: true,
            }, typesequipmente_update_equipment: {
                required: true,
            }, date_shoping_update_equipment: {
                required: true,
            }, fuction_update_equipment: {
                required: true,
            }, img_update_equipment_name: {
                required: true,
            },num_stock_equipment_update:{
            required: true,
        }
        }, errorElement: "span",

        submitHandler: function () {
            $("#modal_update_equipment").modal("show");
        },

    });

    $("#modal_create_equipment").click(function () {
        $("#form_new_equipment").hide()
        $("#for_new_paremters").show()
        let Named = $("#input_new_equipment_name").val();
        let ClassificationId = $("#input_new_equipment_classification").val();
        let Model = $("#input_new_equipment_Model").val();
        let Brand = $("#input_new_equipment_brand").val();
        let Price = $("#input_new_users_price").val();
        let DataShoping = $("#date_shoping_new_equipment").val();
        let Functionn = $("#fuction_new_equipment").val();
        let TypesEquipmentId = $("#input_new_equipment_types").val();
        let ImgEquipment = img_base64;
        let num_stock= $("#input_new_equipment_num_stock").val();
        $.ajax({
            url: "/api/equipment", type: "post", data: {
                name: Named,
                price: Price,
                model: Model,
                brand: Brand,
                datashoping: DataShoping,
                fuction: Functionn,
                imgequipment: ImgEquipment,
                classificationid: ClassificationId,
                typesequipmentid: TypesEquipmentId,
                stock:num_stock,
            }, success: function (respuesta) {
                id_equipment = respuesta.Id
            }, error: function (error) {
                console.log(error)
            }

        });
        $("#input_img_new_equipment").val(null);
        $("#user_img_profile_icon-new").html(` <i class="fas fa-file-image fa-1x"></i>`)
    });

    $("#modal-edit-equipment").click(function () {
        let Named = $("#input_update_equipment_name").val();
        let Model = $("#input_update_equipment_Model").val();
        let Brand = $("#input_update_equipment_brand").val();
        let Price = $("#input_update_users_price").val();
        let spaceId = $("#input_update_equipment_space").val();
        let DataShoping = $("#date_shoping_update_equipment").val();
        let Functionn = $("#fuction_update_equipment").val();
        let TypesEquipmentId = $("#input_update_equipment_types").val();
        let ImgEquipment = img_base64;
        let num_stock= $("#input_update_equipment_num_stock").val();
        $.ajax({
            url: "/api/equipment/" + indextemp, type: "patch", data: {
                name: Named,
                price: Price,
                model: Model,
                brand: Brand,
                datashoping: DataShoping,
                fuction: Functionn,
                imgequipment: ImgEquipment,
                spaceid: spaceId,
                typesequipmentid: TypesEquipmentId,
                stock:num_stock,
            }, success: function (respuesta) {
            }, error: function (error) {
                console.log(error)
            }

        });
        $(".btn-back-to").click()
        $("#user_img_profile_icon-update").html(` <i class="fas fa-file-image fa-1x"></i>`)
    });


    $('#search_equiment').keyup(function () {
        var search = $('#search_equiment').val();
        if (search.length > 2) {
            searchequipment(search);
            create_page();
        }
        if ($('#search_equiment').val().trim() == '') {
            array_equiment = arrar_temp_equiment;
            searchequipment(search);
            create_page();
        }
    })

    $("#modal_delete_equipment").click(function () {
        deleteuser()
    })

    $("#modal_create_equipment_parts").click(function () {
        valueparts()
    })

    $("#logout").click(function () {
        $.ajax({
            url: "/api/logout", type: "get", success: function () {
                location.reload();
            },
        });
    })

    $("#btn_activate_modal_new_equipment_img").click(function () {
        modal_img = "nuevo";
    })

    $("#btn_save_img_user").click(function () {
        var url_img = $("#imgInput").val();
        $("#input_img_new_equipment").val(url_img);

    });

    $("#btn_save_img_equipment").click(function () {
        var url_img = $("#imgInput_update").val();
        $("#input_img_update_equipment").val(url_img);

    });
    $("#num_parts_equipment").click(function () {
        let num = $("#input_num_parts_equipment").val()
        if (num > 0) {
            $("#contenedor_num_parts_equipment").hide()
            newparts(num);
            $("#btn_submit_parts").show()
        }

    })
    $("#imgInput").change(function () {
        var $inputImagen = $('#imgInput');
        if ($inputImagen[0].files && $inputImagen[0].files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const $imagen = $('<img>').attr('src', event.target.result).addClass('img_previous_equiment');
                $('#container-modal-image-new').empty().append($imagen);
                $("#user_img_profile_icon-new").html(`<img class="img_input_equiment_previous" src="${event.target.result}" alt="">`)
                const arrayBuffer = event.target.result;
                const bytes = new Uint8Array(arrayBuffer);
                let binary = '';
                bytes.forEach((byte) => {
                    binary += String.fromCharCode(byte);
                });
                img_base64 = btoa(binary);
            };
            reader.readAsDataURL($inputImagen[0].files[0]);
        }
        var imagen = $("#imgInput")[0].files[0];
        var lector = new FileReader();
        lector.onloadend = function () {
            var base64 = btoa(lector.result);
            img_base64 = base64
        };
        lector.readAsBinaryString(imagen);
    });

    $("#imgInput_update").change(function () {
        var $inputImagen = $('#imgInput_update');
        if ($inputImagen[0].files && $inputImagen[0].files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const $imagen = $('<img>').attr('src', event.target.result).addClass('img_previous_equiment');
                $('#container-modal-image-update').empty().append($imagen);
                $("#user_img_profile_icon-update").html(`<img class="img_input_equiment_previous" src="${event.target.result}" alt="">`)
                const arrayBuffer = event.target.result;
                const bytes = new Uint8Array(arrayBuffer);
                let binary = '';
                bytes.forEach((byte) => {
                    binary += String.fromCharCode(byte);
                });
                img_base64 = btoa(binary);
            };
            reader.readAsDataURL($inputImagen[0].files[0]);
        }
        var imagen = $("#imgInput_update")[0].files[0];
        var lector = new FileReader();
        lector.onloadend = function () {
            var base64 = btoa(lector.result);
            img_base64 = base64
        };
        lector.readAsBinaryString(imagen);
    });

    $("#input_new_equipment_classification").change(function () {
        let id = $("#input_new_equipment_classification").val()
        $.ajax({
            url: "/api/Classification/TypesEquipment/" + id, type: "get", success: function (response) {
                let imprimi;
                response.forEach(function (opcion) {
                    imprimi += `<option value="${opcion.Id}">${opcion.Name}</option>`;
                });
                $("#input_new_equipment_types").html(`<option value=""  selected disabled></option>`);
                $("#input_new_equipment_types").append(imprimi)
            }, error: function (error) {
                console.log(error)
            }
        });
    })

    $("#input_update_equipment_classification").change(function () {
        let id = $("#input_update_equipment_classification").val()
        $.ajax({
            url: "/api/Classification/TypesEquipment/" + id, type: "get", success: function (response) {
                let imprimi;
                response.forEach(function (opcion) {
                    imprimi += `<option value="${opcion.Id}">${opcion.Name}</option>`;
                });
                $("#input_update_equipment_types").html(`<option value=""  selected disabled></option>`);
                $("#input_update_equipment_types").append(imprimi)
            }, error: function (error) {
                console.log(error)
            }
        });
    })

    $("#input_new_equipment_types").change(function () {
        let id = $("#input_new_equipment_types").val()
        $.ajax({
            url: "/api/allowstypesdetails/" + id, type: "get", success: function (response) {
                id_input_details = [];
                detailsequipment(response)

            }, error: function (error) {
                console.log(error)
            }
        });
    })

    $("#input_update_equipment_campus").change(function () {
        let imprimi = " ";
        $.ajax({
            url: "/api/building/campus/user", type: "get", success: function (response) {
                response.forEach(function (opcion) {
                    var opcions = opcion.campus.buildings;
                    opcions.forEach(function (opciont) {
                        imprimi += `<option value=${opciont.id}>${opciont.name}</option>`;
                    })
                });
                $("#input_update_equipment_building").html(`<option  selected disabled></option>`);
                $("#input_update_equipment_building").append(imprimi)

            }, error: function (error) {
                console.log(error)
            }
        });
    })

    $("#input_update_equipment_building").change(function () {
        let id = $("#input_update_equipment_building").val()
        $.ajax({
            url: "/api/floors/" + id, type: "get", success: function (response) {
                let imprimi;
                response.forEach(function (opcion) {

                    imprimi += `<option value=${opcion.Id}>${opcion.Floornumber}</option>`;
                });
                $("#input_update_equipment_floor").html(`<option  selected disabled></option>`);
                $("#input_update_equipment_floor").append(imprimi)
            }, error: function (error) {
                console.log(error)
            }
        });
    })

    $("#input_update_equipment_floor").change(function () {
        let id = $("#input_update_equipment_floor").val()
        $.ajax({
            url: "/api/area/floor/" + id, type: "get", success: function (response) {
                let imprimi;
                response.forEach(function (opcion) {
                    imprimi += `<option value=${opcion.Id}>${opcion.Name}</option>`;
                });
                $("#input_update_equipment_area").html(`<option selected disabled></option>`);
                $("#input_update_equipment_area").append(imprimi)
            }, error: function (error) {
                console.log(error)
            }
        });
    })

    $("#input_update_equipment_area").change(function () {
        let id = $("#input_update_equipment_area").val()
        let imprimi
        $.ajax({
            url: "/api/allowsclassifications/space/", type: "post", data: {
                classificationid: array_equipment_update.typesEquipment.classificationId,
                spaceid: id
            }, success: function (response) {
                const result = Array.from(new Set(response.map(item => item.space)));
                result.forEach(function (opcion) {
                    imprimi += `<option value=${opcion.Id}>${opcion.Location}</option>`;
                });
                $("#input_update_equipment_space").html(`<option  selected disabled></option>`);
                $("#input_update_equipment_space").append(imprimi)
            }, error: function (error) {
                console.log(error)
            }
        });
    })


    $("#modal_create_equipment_details").click(function () {
        id_input_details.forEach(function (item) {
            var nuevoObjeto = {
                "Id": item.Id,
                "Name": item.Name,
                "IdInput": "id_details_" + item.Name,
                "Idequipment": id_equipment,
                "Valor": $("#" + item.IdInput).val()
            };
            id_input_details_valor.push(nuevoObjeto);
        });
        id_input_details_valor.forEach(function (item) {
            $.ajax({
                url: "/api/Detailsequipment",
                type: "post",
                data: {
                    Details: item.Valor,
                    typesDetailId: item.Id,
                    equipmentId: item.Idequipment
                }, success: function (response) {

                }, error: function (error) {
                    console.log(error)
                }
            });
        })
        $("#for_new_parts").show()
        $("#for_new_paremters").hide()
    });

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
                          <label class='label-spna-font'>Datos tecnicos</label>
                             <br>
                             <label class='styles-cards-font'>Clasificación: ${item.typesEquipment.classification.Name}</label>
                             <br>
                             <label class='styles-cards-font'>Categoría: ${item.typesEquipment.Name}</label>
                             <br>
                             <label class='styles-cards-font'>Nombre: ${item.Name}</label>
                             <br>
                             <label class='styles-cards-font '>Marca: ${item.Brand}</label>
                             <br>
                             <label class='styles-cards-font '>Modelo: ${item.Model}</label>
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
              <label class='styles-cards-font'><i class="fa-solid fa-building-columns"></i> Regional: ${item.space.area.floor.building.campus.Name}</label>
              <BR>
              <label class='styles-cards-font'><i class="fa-solid fa-building"></i> Edificio: ${item.space.area.floor.building.Name}</label>
              <BR>
              <label class='styles-cards-font'><i class="fas fa-elevator"></i> Piso: ${item.space.area.floor.Floornumber}</label>
              <BR>
               <label class='styles-cards-font'><i class="fas fa-map-marker"></i> Área: ${item.space.area.Name}</label>
               <BR>
               <label class='styles-cards-font'><i class="fas fa-layer-group"></i> Espacio: ${item.space.Location}</label>
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
              <a type class='btn-view-equipment cursor-pointer-styles' data-index="${item.Id}">
              <i class="fa-solid fa-bullseye">
                      </i> Visualizar</a>
                  <a type class='btn-edit-equipment cursor-pointer-styles' data-index="${item.Id}">
                      <i class="fas fa-pencil-alt">
                      </i> Editar</a>
                  <a data-index="${item.Id}" class='ps-delete-btn-equipment cursor-pointer-styles'>
                      <i class="fa-solid fa-trash-can"></i> Eliminar</a>
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
    contpage = 1;
    $("#input_pagination").val(contpage + "")
}

function chageequiment() {
    $.ajax({
        url: "/api/equipment", type: "get", success: function (response) {
            arrar_temp_equiment = response;

        }, error: function (error) {
            console.log(error)
        }
    });
}

function deleteuser() {
    $.ajax({
        url: "/api/equipment/" + indextemp, type: "delete", success: function (response) {
        },
    });
}

function searchequipment(search) {
    $.ajax({
        url: "/api/equipment/search", type: "post", data: {
            search: search
        }, success: function (response) {
            array_equiment = response;
            create_page();
        }, error: function (error) {
            console.log(error)
        }
    });
}

function consult_equipment(action) {

    $.ajax({
        url: "/api/equipment/" + indextemp, type: "get", success: function (response) {
            array_equipment_update = response;
            switch (action) {
                case "update":
                    fill_inputup_date()
                    break;

                default:
                    fill_view_equipment()
                    break;
            }
        }, error: function (error) {
            console.log(error)
        }

    });
}

function fill_inputup_date() {
    $("#user_img_profile_icon-update").html(`<img class="img_input_equiment_previous" src="data:image/png;base64,${array_equipment_update.ImgEquipment}" alt="">`)
    $("#input_update_equipment_name").val(array_equipment_update.Name);
    $("#input_update_equipment_classification").val(array_equipment_update.typesEquipment.classificationId);
    $('#input_update_equipment_classification').trigger('change');
    $("#input_update_equipment_Model").val(array_equipment_update.Model);
    $("#input_update_equipment_brand").val(array_equipment_update.Brand);
    $("#input_update_users_price").val(array_equipment_update.Price);
    $("#input_update_equipment_num_stock").val(array_equipment_update.num_Inventory);
    $('#input_update_equipment_campus').val(array_equipment_update.space.area.floor.building.campus.Id);
    $('#input_update_equipment_campus').trigger('change');
    setTimeout(function () {
        $("#input_update_equipment_types").val(array_equipment_update.typesEquipment.Id);
    }, 150);
    setTimeout(function () {
        $("#input_update_equipment_building").val(array_equipment_update.space.area.floor.building.Id);
        $('#input_update_equipment_building').trigger('change');
    }, 180);
    setTimeout(function () {
        $("#input_update_equipment_floor").val(array_equipment_update.space.area.floorId);
        $('#input_update_equipment_floor').trigger('change');
    }, 220);
    setTimeout(function () {
        $("#input_update_equipment_area").val(array_equipment_update.space.areaId);
        $('#input_update_equipment_area').trigger('change');
    }, 250);
    setTimeout(function () {
        $("#input_update_equipment_space").val(array_equipment_update.spaceId);
    }, 290);
    $("#date_shoping_update_equipment").val(array_equipment_update.DateShoping);
    $("#fuction_update_equipment").val(array_equipment_update.Function);
    img_base64 = array_equipment_update.ImgEquipment;
    $("#input_img_update_equipment").val(img_base64);
    $("#display_update_equipment").show();
    $("#content_equipment").hide();

}

function fill_view_equipment() {
    let isoDateString = array_equipment_update.createdAt;
    let date = new Date(isoDateString);
    let formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
    $("#view-equipment-Clasification").html(`<i class="fa-solid fa-arrow-up-wide-short"></i> Clasificación: ${array_equipment_update.typesEquipment.classification.Name}`);
    $("#view-equipment-TypesEquipment").html(`<i class="fa-solid fa-arrow-up-wide-short"></i> Categoría: ${array_equipment_update.typesEquipment.Name}`);
    $("#view-equipment-Name").html(`<i class="fas fa-cog"></i> Nombre:  ${array_equipment_update.Name}`);
    $("#view-equipment-Model").html(`<i class="fas fa-cogs"></i> Modelo: ${array_equipment_update.Model}`);
    $("#view-equipment-Brand").html(`<i class="fa-brands fa-bandcamp"></i> Marca: ${array_equipment_update.Brand}`);
    $("#view-equipment-Stock").html(`<i class="fa-solid fa-barcode"></i> Numero de inventario: ${array_equipment_update.num_Inventory}`);
    $("#view-equipment-fuction").html(`<i class="fa-solid fa-screwdriver-wrench"></i> Función: ${array_equipment_update.Function}`);
    $(".container-info-user-equipment").html(` <label class='label-spna-font'>Datos de ingreso por el usuario</label>
    <label class='styles-cards-font'><i class="fa-solid fa-user"></i> ${array_equipment_update.user.Name} ${array_equipment_update.user.Lastname}</label>
    <label class='styles-cards-font'><i class="fa-regular fa-calendar-plus"></i> ${formattedDate}</label>`)
    $("#equipment-img-profile").html(`<img class="img-view-equipment" src="data:image/png;base64,${array_equipment_update.ImgEquipment}" alt="">`)
    $(".conatiner-info-user-equipmente-ubications").html(`<label class='label-spna-font'>Ubicación del equipo</label>
              <BR>
              <label class='styles-cards-font'><i class="fa-solid fa-building-columns"></i> Regional: ${array_equipment_update.space.area.floor.building.campus.Name}</label>
              <BR>
              <label class='styles-cards-font'><i class="fa-solid fa-building"></i> Edificio: ${array_equipment_update.space.area.floor.building.Name}</label>
              <BR>
              <label class='styles-cards-font'><i class="fas fa-elevator"></i> Piso: ${array_equipment_update.space.area.floor.Floornumber}</label>
              <BR>
              <label class='styles-cards-font'><i class="fas fa-map-marker"></i> Área: ${array_equipment_update.space.area.Name}</label>
              <BR>
              <label class='styles-cards-font'><i class="fas fa-layer-group"></i> Espacio: ${array_equipment_update.space.Location}</label>`)
    viewdetailsequipment(array_equipment_update.Id)
    partsview(array_equipment_update.parts)

}

function consult_extra_new() {
    var imprimi
    var campus = [];
    $.ajax({
        url: "/api/campus", type: "get", success: function (response) {
            campus = response;
            campus.forEach(function (opcion) {
                imprimi += `<option value=${opcion.Id}>${opcion.Name}</option>`;
            });
            $("#input_new_equipment_campus").html(`<option  selected disabled></option>`);
            $("#input_new_equipment_campus").append(imprimi)
        }, error: function (xhr, status, error) {

        }
    });


    var classification = [];
    var imprimi_clas;
    $.ajax({
        url: "/api/classification", type: "get", success: function (response) {
            imprimi_clas = response;
            imprimi_clas.forEach(function (opcion) {
                imprimi_clas += `<option value=${opcion.Id}>${opcion.Name}</option>`;
            });
            $("#input_new_equipment_classification").html(`<option value=""  selected disabled></option>`);
            $("#input_new_equipment_classification").append(imprimi_clas)
            $("#input_update_equipment_classification").html(`<option value=""  selected disabled></option>`);
            $("#input_update_equipment_classification").append(imprimi_clas)
        }, error: function (xhr, status, error) {
        }
    });


}

function consult_extra_update() {
    $.ajax({
        url: "/api/campus", type: "get", success: function (response) {
            campus = response;
            var imprimi = ""
            campus.forEach(function (opcion) {
                imprimi += `<option value=${opcion.Id}>${opcion.Name}</option>`;
            });
            $("#input_update_equipment_campus").html(`<option selected disabled></option>`);
            $("#input_update_equipment_campus").append(imprimi)
        }, error: function (xhr, status, error) {

        }
    });
}

function detailsequipment(response) {
    $("#details-equipment").html(" ")
    response.forEach(function (item) {
        var nuevoObjeto = {
            "Id": item.typesDetail.Id,
            "Name": item.typesDetail.Name.replace(/\s+/g, "-"),
            "IdInput": "id_details_" + item.typesDetail.Name.replace(/\s+/g, "-")
        };
        id_input_details.push(nuevoObjeto);
    });

    $("#details-equipment").html("");

    id_input_details.forEach(function (item) {
        $("#details-equipment").append(`
            <div class="form-floating mb-3">
                <input type="text" class="form-control styles-font-input" name="${item.Name}" id="${item.IdInput}" placeholder="${item.IdInput}">
                <label for="${item.IdInput}">${item.Name}</label>
            </div>
        `);
    });

    $("#for_new_paremters").validate({
        rules: getValidationRules(),
        errorElement: "span",
        submitHandler: function () {
            $("#modal_new_equipment_details").modal("show");
        }
    });
}

function getValidationRules() {
    var rules = {};
    id_input_details.forEach(function (item) {
        rules[item.Name] = {
            required: true
        };
    });
    return rules;
}

function viewdetailsequipment(id) {
    var imprimi = "";
    $.ajax({
        url: "/api/Detailsequipment/" + id,
        type: "get",
        success: function (response) {
            let ruta = response
            ruta.forEach(function (item) {
                imprimi += `<label class='styles-cards-font'><i class="fa-brands fa-searchengin"></i> ${item.typesDetail.Name}: ${item.Details}</label>`
            })
            $("#conteiner-equipment-view-details-equipment").html("")
            $("#conteiner-equipment-view-details-equipment").append(`<label class='label-spna-font'>Parámetros del equipo</label>` + imprimi)
        }, error: function (error) {
            console.log(error)
        }

    });
}


function newparts(num) {
    parts=[]

    for (let i = 0; i < num; i++) {
        $("#conten-form-parts").append(`
            <div class="form-floating mb-3">
                <input type="text" class="form-control styles-font-input"
                    name="new_name_parts_equipment${i+1}" id="input_name_new_parts_equipment${i + 1}" placeholder="Nombre de la parte del equipo">
                <label for="input_name_new_parts_equipment${i}">Nombre de la parte ${i + 1} del equipo</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control styles-font-input"
                    name="new_quantity_parts_equipment${i+1}" id="input_quantity_new_parts_equipment${i + 1}" placeholder="Cantidad de partes del equipo">
                <label for="input_quantity_new_parts_equipment${i}">Cantidad de partes ${i + 1} del equipo</label>
            </div>
            <div class="form-floating mb-3">
                <textarea type="text" class="form-control styles-font-input"
                    name="new_comments_parts_equipment${i+1}" id="input_comments_new_parts_equipment${i + 1}" placeholder="Descripción de la parte del equipo" style="height: 100px"></textarea>
                <label for="input_comments_new_parts_equipment${i}">Descripción de la parte ${i + 1} del equipo</label>
            </div>
            <br>
        `);

        var nuevoObjeto = {
            "Id_name": `input_name_new_parts_equipment${i+1}`,
            "name_name": `new_name_parts_equipment${i+1}`,
            "Id_quantity": `input_quantity_new_parts_equipment${i+1}`,
            "name_quantity": `new_quantity_parts_equipment${i+1}`,
            "Id_comments": `input_comments_new_parts_equipment${i+1}`,
            "name_comments": `new_comments_parts_equipment${i+1}`
        };
        parts.push(nuevoObjeto);
    }
    $("#for_new_parts").validate({
        rules: getValidationRulesparts(),
        errorElement: "span",
        submitHandler: function () {
            $("#modal_new_equipment_parts").modal("show");

        }
    });
}

function getValidationRulesparts() {
    var rules = {};
    parts.forEach(function (item) {
        rules[item.name_name] = {
            required: true
        };
        rules[item.name_quantity] = {
            required: true
        };
        rules[item.name_comments] = {
            required: true
        };
    });

    return rules;
}

function valueparts() {
    value_parts=[]
    parts.forEach(function (item) {
        var name = $("#"+item.Id_name).val();
        var quantity = $("#"+item.Id_quantity).val();
        var comments = $("#"+item.Id_comments).val();

        var nuevoObjeto = {
            val_name: name,
            val_quantity: quantity,
            val_comments: comments,
            Idequipment: id_equipment,
        };

        value_parts.push(nuevoObjeto);
    });

    addparts();
}


function addparts() {
    value_parts.forEach(function (item) {
        $.ajax({
            url: "/api/parts",
            type: "post",
            data: {
                name: item.val_name,
                quantity: item.val_quantity,
                comments: item.val_comments,
                idequipment:item.Idequipment
            }, success: function (response) {

            }, error: function (error) {
                console.log(error)
            }
        });
    })
    $("#conten-form-parts").html(" ")
    $("#for_new_parts").hide()
    $("#contenedor_num_parts_equipment").show()
    $("btn_submit_parts").hide()
    $("#form_new_equipment").show()
    $(".btn-back-to").click()
}

function partsview(json) {
    var imprimi=" "
    let ruta = json
    ruta.forEach(function (item) {
        imprimi += `<label class='styles-cards-font'><i class="fa-brands fa-searchengin"></i> ${item.Name}: ${item.Quantity}</label> <br>`
    })
    $("#conteiner-equipment-view-parts-equipment").html("")
    $("#conteiner-equipment-view-parts-equipment").append(`<label class='label-spna-font'>Partes del equipo</label> <br>` + imprimi)
}