// Activity Schedule Data (24-hour format)
const activitySchedule = {
    asleep: { start: 22, end: 7, label: '😴 Asleep', activity: 'asleep' },
    commute_morning: { start: 7, end: 9, label: '🚗 Commuting', activity: 'commuting' },
    work_morning: { start: 9, end: 12, label: '💼 Work/School', activity: 'work' },
    lunch: { start: 12, end: 13, label: '🍽️ Lunch', activity: 'lunch' },
    work_afternoon: { start: 13, end: 17, label: '💼 Work/School', activity: 'work' },
    commute_evening: { start: 17, end: 19, label: '🚗 Commuting', activity: 'commuting' },
    dinner: { start: 18, end: 20, label: '🍽️ Dinner', activity: 'lunch' },
    evening: { start: 19, end: 22, label: '🎬 Evening/Free Time', activity: 'evening' },
};

const optimalCallTimes = {
    asleep: 0,
    commuting: 1,
    work: 2,
    lunch: 3,
    evening: 5,
};

// Set default timezone on page load
window.addEventListener('DOMContentLoaded', () => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById('fromZone').value = userTimezone.includes('Los_Angeles') ? 'America/Los_Angeles' : userTimezone;
    
    updateTimes();
    updateUTC();
    
    // Event listeners
    document.getElementById('fromZone').addEventListener('change', updateTimes);
    document.getElementById('toZone').addEventListener('change', updateTimes);
    
    // Update time every second
    setInterval(() => {
        updateTimes();
        updateUTC();
    }, 1000);
});

// Update UTC Time
function updateUTC() {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    document.getElementById('utcTime').textContent = `UTC: ${hours}:${minutes}:${seconds}`;
}

// Get Activity Status for a given hour
function getActivityStatus(hour) {
    // Handle sleep (22:00 to 07:00)
    if (hour >= 22 || hour < 7) {
        return { label: '😴 Asleep', activity: 'asleep', score: optimalCallTimes.asleep };
    }
    // Morning commute (7:00 to 9:00)
    if (hour >= 7 && hour < 9) {
        return { label: '🚗 Commuting (Morning)', activity: 'commuting', score: optimalCallTimes.commuting };
    }
    // Morning work (9:00 to 12:00)
    if (hour >= 9 && hour < 12) {
        return { label: '💼 Work/School', activity: 'work', score: optimalCallTimes.work };
    }
    // Lunch (12:00 to 13:00)
    if (hour >= 12 && hour < 13) {
        return { label: '🍽️ Lunch Break', activity: 'lunch', score: optimalCallTimes.lunch };
    }
    // Afternoon work (13:00 to 17:00)
    if (hour >= 13 && hour < 17) {
        return { label: '💼 Work/School', activity: 'work', score: optimalCallTimes.work };
    }
    // Evening commute (17:00 to 19:00)
    if (hour >= 17 && hour < 19) {
        return { label: '🚗 Commuting (Evening)', activity: 'commuting', score: optimalCallTimes.commuting };
    }
    // Dinner (18:00 to 20:00) - overlaps with commute
    if (hour >= 18 && hour < 20) {
        return { label: '🍽️ Dinner Time', activity: 'lunch', score: optimalCallTimes.lunch };
    }
    // Evening free time (19:00 to 22:00)
    if (hour >= 19 && hour < 22) {
        return { label: '🎬 Evening/Free Time', activity: 'evening', score: optimalCallTimes.evening };
    }
    
    return { label: '❓ Unknown', activity: 'unknown', score: -1 };
}

// Convert time to timezone
function getTimeInTimezone(timezone) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    const parts = formatter.formatToParts(now);
    const hour = parseInt(parts.find(p => p.type === 'hour').value);
    const minute = parts.find(p => p.type === 'minute').value;
    const second = parts.find(p => p.type === 'second').value;
    
    return { hour, minute, second };
}

// Format time as HH:MM
function formatTime(hour, minute) {
    return `${String(hour).padStart(2, '0')}:${minute}`;
}

// Get timezone name display
function getTimezoneDisplayName(timezone) {
    const part = timezone.split('/')[1] || timezone;
    return part.replace(/_/g, ' ');
}

// Get timezone offset
function getTimezoneOffset(timezone) {
    const now = new Date();
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (tzDate - utcDate) / (1000 * 60 * 60);
    return offset;
}

// Calculate recommended times to call
function generateRecommendations(fromTimezone, toTimezone) {
    const fromTime = getTimeInTimezone(fromTimezone);
    const fromActivity = getActivityStatus(fromTime.hour);
    
    // Get next few hours for recommendation
    let recommendations = [];
    
    for (let i = 0; i < 24; i++) {
        const futureTime = new Date();
        futureTime.setHours(futureTime.getHours() + i);
        futureTime.setMinutes(0);
        futureTime.setSeconds(0);
        
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: toTimezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        
        const parts = formatter.formatToParts(futureTime);
        const hour = parseInt(parts.find(p => p.type === 'hour').value);
        
        const activity = getActivityStatus(hour);
        recommendations.push({
            hour: hour,
            score: activity.score,
            activity: activity.label,
            time: `${String(hour).padStart(2, '0')}:00`
        });
    }
    
    // Sort by best score (highest first)
    recommendations.sort((a, b) => b.score - a.score);
    
    return recommendations;
}

