$(document).ready(function(){

	//Add Device 
	$(document).on('click', '#dev_add', function(){

		var dev_name = $('#dev_name').val();
		var dev_dep = $('#dev_dep').val();

		$.ajax({
		  url: 'dev_config.php',
		  type: 'POST',
		  data: {
		    'dev_add': 1,
		    'dev_name': dev_name,
		    'dev_dep': dev_dep,
		  },
		  success: function(response){
		    $('#dev_name').val('');
		    $('#dev_dep').val('');

			  // Cache the jQuery selectors
			  var $alertDev = $('.alert_dev');
			  var $newDeviceModal = $('#new-device');

			  // Cache the jQuery selectors
			  var $alertDev = $('.alert_dev');

			  if (response === 1) {
				  // Use the cached selectors
				  $alertDev.fadeIn(500);
				  $alertDev.html('<p class="alert alert-success">A new device has been added successfully</p>');
				  $('#new-device').modal('hide');

				  setTimeout(function () {
					  $alertDev.fadeOut(500);
				  }, 2000);
			  } else {
				  // Use the cached selectors
				  $alertDev.fadeIn(500);
				  $alertDev.html(response);

				  setTimeout(function () {
					  $alertDev.fadeOut(500);
				  }, 2000);
			  }


			  $.ajax({
		      url: "dev_up.php",
		      type: 'POST',
		      data: {
		          'dev_up': 1,
		      }
		      }).done(function(data) {
		      $('#devices').html(data);
		    });
		  }
		});
	});

	//Device Token update
	$(document).on('click', '.dev_uid_up', function(){

		var el = this;
		var dev_id = $(this).data('id');

		bootbox.confirm("Do you really want to Update this Device Token?", function(result) {
			if(result){
			     // AJAX Request
			     $.ajax({
			       url: 'dev_config.php',
			       type: 'POST',
			       data: { 
			          'dev_uid_up': 1,
			          'dev_id_up': dev_id,
			       },
			       success: function(response){

			        $(el).closest('tr').css('background','#5cb85c');
			        $(el).closest('tr').fadeOut(300,function(){
			              $(this).show();
			        });
					   // Cache the jQuery selector
					   var $alertDev = $('.alert_dev');

					   if (response === 1) {
						   // Use the cached selector
						   $alertDev.fadeIn(500);
						   $alertDev.html('<p class="alert alert-success">The device Token has been updated successfully</p>');

						   setTimeout(function () {
							   $alertDev.fadeOut(500);
						   }, 2000);

						   // Make the AJAX call
						   $.ajax({
							   url: "dev_up.php",
							   type: 'POST',
							   data: {
								   'dev_up': 1,
							   }
						   }).done(function(data) {
							   $('#devices').html(data);
						   });
					   } else {
						   // Use the cached selector
						   $alertDev.fadeIn(500);
						   $alertDev.html(response);

						   setTimeout(function () {
							   $alertDev.fadeOut(500);
						   }, 2000);
					   }

				   }
			     });
		   	}
		});
	});

	//Delete Device
	$(document).on('click', '.dev_del', function(){

		var el = this;
		var deleteid = $(this).data('id');

		bootbox.confirm("Do you really want to delete this Device?", function(result) {
		if(result){
		     // AJAX Request
		     $.ajax({
		       url: 'dev_config.php',
		       type: 'POST',
		       data: { 
		          'dev_del': 1,
		          'dev_sel': deleteid,
		       },
		       success: function(response){

		         // Removing row from HTML Table
				   // Cache the jQuery selectors
				   var $alertDevDel = $('.alert_dev_del');
				   var $closestTr = $(el).closest('tr');

				   if (response === 1) {
					   // Apply styling and perform fadeout animation on the closest tr
					   $closestTr.css('background', '#d9534f');
					   $closestTr.fadeOut(800, function() {
						   $(this).remove();
					   });

					   // Make the AJAX call
					   $.ajax({
						   url: "dev_up.php",
						   type: 'POST',
						   data: {
							   'dev_up': 1,
						   }
					   }).done(function(data) {
						   $('#devices').html(data);
					   });
				   } else {
					   // Show alert and bootbox
					   $alertDevDel.fadeIn(500);
					   $alertDevDel.html(response);

					   setTimeout(function () {
						   $alertDevDel.fadeOut(500);
					   }, 2000);

					   bootbox.alert('Device not deleted.');
				   }

			   }
		     });
		   }
		});
	});

	//Device Mode
	$(document).on('click', '.mode_sel', function(){

		var el = this;
    	var dev_mode = $(this).attr("value");
		var dev_id = $(this).data('id');

		bootbox.confirm("Do you really want to change this Device Mode?", function(result) {
			if(result){
			     // AJAX Request
			     $.ajax({
			       url: 'dev_config.php',
			       type: 'POST',
			       data: { 
			          'dev_mode_set': 1,
			          'dev_mode': dev_mode,
			          'dev_id': dev_id,
			       },
			       success: function(response){

					   // Cache the jQuery selectors
					   var $alertDevDel = $('.alert_dev_del');
					   var $closestTr = $(el).closest('tr');

					   if (response === 1) {
						   // Apply styling and perform fadeout animation on the closest tr
						   $closestTr.css('background', '#5cb85c');
						   $closestTr.fadeOut(300, function() {
							   $(this).show();
						   });

						   // Make the AJAX call
						   $.ajax({
							   url: "dev_up.php",
							   type: 'POST',
							   data: {
								   'dev_up': 1,
							   }
						   }).done(function(data) {
							   $('#devices').html(data);
						   });
					   } else {
						   // Show alert and bootbox
						   $alertDevDel.fadeIn(500);
						   $alertDevDel.html(response);

						   setTimeout(function () {
							   $alertDevDel.fadeOut(500);
						   }, 2000);

						   bootbox.alert('Device not changed.');
					   }

				   }
			     });
		   	}
		   	else{
			   	$.ajax({
		            url: "dev_up.php",
		            type: 'POST',
		            data: {
		                'dev_up': 1,
		            }
		            }).done(function(data) {
		            $('#devices').html(data);
	          	});
		   	}
		});
	});
});
