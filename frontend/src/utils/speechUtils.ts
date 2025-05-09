
export const speakText = (text: string, lang: string = 'en-US') => {
  if (!window.speechSynthesis) {
    console.error("Speech synthesis not supported");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;

  // Find a suitable voice (English)
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(voice => voice.lang.includes('en'));
  
  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  window.speechSynthesis.speak(utterance);
};
