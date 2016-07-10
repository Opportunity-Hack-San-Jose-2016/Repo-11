var CHECKBOX_FORM_CLASS = "checkbox-form";
var RADIO_FORM_CLASS = "radio-form";
var TEXT_FORM_CLASS = "text-form";
var SELECT_FORM_CLASS = "select-form";

$(document).ready(function(){
/* 	window.onbeforeunload = function() { return "You work will be lost."; }; */
	SESSION_INFO = JSON.parse(SESSION_INFO.replace(/&#39;/g, "\""));
	console.log("ready:");
	console.log(SESSION_INFO);
	setQuestionForm(SESSION_INFO);
	
});

$("#forms").on('click', '.submitButton', function(){
	submitForm($(this));
})

function submitForm($submitButton){
	// Initiate Variables With Form Content
	// checkbox
	var $currentForm = $('.current-form');
	var qid = $currentForm.attr('qid');
	var answerList = [];
	if($currentForm.hasClass(CHECKBOX_FORM_CLASS)){
		$.each($currentForm.find('input:checked'), function(){
			answerList.push($(this).val());
		});
	}else if($currentForm.hasClass(RADIO_FORM_CLASS)){
		$.each($currentForm.find('input:checked'), function(){
			answerList.push($(this).val());
		});
	}else if($currentForm.hasClass(TEXT_FORM_CLASS)){
		answerList.push($currentForm.find('.answerTextArea').val());
	}else if($currentForm.hasClass(SELECT_FORM_CLASS)){
		$.each($currentForm.find('option:selected'), function(){
			answerList.push($(this).val());
		});
	}else{
		// BUG
	}
	if(answerList.length==0){
		$submitButton.addClass("btn-error");
		$submitButton.addClass('.disabled');
		$('.alert').fadeIn();
		console.log($('.alert'));
	}else{
		$.post(
			"/centroSubmitFollow",
			{
				'id': "qid",
				'answer': JSON.stringify(answerList)
			},
			function(data){
				disablePreviousFormsAndRemoveSubmitButton();
				setQuestionForm(data.session_info);
			},
			"json"
		);
	}
}

function setQuestionForm(data) {
	var question = data.question;
	if(data.question.qid=="-1") {
		addCompleteForm();
		updateProgressBar(100);
		return;
	}else{
		progressBarWidth+=10;
		updateProgressBar(progressBarWidth);
	}
	console.log(question);
	switch(question.answer_type){
		case "checkbox": addCheckboxForm(question.qid, question.text, question.options, data.callback); break;
		case "radio": addRadioForm(question.qid, question.text, question.options, data.callback); break;
		case "text": addTextAreaForm(question.qid, question.text, data.callback); break;
		case "select": addSelectForm(question.qid, question.text, question.options, data.callback); break;
		default: break; // BUG: shoudl never be here
	}
	$("html, body").animate({ scrollTop: $('.current-form').offset().top }, 1000);
}

var progressBarWidth = 0;
function updateProgressBar(progress){
	$(".progress-bar").animate({
    width: "{0}%".format(progress)
  }, 500);
}

function disablePreviousFormsAndRemoveSubmitButton() {
	$('.current-form').removeClass('current-form');
	$('.submitButton').remove();
	$('#forms').find('input, textarea, button, select').attr('disabled','disabled');
	$('.alert').remove();
}

function addCompleteForm(){
	var $completeForm = $completeFormHTML();
	$('#forms').append($completeForm);
}

function addCheckboxForm(qid, text, options, callback) {
	var $form = $formHTML(callback, CHECKBOX_FORM_CLASS, qid);
	var $formGroup = $formGroupHTML();
	$formGroup.append($questionTitleHTML(text));
	$.each(options, function(index, value){
		$formGroup.append($checkBoxHTML(value, value));
	});
	$form.append($formGroup);
	addNewForm($form);
}

function addRadioForm(qid, text, options, callback) {
	var $form = $formHTML(callback, RADIO_FORM_CLASS, qid);
	var $formGroup = $formGroupHTML();
	$formGroup.append($questionTitleHTML(text));
	$.each(options, function(index, value){
		$formGroup.append($radioHTML(value, value));
	});
	$form.append($formGroup);
	addNewForm($form);
}

function addTextAreaForm(qid, text, callback) {
	var $form = $formHTML(callback, TEXT_FORM_CLASS, qid);
	var $formGroup = $formGroupHTML();
	$formGroup.append($questionTitleHTML(text));
	$formGroup.append($textAreaHTML());
	$form.append($formGroup);
	addNewForm($form);
}

function addSelectForm(qid, text, options, callback) {
	var $form = $formHTML(callback, SELECT_FORM_CLASS, qid);
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
	$form.attr('style','display:none;');
	$form.append($validationAlertHTML());
	$form.append($buttonHTML());
	$("#forms").append('<hr>');
	$form.appendTo($("#forms")).fadeIn();
}

function $checkBoxHTML(value, text) {
	return $(('<div class="checkbox text-left"><label>'+
									'<input type="checkbox" value="{0}" class="answerCheckbox" required>'+
									'{1}'+
									'</label></div>').format(value, text));
}

function $radioHTML(value, text) {
	return $(('<div class="radio text-left"><label>'+
									'<input type="radio" name="optionsRadios" value="{0}" class="answerRadio" required>'+
									'{1}'+
									'</label></div>').format(value, text));
}

function $textAreaHTML() {
	return $('<textarea class="form-control answerTextArea" rows="5" name="answerText" required></textarea>');
}

function $formSelectHTML(options) {
	var $selectRowWrapper = $rowWrapperHTML()
	var $select = $('<select class="c-select col-xs-12 answerSelect"></select>');
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
	return $('<button type="button" class="btn btn-warning submitButton">Submit</button>');
}

function $completeFormHTML(){
	return $('<form action="/finalresult" method="post"><div class="form-group"><button type="submit" class="btn btn-success completeButton">See the result</button></div></form>');
}

function $formGroupHTML(){
	return $('<div class="form-group"></div>');
}

function $rowWrapperHTML(){
	return $('<div class="row"></div>')
}

function $formHTML(action, formClasses, qid){
	return $('<form action="{0}" class="{1}" qid="{2}" data-toggle="validator">'.format(action, formClasses, qid));
}

function $questionTitleHTML(text){
	return $('<p class="lead">{0}</p>'.format(text));
}

function $validationAlertHTML(){
	return $('<div class="alert alert-danger" style="display:none;">Please tell us something.</div>');
}

