var array_space = [];
var copy_array_space = [];
var arrar_temp_space = [];
var array_floor = [];
var newSize = 5;
var totalPages = 0;
var contpage = 1;
var stopInterval = false;
var cD = 0;
var intervalcontinua;
var totapa;
var array_space_update = [];
var indextemp;
var cargar = 1;
var id_area = 0;
var classificationid = []
var classificationj = [];
var tipespace = [];
var area_data;
let action;
$(document).ready(function () {
    $("#menu_regionales").addClass("seccionmenusi");
    id_area = $("#id_area").val()
    areadata(id_area)
    setTimeout(function () {
        var intervalinicial = setInterval(function () {
            chagespace();
            if (arrar_temp_space.length > 0) {
                copy_array_space = arrar_temp_space;
                array_space = arrar_temp_space;
                create_page();
            }

            if (stopInterval) {

                clearInterval(intervalinicial);
            }

            if (arrar_temp_space = !null || arrar_temp_space > 0) {

                stopInterval = true;
            }
        }, 100);

        intervalcontinua = setInterval(function () {
            if (JSON.stringify(copy_array_space) === JSON.stringify(arrar_temp_space)) {
                chagespace();
            } else {
                array_space = arrar_temp_space;
                copy_array_space = array_space;
                if (array_space.length > 0) {
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

    newSize = parseInt($("#select_space").val());

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
    $.validator.addMethod("checkboxRequired", function (value, element) {
        return $('input[name="opciones[]"]:checked').length > 0;
    }, " ");
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
        $("#display_update_space").hide();
        $("#display_new_space").hide();
        $("#display_space_view").hide();
        $("#content_space").show();
        $("#form_update_space").trigger("reset");
        $("#form_new_space").trigger("reset");
    });


    $(".btn-view-space").click(function () {
        $("#display_space_view").hide();
    });

    $(document).on("click", ".ps-delete-btn", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#delete_display_space").modal("show");
    });

    $(document).on("click", ".ps-space-btn", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#id_space").val(indextemp)
        indextemp = $(e.currentTarget).attr("data-name");

        $("#name_space").val(indextemp)
        $("#view_display_space").modal("show")
    });

    $("#btn_new_space").click(function () {
        $("#display_new_space").show();
        $("#content_space").hide();
         action = "new"
        chagedate(id_area, action)
    });
    $("#modal_view_space").click(function () {
        $("#submitspace").click()
    })

    $(document).on("click", ".btn-edit-space", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
         action = "update"
        chagedate(id_area, action)
        consult_space(action)
        setTimeout(function() {
        $("#display_update_space").show();
        $("#content_space").hide();
        }, 100);
    });

    $("#select_space").on("change", function () {
        newSize = parseInt($("#select_space").val());
        create_page();
        $("#cards_content_space").pagination("refresh");
    });

    $(".new_type_space").click(function () {
        $("#modal_new_typespace").modal("show");
    })

    $("#btn-pagination-iz").on("click", function () {
        $("#cards_content_space").pagination("previous");
        $("#cards_content_space").pagination("refresh");
        if (contpage > 1) {
            contpage -= 1;
        }
        $("#input_pagination").val(contpage + "")
    });


    $("#btn-pagination-de").on("click", function () {
        $("#cards_content_space").pagination("next");
        $("#cards_content_space").pagination("refresh");
        if (contpage < totapa) {
            contpage += 1;
        }
        $("#input_pagination").val(contpage + "")
    });

    $("#input_pagination").on("change", function (event) {
        const pageNumber = parseInt($(this).val());
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
            $("#cards_content_space").pagination("go", pageNumber);
        } else if (!isNaN(pageNumber) && pageNumber > totalPages) {
            $("#cards_content_space").pagination("go", totalPages);
            $("#input_pagination").val(totalPages);
        } else if (!isNaN(pageNumber) && pageNumber <= 0) {
            $("#cards_content_space").pagination("go", 1);
            $("#input_pagination").val(1);
        }
    });

    $("#form_new_space").validate({
        rules: {
            new_name_space: {
                required: true, minlength: 1,
            }, personal_responsible_space_new: {
                required: true,
            }, new_typespace: {
                required: true,
            },"opciones[]": {
                checkboxRequired: true
            },

        }, errorElement: "span", submitHandler: function () {
            $("#modal_new_space").modal("show");
            addclassification()
        },
    });

    $("#form_update_space").validate({
        rules: {
            update_name_space: {
                required: true, minlength: 3,
            }, personal_responsible_space_update: {
                required: true,
            }, update_typespace: {
                required: true,
            },"opciones[]": {
            checkboxRequired: true
        },
        }, errorElement: "span", submitHandler: function () {
            addclassification()
            $("#modal_update_space").modal("show");

        },
    });
    $("#new_details").validate({
        rules: {
            name_typespace_new: {
                required: true,
            }, description_typespace_new: {
                required: true,
            },
        }, errorElement: "span", submitHandler: function () {
            $("#modal_new_typespace").modal("hide");
            createtypesspace()
        },
    });

    $("#modal_create_space").click(function () {
        let Name = $("#input_new_space_name").val();
        let personal = $("#input_new_personal").val();
        let typespace = $('input[name="new_typespace"]:checked').val();
        $.ajax({
            url: "/api/space", type: "post", data: {
                name: Name,
                Personnelresponsibleid: personal,
                typesspaceid: typespace,
                areaid: id_area
            }, success: function (respuesta) {
                createallowsclassification(respuesta)
            }, error: function (error) {
                console.log(error)
            }

        });
        $(".btn-back-to").click()
    });

    $("#modal-edit-space").click(function () {
        let Name = $("#input_update_space_name").val();
        let personal = $("#input_update_personal").val();
        let typespace = $('input[name="update_typespace"]:checked').val();
        $.ajax({
            url: "/api/space/" + array_space_update.Id, type: "patch", data: {
                name: Name,
                Personnelresponsibleid: personal,
                typesspaceid: typespace,
            }, success: function (respuesta) {
                deleteallowsclassification()
                createallowsclassification(array_space_update)
            }, error: function (error) {
                console.log(error)
            }

        });
        $(".btn-back-to").click()
    });

    $('#search_space').keyup(function () {
        var search = $('#search_space').val();
        if (search.length > 2) {
            searchcampus(search);
            create_page();
        }
        if ($('#search_space').val().trim() == '') {
            array_space = arrar_temp_space;
            searchcampus(search);
            create_page();
        }
    })

    $("#modal_delete_space").click(function () {
        deletecampus()
    })

    $("#logout").click(function () {
        $.ajax({
            url: "/api/logout", type: "get", success: function () {
                location.reload();
            },
        });
    })

    $("#btn_menu_Equipment").click(function () {
        window.location.replace('/equipment')
    })
    $(".new_classification").click(function () {
        window.location.replace('/classification')
    })
})
;

