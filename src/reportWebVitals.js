import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Fonction pour envoyer les métriques à un service d'analyse ou les traiter autrement.
  console.log(metric);
}

// Cette fonction envoie les métriques aux services d'analyse.
export function webVitalsHandler(metric) {
  switch (metric.name) {
    case 'cumulativeLayoutShift':
      sendToAnalytics(metric);
      break;
    case 'firstInputDelay':
      sendToAnalytics(metric);
      break;
    case 'firstContentfulPaint':
      sendToAnalytics(metric);
      break;
    case 'largestContentfulPaint':
      sendToAnalytics(metric);
      break;
    case 'timeToFirstByte':
      sendToAnalytics(metric);
      break;
    default:
      break;
  }
}

// Cette fonction est facultative, vous pouvez la supprimer si vous ne l'utilisez pas.
export default function reportWebVitals(onPerfEntry) {
  getCLS(onPerfEntry);
  getFID(onPerfEntry);
  getFCP(onPerfEntry);
  getLCP(onPerfEntry);
  getTTFB(onPerfEntry);
}
