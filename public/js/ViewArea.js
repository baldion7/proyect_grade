var array_areas = [];
var copy_array_areas = [];
var arrar_temp_buildig = [];
var array_floor = [];
var newSize = 5;
var totalPages = 0;
var contpage = 1;
var stopInterval = false;
var cD = 0;
var intervalcontinua;
var totapa;
var array_areas_update = [];
var indextemp;
var cargar = 1;
var id_building = 0;
var action
$(document).ready(function () {
    $("#menu_regionales").addClass("seccionmenusi");
    id_building = $("#id_building").val()
    setTimeout(function () {
        var intervalinicial = setInterval(function () {
            chageareas();
            if (arrar_temp_buildig.length > 0) {
                copy_array_areas = arrar_temp_buildig;
                array_areas = arrar_temp_buildig;
                create_page();
            }

            if (stopInterval) {

                clearInterval(intervalinicial);
            }

            if (arrar_temp_buildig = !null || arrar_temp_buildig > 0) {

                stopInterval = true;
            }
        }, 100);

        intervalcontinua = setInterval(function () {
            if (JSON.stringify(copy_array_areas) === JSON.stringify(arrar_temp_buildig)) {
                chageareas();
            } else {
                array_areas = arrar_temp_buildig;
                copy_array_areas = array_areas;
                if (array_areas.length > 0) {
                    create_page();
                }

            }
        }, 100);
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

    newSize = parseInt($("#select_areas").val());

    $.validator.addMethod('checkFloorInArray', function (value) {
        let isFloorUnique = true;

        for (let i = 0; i < array_floor.length; i++) {
            const item = array_floor[i];
            const ruta = item.floors;

            for (let j = 0; j < ruta.length; j++) {
                const floor = ruta[j];
                if (floor.Floornumber == value) {
                    isFloorUnique = false;
                    break;
                }
            }

            if (!isFloorUnique) {
                break;
            }
        }

        return isFloorUnique;
    }, 'Este número de piso ya está registrado en este edificio.');

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
        $("#display_update_areas").hide();
        $("#display_new_areas").hide();
        $("#display_areas_view").hide();
        $("#content_areas").show();
        $("#form_update_areas").trigger("reset");
        $("#form_new_areas").trigger("reset");
    });


    $(".btn-view-areas").click(function () {
        $("#display_areas_view").hide();
    });

    $(document).on("click", ".ps-delete-btn", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#delete_display_areas").modal("show");
    });

    $(document).on("click", ".ps-space-btn", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#id_space").val(indextemp)
        indextemp = $(e.currentTarget).attr("data-name");
        $("#name_space").val(indextemp)
        $("#view_display_space").modal("show")
    });

    $("#btn_new_areas").click(function () {
        $("#display_new_areas").show();
        $("#content_areas").hide();
         action = "new"
        chagefloors(id_building, action)
    });
    $("#modal_view_space").click(function () {
        $("#submitspace").click()
    })

    $(document).on("click", ".btn-edit-areas", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#display_update_areas").show();
        $("#content_areas").hide();
         action = "update"
        chagefloors(id_building, action)
        consult_areas(action)
    });

    $("#select_areas").on("change", function () {
        newSize = parseInt($("#select_areas").val());
        create_page();
        $("#cards_content_areas").pagination("refresh");
    });

    $(".new_type_areas").click(function () {
        $("#modal_new_typeareas").modal("show");
    })

    $("#btn-pagination-iz").on("click", function () {
        $("#cards_content_areas").pagination("previous");
        $("#cards_content_areas").pagination("refresh");
        if (contpage > 1) {
            contpage -= 1;
        }
        $("#input_pagination").val(contpage + "")
    });


    $("#btn-pagination-de").on("click", function () {
        $("#cards_content_areas").pagination("next");
        $("#cards_content_areas").pagination("refresh");
        if (contpage < totapa) {
            contpage += 1;
        }
        $("#input_pagination").val(contpage + "")
    });

    $("#input_pagination").on("change", function (event) {
        const pageNumber = parseInt($(this).val());
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
            $("#cards_content_areas").pagination("go", pageNumber);
        } else if (!isNaN(pageNumber) && pageNumber > totalPages) {
            $("#cards_content_areas").pagination("go", totalPages);
            $("#input_pagination").val(totalPages);
        } else if (!isNaN(pageNumber) && pageNumber <= 0) {
            $("#cards_content_areas").pagination("go", 1);
            $("#input_pagination").val(1);
        }
    });

    $("#form_new_areas").validate({
        rules: {
            new_name_areas: {
                required: true, minlength: 3,
            }, floor_new_areas: {
                required: true,
            }, description_new_areas: {
                required: true, minlength: 3,
            }, new_typearea: {
                required: true,
            },
        }, errorElement: "span", submitHandler: function () {
            $("#modal_new_areas").modal("show");
        },
    });

    $("#form_update_areas").validate({
        rules: {
            update_name_areas: {
                required: true, minlength: 3,
            }, floor_update_areas: {
                required: true,
            }, description_update_areas: {
                required: true, minlength: 3,
            }, update_typearea: {
                required: true,
            },
        }, errorElement: "span", submitHandler: function () {
            $("#modal_update_areas").modal("show");
        },
    });
    $("#new_typesearea").validate({
        rules: {
            name_typeareas_new: {
                required: true, minlength: 3,
            }, description_typeareas_new: {
                required: true, minlength: 3,
            },
        }, errorElement: "span", submitHandler: function () {
            createtypesarea()
            $("#modal_new_typeareas").modal("hide");
        },
    });

    $("#modal_create_areas").click(function () {
        let Name = $("#input_new_areas_name").val();
        let description = $("#description_new_areas").val();
        let floor = $("#input_new_areas_floor").val();
        let typearea = $('input[name="new_typearea"]:checked').val();
        $.ajax({
            url: "/api/area", type: "post", data: {
                name: Name,
                description: description,
                floorid: floor,
                typesAreaid: typearea,
                campusId: typearea
            }, success: function (respuesta) {
            }, error: function (error) {
                console.log(error)
            }

        });
        $(".btn-back-to").click()
    });

    $("#modal-edit-areas").click(function () {
        let Name = $("#input_update_areas_name").val();
        let description = $("#description_update_areas").val();
        let floor = $("#input_update_areas_floor").val();
        let typearea = $('input[name="update_typearea"]:checked').val();
        $.ajax({
            url: "/api/area/" + array_areas_update.Id, type: "patch", data: {
                name: Name,
                description: description,
                floorid: floor,
                typesAreaid: typearea,
                campusId: typearea
            }, success: function (respuesta) {
            }, error: function (error) {
                console.log(error)
            }

        });
        $(".btn-back-to").click()
    });
    $("#close_modal_form_floor").click(function () {
        $("#new_floor").trigger("reset");
    })

    $('#search_campus').keyup(function () {
        var search = $('#search_campus').val();
        if (search.length > 2) {
            searchcampus(search);
            create_page();
        }
        if ($('#search_campus').val().trim() == '') {
            array_areas = arrar_temp_buildig;
            searchcampus(search);
            create_page();
        }
    })

    $("#modal_delete_campus").click(function () {
        deletecampus()
    })

    $("#logout").click(function () {
        $.ajax({
            url: "/api/logout", type: "get", success: function () {
                location.reload();
            },
        });
    })

})
;