function create_page() {
    $("#cards_content_space").pagination({
        dataSource: array_space,
        pageSize: newSize,
        showPageNumbers: true,
        showNavigator: true,
        totalPage: true,
        callback: function (data, pagination) {
            $("#cards_content_space").empty();
            data.forEach(function (item) {
                let isoDateString = item.createdAt;
                let date = new Date(isoDateString);
                let formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
                $("#cards_content_space").append(`<div class='cards-content-module'>
  <div class='content-display-module-cards'>
      <div >
          <div id='btn_edit_users'>
              <div>
                  <div class='d-flex justify-content-start'>
                      <div id='content-btn-edit'>
                          <div class="img-user-traza">
                         <i class="fa-solid fa-layer-group"></i>
                          </div>
                      </div>
                      <label class='label-spna-font'>
                      <label class='label-spna-font'>Datos del espacio</label>
                        <br>
                             <label class='styles-cards-font'>Tipo de espacio: ${item.typesSpace.Name} </label>
                              <BR>
                             <label class='styles-cards-font'>Decsripcion: ${item.typesSpace.Description} </label>
                              <BR>
                              <label class='label-spna-font'>Personal responsable</label>
                              <br>
                             <label class='styles-cards-font'><i class="fa-solid fa-user"></i> ${item.PersonnelResponsible.Name} ${item.PersonnelResponsible.Lastname}</label>
                      <br>
                  </div>
              </div>
          </div>
      </div>
      <div id='user_data_personal_staff' >
          <div>
          <label class='label-spna-font'>Ubicacion del spacio</label>
                          <BR>
              <label class='styles-cards-font'><i class="fa-solid fa-area"></i> Edificio: ${item.area.Name}</label>
              <BR>
              <label class='styles-cards-font'><i class="fa-solid fa-elevator"></i> Piso ${item.area.floor.Floornumber}</label>
              <br>
               <label class='styles-cards-font'><i class="fa-solid fa-location-dot"></i> Area ${item.area.Name}</label>
               <br>
               <label class='styles-cards-font'><i class="fa-solid fa-layer-group"></i> Espacio ${item.Location}</label>
               
          </div>
      </div>
      <div id='user_data_rol' >
          <div>
              <label class='label-spna-font'>Datos de ingreso</label>
              <BR>
              <label class='styles-cards-font'><i class="fa-solid fa-user"></i> ${item.user.Name} ${item.user.Lastname}</label>
              <label class='styles-cards-font'><i class="fa-regular fa-calendar-plus"></i>${formattedDate}</label>
                
          </div>
      </div>                                              
          <div class='dropdown'>
              <button class='dropdown-btn'>
                  <img src='img/drop.png' >
              </button>
              <div class='dropdown-content'>
                  <a type class='btn-edit-space cursor-pointer-styles' data-index="${item.Id}">
                      <i class="fas fa-pencil-alt">
                      </i> Editar</a>
                  <a data-index="${item.Id}"class='ps-delete-btn cursor-pointer-styles'>
                      <i class="fa-solid fa-trash-can"></i> Eliminar</a>

              </div>
          </div>
      </div>
  </div>
</div>`);

            });
        },
    });

    totalPages = $("#cards_content_space").pagination("getTotalPage");
    $("#paginacion_all").html(totalPages);
    totapa = totalPages;
    contpage=1;
    $("#input_pagination").val(contpage + "")

}

