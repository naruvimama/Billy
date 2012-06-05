$(document).ready(function(){
	product_tmpl = _.template('\
		<span class="product span12"> \
			<span class="span1 list-id"><%=id%></span> \
			<span class="span1 list-code"><%=code%></span> \
			<span class="span3 list-name"><%=name%></span> \
			<span class="span1 list-price"><%=price%></span> \
			<span class="span1 list-quantity"><%=quantity%></span>\
			<a class="span1 list_item_edit" id="<%= id %>"><i class="icon-edit"></i></a> \
			</span> \
	');
  var p_form = $('#new_product_form');
	$('#add_to_products').live('click',function(evt){
    evt.preventDefault();
		var product = {
	    code:$('#p_code', p_form).val(),
	    name:$('#p_name', p_form).val(),
	    price:parseInt($('#p_price', p_form).val()),
	    quantity:parseInt($('#p_quant', p_form).val())
		};
    $.ajax({
			url:'/products',
			data:JSON.stringify(product),
			type:'POST',
			contentType:'application/json',
			dataType:'json',
			success:function(data){
        if(data.success){
					$('#reset_new_product').trigger('click');
					$('#products_list').prepend(product_tmpl(data.product));
				}else{
					alert(data.msg);
				}
			},
		})
	});

	function make_modal_template(o){
     var templ = '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3>Edit product</h3></div><div class="modal-body"><form id="edit_product_form" class="form-vertical"><input type="hidden" id="e_id" placeholder="Code" class="item" value='+ o.id +' />	<label>code</label>	<input type="text" id="e_code" placeholder="Code" class="item" value=' + o.code + ' />	<label>Name</label><input type="text" id="e_name" placeholder="Name" class="item" value="' + o.name +'" /><label>Price</label><input type="text" id="e_price" placeholder="Price" class="item" value='+ o.price +' />	<label>Quantity</label><input type="text" id="e_quant" placeholder="Quantity" class="item" value=' + o.quantity + ' /></form>	</div><div class="modal-footer"><div class="btn-group"><a class="btn btn-warning" id="delete_product"><i class="icon-trash"></i>Delete</a><a class="btn btn-success" id="update_product"><i class="icon-plus-sign"></i>Update</a>	</div></div>';
		 return(templ);
	}
	$('.list_item_edit').live('click', function(evt){
		var product_id = $(this).attr('id');
		$(this).parent('.product').addClass('editing');
		$.ajax({
			url:'/products/' + product_id,
			type:'GET',
			contentType:'application/json',
			dataType:'json',
			success:function(data){
				if(data.success){
					$('#modalEdit').html(make_modal_template(data.product));
					$('#modalEdit').modal('show');
				}
			}
		});
	});

	$('#update_product').live('click', function(evt){
		evt.preventDefault();
		var product ={
			id:parseInt($('#edit_product_form #e_id').val()),
			code:$('#edit_product_form #e_code').val(),
			name:$('#edit_product_form #e_name').val(),
			price:parseInt($('#edit_product_form #e_price').val()),
			quantity:parseInt($('#edit_product_form #e_quant').val())
		}; 
		$.ajax({
			url:'/products/' + product.id,
			type:'PUT',
			data:JSON.stringify(product),
			contentType:'application/json',
			dataType:'json',
			success:function(data){
				if(data.success){
					$('#modalEdit').modal('hide');
					$('.editing').remove();
					$('#products_list').prepend(product_tmpl(data.product));
				}
			}
		});
	});

	$('#delete_product').live('click', function(evt){
		console.log('delete product');
		evt.preventDefault();
		var id=parseInt($('#edit_product_form #e_id').val());
		$.ajax({
			url:'/products/' + id,
			type:'DELETE',
			contentType:'application/json',
			dataType:'json',
			success:function(data){
				if(data.success){
					$('#modalEdit').modal('hide');
					$('.editing').remove();
				}
			}
		});
	});

});