function create_page() {
    $("#cards_content_areas").pagination({
        dataSource: array_areas,
        pageSize: newSize,
        showPageNumbers: true,
        showNavigator: true,
        totalPage: true,
        callback: function (data, pagination) {
            $("#cards_content_areas").empty();
            data.forEach(function (item) {
                let isoDateString = item.createdAt;
                let date = new Date(isoDateString);
                let formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
                $("#cards_content_areas").append(`<div class='cards-content-module'>
  <div class='content-display-module-cards'>
      <div >
          <div id='btn_edit_users'>
              <div>
                  <div class='d-flex justify-content-start'>
                      <div id='content-btn-edit'>
                          <div class="img-user-traza">
                         <i class="fa-solid fa-location-dot"></i>
                          </div>
                      </div>
                      <label class='label-spna-font'>
                          <label class='label-spna-font'><i class="fa-solid fa-areas"></i> ${item.Name}</label>
                          <BR>
                             <label class='styles-cards-font'> <i class="fa-solid fa-arrow-up-small-big"></i> ${item.typesArea.Name} </label>
                              <BR>
                             <label class='styles-cards-font'> <i class="fa-solid fa-file"></i> ${item.Description} </label>
                      <br>
                  </div>
              </div>
          </div>
      </div>
      <div id='user_data_personal_staff' >
          <div>
              <label class='styles-cards-font'><i class="fa-solid fa-building"></i> Edificio: ${item.Building}</label>
              <BR>
              <label class='styles-cards-font'><i class="fa-solid fa-elevator"></i> Piso ${item.Floornumber}</label>
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
                  <a type class='btn-edit-areas cursor-pointer-styles' data-index="${item.Id}">
                      <i class="fas fa-pencil-alt">
                      </i> Editar</a>
                  <a data-index="${item.Id}"class='ps-delete-btn cursor-pointer-styles'>
                      <i class="fa-solid fa-trash-can"></i> Eliminar</a>
                      <a data-index="${item.Id}" data-name="${item.Name}" class='ps-space-btn cursor-pointer-styles'>
                      <i class="fa-solid fa-layer-group"></i> Revisar Espacio</a>

              </div>
          </div>
      </div>
  </div>
</div>`);

            });
        },
    });

    totalPages = $("#cards_content_areas").pagination("getTotalPage");
    $("#paginacion_all").html(totalPages);
    totapa = totalPages;
    contpage=1;
    $("#input_pagination").val(contpage + "")
}

function chageareas() {
    $.ajax({
        url: "/api/area/building/" + id_building, type: "get", beforeSend: function (xhr) {
            carga()
        }, success: function (response) {
            arrar_temp_buildig = getAllAreas(response);
        }, error: function (xhr, status, error) {

        }
    });
}