function chagespace() {
    $.ajax({
        url: "/api/space/area/" + id_area, type: "get", beforeSend: function (xhr) {
            carga()
        }, success: function (response) {
            arrar_temp_space = response;
        }, error: function (xhr, status, error) {

        }
    });
}


function searchcampus(search) {
    $.ajax({
        url: "/api/space/search", type: "post", data: {
            search: search
        }, success: function (response) {
            array_space = response;
            create_page();
        }, error: function (xhr, status, error) {

        }
    });
}

function consult_space(action) {
    $.ajax({
        url: "/api/space/" + indextemp, type: "get", success: function (response) {
            array_space_update = response;
            switch (action) {
                case "update":
                    fill_inputup_date()
                    break;
            }
        },
    });
}

function fill_inputup_date() {
    $("#input_update_space_name").val(array_space_update.Location);
    $("#input_update_personal").val(array_space_update.PersonnelResponsibleId)
    $('input[name="update_typespace"][value="' + array_space_update.typesSpaceId + '"]').prop('checked', true);
    var ruta = array_space_update.allowsClassifications;
    ruta.forEach(function (value) {
        $("#details" + value.classificationId).prop("checked", true);
    });
}

function deletecampus() {
    $.ajax({
        url: "/api/space/" + indextemp, type: "delete", success: function (response) {
        }, error: function ( error) {
            console.log(error)
    }
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

function chagedate(id, action) {
    $("#update-conatiner-tipes-space").html("")
    $("#new-conatiner-tipes-space").html("")
    $("#new-conatiner-classification").html("")
    $("#update-conatiner-classification").html("")

    switch (action) {
        case "update":
            $.ajax({
                url: "/api/personnelresponsible/campus/" + area_data.floor.building.campusId,
                type: "get",
                success: function (response) {
                    let imprimi;
                    response.forEach(function (opcion) {

                        imprimi += `<option value=${opcion.Id}>${opcion.Name} ${opcion.Lastname}</option>`;
                    });
                    $("#input_update_personal").html(`<option  selected disabled></option>`);
                    $("#input_update_personal").append(imprimi)
                },
                error: function (error) {
                    console.log(error)
                }
            });
            $.ajax({
                url: "/api/TypesSpace",
                type: "get",
                success: function (response) {
                    roles = response;
                    imprimi = ""
                    roles.forEach(function (opcion) {
                        imprimi += `<div class="new-rol">
                                    <div>
                                        <input type="radio" name="update_typespace" class="form-check-input" value="${opcion.Id}"class="input_update_users_rol"><label for="">${opcion.Name}</label>
                                    </div>
                                    <button><i class="fa-solid fa-bullseye"></i></button>
                                </div>
                                `;
                    });
                    $("#update-conatiner-tipes-space").html(imprimi)
                },
                error: function (xhr, status, error) {

                }
            });
            $.ajax({
                url: "/api/classification",
                type: "get",
                success: function (response) {
                    roles = response;
                    imprimi = ""
                    roles.forEach(function (opcion) {
                        imprimi += `<div class="new-rol">
                                    <div>
                                    <input type="checkbox" name="opciones[]" class="form-check-input input_update_users_rol details${opcion.Id}" id="details${opcion.Id}" value="${opcion.Id}"><label for="">${opcion.Name}</label>
                                    </div>
                                    <button><i class="fa-solid fa-bullseye"></i></button>
                                </div>
                                `;
                        var nuevoObjeto = {
                            "Id": "details" + opcion.Id,
                        };
                        classificationj.push(nuevoObjeto)
                    });
                    $("#update-conatiner-classification").html(imprimi)
                },
                error: function (xhr, status, error) {

                }
            });
            break;
        default:
            $.ajax({
                url: "/api/personnelresponsible/campus/" + area_data.floor.building.campusId,
                type: "get",
                success: function (response) {
                    let imprimi;
                    response.forEach(function (opcion) {

                        imprimi += `<option value=${opcion.Id}>${opcion.Name} ${opcion.Lastname}</option>`;
                    });
                    $("#input_new_personal").html(`<option  selected disabled></option>`);
                    $("#input_new_personal").append(imprimi)
                },
                error: function (error) {
                    console.log(error)
                }
            });
            $.ajax({
                url: "/api/TypesSpace",
                type: "get",
                success: function (response) {
                    roles = response;
                    imprimi = ""
                    roles.forEach(function (opcion) {
                        imprimi += `<div class="new-rol">
                                    <div>
                                    <input type="radio" name="new_typespace" class="form-check-input input_update_users_rol "  value="${opcion.Id}"><label for="">${opcion.Name}</label>
                                    </div>
                                    <button><i class="fa-solid fa-bullseye"></i></button>
                                </div>
                                `;
                        var nuevoObjeto = {
                            "Id": "details" + opcion.Id,
                        };
                        tipespace.push(nuevoObjeto)
                    });
                    $("#new-conatiner-tipes-space").html(imprimi)
                },
                error: function (xhr, status, error) {

                }
            });
            $.ajax({
                url: "/api/classification",
                type: "get",
                success: function (response) {
                    roles = response;
                    imprimi = ""
                    roles.forEach(function (opcion) {
                        imprimi += `<div class="new-rol">
                                    <div>
                                    <input type="checkbox" name="opciones[]" class="form-check-input input_update_users_rol " id="details${opcion.Id}" value="${opcion.Id}"><label for="">${opcion.Name}</label>
                                    </div>
                                    <button><i class="fa-solid fa-bullseye"></i></button>
                                </div>
                                `;
                        var nuevoObjeto = {
                            "Id": "details" + opcion.Id,
                        };
                        classificationj.push(nuevoObjeto)
                    });
                    $("#new-conatiner-classification").html(imprimi)
                },
                error: function (xhr, status, error) {

                }
            });
            break;
    }
}

function addclassification() {
    classificationj.forEach(function (opcion) {
        var checkboxSeleccionado = $('#' + opcion.Id).prop('checked');
        if (checkboxSeleccionado) {
            var valorCheckbox = $('#' + opcion.Id).val();
            var nuevoObjeto = {
                "Idclassification": valorCheckbox
            };
            classificationid.push(nuevoObjeto);
        }
    })
    classificationid.sort(function (a, b) {
        return a.Iddetails - b.Iddetails;
    });

}

function createallowsclassification(respuesta) {
    classificationid = eliminarObjetosRepetidos(classificationid, "Idclassification");
    classificationid.forEach(function (opcion) {
        if (opcion.Idclassification != null) {
            $.ajax({
                url: "/api/allowsclassifications",
                type: "post",
                data: {
                    classificationid: opcion.Idclassification,
                    spaceid: respuesta.Id,
                },
                success: function (respuesta) {

                },
                error: function (error) {
                    console.log(error)
                }
            });

        }
    })
    classificationid = [];
}

function eliminarObjetosRepetidos(array, atributo) {
    return array.filter((objeto, indice, self) => {
        const valor = objeto[atributo];
        return self.findIndex((o) => o[atributo] === valor) === indice;
    });
}

function deleteallowsclassification() {
    $.ajax({
        url: "/api/allowsclassifications/" + array_space_update.Id, type: "delete", data: {}, success: function () {

        }, error: function (error) {
            console.log(error)
        }

    });
}

const areadata = (id) => {
    console.log(id)
    $.ajax({
        url: "/api/area/" + id, type: "get", beforeSend: function (xhr) {
        }, success: function (response) {
            area_data = response;
        }, error: function (xhr, status, error) {

        }
    });

}
function createtypesspace() {
    var description=$("#input_new_description_typespace").val();
    var name=$("#input_new_name_typespace").val()
    $.ajax({
        url: "/api/TypesSpace",
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
    chagedate(id_area, action)
}