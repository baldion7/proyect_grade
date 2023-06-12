var array_building = [];
var copy_array_building = [];
var arrar_temp_buildig = [];
var array_floor = [];
var newSize = 5;
var totalPages = 0;
var contpage = 1;
var stopInterval = false;
var cD = 0;
var intervalcontinua;
var totapa;
var array_building_update = [];
var indextemp;
var cargar = 1;
var id_campus = 0;
$(document).ready(function () {
    id_campus = $("#id_campus").val()

    $("#menu_regionales").addClass("seccionmenusi");

    setTimeout(function () {
        var intervalinicial = setInterval(function () {
            chagebuilding();
            if (arrar_temp_buildig.length > 0) {
                copy_array_building = arrar_temp_buildig;
                array_building = arrar_temp_buildig;
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
            if (JSON.stringify(copy_array_building) === JSON.stringify(arrar_temp_buildig)) {
                chagebuilding(array_building);
            } else {
                array_building = arrar_temp_buildig;
                copy_array_building = array_building;
                if (array_building.length > 0) {
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

    newSize = parseInt($("#select_building").val());

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
        $("#display_update_building").hide();
        $("#display_new_building").hide();
        $("#display_building_view").hide();
        $("#content_building").show();
        $("#form_update_building").trigger("reset");
        $("#form_new_building").trigger("reset");
    });


    $(".btn-view-building").click(function () {
        $("#display_building_view").hide();
    });

    $(document).on("click", ".ps-delete-btn", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#delete_display_building").modal("show");
    });

    $(document).on("click", ".btn-view-building", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#content_building").hide();
        $("#display_building_view").show();
        let action = "view"
        consult_building(action)
    });

    $("#btn_new_building").click(function () {
        $("#display_new_building").show();
        $("#content_building").hide();
    });

    $(document).on("click", ".btn-edit-building", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#display_update_building").show();
        $("#content_building").hide();
        let action = "update"
        consult_building(action)
    });

    $(document).on("click", ".ps-new-floor-btn", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        floorget(indextemp);
        $("#modal_new_floor").modal("show");
    });

    $(document).on("click", ".ps-area-btn", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        $("#id_area").val(indextemp)
        indextemp = $(e.currentTarget).attr("data-name");
        $("#name_area").val(indextemp)
        $("#view_display_area").modal("show");
    });

    $("#select_building").on("change", function () {
        newSize = parseInt($("#select_building").val());
        create_page();
        $("#cards_content_building").pagination("refresh");
    });

    $("#modal_view_area").click( function () {
        $("#submitarea").click()
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
            $("#cards_content_building").pagination("go", pageNumber);
        } else if (!isNaN(pageNumber) && pageNumber > totalPages) {
            $("#cards_content_building").pagination("go", totalPages);
            $("#input_pagination").val(totalPages);
        } else if (!isNaN(pageNumber) && pageNumber <= 0) {
            $("#cards_content_building").pagination("go", 1);
            $("#input_pagination").val(1);
        }
    });

    $("#form_new_building").validate({
        rules: {
            name_building_new: {
                required: true, minlength: 3,
            }, Address_building_new: {
                required: true, minlength: 3,
            }, date_construction_new: {
                required: true, minlength: 3,
            }, description_new_building: {
                required: true,
            },
        }, errorElement: "span", submitHandler: function () {
            $("#modal_new_building").modal("show");
        },
    });
    $("#new_floor").validate({
        rules: {
            name_floor_new: {
                required: true, number: true, digits: true, checkFloorInArray: true
            }
        }, errorElement: "span", submitHandler: function () {
            new_floor(indextemp);
        },
    });

    $("#form_update_building").validate({
        rules: {
            name_building_update: {
                required: true, minlength: 3,
            }, Address_building_update: {
                required: true, minlength: 3,
            }, date_construction_update: {
                required: true, minlength: 3,
            }, description_update_building: {
                required: true,
            },
        }, errorElement: "span", submitHandler: function () {
            $("#modal_update_building").modal("show");
        },
    });

    $("#modal_create_building").click(function () {
        let Name = $("#input_new_building_name").val();
        let Addres = $("#input_new_building_Address").val();
        let Date = $("#date_construction_new").val();
        let Construction = $("#description_new_building").val();
        $.ajax({
            url: "/api/building", type: "post", data: {
                name: Name,
                address: Addres,
                description: Construction,
                dateconstruction: Date,
                campusId: id_campus
            }, success: function (respuesta) {
            }, error: function (error) {
                console.log(error)
            }

        });
        $(".btn-back-to").click()
    });

    $("#modal-edit-building").click(function () {
        let Name = $("#input_update_building_name").val();
        let Addres = $("#input_update_building_Address").val();
        let Date = $("#date_construction_update").val();
        let Construction = $("#description_update_building").val();
        $.ajax({
            url: "/api/building/" + array_building_update.Id, type: "patch", data: {
                name: Name,
                address: Addres,
                description: Construction,
                dateconstruction: Date,
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
            array_building = arrar_temp_buildig;
            searchcampus(search);
            create_page();
        }
    })

    $("#modal_delete_building").click(function () {
        deleteBuilding()
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
    $("#cards_content_building").pagination({
        dataSource: array_building,
        pageSize: newSize,
        showPageNumbers: true,
        showNavigator: true,
        totalPage: true,
        callback: function (data, pagination) {
            // Limpiar el contenido anterior
            $("#cards_content_building").empty();
            // Agregar el contenido de la página actual
            data.forEach(function (item) {
                let isoDateString = item.createdAt;
                let date = new Date(isoDateString);
                let formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
                let isoDateStringa = item.Dateconstruction;
                let datea = new Date(isoDateStringa);
                let formattedDatea = `${datea.getDate()}/${datea.getMonth() + 1}/${datea.getFullYear().toString().slice(-2)}`;
                $("#cards_content_building").append(`<div class='cards-content-module'>
  <div class='content-display-module-cards'>
      <div >
          <div id='btn_edit_users'>
              <div>
                  <div class='d-flex justify-content-start'>
                      <div id='content-btn-edit'>
                          <div class="img-user-traza">
                          <i class="fa-solid fa-building"></i>
                          </div>
                      </div>
                      <label class='label-spna-font'>
                          <label class='label-spna-font'><i class="fa-solid fa-building"></i> ${item.Name}</label>
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
              <label class='styles-cards-font'><i class="fa-solid fa-user"></i> ${item.user.Name} ${item.user.Lastname}</label>
              <label class='styles-cards-font'><i class="fa-regular fa-calendar-plus"></i> ${formattedDate}</label>
                
          </div>
      </div>                                              
          <div class='dropdown'>
              <button class='dropdown-btn'>
                  <img src='img/drop.png' >
              </button>
              <div class='dropdown-content'>
              <a type class='btn-view-building cursor-pointer-styles' data-index="${item.Id}">
              <i class="fa-solid fa-bullseye">
                      </i> Visualizar</a>
                  <a type class='btn-edit-building cursor-pointer-styles' data-index="${item.Id}">
                      <i class="fas fa-pencil-alt">
                      </i> Editar</a>
                  <a data-index="${item.Id}"class='ps-delete-btn cursor-pointer-styles'>
                      <i class="fa-solid fa-trash-can"></i> Eliminar</a>
                      <a data-index="${item.Id}"class='ps-new-floor-btn cursor-pointer-styles'>
                      <i class="fa-solid fa-plus"></i> Agregar piso</a>
                      <a data-index="${item.Id}" data-name="${item.Name}" class='ps-area-btn  cursor-pointer-styles'>
                      <i class="fa-solid fa-location-dot"></i> Revisar areas</a>
                      
              </div>
          </div>
      </div>
  </div>
</div>`);

            });
        },
    });
    totalPages = $("#cards_content_building").pagination("getTotalPage");
    $("#paginacion_all").html(totalPages);
    totapa = totalPages;
    contpage=1;
    $("#input_pagination").val(contpage + "")
}

function chagebuilding() {
    $.ajax({
        url: "/api/building/campus/" + id_campus, type: "get", beforeSend: function (xhr) {
            carga()
        }, success: function (response) {

            arrar_temp_buildig = response;
        }, error: function (xhr, status, error) {

        }
    });
}

function searchcampus(search) {
    $.ajax({
        url: "/api/search/building", type: "post", data: {
            search: search,
        }, success: function (response) {
            array_building = response;
            create_page();
        }, error: function (error) {
            console.log(error)
        }
    });
}

function consult_building(action) {
    $.ajax({
        url: "/api/building/" + indextemp, type: "get", success: function (response) {
            array_building_update = response;
            switch (action) {
                case "update":
                    fill_inputup_date()
                    break;
                default:
                    fill_view_building()
                    break;
            }
        },
    });
}

function fill_inputup_date() {
    $("#input_update_building_name").val(array_building_update.Name);
    $("#input_update_building_Address").val(array_building_update.Address);
    $("#date_construction_update").val(array_building_update.Dateconstruction);
    $("#description_update_building").val(array_building_update.Description);


}

function deleteBuilding() {
    $.ajax({
        url: "/api/building/" + indextemp, type: "delete", success: function (response) {
        },
    });
}

function fill_view_building() {
    let isoDateStringa = array_building_update.Dateconstruction;
    let datea = new Date(isoDateStringa);
    let formattedDatea = `${datea.getDate()}/${datea.getMonth() + 1}/${datea.getFullYear().toString().slice(-2)}`;
    $("#view-campus-name").html(array_building_update.Name);
    $("#view-campus-Address").html(`<label class='styles-cards-font'> <i class="fa-solid fa-location-dot"></i> Dirrecion: ${array_building_update.Address} </label>`);
    $("#view-campus-phone").html(` <label class='styles-cards-font'><i class="fa-solid fa-file"></i> ${array_building_update.Description}</label>`);
    $("#view-campus-email").html(`<label class='styles-cards-font'><i class="fa-solid fa-calendar-days"></i> Fecha de contrucion: <br>${formattedDatea}</label>`);

    let ruta = array_building_update.floors
    $(".roles-view-name").html(" ")
    ruta.sort(function (a, b) {
        return a.Floornumber - b.Floornumber;
    });
    ruta.forEach(function (item) {
        $(".roles-view-name").append(`
    <div class="buildins-view-campus">
      <label for="">Numero de piso ${item.Floornumber}</label>
    </div>
  `);
    });

    $("#view-campus-rol-date").html(array_building_update.updatedAt);
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

function new_floor(indextemp) {
    let numberfloor = $("#input_new_floor_name").val()
    $.ajax({
        url: "/api/floors", type: "post", data: {
            buildingid: indextemp,
            floornumber: numberfloor,

        }, success: function (respuesta) {
        }, error: function (error) {
            console.log(error)
        }

    });
    $("#modal_new_floor").modal("hide");
    $("#new_floor").trigger("reset");
}

function floorget(indextemp) {
    $.ajax({
        url: "/api/building/floors/" + indextemp,
        type: "get",
        success: function (respuesta) {
            array_floor = respuesta
        }, error: function (error) {
            console.log(error)
        }

    });
}