# delete-in-place
jQuery plugin for in-place confirmation

This plugin converts <a> links that might normally trigger a confirm() dialog box into a confirm-in-place model, similar to Reddit's "delete" and "unsave" links. 

When the user clicks on the link to perform an action, the link fades out and is replaced by an OK/Cancel set of links. 

If the user chooses "Cancel" or moves the mouse out of the link area, the initial action link is restored. 

If OK is chosen, a "clicked" event is fired by the plugin, which the developer can then use to trigger whatever additional actions they require.

USAGE

HTML

    <a href="#" class="myClassname">Caption</a>

JAVASCRIPT

		$(".myClassname").deleteInPlace({
				clicked: function(onWhat, attribs, evt){
                                        // onWhat has two possible values, "ok" and "cancel"
					console.log(onWhat, attribs, evt);
				},
				// defaults are shown
				label: {
				    ok: "OK",
				    cancel: "Cancel",
				    confirm: "Are you sure?"
			        }
			});

OPTIONS

clicked (event). Fired when the user select the OK or Cancel links.

label (object).

label.ok. The caption to display for the OK link.

label.cancel. The caption to display for the cancel link.

label.confirm. The caption to display for the confirmation message.

NOTES

In order to make the UX as unobtrusive as possible, the link is rendered at 50% opacity, 100% opacity on hover. To change the appearance of the confirmation text and links, see the styles creation in the plugin itself.
