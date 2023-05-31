var array_campus = [];
var copy_array_campus = [];
var arrar_temp_campus = [];
var newSize = 5;
var totalPages = 0;
var contpage = 1;
var stopInterval = false;
var cD = 0;
var intervalcontinua;
var totapa;
var array_campus_update = [];
var indextemp;
var cargar = 1;
$(document).ready(function () {
    //var currentURL = window.location.pathname;
    //var id = currentURL.split('/').pop();
    //console.log(id)

    setTimeout(function () {
        var intervalinicial = setInterval(function () {
            chagecampus();
            if (arrar_temp_campus.length > 0) {
                copy_array_campus = arrar_temp_campus;
                array_campus = arrar_temp_campus;
                create_page();
            }

            if (stopInterval) {

                clearInterval(intervalinicial);
            }

            if (arrar_temp_campus = !null || arrar_temp_campus > 0) {

                stopInterval = true;
            }
        }, 100);

        intervalcontinua = setInterval(function () {
            if (JSON.stringify(copy_array_campus) === JSON.stringify(arrar_temp_campus)) {
                chagecampus(array_campus);
            } else {
                array_campus = arrar_temp_campus;
                copy_array_campus = array_campus;
                if (array_campus.length > 0) {
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

    newSize = parseInt($("#select_campus").val());

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
        $("#display_update_campus").hide();
        $("#display_new_campus").hide();
        $("#display_campus_view").hide();
        $("#content_campus").show();
        $("#form_update_campus").trigger("reset");
        $("#form_new_campus").trigger("reset");
    });


    $(".btn-view-campus").click(function () {
        $("#display_campus_view").hide();
    });

    $(document).on("click", ".ps-delete-btn", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#delete_display_campus").modal("show");
    });

    $(document).on("click", ".btn-view-campus", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#content_campus").hide();
        $("#display_campus_view").show();
        let action = "view"
        consult_campus(action)
    });

    $("#btn_new_campus").click(function () {
        $("#display_new_campus").show();
        $("#content_campus").hide();
    });

    $(document).on("click", ".btn-edit-campus", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#display_update_campus").show();
        $("#content_campus").hide();
        let action = "update"
        consult_campus(action)
    });

    $(document).on("click", ".ps-building-btn", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#id_building").val(indextemp)
        console.log($("#id_building").val())
        $("#view_display_building").modal("show");
    });

    $("#select_campus").on("change", function () {
        newSize = parseInt($("#select_campus").val());
        create_page();
        $("#cards_content_campus").pagination("refresh");
    });

    $("#modal_view_building").click( function () {

        $("#submitbuilding").click()
    })

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
            $("#cards_content_campus").pagination("go", pageNumber);
        } else if (!isNaN(pageNumber) && pageNumber > totalPages) {
            $("#cards_content_campus").pagination("go", totalPages);
            $("#input_pagination").val(totalPages);
        } else if (!isNaN(pageNumber) && pageNumber <= 0) {
            $("#cards_content_campus").pagination("go", 1);
            $("#input_pagination").val(1);
        }
    });

    $("#form_new_campus").validate({
        rules: {
            name_campus_new: {
                required: true, minlength: 3,
            }, Address_campus_new: {
                required: true, minlength: 3,
            }, Email_campus_new: {
                required: true, minlength: 3, email: true

            }, Phone_campus_new: {
                required: true, minlength: 10, number: true, digits: true,
            }, Schedules_new_campus: {
                required: true,
            },
        }, errorElement: "span", submitHandler: function () {
            $("#modal_new_campus").modal("show");
        },
    });

    $("#form_update_campus").validate({
        rules: {
            name_campus_update: {
                required: true, minlength: 3,
            }, Address_campus_update: {
                required: true, minlength: 3,
            }, Email_campus_update: {
                required: true, minlength: 3, email: true

            }, Phone_campus_update: {
                required: true, minlength: 10, number: true, digits: true,
            }, Schedules_update_campus: {
                required: true,
            },
        }, errorElement: "span", submitHandler: function () {
            $("#modal_update_campus").modal("show");
        },
    });

    $("#modal_create_campus").click(function () {
        let Name = $("#input_new_campus_name").val();
        let Addres = $("#input_new_campus_Address").val();
        let Email = $("#input_new_campus_Email").val();
        let Phone = $("#input_new_users_Phone").val();
        let Schedules = $("#Schedules_new_campus").val();

        $.ajax({
            url: "/api/campus", type: "post", data: {
                name: Name, address: Addres, email: Email, phone: Phone, schedules: Schedules, utid: 1
            }, success: function (respuesta) {
            }, error: function (error) {
                console.log(error)
            }

        });
        $(".btn-back-to").click()
    });

    $("#modal-edit-campus").click(function () {
        let Name = $("#input_update_campus_name").val();
        let Addres = $("#input_update_campus_Address").val();
        let Email = $("#input_update_campus_Email").val();
        let Phone = $("#input_update_users_Phone").val();
        let Schedules = $("#Schedules_update_campus").val();
        $.ajax({
            url: "/api/campus/" + array_campus_update.Id, type: "patch", data: {
                name: Name, address: Addres, email: Email, phone: Phone, schedules: Schedules,
            }, success: function (respuesta) {

            }, error: function (error) {
                console.log(error)
            }
        });
        $(".btn-back-to").click()
    });


    $('#search_campus').keyup(function () {
        var search = $('#search_campus').val();
        if (search.length > 2) {
            searchcampus(search);
            create_page();
        }
        if ($('#search_campus').val().trim() == '') {
            array_campus = arrar_temp_campus;
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

    $("#btn_menu_Equipment").click(function () {
        window.location.replace('/equipment')
    })
});

function create_page() {
    $("#cards_content_campus").pagination({
        dataSource: array_campus,
        pageSize: newSize,
        showPageNumbers: true,
        showNavigator: true,
        totalPage: true,
        callback: function (data, pagination) {
            // Limpiar el contenido anterior
            $("#cards_content_campus").empty();
            // Agregar el contenido de la página actual
            data.forEach(function (item) {
                let isoDateString = item.createdAt;
                let date = new Date(isoDateString);
                console.log(item.typesEquipment)
                let formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
                $("#cards_content_campus").append(`<div class='cards-content-module'>
  <div class='content-display-module-cards'>
      <div >
          <div id='btn_edit_users'>
              <div>
                  <div class='d-flex justify-content-start'>
                      <div id='content-btn-edit'>
                          <div class="img-user-traza">
                          <i class="fa-solid fa-building-columns"></i>
                          </div>
                      </div>
                      <label class='label-spna-font'>
                          <label class='label-spna-font'><i class="fa-solid fa-building-columns"></i> ${item.Name}</label>
                          <BR>
                             <label class='styles-cards-font'> <i class="fa-solid fa-location-dot"></i> Dirrecion: ${item.Address} </label>
                      <br>
                  </div>
              </div>
          </div>
      </div>
      <div id='user_data_personal_staff' >
          <div>
              <label class='styles-cards-font'><i class="fa-solid fa-clock fa-spin-pulse"></i> ${item.Schedules}</label>
              <BR>
              <label class='styles-cards-font'><i class="fa-solid fa-envelope" ></i>  ${item.Email}</label>
              <br>
              <label class='styles-cards-font'><i class="fa-solid fa-mobile-screen icon-movilc-ampus" ></i>${item.Phone}</label>
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
              <a type class='btn-view-campus cursor-pointer-styles' data-index="${item.Id}">
              <i class="fa-solid fa-bullseye">
                      </i> Visualizar</a>
                  <a type class='btn-edit-campus cursor-pointer-styles' data-index="${item.Id}">
                      <i class="fas fa-pencil-alt">
                      </i> Editar</a>
                  <a data-index="${item.Id}"class='ps-delete-btn cursor-pointer-styles'>
                      <i class="fa-solid fa-trash-can"></i> Eliminar</a>
                      <a data-index="${item.Id}"class='ps-building-btn cursor-pointer-styles'>
                     <i class="fa-solid fa-building"></i> Edificios</a>
              </div>
          </div>
      </div>
  </div>
</div>`);

            });
        },
    });
    totalPages = $("#cards_content_campus").pagination("getTotalPage");
    $("#paginacion_all").html(totalPages);
    totapa = totalPages;
}

function chagecampus() {
    $.ajax({
        url: "/api/campus", type: "get", beforeSend: function (xhr) {
            carga()
        }, success: function (response) {
            arrar_temp_campus = response;
        }, error: function (xhr, status, error) {

        }
    });
}

function searchcampus(search) {
    $.ajax({
        url: "/api/campus/search", type: "post", data: {
            search: search
        }, success: function (response) {
            array_campus = response;
            create_page();
        }, error: function (xhr, status, error) {

        }
    });
}

function consult_campus(action) {
    $.ajax({
        url: "/api/campus/" + indextemp, type: "get", success: function (response) {
            array_campus_update = response;
            switch (action) {
                case "update":
                    fill_inputup_date()
                    break;
                default:
                    fill_view_campus()
                    break;
            }
        },
    });
}

function fill_inputup_date() {
    console.log(array_campus_update.Name)
    $("#input_update_campus_name").val(array_campus_update.Name);
    $("#input_update_campus_Address").val(array_campus_update.Address);
    $("#input_update_campus_Email").val(array_campus_update.Email);
    $("#input_update_users_Phone").val(array_campus_update.Phone);
    $("#Schedules_update_campus").val(array_campus_update.Schedules);

}

function deletecampus() {
    $.ajax({
        url: "/api/campus/" + indextemp, type: "delete", success: function (response) {
        },
    });
}

function fill_view_campus() {

    $("#view-campus-name").html(array_campus_update.Name);
    $("#view-campus-Address").html(`<label class='styles-cards-font'> <i class="fa-solid fa-location-dot"></i> Dirrecion: ${array_campus_update.Address} </label>`);
    $("#view-campus-phone").html(`<i class="fa-solid fa-mobile-screen" id="campus_data_personal_staff_icon_mobil"></i> ${array_campus_update.Phone}`);
    $("#view-campus-email").html(`<i class="fa-solid fa-envelope" id="campus_data_personal_staff_icon_envelope"></i> ${array_campus_update.Email}`);
    $("#view-campus-Schedules").html(`<i class="fa-solid fa-clock fa-spin-pulse" id="campus_data_personal_staff_icon_envelope"></i> ${array_campus_update.Schedules}`);
    let ruta = array_campus_update.buildings
    $(".roles-view-name").html(" ")
    ruta.forEach(function (item) {
        $(".roles-view-name").append(`
      <div class="buildins-view-campus">
    <label for="">Edificio ${item.Name} </label>
    <label for="">Pisos: ${item.floors} </label>
     </div>
     `);
})
    $("#view-campus-rol-date").html(array_campus_update.updatedAt);
}

function carga() {
    if (cargar == 1) {
        console.log("hola")
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


