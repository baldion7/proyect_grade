var array_users = [];
var copy_array_users = [];
var arrar_temp_users = [];
var newSize = 5;
var totalPages = 0;
var contpage = 1;
var stopInterval = false;
var cD = 0;
var intervalcontinua;
var totapa;
var array_users_update = [];
var indextemp;
var input_new_users_email;

$(document).ready(function() {
  consult_extra_new()
  var intervalinicial = setInterval(function() {
    chageuser();
    if (arrar_temp_users.length > 0) {
      copy_array_users = arrar_temp_users;
      array_users = arrar_temp_users;
      create_page();
    }

    if (stopInterval) {

      clearInterval(intervalinicial);
    }

    if (arrar_temp_users = !null || arrar_temp_users > 0) {

      stopInterval = true;
    }
  }, 100);

  intervalcontinua = setInterval(function() {
    if (JSON.stringify(copy_array_users) === JSON.stringify(arrar_temp_users)) {
      chageuser(array_users);
    } else {
      array_users = arrar_temp_users;
      copy_array_users = array_users;
      if (array_users.length > 0) {
        create_page();
      }

    }
  }, 100);

  $("#cogs").click(function() {
    if (cD == 0) {
      cD++;
      $(".display_content_modules").css({
        "margin-right": "0",
        "transition-duration": "2s"
      });
      $(".conteiner_form_users").css({
        "margin-right": " 15.313rem",
        "transition-duration": "2s"
      });
    } else {
      cD--;
      $(".display_content_modules").css({
        "margin-right": " 15.313rem"
      });
      $(".conteiner_form_users").css({
        "margin-right": " 0",
        "transition-duration": "2s"
      });
    }
  });

  newSize = parseInt($("#select_users").val());

  $('[data-toggle="tooltip"]').tooltip();

  $(document).on('click', '[data-toggle="tooltip"]', function() {
    $("#control_detail").modal("show");
  });

  $.validator.addMethod('validPassword', function(value, element) {
    return this.optional(element) || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
  }, 'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.');

  $.validator.addMethod('checkEmailInArray', function(value) {
    for (var i = 0; i < array_users.length; i++) {
      if (array_users[i].email === value) {
        return false;
      }
    }
    return true;
  }, 'Este correo electrónico ya está registrado.');

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
    maxlength: jQuery.validator.format(
        "Por favor, no escribas más de {0} caracteres."
    ),
    minlength: jQuery.validator.format(
        "Por favor, no escribas menos de {0} caracteres."
    ),
    rangelength: jQuery.validator.format(
        "Por favor, escribe un valor entre {0} y {1} caracteres."
    ),
    range: jQuery.validator.format(
        "Por favor, escribe un valor entre {0} y {1}."
    ),
    max: jQuery.validator.format(
        "Por favor, escribe un valor menor o igual a {0}."
    ),
    min: jQuery.validator.format(
        "Por favor, escribe un valor mayor o igual a {0}."
    ),
    validPassword: "La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.",
  });

  $(".btn-back-to").click(function() {
    $("#display_update_users").hide();
    $("#display_new_users").hide();
    $("#display_traceability").hide();
    $("#display_user_view").hide();
    $("#content_users").show();
    $("#form_update_users").trigger("reset");
    $("#form_new_users").trigger("reset");
  });


  $(".btn-view-user").click(function() {
    $("#display_user_view").hide();
  });

  $(document).on("click", ".ps-delete-btn", function(e) {
    indextemp = $(e.currentTarget).attr("data-index");
    $("#delete_display").modal("show");
  });

  $(document).on("click", ".btn-view-user", function(e) {
    indextemp = $(e.currentTarget).attr("data-index");
    $("#content_users").hide();
    $("#display_user_view").show();
    let action = "view"
    consult_user(action)
  });

  $("#btn_new_users").click(function() {
    $("#display_new_users").show();
    $("#content_users").hide();
  });

  $(document).on("click", ".btn-edit-user", function(e) {
    indextemp = $(e.currentTarget).attr("data-index");
    $("#display_update_users").show();
    $("#content_users").hide();
    let action = "update"
    consult_user(action)
  });

  $("#select_users").on("change", function() {
    newSize = parseInt($("#select_users").val());
    create_page();
    $("#cards_content_users").pagination("refresh");
  });

  $("#btn-pagination-iz").on("click", function() {
    $("#cards_content_users").pagination("previous");
    $("#cards_content_users").pagination("refresh");
    if (contpage > 1) {
      contpage -= 1;
    }
    $("#input_pagination").val(contpage + "")
  });

  $("#btn-pagination-de").on("click", function() {
    $("#cards_content_users").pagination("next");
    $("#cards_content_users").pagination("refresh");
    if (contpage < totapa) {
      contpage += 1;
    }
    $("#input_pagination").val(contpage + "")
  });

  $("#input_pagination").on("change", function(event) {
    const pageNumber = parseInt($(this).val());
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      $("#cards_content_users").pagination("go", pageNumber);
    } else if (!isNaN(pageNumber) && pageNumber > totalPages) {
      $("#cards_content_users").pagination("go", totalPages);
      $("#input_pagination").val(totalPages);
    } else if (!isNaN(pageNumber) && pageNumber <= 0) {
      $("#cards_content_users").pagination("go", 1);
      $("#input_pagination").val(1);
    }
  });

  $("#input_new_users_country").select2({
    width: "100%",
    templateResult: template_flags,
    templateSelection: template_flags,
  });

  $("#input_update_users_country").select2({
    width: "100%",
    templateResult: template_flags,
    templateSelection: template_flags,
  });

  $('#input_new_users_email').change(function() {
    input_new_users_email = $("#input_new_users_email").val();
  })

  $("#form_new_users").validate({
    rules: {
      name_user_new: {
        required: true,
        minlength: 3,
      },
      lastname_user_new: {
        required: true,
        minlength: 3,
      },
      document_user_new: {
        required: true,
      },
      document_number_user_new: {
        required: true,
        minlength: 10,
        number: true,
        digits: true,
      },
      country_user_new: {
        required: true,
      },
      number_phone_user_new: {
        required: true,
        minlength: 10,
        number: true,
        digits: true,
      },
      email_user_new: {
        required: true,
        email: true,
        checkEmailInArray: true,
      },
      charge_user_new: {
        required: true,
        minlength: 3,
      },
      area_user_new: {
        required: true,
      },
      rol_new_user: {
        required: true,
      },
      campus_user_new: {
        required: true,
      },

      password_user_new: {
        required: true,
        validPassword: true,
      },
      confirmpassword_user_new: {
        required: true,
        equalTo: '#input_new_users_password',
      },
    },
    errorElement: "span",
    submitHandler: function() {
      $("#modal_new_user").modal("show");
    },
  });

  $("#form_update_users").validate({
    rules: {
      name_user_update: {
        required: true,
        minlength: 3,
      },
      lastname_user_update: {
        required: true,
        minlength: 3,
      },
      document_user_update: {
        required: true,
      },
      document_number_user_update: {
        required: true,
        minlength: 10,
        number: true,
        digits: true,
      },
      country_user_update: {
        required: true,
      },
      number_phone_user_update: {
        required: true,
        minlength: 10,
        number: true,
        digits: true,
      },
      email_user_update: {
        required: true,
        email: true,
      },
      charge_user_update: {
        required: true,
        minlength: 3,
      },
      area_user_update: {
        required: true,
      },
      rol_update_user: {
        required: true,
      },
    },
    errorElement: "span",
    submitHandler: function() {
      $("#modal_update").modal("show");
    },
  });

  $("#modal_create_user").click(function() {
    let name_user = $("#input_new_users_name").val();
    let lastname = $("#input_new_users_lastname").val();
    let document_type = $("#input_new_users_document_type").val();
    let number_ducument = $("#input_new_users_number_ducument").val();
    let country = $("#input_new_users_country").val();
    let phone_number = $("#input_new_users_phone_number").val();
    let email = $("#input_new_users_email").val();
    let campus = $("#input_new_users_campus").val();
    let charge = $("#input_new_users_charge").val();
    let rol = $('input[name="rol_new_user"]:checked').val();
    console.log(rol)
    let password = $("#input_new_users_password").val();
    let confPassword = $("#input_new_users_confirmpassword").val();

    $.ajax({
      url: "/api/users",
      type: "post",
      data: {
        name: name_user,
        lastname: lastname,
        document_type: document_type,
        ducument: number_ducument,
        country: country,
        phone_number: phone_number,
        email: email,
        charge: charge,
        campus:campus,
        rol: rol,
        password: password,
        confPassword: confPassword
      },
      success: function(respuesta) {
      },
      error: function(error) {
        console.log(error)
      }

    });
    $(".btn-back-to").click()
  });

  $("#modal-edit").click(function() {
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
      url: "/api/users/" + array_users_update.Id,
      type: "patch",
      data: {
        name: name_user,
        lastname: lastname,
        document_type: document_type,
        ducument: number_ducument,
        country: country,
        phone_number: phone_number,
        email: email,
        charge: charge,
        rol: rol,
      },
      success: function(respuesta) {

      },
      error: function(error) {
        console.log(error)
      }
    });
    $(".btn-back-to").click()
  });

  $('#user_company_all').click(function() {
    $('.user-company').prop('checked', false)
    // updatePagination(filter,status_user_list)
  })

  $('#search_users').keyup(function() {
    var search = $('#search_users').val();
    if (search.length > 2) {
      searchuser(search);
      create_page();
    }
    if ($('#search_users').val().trim() == '') {
      array_users = arrar_temp_users;
      searchuser(search);
      create_page();
    }
  })

  $("#modal_delete_user").click(function() {
    deleteuser()
  })

  $("#logout").click(function() {
    $.ajax({
      url: "/api/logout",
      type: "get",
      success: function() {
        location.reload();
      },
    });
  })



  $("#btn_menu_Equipment").clik(function () {
    $.ajax({
      url: "/equipment",
      type: "get",
      success: function(response) {
        arrar_temp_users = response;
      },
      error: function(xhr, status, error) {

      }
    });
  })

});

