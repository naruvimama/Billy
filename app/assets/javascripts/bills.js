$(document).ready( function(){
  
	billitems_list = [];

	// Autocomplete 
	$('.code_autocomplete').on('focus', function(){
		$(this).autocomplete(
			{
				minLength:1,
				source:'/products/code_autocomplete',
				focus: function(event, ui){
					$('#code').val(ui.item.code);
					$('#name').val(ui.item.name);
				},
				change:function(event, ui){
					if(ui.item){
						$('#item_id').val(ui.item.id);
						$('#code').val(ui.item.code);
						$('#name').val(ui.item.name);
						if ($('#price').val()== ""){
							$('#price').val(ui.item.price);
						}
						if ($('#quant').val()== ""){
							$('#quant').val(1);
						}
					}
				}
			}
		);
	}
);
//billitem template
var billitem_tmpl = _.template("<span class='billitem' data-guid=<%= _guid %>><span class='span1'><%= code %></span><span class='span2'><%= name %></span><span class='span1'><%= price %></span><span class='span1'><%= quantity %></span><a class='btn btn-danger del_item' href='#'><i class='icon-remove-sign'></i>Remove</a><br/></span>");

// render bill items_list
function render_bill_items_list(){
	if (billitems_list.length){
	_.each(billitems_list, function(bi){
		$('#bill_area').append(billitem_tmpl(bi));
	});}
}
// Add to bill
function add_to_bill(){
	var billitem = {
		_guid:Math.guid(),
		id:$('#item_id').val(),
		code:$('#code').val(),
		name:$('#name').val(),
		price:$('#price').val(),
		quantity:$('#quant').val()
	};
  $('#reset_billitem').trigger('click');
	billitems_list.push(billitem);
  $('#bill_area').append(billitem_tmpl(billitem));
}

function calculate_total(){
	var total = _.reduce(billitems_list, function(tot, bi){ return tot+parseInt(bi.price)*parseInt(bi.quantity);	}, 0);
	$('#total strong').text(total);
}

$('#add_item_2_bill').live('click', function(){
	console.log(parseInt($('#item_id').val()));
	if(parseInt($('#item_id').val())){
	add_to_bill();
	calculate_total();
	}else{
		console.log("Invalid item id   :", parseInt($('#item_id').val()));
		alert('This product does not exist in the product database, please create it first.')
	}
});

$('#reset_billitem').live('click', function(){
	_.each($('#bill_item_form .item'), function(it){
		$(it).val('');
	});
});

$('#add_bill').live('click', function(evt){
	evt.preventDefault();
	if(billitems_list.length){
		$.ajax({
			url:"/bills",
			data:{billitems:billitems_list},
			dataType:'json',
			type:'POST',
			success:function(data, textStatus, jqXHR){
				console.log(data);
				if(data.success){
					$('#reset_bill').trigger('click');
					$('#reset_billitem').trigger('click');
				}
			}
		});
	}else{
		alert('No items were found in the bill please add some items.');
	}
});

// deleting items from the bill
$('.del_item').live('click',function(evt){
	evt.preventDefault();
	var ref = $($(this)[0]);
	ref = ref.parent('.billitem').filter(':first');
	var guid = ref.attr("data-guid");
	ref.remove();
	billitems_list = _.reject(billitems_list, function(bi){return bi._guid == guid;});
	calculate_total();
});

// Reset bill
$('#reset_bill').live('click', function(){
	$('.del_item').trigger('click');
});

// external code
Math.guid = function(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	}).toUpperCase();
};


/*
	// Updating subtotal on field change
	function show_subtotal(){
		var price = parseInt($('#billitem_price').val());
		var numbers = parseInt($('#billitem_numbers').val());
		if (price && numbers){
			$('#subtotal').text("Subtotal   : " + price*numbers)
	  }
	}

  $('#bill_input_form #billitem_price').on('change', show_subtotal);
  $('#bill_input_form #billitem_numbers').on('change', show_subtotal);

	// Respond on successful write to billitem & bill
	$(function(){
		$('#bill_input_form')
		  .bind('ajax:success', function(e, data, status, xhr){
				if(data.success){
					$('#bill_table').append(bill_record(data));
				}
				return false
			})
	    .bind('ajax:error', function(e, xhr, status, error){
          console.log("error json: "+ xhr.respomseText);
			})
	  
	})
	
	// debug
	$('input[name="commit"]').on('click', function(){console.log('Triggered submit');}); 

	// Delete a bill item from the bill
	$('.delete_bill_item').on('click', function(){
		id = $(this).parent('tr').attr('id');
		this_record = $(this);
    $.ajax({
			url:"/bills/"+id+"/destroy_item.json",
			succeess:function(data){
				if(data.success){
          this_record.remove();
				}
			}
		});
	});
	*/
})
