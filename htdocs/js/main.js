$(() => {
    Survey
        .StylesManager
        .applyTheme("modern");

    var json = {
        title: "Umfrage zum Umweltverhalten",
        pages: [
            {
                "title": "Essen",
                "elements": [
                    {
                        "type": "checkbox",
                        "name": "suessspeisen",
                        "title": "Süßspeisen",
                        "hasOther": true,
                        "isRequired": false,
                        "choices": ["Pfannkuchen", "Dampfnudeln", "Pudding"]
                    },
                    {
                        "type": "radiogroup",
                        "name": "hauptspeise",
                        "title": "Hauptspeise",
                        "colCount": 2,
                        "isRequired": true,
                        "choices": [
                            "Schnitzel",
                            "Pommes",
                            "Pizza",
                            "Döner"]
                    }

                ]
            }, 
            {
                "title": "Verkehr",
                "elements": [
                    {
                        "type": "ranking",
                        "name": "verkehrsmittel",
                        "title": "Ordne die von Dir benutzten Verkehrsmittel der Häufigkeit nach:",
                        "isRequired": true,
                        "choices": ["Auto", "Öffentlicher Nahverkehr", "Bahn", "Fahrrad", "Zu Fuß"]
                    },
                    {
                        type: "rating",
                        name: "satisfaction",
                        title: "Wie zufrieden bist Du mit Deinem Fahrrad?",
                        minRateDescription: "Gar nicht zufrieden",
                        maxRateDescription: "voll zufrieden"
                    }
                ]
            }
        ]
    };

    window.survey = new Survey.Model(json);

    survey
        .onComplete
        .add(function (sender) {
                sender.data("timestamp") = new Date().toLocaleString();
                $.ajax('submit', {
                    data : JSON.stringify(sender.data, null, 3),
                    contentType : 'application/json',
                    type : 'POST',
                    success: (response) => {
                        $('.sv-completedpage').append($('<h3>Wenn Du am Gewinnspiel teilnehmen möchtes, dann notiere diesen Code und bringe ihn in die Schule mit:</h3>'));
                        $('.sv-completedpage').append($('<h3>' + response + '</h3>'));
                    }
                })
        });
    
    survey.locale = 'de';

    survey.showProgressBar = 'bottom';

    $("#surveyElement").Survey({ model: survey });
})