function template_flags(country_flags) {
  if (!country_flags.id) {
    return country_flags.text;
  }
  var url_flags = "/img/flag";
  var $flag = $(
      `<span class="span-select2-document-type" ><img  src="${url_flags}/${country_flags.title}.png" style="width:5%;display: inline-block;border-radius:20%;margin-top: -0.2rem;margin-right: 0.5rem;" /> ${country_flags.text} </span>;`
  );
  return $flag;
}

function create_page() {
  $("#cards_content_users").pagination({
    dataSource: array_users,
    pageSize: newSize,
    showPageNumbers: true,
    showNavigator: true,
    totalPage: true,
    callback: function(data, pagination) {
      // Limpiar el contenido anterior
      $("#cards_content_users").empty();
      // Agregar el contenido de la página actual
      data.forEach(function(item) {
        $("#cards_content_users").append(`<div class='cards-content-module'>
  <div class='content-display-module-cards'>
      <div >
          <div id='btn_edit_users'>
              <div>
                  <div class='d-flex justify-content-start'>
                      <div id='content-btn-edit'>
                          <div class="img-user-traza">
                          <i class="fa-solid fa-user"></i>
                          </div>
                      </div>
                      <label class='label-spna-font'>
                          <label class='label-spna-font'>${item.Name} ${item.Lastname}</label>
                          <BR>
                             <label class='styles-cards-font'> ${item.Typedocument} ${item.Document}</label>
                             <BR>
                         <label class='styles-cards-font '>Cargo: ${item.burden}</label>                   
                      <br>
                  </div>
              </div>
          </div>
      </div>
      <div id='user_data_personal_staff' >
          <div>
              <label class='styles-cards-font'><i class="fa-solid fa-mobile-screen" id="user_data_personal_staff_icon_mobil"></i> (+ ${item.Country}) ${item.Phone}</label>
              <BR>
              <label class='styles-cards-font'><i class="fa-solid fa-envelope" id="user_data_personal_staff_icon_envelope"></i> ${item.email}</label>
              <BR>
              <label class='styles-cards-font'><i class="fa-solid fa-building-columns"></i> </i>Sede: ${item.campus.Name}</label>
          </div>
      </div>
      
      <div id='user_data_rol' >
          <div class="d-flex flex-column">
              <label class='label-spna-font'>Roles</label>
              <BR>
              <label class='styles-cards-font'>-${item.role.Name}</label>

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
  totalPages = $("#cards_content_users").pagination("getTotalPage");
  $("#paginacion_all").html(totalPages);
  totapa = totalPages;
}

function chageuser() {
  $.ajax({
    url: "/api/users",
    type: "get",
    success: function(response) {
      arrar_temp_users = response;
    },
    error: function(xhr, status, error) {

    }
  });
}

function searchuser(search) {
  $.ajax({
    url: "/api/searchuser",
    type: "post",
    data: {
      search: search
    },
    success: function(response) {
      array_users = response;
      create_page();
    },
    error: function(xhr, status, error) {

    }
  });
}

function consult_user(action) {
  $.ajax({
    url: "/api/users/" + indextemp,
    type: "get",
    success: function(response) {
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
  $("#input_update_users_name").val(array_users_update.Name);
  $("#input_update_users_lastname").val(array_users_update.Lastname);
  $("#input_update_users_phone_number").val(array_users_update.Phone);
  $('select[name="country_user_update"]').val(array_users_update.Country).trigger('change.select2');
  $('select[name="document_user_update"] option[value="' + array_users_update.Typedocument + '"]').prop('selected', true);
  $('select[name="campus_user_update"] option[value="' + array_users_update.campusId + '"]').prop('selected', true);
  $("#input_update_users_number_ducumnet").val(array_users_update.Document);
  $("#input_update_users_charge").val(array_users_update.burden);
  $("#input_update_users_email").val(array_users_update.email);
  $('input[name="rol_update_user"][value="' + array_users_update.roleId+ '"]').prop('checked', true);

}

function deleteuser() {
  $.ajax({
    url: "/api/users/" + indextemp,
    type: "delete",
    success: function(response) {},
  });
}

function fill_view_user() {

  $("#view-user-name").html(array_users_update.Name + " " + array_users_update.Lastname);
  $("#view-user-document").html(array_users_update.Typedocument + " " + array_users_update.Document);
  $("#view-user-burden").html(array_users_update.burden);
  $("#view-user-phone").html(`<i class="fa-solid fa-mobile-screen" id="user_data_personal_staff_icon_mobil"></i>(+` + array_users_update.Country + ")" + " " + array_users_update.Phone);
  $("#view-user-email").html(`<i class="fa-solid fa-envelope" id="user_data_personal_staff_icon_envelope"></i>` + " " + array_users_update.email);
  $("#view-user-rol").html(array_users_update.roleId);
  $("#view-user-rol-date").html(array_users_update.updatedAt);
}

function consult_extra_update() {
  var imprimi
  var roles=[];
  $.ajax({
    url: "/api/campus",
    type: "get",
    success: function(response) {
      roles = response;
      roles.forEach(function(opcion) {
        imprimi+=`<option value=${opcion.Id}>${opcion.Name}</option>`;
      });
      $("#input_update_users_campus").html(imprimi)
    },
    error: function(xhr, status, error) {

    }
  });
  $.ajax({
    url: "/api/role",
    type: "get",
    success: function(response) {
      roles = response;
      imprimi=""
      roles.forEach(function(opcion) {
        imprimi+=`<div class="new-rol">
                                    <div>
                                        <input type="radio" name="rol_update_user" class="form-check-input" value="${opcion.Id}"class="input_update_users_rol"><label for="">${opcion.Name}</label>
                                    </div>
                                    <button><i class="fa-solid fa-bullseye"></i></button>
                                </div>
                                `;
      });
      $(".container-rol-existent-").html(imprimi)
    },
    error: function(xhr, status, error) {

    }
  });


}
function consult_extra_new() {
  var imprimi
  var roles=[];
  $.ajax({
    url: "/api/campus",
    type: "get",
    success: function(response) {
      roles = response;
      roles.forEach(function(opcion) {
        imprimi+=`<option value=${opcion.Id}>${opcion.Name}</option>`;
      });
      $("#input_new_users_campus").html(imprimi)
    },
    error: function(xhr, status, error) {

    }
  });
  $.ajax({
    url: "/api/role",
    type: "get",
    success: function(response) {
      roles = response;
      imprimi=""
      roles.forEach(function(opcion) {
        imprimi+=`<div class="new-rol">
                                    <div>
                                        <input type="radio" name="rol_new_user" class="form-check-input" value="${opcion.Id}" class="input_new_users_rol"><label for="">${opcion.Name}</label>
                                    </div>
                                    <button><i class="fa-solid fa-bullseye"></i></button>
                                </div>
                                `;
      });
      console.log(imprimi)
      $("#container-rol-existent-div-new").html(imprimi)
    },
    error: function(xhr, status, error) {
    }
  });
}