// Create a SpeechSynthesisUtterance
const jsonData = {
  sample_sentences: [
    'The university library offers an extensive range of digital resources. Students can access them remotely using their student credentials.',
    'Our psychology department will hold a workshop on human behavior and emotions. This event is scheduled for the third week of the semester.',
    'The results of the recent survey will be published in the next journal issue. Researchers are eager to see how the data has evolved.',
    'Environmental sustainability is increasingly becoming a priority for businesses worldwide. Many companies are now implementing green policies.',
    'Due to technical issues, today’s IT lecture has been canceled. Students are advised to check their emails for rescheduling details.',
    'Communication skills are essential in all fields of study and work. Effective communication often leads to better team collaboration and success.',
    'Renewable energy sources like solar and wind are being widely adopted. Governments are investing in these alternatives to reduce emissions.',
    'The university will conduct an online orientation session for new students. Attendance is mandatory to access course materials and resources.',
    'Researchers found that exercise has significant mental health benefits. Regular physical activity can reduce symptoms of depression and anxiety.',
    'Advances in artificial intelligence are transforming many sectors, including healthcare. Experts predict major changes in medical diagnostics.',
    // Add the remaining sentences here
  ],
};

function* sentenceGenerator(data) {
  for (const sentence of data.sample_sentences) {
    yield sentence;
  }
}
function displaySentence(sentence) {
  document.getElementById('sentenceDisplay').innerText = sentence;
}

// Create the generator instance
const gen = sentenceGenerator(jsonData);

function speak(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  displaySentence(text); // Display the sentence
  // Select a voice
  const voices = speechSynthesis.getVoices();

  utterance.voice = voices[1];
  speechSynthesis.speak(utterance);
}

// Function to handle Next button click
document.getElementById('nextButton').addEventListener('click', () => {
  const nextSentence = gen.next(); // Get the next sentence from the generator
  if (!nextSentence.done) {
    currentSentence = nextSentence.value; // Update the current sentence
    speak(currentSentence); // Display the sentence
  } else {
    speak('No more sentences available.'); // Inform when done
  }
});

// Function to handle Previous button click
document.getElementById('previousButton').addEventListener('click', () => {
  if (currentSentence) {
    speak(currentSentence); // Display the last shown sentence
  } else {
    speak('No previous sentence to display.'); // Inform if no previous sentence
  }
});

// Function to handle Repeat button click
document.getElementById('repeatButton').addEventListener('click', () => {
  try {
    if (currentSentence) {
      speak(currentSentence); // Repeat the last shown sentence
    }
  } catch (e) {
    currentSentence = gen.next(); // Get the first sentence
    console.log('current', currentSentence.value);
    speak(currentSentence.value); // Display the first sentence if no current sentence
    currentSentence = currentSentence.value; // Get the first
  }
});
