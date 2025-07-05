function toggleColorblindMode() {
  document.body.classList.toggle("colorblind");
}

function speakPage() {
  const topic = document.getElementById("topicInput").value || "no topic entered";
  const msg = `This is a world news map. Enter a topic like Ukraine War. Then click any country on the map to fetch news. Current topic is ${topic}.`;
  const utterance = new SpeechSynthesisUtterance(msg);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

function tutorial() {
  const msg = `Hello! I am here to assist you! In this world, where news outlets use sensationalised headlines to get more clicks, we here bring you a tool to compile news from several different news outlets. In order to do so, first enter an issue in the searchbar above, then select a country on the map, finally, click on "Get News POV" and you will get the result! Hope this helped!`;
  const utterance = new SpeechSynthesisUtterance(msg);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}
