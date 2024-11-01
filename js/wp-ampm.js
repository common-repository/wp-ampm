var WP_AMPM = {};

(function($){
	
	$(document).ready(function(){
		"use strict";
			
		// usa date
			WP_AMPM = {
				hours12: null,
				type: null,
				datePreview: function() {
					var aa = $('#aa').val(),
						mm = $('#mm').val(),
						jj = $('#jj').val(),
						hh = this.hours12,
						mn = $('#mn').val()+this.type;

					$('#timestamp b').html(
						postL10n.dateFormat.replace( '%1$s', $('option[value="' + $('#mm').val() + '"]', '#mm').text() )
							.replace( '%2$s', jj )
							.replace( '%3$s', aa )
							.replace( '%4$s', hh )
							.replace( '%5$s', mn )
					);
				},
				
				dateChanged: function() {
					var hours24 = null;
					this.hours12 = parseInt($(".js-wpampm-hour").val());
					
					this.type = $(".js-wpampm-type option:selected").val();
					
					if (this.hours12 >= 12) {
						this.hours12 = 12;
					}
					
					if (this.type == 'pm' && this.hours12 != 12) {
						hours24 = this.hours12 + 12;
					}
					else if (this.type == 'am' && this.hours12 == 12) {
						hours24 = 0;
					}
					else {
						hours24 = this.hours12;
					}
					
					$("input[name='hh']").val(hours24).attr("value",hours24);
				},
				
				addingNewElements: function() {
					$("input[name='hh']").hide();
					$("input[name='hh']").before('<input type="text" class="js-wpampm-hour wpampm-hour" value="'+this.hours12+'" /><select class="js-wpampm-type wpampm-type"><option value="am">AM</option><option value="pm">PM</option></select>');
					$(".js-wpampm-type option[value='"+this.type+"']").attr("selected", "selected").prop("selected", true);
				},
				
				setUpHours: function() {
					var hours24 = $("input[name='hh']").val();
					
					this.type = "am";
					if (hours24 >= 12) {
						this.hours12 = hours24 - 12;
						this.type = "pm";
					}
					else {
						this.hours12 = hours24;
					}
					
					if (this.hours12 == 0) {
						this.hours12 = 12;
					}
				},
				
				
				//////////////////////////////////// inline
				
				addingNewElementsInline: function(parent) {
					$("input[name='hh']", parent).hide();
					$("input[name='hh']", parent).before('<input type="text" class="js-wpampm-hour wpampm-hour" value="'+this.hours12+'" /><select class="js-wpampm-type wpampm-type"><option value="am">AM</option><option value="pm">PM</option></select>');
					$(".js-wpampm-type option[value='"+this.type+"']", parent).attr("selected", "selected").prop("selected", true);
				},
				
				setUpHoursInline: function(parent) {
					var hours24 = $("input[name='hh']", parent).val();
					
					this.type = "am";
					if (hours24 >= 12) {
						this.hours12 = hours24 - 12;
						this.type = "pm";
					}
					else {
						this.hours12 = hours24;
					}
					
					if (this.hours12 == 0) {
						this.hours12 = 12;
					}
				},
				
				dateChangedInline: function(parent) {
					var hours24 = null;
					this.hours12 = parseInt($(".js-wpampm-hour", parent).val());
					
					this.type = $(".js-wpampm-type option:selected", parent).val();
					
					if (this.hours12 >= 12) {
						this.hours12 = 12;
					}
					
					if (this.type == 'pm' && this.hours12 != 12) {
						hours24 = this.hours12 + 12;
					}
					else if (this.type == 'am' && this.hours12 == 12) {
						hours24 = 0;
					}
					else {
						hours24 = this.hours12;
					}
					
				
					$("input[name='hh']", parent).val(hours24).attr("value",hours24);
					
				}
			};
				
		
			if ($(".wp-admin #post").size()) {

				// set up hours
					WP_AMPM.setUpHours();
			
				// adding new inputs
					WP_AMPM.addingNewElements();
					
				// view part
					WP_AMPM.datePreview();
				
				// changing					
					$(".save-timestamp").on("click", function(){
						WP_AMPM.dateChanged();
						WP_AMPM.datePreview();
					});
					
					$(".cancel-timestamp").on("click", function(){
						WP_AMPM.datePreview();
					});
			}
			
			
			if ($(".wp-admin.edit-php").size()) {

				$("body").find(".editinline").on("click", function() {
					var that = $(this);
					
					setTimeout(function() {
						var parent = that.parents("tr");
						var parent_id = parent.attr("id");
						
						var post_id = parent_id.replace("post-","");
						
						var target = $("#edit-"+post_id);
						
						// set up hours
							WP_AMPM.setUpHoursInline(target);
					
						// adding new inputs
							WP_AMPM.addingNewElementsInline(target);
							
						
						// changing					
							$(".timestamp-wrap", target).on("change", ".js-wpampm-hour, .js-wpampm-type", function(){
								WP_AMPM.dateChangedInline(target);
							});
					},0);
				});
			
			}
		
	});
})(jQuery);
