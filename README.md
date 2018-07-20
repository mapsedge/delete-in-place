# delete-in-place
jQuery plugin for in-place confirmation

This plugin converts <a> links that might normally trigger a confirm() dialog box into a confirm-in-place model, similar to Reddit's "delete" and "unsave" links. 

When the user clicks on the link to perform an action, the link fades out and is replaced by an OK/Cancel set of links. 

If the user chooses "Cancel" or moves the mouse out of the link area, the initial action link is restored. 

If OK is chosen, and "clicked" event is fired by the plugin, which the developer can then use to trigger whatever additional actions they require.

USAGE

HTML

    <a href="#" class="myClassname">Caption</a>

JAVASCRIPT

		$(".myClassname").deleteInPlace({
				clicked: function(onWhat, attribs, evt){
          // onWhat has two possible values, "ok" and "cancel"
					console.log(onWhat, attribs, evt);
				}
			});
