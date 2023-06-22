var array_classification = [];
var copy_array_classification = [];
var arrar_temp_classification = [];
var array_floor = [];
var newSize = 5;
var totalPages = 0;
var contpage = 1;
var stopInterval = false;
var cD = 0;
var intervalcontinua;
var totapa;
var array_classification_update = [];
var indextemp;
var cargar = 1;
var id_campus = 0;
$(document).ready(function () {
    id_campus = $("#id_campus").val()
    $("#menu_classification").addClass("seccionmenusi");
    setTimeout(function () {
        var intervalinicial = setInterval(function () {
            chageclassification();
            if (arrar_temp_classification.length > 0) {
                copy_array_classification = arrar_temp_classification;
                array_classification = arrar_temp_classification;
                create_page();
            }

            if (stopInterval) {

                clearInterval(intervalinicial);
            }

            if (arrar_temp_classification = !null || arrar_temp_classification > 0) {

                stopInterval = true;
            }
        }, 100);

        intervalcontinua = setInterval(function () {
            if (JSON.stringify(copy_array_classification) === JSON.stringify(arrar_temp_classification)) {
                chageclassification(array_classification);
            } else {
                array_classification = arrar_temp_classification;
                copy_array_classification = array_classification;
                if (array_classification.length > 0) {
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

    newSize = parseInt($("#select_classification").val());

    $.validator.addMethod('checkFloorInArray', function(value) {
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
        $("#display_update_classification").hide();
        $("#display_new_classification").hide();
        $("#display_classification_view").hide();
        $("#content_classification").show();
        $("#form_update_classification").trigger("reset");
        $("#form_new_classification").trigger("reset");
    });

    $("#modal_view_typesequipment").click( function () {

        $("#submitypesequipment").click()
    })
    $(".btn-view-classification").click(function () {
        $("#display_classification_view").hide();
    });

    $(document).on("click", ".ps-delete-btn", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#delete_display_classification").modal("show");
    });


    $("#btn_new_classification").click(function () {
        $("#display_new_classification").show();
        $("#content_classification").hide();
    });

    $(document).on("click", ".btn-edit-classification", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#display_update_classification").show();
        $("#content_classification").hide();
        let action = "update"
        consult_classification(action)
    });

    $(document).on("click", ".ps-new-typesepquipment-btn", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#id_typesequipment").val(indextemp)
        $("#view_display_typesequipment").modal("show");
    });

    $("#select_classification").on("change", function () {
        newSize = parseInt($("#select_classification").val());
        create_page();
        $("#cards_content_classification").pagination("refresh");
    });

    $("#btn-pagination-iz").on("click", function () {
        $("#cards_content_campus").pagination("previous");
        $("#cards_content_campus").pagination("refresh");
        if (contpage > 1) {
            contpage -= 1;
        }
        $("#input_pagination").val(contpage + "")
    });

    $("#btn-pagination-de").on("click", function () {
        $("#cards_content_campus").pagination("next");
        $("#cards_content_campus").pagination("refresh");
        if (contpage < totapa) {
            contpage += 1;
        }
        $("#input_pagination").val(contpage + "")
    });

    $("#input_pagination").on("change", function (event) {
        const pageNumber = parseInt($(this).val());
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
            $("#cards_content_classification").pagination("go", pageNumber);
        } else if (!isNaN(pageNumber) && pageNumber > totalPages) {
            $("#cards_content_classification").pagination("go", totalPages);
            $("#input_pagination").val(totalPages);
        } else if (!isNaN(pageNumber) && pageNumber <= 0) {
            $("#cards_content_classification").pagination("go", 1);
            $("#input_pagination").val(1);
        }
    });

    $("#form_new_classification").validate({
        rules: {
            name_classification_new: {
                required: true, minlength: 3,
            }, description_new_classification: {
                required: true, minlength: 3,
            },
        }, errorElement: "span", submitHandler: function () {
            $("#modal_new_classification").modal("show");
        },
    });

    $("#form_update_classification").validate({
        rules: {
            name_classification_update: {
                required: true, minlength: 3,
            }, Address_classification_update: {
                required: true, minlength: 3,
            }, date_construction_update: {
                required: true, minlength: 3,
            },
        }, errorElement: "span", submitHandler: function () {
            $("#modal_update_classification").modal("show");
        },
    });

    $("#modal_create_classification").click(function () {
        let Name = $("#input_new_classification_name").val();
        let Description = $("#description_new_classification").val();
        $.ajax({
            url: "/api/classification", type: "post", data: {
                name: Name,
                descripcion: Description,
            }, success: function (respuesta) {
            }, error: function (error) {
                console.log(error)
            }

        });
        $(".btn-back-to").click()
    });

    $("#modal-edit-classification").click(function () {
        let Name = $("#input_update_classification_name").val();
        let Description = $("#description_update_classification").val();
        $.ajax({
            url: "/api/classification/" + array_classification_update.Id, type: "patch", data: {
                name: Name,
                descripcion: Description,
            }, success: function (respuesta) {
            }, error: function (error) {
                console.log(error)
            }

        });
        $(".btn-back-to").click()
    });

    $('#search_classification').keyup(function () {
        var search = $('#search_classification').val();
        if (search.length > 2) {
            searchcampus(search);
            create_page();
        }
        if ($('#search_classification').val().trim() == '') {
            array_classification = arrar_temp_classification;
            searchcampus(search);
            create_page();
        }
    })

    $("#modal_delete_classification").click(function () {
        deleteclassifications()
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
    $("#cards_content_classification").pagination({
        dataSource: array_classification,
        pageSize: newSize,
        showPageNumbers: true,
        showNavigator: true,
        totalPage: true,
        callback: function (data, pagination) {
            // Limpiar el contenido anterior
            $("#cards_content_classification").empty();
            // Agregar el contenido de la página actual
            data.forEach(function (item) {
                let isoDateString = item.createdAt;
                let date = new Date(isoDateString);
                let formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
                let isoDateStringa = item.Dateconstruction;
                let datea = new Date(isoDateStringa);
                let formattedDatea = `${datea.getDate()}/${datea.getMonth() + 1}/${datea.getFullYear().toString().slice(-2)}`;
                $("#cards_content_classification").append(`<div class='cards-content-module'>
  <div class='content-display-module-cards-3-colums'>
      <div >
          <div id='btn_edit_users'>
              <div>
                  <div class='d-flex justify-content-start'>
                      <div id='content-btn-edit'>
                          <div class="img-user-traza">
                          <i class="fa-solid fa-arrow-up-wide-short"></i>
                          </div>
                      </div>
                      <label class='label-spna-font'>
                          <label class='label-spna-font'><i class="fa-solid fa-arrow-up-wide-short"></i> ${item.Name}</label>
                          <BR>
                             <label class='styles-cards-font'><i class="fa-solid fa-file"></i> ${item.Description}</label>
                             <br>
                  </div>
              </div>
          </div>
      </div>
      <div id='user_data_rol' >
          <div>
              <label class='label-spna-font'>Fecha de creacion</label>
              <br>
              <label class='styles-cards-font'><i class="fa-regular fa-calendar-plus"></i> ${formattedDate}</label>
                
          </div>
      </div>                                              
          <div class='dropdown'>
              <button class='dropdown-btn'>
                  <img src='img/drop.png' >
              </button>
              <div class='dropdown-content'>
                  <a type class='btn-edit-classification cursor-pointer-styles' data-index="${item.Id}">
                      <i class="fas fa-pencil-alt">
                      </i> Editar</a>
                  <a data-index="${item.Id}"class='ps-delete-btn cursor-pointer-styles'>
                      <i class="fa-solid fa-trash-can"></i> Eliminar</a>
                      <a data-index="${item.Id}"class='ps-new-typesepquipment-btn cursor-pointer-styles'>
                     <i class="fa-solid fa-arrow-up-short-wide"></i> Categorias</a>
                      
              </div>
          </div>
      </div>
  </div>
</div>`);

            });
        },
    });
    totalPages = $("#cards_content_classification").pagination("getTotalPage");
    $("#paginacion_all").html(totalPages);
    totapa = totalPages;
    contpage=1;
    $("#input_pagination").val(contpage + "")
}

function chageclassification() {
    $.ajax({
        url: "/api/classification" , type: "get", beforeSend: function (xhr) {
            carga()
        }, success: function (response) {

            arrar_temp_classification = response;
        }, error: function (xhr, status, error) {

        }
    });
}

function searchcampus(search) {
    $.ajax({
        url: "/api/classification/search", type: "post", data: {
            search: search
        }, success: function (response) {
            array_classification = response;
            create_page();
        }, error: function (xhr, status, error) {

        }
    });
}

function consult_classification(action) {
    $.ajax({
        url: "/api/classification/" + indextemp, type: "get", success: function (response) {
            array_classification_update = response;
            switch (action) {
                case "update":
                    fill_inputup_date()
                    break;

            }
        },
    });
}

function fill_inputup_date() {
    console.log(array_classification_update)
    $("#input_update_classification_name").val(array_classification_update.Name);
    $("#description_update_classification").val(array_classification_update.Description);


}

function deleteclassifications() {
    $.ajax({
        url: "/api/classification/" + indextemp, type: "delete", success: function (response) {
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
