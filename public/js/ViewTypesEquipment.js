var array_tipesequipment = [];
var copy_array_tipesequipment = [];
var arrar_temp_buildig = [];
var array_floor = [];
var newSize = 5;
var totalPages = 0;
var contpage = 1;
var stopInterval = false;
var cD = 0;
var intervalcontinua;
var totapa;
var array_tipesequipment_update = [];
var indextemp;
var cargar = 1;
var id_tipesequipment = 0;
var typesdetails = []
typesdetailsid=[]
$(document).ready(function () {
    id_tipesequipment = $("#id_tipesequipment").val()

    setTimeout(function () {
        var intervalinicial = setInterval(function () {
            chagetipesequipment();
            if (arrar_temp_buildig.length > 0) {
                copy_array_tipesequipment = arrar_temp_buildig;
                array_tipesequipment = arrar_temp_buildig;
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
            if (JSON.stringify(copy_array_tipesequipment) === JSON.stringify(arrar_temp_buildig)) {
                chagetipesequipment(array_tipesequipment);
            } else {
                array_tipesequipment = arrar_temp_buildig;
                copy_array_tipesequipment = array_tipesequipment;
                if (array_tipesequipment.length > 0) {
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

    newSize = parseInt($("#select_tipesequipment").val());

    $.validator.addMethod("checkboxRequired", function (value, element) {
        return $('input[name="opciones[]"]:checked').length > 0;
    }, "Selecciona al menos una opción");

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
        $("#display_update_tipesequipment").hide();
        $("#display_new_tipesequipment").hide();
        $("#display_tipesequipment_view").hide();
        $("#content_tipesequipment").show();
        $("#form_update_tipesequipment").trigger("reset");
        $("#form_new_tipesequipment").trigger("reset");
    });


    $(".btn-view-tipesequipment").click(function () {
        $("#display_tipesequipment_view").hide();
    });

    $(document).on("click", ".ps-delete-btn", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#delete_display_tipesequipment").modal("show");
    });

    $(document).on("click", ".btn-view-tipesequipment", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#content_tipesequipment").hide();
        $("#display_tipesequipment_view").show();
        let action = "view"
        consult_tipesequipment(action)
    });

    $("#btn_new_tipesequipment").click(function () {
        $("#display_new_tipesequipment").show();
        $("#content_tipesequipment").hide();
        detailsequipmen();
    });

    $(document).on("click", ".btn-edit-tipesequipment", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#display_update_tipesequipment").show();
        $("#content_tipesequipment").hide();
        let action = "update"
        detailsequipmen(action);
        consult_tipesequipment(action)
    });


    $("#select_tipesequipment").on("change", function () {
        newSize = parseInt($("#select_tipesequipment").val());
        create_page();
        $("#cards_content_tipesequipment").pagination("refresh");
    });


    $("#btn-pagination-iz").on("click", function () {
        $("#cards_content_tipesequipment").pagination("previous");
        $("#cards_content_tipesequipment").pagination("refresh");
        if (contpage > 1) {
            contpage -= 1;
        }
        $("#input_pagination").val(contpage + "")
    });

    $("#btn-pagination-de").on("click", function () {
        $("#cards_content_tipesequipment").pagination("next");
        $("#cards_content_tipesequipment").pagination("refresh");
        if (contpage < totapa) {
            contpage += 1;
        }
        $("#input_pagination").val(contpage + "")
    });

    $("#input_pagination").on("change", function (event) {
        const pageNumber = parseInt($(this).val());
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
            $("#cards_content_tipesequipment").pagination("go", pageNumber);
        } else if (!isNaN(pageNumber) && pageNumber > totalPages) {
            $("#cards_content_tipesequipment").pagination("go", totalPages);
            $("#input_pagination").val(totalPages);
        } else if (!isNaN(pageNumber) && pageNumber <= 0) {
            $("#cards_content_tipesequipment").pagination("go", 1);
            $("#input_pagination").val(1);
        }
    });

    $("#form_new_tipesequipment").validate({
        rules: {
            name_tipesequipment: {
                required: true,
            },
            description_new_tipesequipment: {
                required: true,
            },
            "opciones[]": {
                checkboxRequired: true
            }
        },
        errorPlacement: function (error, element) {
            if (element.is(":checkbox")) {
                error.appendTo(element.closest('form'));
            } else {
                error.insertAfter(element);
            }
        },
        errorLabelContainer: "#error-container",
        errorElement: "span",

        submitHandler: function () {
            $("#modal_new_tipesequipment").modal("show");
            addtypesdetails()
        },
    })


    $("#form_update_tipesequipment").validate({
        rules: {
            name_tipesequipment: {
                required: true,
            },
            description_update_tipesequipment: {
                required: true,
            },
            "opciones[]": {
                checkboxRequired: true
            }
        },
        errorPlacement: function (error, element) {
            if (element.is(":checkbox")) {
                error.appendTo(element.closest('form'));
            } else {
                error.insertAfter(element);
            }
        },
        errorLabelContainer: "#error-container",
        errorElement: "span",

        submitHandler: function () {
            $("#modal_update_tipesequipment").modal("show");
            addtypesdetails()
        },
    })

    $(".new_details_equipment").click(function () {
        $("#modal_new_details").modal("show");
    })

    $("#new_details").validate({
        rules: {
            description_details_new: {
                required: true, minlength: 3,
            }, name_details_new: {
                required: true, minlength: 3,
            },
        }, errorElement: "span", submitHandler: function () {
            new_details()

        },
    });

    $("#modal_create_tipesequipment").click(function () {
        let Name = $("#input_new_tipesequipment_name").val();
        let Description = $("#description_new_tipesequipment").val();
        $.ajax({
            url: "/api/TypesEquipment", type: "post", data: {
                name: Name,
                description: Description,
                classificationid: id_tipesequipment,
            }, success: function (respuesta) {
                createallowstypesdetails(respuesta)
            }, error: function (error) {
                console.log(error)
            }

        });
        $(".btn-back-to").click()
    });

    $("#modal-edit-tipesequipment").click(function () {
        let Name = $("#input_update_tipesequipment_name").val();
        let Description = $("#description_update_tipesequipment").val();
        $.ajax({
            url: "/api/TypesEquipment/" + array_tipesequipment_update.Id, type: "patch", data: {
                name: Name,
                description: Description,
            }, success: function () {
                deleteallowstypesdetails()
                createallowstypesdetails(array_tipesequipment_update)
            }, error: function (error) {
                console.log(error)
            }

        });
        $(".btn-back-to").click()
    });

    $('#search_tipesequipment').keyup(function () {
        var search = $('#search_tipesequipment').val();
        if (search.length > 2) {
            searchtipesequipment(search);
            create_page();
        }
        if ($('#search_tipesequipment').val().trim() == '') {
            array_tipesequipment = arrar_temp_buildig;
            searchtipesequipment(search);
            create_page();
        }
    })

    $("#modal_delete_tipesequipment").click(function () {
        deletetipesequipment()
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
})
;

function create_page() {
    $("#cards_content_tipesequipment").pagination({
        dataSource: array_tipesequipment,
        pageSize: newSize,
        showPageNumbers: true,
        showNavigator: true,
        totalPage: true,
        callback: function (data, pagination) {
            // Limpiar el contenido anterior
            $("#cards_content_tipesequipment").empty();
            // Agregar el contenido de la página actual
            data.forEach(function (item) {
                let isoDateString = item.createdAt;
                let date = new Date(isoDateString);
                let formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
                let isoDateStringa = item.Dateconstruction;
                let datea = new Date(isoDateStringa);
                let formattedDatea = `${datea.getDate()}/${datea.getMonth() + 1}/${datea.getFullYear().toString().slice(-2)}`;
                $("#cards_content_tipesequipment").append(`<div class='cards-content-module'>
  <div class='content-display-module-cards'>
      <div >
          <div id='btn_edit_users'>
              <div>
                  <div class='d-flex justify-content-start'>
                      <div id='content-btn-edit'>
                          <div class="img-user-traza">
                          <i class="fa-solid fa-arrow-up-short-wide"></i>
                          </div>
                      </div>
                      <label class='label-spna-font'>
                          <label class='label-spna-font'><i class="fa-solid fa-tipesequipment"></i> ${item.Name}</label>
                          <BR>
                             <label class='styles-cards-font'> <i class="fa-solid fa-location-dot"></i> ${item.Address} </label>
                      <br>
                  </div>
              </div>
          </div>
      </div>
      <div id='user_data_personal_staff' >
          <div>
              <label class='styles-cards-font'><i class="fa-solid fa-calendar-days"></i> Fecha de contrucion: <br>${formattedDatea}</label>
              <BR>
              <label class='styles-cards-font'><i class="fa-solid fa-file"></i> ${item.Description}</label>
          </div>
      </div>
      <div id='user_data_rol' >
          <div>
              <label class='label-spna-font'>Datos de ingreso</label>
              <BR>
              <label class='styles-cards-font'><i class="fa-solid fa-user"></i> {item.user.Name} {item.user.Lastname}</label>
              <label class='styles-cards-font'><i class="fa-regular fa-calendar-plus"></i> {formattedDate}</label>
                
          </div>
      </div>                                              
          <div class='dropdown'>
              <button class='dropdown-btn'>
                  <img src='img/drop.png' >
              </button>
              <div class='dropdown-content'>
              <a type class='btn-view-tipesequipment cursor-pointer-styles' data-index="${item.Id}">
              <i class="fa-solid fa-bullseye">
                      </i> Visualizar</a>
                  <a type class='btn-edit-tipesequipment cursor-pointer-styles' data-index="${item.Id}">
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
    totalPages = $("#cards_content_tipesequipment").pagination("getTotalPage");
    $("#paginacion_all").html(totalPages);
    totapa = totalPages;
}

function chagetipesequipment() {
    $.ajax({
        url: "/api/Classification/TypesEquipment/" + id_tipesequipment, type: "get", beforeSend: function (xhr) {
            carga()
        }, success: function (response) {

            arrar_temp_buildig = response;
        }, error: function (xhr, status, error) {

        }
    });
}

function searchtipesequipment(search) {
    $.ajax({
        url: "/api/tipesequipment/search", type: "post", data: {
            search: search
        }, success: function (response) {
            array_tipesequipment = response;
            create_page();
        }, error: function (xhr, status, error) {

        }
    });
}

function consult_tipesequipment(action) {
    $.ajax({
        url: "/api/TypesEquipment/" + indextemp, type: "get", success: function (response) {
            array_tipesequipment_update = response;
            switch (action) {
                case "update":
                    fill_inputup_date()
                    break;
                default:
                    fill_view_tipesequipment()
                    break;
            }
        },
    });
}

function fill_inputup_date() {
    $("#description_update_tipesequipment").val(array_tipesequipment_update.Description);
    $("#input_update_tipesequipment_name").val(array_tipesequipment_update.Name);
    var ruta=array_tipesequipment_update.allowstypesdetails;
    ruta.forEach(function(value) {
        $(".details" + value.typesDetailId).prop("checked", true);
    });

}

function deletetipesequipment() {
    $.ajax({
        url: "/api/tipesequipment/" + indextemp, type: "delete", success: function (response) {
        },
    });
}

function fill_view_tipesequipment() {
    let isoDateStringa = array_tipesequipment_update.Dateconstruction;
    let datea = new Date(isoDateStringa);
    let formattedDatea = `${datea.getDate()}/${datea.getMonth() + 1}/${datea.getFullYear().toString().slice(-2)}`;
    $("#view-tipesequipment-name").html(array_tipesequipment_update.Name);
    $("#view-tipesequipment-Address").html(`<label class='styles-cards-font'> <i class="fa-solid fa-location-dot"></i> Dirrecion: ${array_tipesequipment_update.Address} </label>`);
    $("#view-tipesequipment-phone").html(` <label class='styles-cards-font'><i class="fa-solid fa-file"></i> ${array_tipesequipment_update.Description}</label>`);
    $("#view-tipesequipment-email").html(`<label class='styles-cards-font'><i class="fa-solid fa-calendar-days"></i> Fecha de contrucion: <br>${formattedDatea}</label>`);

    let ruta = array_tipesequipment_update.floors
    $(".roles-view-name").html(" ")
    ruta.sort(function (a, b) {
        return a.Floornumber - b.Floornumber;
    });
    ruta.forEach(function (item) {
        $(".roles-view-name").append(`
    <div class="buildins-view-tipesequipment">
      <label for="">Numero de piso ${item.Floornumber}</label>
    </div>
  `);
    });

    $("#view-tipesequipment-rol-date").html(array_tipesequipment_update.updatedAt);
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

function detailsequipmen(action) {
            $("#container-rol-existent-div").html(" ")
            $("#container-rol-existent-div-update").html(" ")
    switch (action) {
        case "update":
            $.ajax({
                url: "/api/typesDetails",
                type: "get",
                success: function (response) {
                    details = response;
                    imprimi = ""
                    details.forEach(function (opcion) {
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
                        typesdetails.push(nuevoObjeto);

                    });
                    $("#container-rol-existent-div-update").html(imprimi)
                },
                error: function (xhr, status, error) {

                }
            });
            break;
        default:
            $.ajax({
                url: "/api/typesDetails",
                type: "get",
                success: function (response) {
                    details = response;
                    imprimi = ""
                    details.forEach(function (opcion) {
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
                        typesdetails.push(nuevoObjeto);

                    });
                    $("#container-rol-existent-div").html(imprimi)
                },
                error: function (xhr, status, error) {

                }
            });
            break;
    }
}

function addtypesdetails() {
    typesdetails.forEach(function (opcion) {
        var checkboxSeleccionado = $('#' + opcion.Id).prop('checked');
        if (checkboxSeleccionado) {
            var valorCheckbox = $('#' + opcion.Id).val();
            var nuevoObjeto = {
                "Iddetails": valorCheckbox
            };
            typesdetailsid.push(nuevoObjeto);
        }
    })
    typesdetailsid.sort(function(a, b) {
        return a.Iddetails - b.Iddetails;
    });

}

function createallowstypesdetails(respuesta) {
    typesdetailsid.forEach(function (opcion) {
        if (opcion.Iddetails != null) {
            $.ajax({
                url: "/api/allowstypesdetails",
                type: "post",
                data: {
                    Typesequipmentid: respuesta.Id,
                    Typesdetailid: opcion.Iddetails,
                },
                success: function (respuesta) {

                },
                error: function (error) {
                    console.log(error)
                }
            });

        }
    })
    typesdetailsid=null;
}

function  new_details() {
    let name =$("#input_new_name_details").val();
    let description =$("#input_new_description_details").val();
    $.ajax({
        url: "/api/typesDetails", type: "post", data: {
            Name: name,
            Description: description,

        }, success: function () {
            $("#modal_new_details").modal("hide");
            $("#new_details").trigger("reset");
            detailsequipmen()
        }, error: function (error) {
            console.log(error)
        }

    });

}

function deleteallowstypesdetails() {
    $.ajax({
        url: "/api/allowstypesdetails/"+array_tipesequipment_update.Id, type: "delete", data: {

        }, success: function () {

        }, error: function (error) {
            console.log(error)
        }

    });
}