function searchcampus(search) {
    $.ajax({
        url: "/api/Area/search", type: "post", data: {
            search: search,
            Id:id_building
        }, success: function (response) {
            array_areas = getAllAreas(response);
            create_page();
        }, error: function (error) {
            console.log(error)
        }
    });
}

function consult_areas(action) {
    $.ajax({
        url: "/api/area/" + indextemp, type: "get", success: function (response) {
            array_areas_update = response;
            switch (action) {
                case "update":
                    fill_inputup_date()
                    break;
            }
        },
    });
}

function fill_inputup_date() {
    $("#input_update_areas_name").val(array_areas_update.Name);
    $("#input_update_areas_floor").val(array_areas_update.floor.Floornumber);
    $("#description_update_areas").val(array_areas_update.Description);
    $('input[name="update_typearea"][value="' + array_areas_update.typesAreaId + '"]').prop('checked', true);

}

function deletecampus() {
    $.ajax({
        url: "/api/campus/" + indextemp, type: "delete", success: function (response) {
        },
    });
}

function carga() {
    if (cargar == 1) {
        $("#cards_content_users").html(`<div style="display:flex;justify-content:center;align-items:center">
                            <div style="height:100%;width:auto; display:flex;">
                                <div class="sk-cube-grid">
                                    <div class="sk-cube sk-cube1"></div>
                                    <div class="sk-cube sk-cube2"></div>
                                    <div class="sk-cube sk-cube3"></div>
                                    <div class="sk-cube sk-cube4"></div>
                                    <div class="sk-cube sk-cube5"></div>
                                    <div class="sk-cube sk-cube6"></div>
                                    <div class="sk-cube sk-cube7"></div>
                                    <div class="sk-cube sk-cube8"></div>
                                    <div class="sk-cube sk-cube9"></div>
                                </div>
                            </div>
                        </div>`)
        cargar = 12;
    }

}

function chagefloors(id, action) {
    switch (action) {
        case "update":
            $.ajax({
                url: "/api/floors/" + id, type: "get", success: function (response) {
                    let imprimi;
                    response.forEach(function (opcion) {

                        imprimi += `<option value=${opcion.Id}>${opcion.Floornumber}</option>`;
                    });
                    $("#input_update_areas_floor").html(`<option  selected disabled></option>`);
                    $("#input_update_areas_floor").append(imprimi)
                }, error: function (error) {
                    console.log(error)
                }
            });
            $.ajax({
                url: "/api/TypesArea",
                type: "get",
                success: function (response) {
                    roles = response;
                    imprimi = ""
                    roles.forEach(function (opcion) {
                        imprimi += `<div class="new-rol">
                                    <div>
                                        <input type="radio" name="update_typearea" class="form-check-input" value="${opcion.Id}"class="input_update_users_rol"><label for="">${opcion.Name}</label>
                                    </div>
                                    <button><i class="fa-solid fa-bullseye"></i></button>
                                </div>
                                `;
                    });
                    $("#update-conatiner-tipes-areas").html(imprimi)
                },
                error: function (xhr, status, error) {

                }
            });
            break;
        default:
            $.ajax({
                url: "/api/floors/" + id, type: "get", success: function (response) {
                    let imprimi;
                    response.forEach(function (opcion) {

                        imprimi += `<option value=${opcion.Id}>${opcion.Floornumber}</option>`;
                    });
                    $("#input_new_areas_floor").html(`<option  selected disabled></option>`);
                    $("#input_new_areas_floor").append(imprimi)
                }, error: function (error) {
                    console.log(error)
                }
            });
            $.ajax({
                url: "/api/TypesArea",
                type: "get",
                success: function (response) {
                    roles = response;
                    imprimi = ""
                    roles.forEach(function (opcion) {
                        imprimi += `<div class="new-rol">
                                    <div>
                                        <input type="radio" name="new_typearea" class="form-check-input" value="${opcion.Id}"class="input_update_users_rol"><label for="">${opcion.Name}</label>
                                    </div>
                                    <button><i class="fa-solid fa-bullseye"></i></button>
                                </div>
                                `;
                    });
                    $("#new-conatiner-tipes-areas").html(imprimi)
                },
                error: function (xhr, status, error) {

                }
            });
            break;
    }
}

function getAllAreas(json) {
    const areas = [];
    if (json.floors) {
        json.floors.forEach(function (opcions) {
            opcions.areas.forEach(function (opcion) {
                var nuevoObjeto = {
                    "Floornumber": opcions.Floornumber,
                    "Id": opcion.Id,
                    "Name": opcion.Name,
                    "Description": opcion.Description,
                    "createdAt": opcion.createdAt,
                    "typesArea": opcion.typesArea,
                    "Building": json.Name,
                    "user":opcion.user
                };
                areas.push(nuevoObjeto);
            })

        });
    }
    json = areas;
    return json;
}

function createtypesarea() {
    var description=$("#input_new_description_typeareas").val();
    var name=$("#input_new_name_typeareas").val()
    $.ajax({
        url: "/api/TypesArea",
        type: "post",
        data:{
            Description:description,
            Name:name
        },
        success: function (response) {
        },
        error: function (xhr, status, error) {

        }
    });
    chagefloors(id_building, action)
}