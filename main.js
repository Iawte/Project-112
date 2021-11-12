var prediction1="";
var preddiction2="";
Webcam.set({
    width:350,height:300,image_format:"png",png_quality:90
})
camera=document.getElementById("camera");
Webcam.attach("#camera")

function takeSnapshot(){
    Webcam.snap(function(data_uri){
     document.getElementById("result").innerHTML="<img id='capturedImage' src='"+data_uri+"'></img>";
    })
}

console.log(ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/YbwAr554D/model.json",modelLoaded);


function modelLoaded(){
    console.log("modelLoaded")
}

function speak(){
var synth=window.speechSynthesis;
var speechData1="The first prediction is "+prediction1;
var speechData2="The second prediction is "+prediction2;
var utterThis=new SpeechSynthesisUtterance(speechData1+speechData2);
synth.speak(utterThis)
}



function check() {
    image = document.getElementById("capturedImage");
    classifier.classify(image, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    }
    else {
        console.log(results);
        console.log(results[0].label)
        console.log(results[1].confidence)
        console.log(results[2].label)
        document.getElementById("resultName").innerHTML = results[0].label;
        document.getElementById("emotionName").innerHTML = results[1].label; 
        prediction1 = results[0].label;
        prediction2 = results[1].label;

        if(prediction1=="good"){
            document.getElementById("pButton").innerHTML="&#128077";
        }else if(prediction1=="bad"){
            document.getElementById("pButton").innerHTML="&#128076";
        } else if(prediction1=="nice"){
            document.getElementById("PButton").innerHTML="&#128079;"
        }
        speak()
        
}
}

