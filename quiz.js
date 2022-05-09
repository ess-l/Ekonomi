(function() 
 {
  var allQuestions = [{
    question: "Varför är en budget viktig?",
    options: ["Budgeten gör det lättare för privatpersoner att gå till jobbet", "Man kan spendera mer pengar varje månad", "För att lättare hålla reda på sina inkomster respektiva utgifter", "Samhället utvecklas snabbare"],
    answer: 2
  }, {
    question: "Är investering riskfritt?",
    options: ["Ja", "Nej"],
    answer: 1
  }, {
    question: "Varför ska man överväga att starta ett investeringssparkonto (ISK)?",
    options: ["Det blir lättare att deklarera", "Vinsten blir större", "Unga kan starta ett ISK", "Skatten blir mindre"],
    answer: 0
  },{
    question: "Vad är obligationer?",
    options: ["Lån som bara studenter kan ta", "En obligation är kortförklarat ett lån", "Ett brev som skickas från staten innehållande viktiga papper", "Ett bidrag från staten"],
    answer: 2
  }, {
    question: "Vilken ålder kan man ingå i ett avtal utan målsman?",
    options: ["16", "17", "18", "20"],
    answer: 2
  },{
    question: "Varför är avtal speciellt viktiga?",
    options: ["Det är ett starkt bevis i rättstvist", "Det ger mer avkastning", "Annars gäller inte några köp", "Annars blir deklarationen krånglig"],
    answer: 0

    }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Välj ett alternativ !');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Fråga nummer. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('Du fick ' + correct + ' av ' +allQuestions.length + ' rätt');
        return score;
  }
})();