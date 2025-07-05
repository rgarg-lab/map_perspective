// biasMap.js
// Maps domains to their known political or regional bias

const biasMap = {
  // US-Based
  "cnn.com": "Left",
  "msnbc.com": "Left",
  "nytimes.com": "Lean Left",
  "huffpost.com": "Left",
  "npr.org": "Center",
  "reuters.com": "Center",
  "bbc.com": "Global",
  "apnews.com": "Center",
  "thehill.com": "Center",
  "foxnews.com": "Right",
  "breitbart.com": "Right",
  "oann.com": "Right",
  "washingtontimes.com": "Right",
  "newsmax.com": "Right",
  
  // India-Based
  "ndtv.com": "Left",
  "thewire.in": "Left",
  "scroll.in": "Left",
  "thequint.com": "Left",
  "indiatoday.in": "Center",
  "thehindu.com": "Center",
  "livemint.com": "Center",
  "hindustantimes.com": "Center",
  "timesofindia.indiatimes.com": "Local",
  "news18.com": "Right",
  "republicworld.com": "Right",

  // UK-Based
  "theguardian.com": "Left",
  "dailymail.co.uk": "Right",
  "telegraph.co.uk": "Right",
  "independent.co.uk": "Center",
  "bbc.co.uk": "Global",

  // Other International
  "aljazeera.com": "Global",
  "france24.com": "Global",
  "dw.com": "Global",
  "cbc.ca": "Center",
  "abc.net.au": "Center",
  "smh.com.au": "Left",
  "theaustralian.com.au": "Right",
  "japantimes.co.jp": "Center",
  "straitstimes.com": "Center",
  "globo.com": "Center",
  
  // Misc or Aggregators
  "devdiscourse.com": "Unknown",
  "news.google.com": "Unknown",
  "yahoo.com": "Unknown",
};

// Export for use in browser environment
if (typeof module !== 'undefined') {
  module.exports = biasMap;
}
