$(document).ready(function() {
  const $alert = $('#alert'); // Cache the selector once

  // Add user Fingerprint
  $(document).on('click', '.fingerid_add', function(){
    let fingerid = $('#fingerid').val();
    let dev_id = $('#dev_sel option:selected').val();

    $.ajax({
      url: 'manage_users_conf.php',
      type: 'POST',
      data: {
        'Add_fingerID': 1,
        'fingerid': fingerid,
        'dev_id': dev_id,
      },
      success: function(response){
        if (response === "1") {
          $('#dev_sel, #fingerid, #finger_id, #dev_id, #name, #number, #email, #gender').val('');
          $alert.fadeIn(500).text("The ID is ready to get a new Fingerprint");
        } else {
          $alert.fadeIn(500).text(response);
        }

        setTimeout(function () {
          $alert.fadeOut(500);
        }, 6000);

        $.ajax({
          url: "manage_users_up.php",
          success: function(data) {
            $('#manage_users').html(data);
          }
        });
      }
    });
  });

  // Add user
  $(document).on('click', '.user_add', function(){
    let finger_id = $('#finger_id').val();
    let dev_uid = $('#dev_id').val();
    let name = $('#name').val();
    let number = $('#number').val();
    let email = $('#email').val();
    let gender = $(".gender:checked").val();

    $.ajax({
      url: 'manage_users_conf.php',
      type: 'POST',
      data: {
        'Add': 1,
        'dev_uid': dev_uid,
        'finger_id': finger_id,
        'name': name,
        'number': number,
        'email': email,
        'gender': gender,
      },
      success: function(response){
        if (response === "1") {
          $('#finger_id, #dev_id, #name, #number, #email, #dev_sel, #gender').val('');
          $alert.fadeIn(500).text("A new User has been added!");
        } else {
          $alert.fadeIn(500).text(response);
        }

        setTimeout(function () {
          $alert.fadeOut(500);
        }, 5000);

        $.ajax({
          url: "manage_users_up.php",
          success: function(data) {
            $('#manage_users').html(data);
          }
        });
      }
    });
  });

  // Update user
  $(document).on('click', '.user_upd', function(){
    let finger_id = $('#finger_id').val();
    let dev_uid = $('#dev_id').val();
    let name = $('#name').val();
    let number = $('#number').val();
    let email = $('#email').val();
    let gender = $(".gender:checked").val();

    $.ajax({
      url: 'manage_users_conf.php',
      type: 'POST',
      data: {
        'Update': 1,
        'dev_uid': dev_uid,
        'finger_id': finger_id,
        'name': name,
        'number': number,
        'email': email,
        'gender': gender,
      },
      success: function(response){
        if (response === "1") {
          $('#finger_id, #dev_id, #name, #number, #email, #dev_sel, #gender').val('');
          $alert.fadeIn(500).text("The selected User has been updated!");
        } else {
          $alert.fadeIn(500).text(response);
        }

        setTimeout(function () {
          $alert.fadeOut(500);
        }, 5000);

        $.ajax({
          url: "manage_users_up.php",
          success: function(data) {
            $('#manage_users').html(data);
          }
        });
      }
    });
  });

  // Delete user
  $(document).on('click', '.user_rmo', function(){
    let finger_id = $('#finger_id').val();
    let dev_uid = $('#dev_id').val();

    if (dev_uid === "") {
      $alert.fadeIn(500).text("There's no selected user to remove!!");
      setTimeout(function () {
        $alert.fadeOut(500);
      }, 5000);
    } else {
      bootbox.confirm("Do you really want to delete this User?", function(result) {
        if(result) {
          $.ajax({
            url: 'manage_users_conf.php',
            type: 'POST',
            data: {
              'delete': 1,
              'dev_uid': dev_uid,
              'finger_id': finger_id,
            },
            success: function(response){
              if (response === "1") {
                $('#finger_id, #dev_id, #name, #number, #email, #dev_sel, #gender').val('');
                $alert.fadeIn(500).text("The User Fingerprint has been deleted");
              } else {
                $alert.fadeIn(500).text(response);
              }

              setTimeout(function () {
                $alert.fadeOut(500);
              }, 5000);

              $.ajax({
                url: "manage_users_up.php",
                success: function(data) {
                  $('#manage_users').html(data);
                }
              });
            }
          });
        }
      });
    }
  });

  // Select user
  $(document).on('click', '.select_btn', function(){
    let el = this;
    let dev_uid = $(this).attr("name");
    let finger_id = $(this).data('id');

    $.ajax({
      url: 'manage_users_conf.php',
      type: 'GET',
      data: {
        'select': 1,
        'finger_id': finger_id,
        'dev_uid': dev_uid,
      },
      success: function(response){
        $(el).closest('tr').css('background','#70c276');
        $alert.fadeIn(500).text('User Fingerprint selected');

        setTimeout(function () {
          $alert.fadeOut(500);
        }, 5000);

        $.ajax({
          url: "manage_users_up.php",
          success: function(data) {
            $('#manage_users').html(data);
          }
        });

        let user_name = {
          User_name : []
        };
        let user_on = {
          User_on : []
        };
        let finger_id = {
          Finger_id : []
        };
        let dev_uid = {
          Dev_uid : []
        };
        let user_email = {
          User_email : []
        };
        let user_gender = {
          User_gender : []
        };

        let len = response.length;

        for (let i = 0; i < len; i++) {
          user_name.User_name.push(response[i].username);
          user_on.User_on.push(response[i].serialnumber);
          finger_id.Finger_id.push(response[i].fingerprint_id);
          dev_uid.Dev_uid.push(response[i].device_uid);
          user_email.User_email.push(response[i].email);
          user_gender.User_gender.push(response[i].gender);
        }

        $('#name').val(user_name.User_name);
        $('#number').val(user_on.User_on);
        $('#finger_id').val(finger_id.Finger_id);
        $('#dev_id').val(dev_uid.Dev_uid);
        $('#email').val(user_email.User_email);

        if (user_gender.User_gender === 'Female'){
          $('.form-style-5').find(':radio[name=gender][value="Female"]').prop('checked', true);
        } else {
          $('.form-style-5').find(':radio[name=gender][value="Male"]').prop('checked', true);
        }
      },
      error : function(data) {
        console.log(data);
      }
    });
  });
});