// Update all times
function updateTimes() {
    const fromZone = document.getElementById('fromZone').value;
    const toZone = document.getElementById('toZone').value;
    
    // Get times
    const fromTime = getTimeInTimezone(fromZone);
    const toTime = getTimeInTimezone(toZone);
    
    // Get activities
    const fromActivity = getActivityStatus(fromTime.hour);
    const toActivity = getActivityStatus(toTime.hour);
    
    // Update From Zone
    document.getElementById('fromZoneLabel').textContent = getTimezoneDisplayName(fromZone);
    document.getElementById('fromTime').textContent = formatTime(fromTime.hour, fromTime.minute);
    document.getElementById('fromPeriod').textContent = fromTime.hour >= 12 ? 'PM' : 'AM';
    updateActivityBadge('fromActivityBadge', fromActivity);
    
    // Update To Zone
    document.getElementById('toZoneLabel').textContent = getTimezoneDisplayName(toZone);
    document.getElementById('toTime').textContent = formatTime(toTime.hour, toTime.minute);
    document.getElementById('toPeriod').textContent = toTime.hour >= 12 ? 'PM' : 'AM';
    updateActivityBadge('toActivityBadge', toActivity);
    
    // Update time difference
    updateTimeDifference(fromZone, toZone);
    
    // Update recommendations
    updateRecommendations(fromZone, toZone);
}

// Update activity badge styling and text
function updateActivityBadge(elementId, activity) {
    const badge = document.getElementById(elementId);
    const classes = ['badge-sleep', 'badge-commute', 'badge-work', 'badge-lunch', 'badge-evening'];
    
    // Remove all activity classes
    classes.forEach(cls => badge.classList.remove(cls));
    
    // Add appropriate class based on activity
    if (activity.activity === 'asleep') {
        badge.classList.add('asleep');
    } else if (activity.activity === 'commuting') {
        badge.classList.add('commuting');
    } else if (activity.activity === 'work') {
        badge.classList.add('work');
    } else if (activity.activity === 'lunch') {
        badge.classList.add('lunch');
    } else if (activity.activity === 'evening') {
        badge.classList.add('evening');
    }
    
    badge.textContent = activity.label;
}

// Update time difference display
function updateTimeDifference(fromZone, toZone) {
    const offsetFrom = getTimezoneOffset(fromZone);
    const offsetTo = getTimezoneOffset(toZone);
    const difference = offsetTo - offsetFrom;
    
    const differenceBox = document.getElementById('differenceBox');
    const sign = difference > 0 ? '+' : '';
    const absHours = Math.abs(Math.floor(difference));
    const minutes = Math.abs((difference % 1) * 60);
    
    if (difference === 0) {
        differenceBox.innerHTML = `<p>${getTimezoneDisplayName(toZone)} is on the same time as ${getTimezoneDisplayName(fromZone)}</p>`;
    } else {
        const minuteText = minutes > 0 ? ` and ${Math.round(minutes)} minutes` : '';
        differenceBox.innerHTML = `<p>${getTimezoneDisplayName(toZone)} is <strong>${sign}${absHours} hour${absHours !== 1 ? 's' : ''}${minuteText}</strong> from ${getTimezoneDisplayName(fromZone)}</p>`;
    }
}

// Update recommendations
function updateRecommendations(fromZone, toZone) {
    const recommendations = generateRecommendations(fromZone, toZone);
    const recommendationBox = document.getElementById('recommendationBox');
    const toTime = getTimeInTimezone(toZone);
    const currentActivity = getActivityStatus(toTime.hour);
    
    // Find best times to call (when they're in evening/free time or lunch)
    const bestTimes = recommendations.filter(r => 
        r.score === optimalCallTimes.evening || r.score === optimalCallTimes.lunch
    ).slice(0, 3);
    
    const goodTimes = recommendations.filter(r => 
        r.score === optimalCallTimes.commuting || (r.score !== optimalCallTimes.asleep && r.score !== optimalCallTimes.work)
    ).slice(0, 2);
    
    let html = '';
    
    html += `<p><strong>Current Time at Recipient:</strong> ${formatTime(toTime.hour, toTime.minute)} - ${currentActivity.label}</p>`;
    html += '<hr style="margin: 1rem 0; border: none; border-top: 1px solid rgba(0,0,0,0.1)">';
    
    if (bestTimes.length > 0) {
        html += '<p><strong>✅ Best Times to Call:</strong></p>';
        html += '<ul style="margin: 0.5rem 0 1rem 1.5rem;">';
        bestTimes.forEach(time => {
            html += `<li>${time.time} - ${time.activity}</li>`;
        });
        html += '</ul>';
    }
    
    if (goodTimes.length > 0) {
        html += '<p><strong>⚠️ Acceptable Times:</strong></p>';
        html += '<ul style="margin: 0.5rem 0 1rem 1.5rem;">';
        goodTimes.forEach(time => {
            html += `<li>${time.time} - ${time.activity}</li>`;
        });
        html += '</ul>';
    }
    
    html += '<p style="font-size: 0.9rem; opacity: 0.7; margin-top: 1rem;"><em>Times are shown in their local time zone. See the schedule legend above for details about each activity period.</em></p>';
    
    recommendationBox.innerHTML = html;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', updateTimes);
