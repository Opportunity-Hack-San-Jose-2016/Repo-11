$( document ).ready(function() {
    generateButtonTags();
});

function generateButtonTags(){
	var $tagsGroup = $('<div class="form-group"></div>');
	var buttonTags = [];
	for (i = 0; i < 5; i++) {
		$tagsGroup.append($('<a class="btn btn-primary" href="#" role="button">Topic{0}</a>'.format(i)));
	}
	$tagsGroup.insertBefore( "#submitButton" );
}


