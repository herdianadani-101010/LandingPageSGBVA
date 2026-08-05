// =====================================================
// SGBVA Registration & Tracking Module
// =====================================================

const SGBVA_REG = {
  // GAS URL - akan di-set dari window.SGBVA_CONFIG atau window.SGBVA_GAS_URL
  gasUrl: (window.SGBVA_CONFIG && window.SGBVA_CONFIG.gasUrl) || window.SGBVA_GAS_URL || '',

  // Track download event
  trackDownload: function(giftName, day) {
    const email = localStorage.getItem('sgbva_registered_email');
    const name = localStorage.getItem('sgbva_registered_name');

    if (!email) {
      console.warn('No registered email found');
      return;
    }

    const payload = {
      action: 'download',
      email: email,
      name: name,
      gift: giftName,
      day: day || 1
    };

    // Send to Google Apps Script
    if (this.gasUrl) {
      fetch(this.gasUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload)
      }).catch(err => console.error('Download tracking error:', err));
    }

    // Save locally
    const downloads = JSON.parse(localStorage.getItem('sgbva_downloads') || '[]');
    downloads.push({
      gift: giftName,
      day: day,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('sgbva_downloads', JSON.stringify(downloads));

    console.log('Download tracked:', giftName);
  },

  // Track assessment completion
  trackAssessment: function(score, level, day) {
    const email = localStorage.getItem('sgbva_registered_email');
    const name = localStorage.getItem('sgbva_registered_name');

    if (!email) {
      console.warn('No registered email found');
      return;
    }

    const payload = {
      action: 'assessment',
      email: email,
      name: name,
      score: score,
      level: level,
      day: day || 1
    };

    // Send to Google Apps Script
    if (this.gasUrl) {
      fetch(this.gasUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload)
      }).catch(err => console.error('Assessment tracking error:', err));
    }

    // Save locally
    localStorage.setItem(`sgbva_day1_score_${email}`, score);
    localStorage.setItem(`sgbva_day1_level_${email}`, level);
    localStorage.setItem(`sgbva_day1_assessment_${email}`, 'completed');

    console.log('Assessment tracked:', score, level);
  },

  // Alias for submitAssessment (used by assessment.html)
  submitAssessment: function(score, level, catScores) {
    this.trackAssessment(score, level, 1);
  },

  // Get registration status
  isRegistered: function() {
    return !!localStorage.getItem('sgbva_registered_email');
  },

  // Get user info
  getUser: function() {
    return {
      name: localStorage.getItem('sgbva_registered_name'),
      email: localStorage.getItem('sgbva_registered_email'),
      phone: localStorage.getItem('sgbva_registered_phone')
    };
  }
};

// Make it globally available
window.SGBVA_REG = SGBVA_REG;
