$(function(){ 
  
  var questions;
  var un;
  
  $('#login form').submit(function(event) {
    event.preventDefault();
    un = $('#user').val(); 
    let pw = $('#pass').val();
    $.post('/login?' + $.param({username: un, password: pw}), function(data) {
      $('#user').val('');
      $('#pass').val('');
      $('#submit').focus();
      if(data.ok == 0)return;
      $('#login').hide();
      $('#new form').show();
      questions = data;
      showData(data);
    });
  });
  
  function showData(data){
    // data.forEach((d)=>{
    //   console.log(d['teacher'],d['question'],d['answer']);
    //   $('#data').append(`<pre>Q:  ${d['question']}   A:  ${d['answer']}  <button id>x</button></pre>`);
    // });
    for(var i=0; i<data.length; i++){
      console.log(data[i]['teacher'],data[i]['question'],data[i]['answer']);
      $('#data').append(`<pre id=qa${i}><pre id=red>Q:</pre>  ${data[i]['question']}  <pre id=red>A:</pre>  ${data[i]['answer']}  <button id=q${i}>x</button></pre>`);
      $(`#q${i}`).on('click',function(e){
        $(`#qa${this}`).remove();
        $.post('/remove?' + $.param({t:un,q:questions[this].question}),function(data){
           
        }.bind(i));
      }.bind(i));
    }
  }
  
  function addQuestionToPage(q,a){
    let n = $('#data').children().length;
    $('#data').append(`<pre id=qa${n}><pre id=red>Q:</pre>  ${q}   <pre id=red>A:</pre>  ${a}  <button id=q${n}>x</button></pre>`);
    $(`#q${n}`).on('click',function(e){
      let num = Number(this);
      $(`#qa${this}`).remove();
      $.post('/remove?' + $.param({t:un,q:questions[num].question}),function(data){
         //console.log(this);
      }.bind(n));
    }.bind(n));
  }
  
  function copyActivityURL(){
    //$('#activity-url').val('https://speak-2-learn.glitch.me/');
    var $tmpElem = $('<div>');
    $tmpElem.css({
      position: "absolute",
      left:     "-1000px",
      top:      "-1000px",
    });
    // Add the input value to the temp element.
    $tmpElem.text(`https://speak-2-learn.glitch.me/?t=${un}`);
    $("body").append($tmpElem);
    var range = document.createRange();
    range.selectNodeContents($tmpElem.get(0));
    var selection = window.getSelection ();
    selection.removeAllRanges ();
    selection.addRange (range);
    try {
      let successful = document.execCommand('Copy');
      let msg = successful ? 'successful' : 'unsuccessful';
      if(msg == 'successful'){
        $('#copied').fadeIn(2000);
        $('#copied').fadeOut(2000);
        $tmpElem.remove();
      }else{
        alert('copy unsuccessful');
      }
    } catch (err) {
      alert('error when copying to clipboard');
    }
  }
  
  $('#new form').submit(function(event) {
    event.preventDefault();
    $('#question').css("background-color","#3b4148");
    let q = $('#question').val();
    let a = $('#answer').val();
    if(q =='' || a == '')return;
    addQuestionToPage(q,a);
    $('#question').val('');
    $('#answer').val('');
    $.post('/new?' + $.param({t: un, q: q,  a: a }), function(data) {
      
    });
    copyActivityURL();
  });
  
});
