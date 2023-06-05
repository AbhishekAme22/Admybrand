

function Send() {

    var sQuestion = textbox2.value;
    if (sQuestion == "") {
        alert("Type in your question!");
        textbox2.focus();
        return;
    }

    textbox.innerHTML = "Chat GPT is thinking...";

    var sUrl = "https://api.openai.com/v1/completions";
    var sModel = "text-davinci-003";
    if (sModel.indexOf("gpt-3.5-turbo") != -1) {
        //https://openai.com/research/gpt-4
        sUrl = "https://api.openai.com/v1/chat/completions";
    }

    var oHttp = new XMLHttpRequest();
    oHttp.open("POST", sUrl);
    oHttp.setRequestHeader("Accept", "application/json");
    oHttp.setRequestHeader("Content-Type", "application/json");
    oHttp.setRequestHeader("Authorization", "Bearer " + OPENAI_API_KEY)

    oHttp.onreadystatechange = function () {
        if (oHttp.readyState === 4) {
            //console.log(oHttp.status);

            spMsg.innerHTML = "";

            var oJson = {}
            if (textbox.value != "") textbox.value += "\n";

            try {
                oJson = JSON.parse(oHttp.responseText);
            } catch (ex) {
                textbox.value += "Error: " + ex.message
            }

            if (oJson.error && oJson.error.message) {
                textbox.value += "Error: " + oJson.error.message;

            } else if (oJson.choices) {
                var s = "";

                if (oJson.choices[0].text) {
                    s = oJson.choices[0].text;

                } else if (oJson.choices[0].message) {
                    //GPT-4
                    s = oJson.choices[0].message.content;
                }

                if (selLang.value != "en-US") {
                    var a = s.split("?\n");
                    if (a.length == 2) {
                        s = a[1];
                    }
                }

                if (s == "") {
                    s = "No response";
                } else {
                    textbox.value += "Chat GPT: " + s;
                    TextToSpeech(s);
                }
            }
        }
    };

    var iMaxTokens = 2048;
    var sUserId = "1";
    var dTemperature = 0.5;

    var data = {
        model: sModel,
        prompt: sQuestion,
        max_tokens: iMaxTokens,
        user: sUserId,
        temperature: dTemperature,
        frequency_penalty: 0.0, //Number between -2.0 and 2.0  
                                //Positive value decrease the model's likelihood 
                                //to repeat the same line verbatim.
        presence_penalty: 0.0,  //Number between -2.0 and 2.0. 
                                //Positive values increase the model's likelihood 
                                //to talk about new topics.
        stop: ["#", ";"]        //Up to 4 sequences where the API will stop generating 
                                //further tokens. The returned text will not contain 
                                //the stop sequence.
    }

    //chat GPT-4 gpt-4
    if (sModel.indexOf("gpt-3.5-turbo") != -1) {
        data = {
            "model": sModel,
            "messages": [
                //{
                //    "role": "system",
                //    "content": "You are a helpful assistant."  
                //                assistant messages help store prior responses
                //},
                {
                    "role": "user", //system,user,assistant
                    "content": sQuestion
                }
            ]
        }
    }

    oHttp.send(JSON.stringify(data));

    if (textbox.value != "") textbox.value += "\n";
    textbox.value += "Me: " + sQuestion;
    textbox2.value = "";
}

