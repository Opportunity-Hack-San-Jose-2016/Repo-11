/*
{
   "session_info": {
       "callback": "/centroSubmit",
       "location": "Unknown",
       "name": "John Doe",
       "question": {
           "answer_type": "checkbox",
           "id": "8799KR",
           "options": [
               "Yes",
               "No"
           ],
           "subquestions": [],
           "text": "Are you U.S. citizen?"
       },
       "result": [],
       "session_id": "MFMJRI",
       "stage": 1,
       "username": "johndoe1"
   }
}
*/

function submitForm(){
	// Initiate Variables With Form Content
	$.post(
		"/questionForm",
		$( "#questionForm" ).serialize(),
		function(data){
			setQuestionForm(data);
		},
		"json"
	);
}

function setQuestionForm(data) {
	var question = data.question;
	switch(question.answer_type){
		case "checkbox": addCheckboxForm(question.text, question.options, data.callback); break;
		case "radio": adRadioForm(question.text, question.options, data.callback); break;
		case "text": addTextAreaForm(question.text, data.callback); break;
		case "select": addSelectForm(question.text, question.options, data.callback); break;
		default: break; // BUG: shoudl never be here
	}
}

$("#forms").on('click', '.submitButton', function(){
	disablePreviousFormsAndRemoveSubmitButton();
	addCheckboxForm("This is a checkbox question", ["checkbox1","checkbox2"], "/url");
	adRadioForm("This is a radio question", ["option1","option2"], "/url");
	addTextAreaForm("This is a text question", "/url");
	addSelectForm("This is a dropdown question", ["list1","list2","list3"], "/url");
})

function disablePreviousFormsAndRemoveSubmitButton() {
	$('.current-form').removeClass('current-form');
	$('.submitButton').remove();
	$('#forms').find('input, textarea, button, select').attr('disabled','disabled');
}

function addCheckboxForm(text, options, callback) {
	var $form = $formHTML(callback, "checkbox-form-group");
	var $formGroup = $formGroupHTML();
	$formGroup.append($questionTitleHTML(text));
	$.each(options, function(index, value){
		$formGroup.append($checkBoxHTML(value, value));
	});
	$form.append($formGroup);
	addNewForm($form);
}

function adRadioForm(text, options, callback) {
	var $form = $formHTML(callback, "radio-form-group");
	var $formGroup = $formGroupHTML();
	$formGroup.append($questionTitleHTML(text));
	$.each(options, function(index, value){
		$formGroup.append($radioHTML(value, value));
	});
	$form.append($formGroup);
	addNewForm($form);
}

function addTextAreaForm(text, callback) {
	var $form = $formHTML(callback, "text-form-group");
	var $formGroup = $formGroupHTML();
	$formGroup.append($questionTitleHTML(text));
	$formGroup.append($textAreaHTML());
	$form.append($formGroup);
	addNewForm($form);
}

function addSelectForm(text, options, callback) {
	var $form = $formHTML(callback, "radio-form-group");
	var $formGroup = $formGroupHTML();
	$formGroup.append($questionTitleHTML(text));
	$formGroup.append($formSelectHTML(options));
	$form.append($formGroup);
	addNewForm($form);
}

function getSelectedcheckboxArray() {
	var checkboxSelected = [];
	$(".answerCheckbox:checked").each(function() {
		checkboxSelected.push($(this).val());
	});
	return checkboxSelected;
}

function addNewForm($form){
	$form.addClass('current-form');
	$form.append($buttonHTML());
	$("#forms").append('<hr>');
	$("#forms").append($form);
}

function $checkBoxHTML(value, text) {
	return $(('<div class="checkbox text-left"><label>'+
									'<input type="checkbox" value="{0}" class="answerCheckbox">'+
									'{1}'+
									'</label></div>').format(value, text));
}

function $radioHTML(value, text) {
	return $(('<div class="radio text-left"><label>'+
									'<input type="radio" name="optionsRadios" value="{0}" class="answerCheckbox" checked>'+
									'{1}'+
									'</label></div>').format(value, text));
}

function $textAreaHTML() {
	return $('<textarea class="form-control" rows="5" name="answerText"></textarea>');
}

function $formSelectHTML(options) {
	var $selectRowWrapper = $rowWrapperHTML()
	var $select = $('<select class="c-select col-xs-12"></select>');
	$.each(options, function(index, value){
		if(index==0){
			$select.append($('<option selected value={0}>{0}</option>'.format(value)));
		}else{
			$select.append($('<option value={0}>{0}</option>'.format(value)));
		}
	});
	$selectRowWrapper.append($select)
	return $selectRowWrapper;
}

function $buttonHTML(){
	return $('<button type="button" class="btn btn-default submitButton">Submit</button>');
}

function $formGroupHTML(){
	return $('<div class="form-group"></div>');
}

function $rowWrapperHTML(){
	return $('<div class="row"></div>')
}

function $formHTML(action, formClasses){
	return $('<form action="{0}" class="{1}">'.format(action, formClasses));
}

function $questionTitleHTML(text){
	return $('<p class="lead">{0}</p>'.format(text));
}
