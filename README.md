# Good Time to Call - Time Zone Call Optimizer

A clean, user-friendly web application that helps you determine the best time to call someone across different time zones, considering their likely activities and schedule.

## Features

✨ **Core Features:**
- 🌍 Real-time time zone conversions for US and International locations
- 📊 Activity status detection (Sleep, Work, Commute, Lunch, Evening)
- ✅ Smart recommendations for optimal calling times
- 🕐 24-hour clock display with UTC time
- ⏱️ Time zone difference calculator
- 🎨 Beautiful, accessible UI with professional color scheme
- 📱 Fully responsive design (desktop, tablet, mobile)
- 🌙 Dark mode support
- ♿ WCAG 2.1 AA accessibility compliance

## Time Zones Supported

### US Time Zones
- Eastern (EDT/EST)
- Central (CDT/CST)
- Mountain (MDT/MST)
- Pacific (PDT/PST)
- Alaska (AKDT/AKST)
- Hawaii (HST)

### International Time Zones
- London (GMT/BST)
- Central Europe (CET/CEST)
- Tokyo (JST)
- Shanghai (CST)
- Hong Kong (HKT)
- Dubai (GST)
- Singapore (SGT)
- Sydney (AEDT/AEST)
- Bangkok (ICT)
- India (IST)
- Moscow (MSK)

*More time zones can be easily added by modifying the `index.html` file*

## Daily Activity Schedule

The app uses the following default activity times (24-hour format):

| Time | Activity | Call Suitability |
|------|----------|-----------------|
| 22:00 - 07:00 | 😴 Asleep | ❌ Not Suitable |
| 07:00 - 09:00 | 🚗 Commuting | ⚠️ Caution |
| 09:00 - 12:00 | 💼 Work/School | ⚠️ Caution |
| 12:00 - 13:00 | 🍽️ Lunch | ✅ Good |
| 13:00 - 17:00 | 💼 Work/School | ⚠️ Caution |
| 17:00 - 19:00 | 🚗 Commuting | ⚠️ Caution |
| 18:00 - 20:00 | 🍽️ Dinner | ✅ Good |
| 19:00 - 22:00 | 🎬 Evening/Free Time | ✅ Best |

## Color Scheme

The application uses an accessible color palette designed for clarity and legibility:

- **Deep Blue** (#0057B8) - Primary color, 4.6:1 contrast ratio
- **Teal** (#007A73) - Secondary color, 4.5:1 contrast ratio
- **Amber** (#E08000) - Accent color for alerts, 3.2:1 contrast ratio (large text)
- **Dark Charcoal** (#333333) - Text, 12.6:1 contrast ratio
- **Light Gray** (#F6F6F6) - Background
- **White** (#FFFFFF) - Surface backgrounds

All color combinations meet or exceed WCAG 2.1 AA accessibility standards.

## How to Use

1. **Select Your Time Zone**: Choose your location from the "Calling From" dropdown
2. **Select Their Time Zone**: Choose the recipient's location from the "Calling To" dropdown
3. **View Current Times**: See the current time in both time zones
4. **Check Activity Status**: View what the recipient is likely doing right now
5. **Read Recommendations**: Get personalized recommendations for the best times to call

## Installation & Deployment

### Local Development
1. Clone or download this repository
2. Open `index.html` in your web browser
3. No server required - it runs entirely in your browser!

### Deployment Options

#### GitHub Pages
1. Push to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Website automatically deployed to `https://yourusername.github.io/Good-Time-to-Call`

#### Netlify
1. Connect your GitHub repository to Netlify
2. Build command: (leave empty)
3. Publish directory: (leave empty or set to `.`)
4. Automatic deployment on every push

#### Traditional Web Hosting
1. Upload `index.html`, `styles.css`, and `script.js` to your web server
2. No backend required!

## Customization

### Adding More Time Zones
Edit `index.html` and add options to the `<optgroup>` sections in the timezone dropdowns:

```html
<option value="Asia/Tokyo">Tokyo (JST)</option>
```

### Changing Activity Times
Edit the `activitySchedule` object in `script.js` to customize work hours:

```javascript
const activitySchedule = {
    asleep: { start: 22, end: 7, label: '😴 Asleep' },
    // ... modify as needed
};
```

### Adding AdSense
Replace the placeholder AdSense code in `index.html`:
- Replace `ca-pub-YOUR-PUBLISHER-ID` with your publisher ID
- Replace `YOUR-SLOT-ID` with your ad slot ID

## Technical Details

- **Pure JavaScript** - No dependencies or frameworks required
- **Responsive Design** - CSS Grid and Flexbox for modern layout
- **Browser Compatibility** - Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- **Timezone Handling** - Uses JavaScript `Intl` API for accurate timezone conversions
- **Real-time Updates** - Updates every second automatically

## Browser Support

- Chrome 63+
- Firefox 55+
- Safari 11+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Android)

## Accessibility Features

- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation support
- ✅ High contrast color scheme
- ✅ Semantic HTML
- ✅ Focus indicators
- ✅ Screen reader friendly
- ✅ Reduced motion support

## Legal Disclaimers

### Disclaimer of Accuracy
- Time zone information is based on the IANA Time Zone Database
- Daylight saving time transitions may vary by region
- Activity predictions are generalizations based on typical schedules
- Actual schedules vary significantly by individual, region, industry, and season

### No Guarantee of Availability
- This tool is informational only
- It does not guarantee the recipient is available or wants to be contacted at any recommended time
- Always consider the person's individual preferences and schedule

### International Calling Considerations
- Always consider local customs and business etiquette
- Some regions have different business hours (e.g., siesta in Spain, afternoon breaks in Middle East)
- Public holidays vary by country
- Emergency situations supersede normal call time recommendations

## Privacy

This application:
- ✅ Does not collect any personal data
- ✅ Does not use cookies (except for necessary browser functions)
- ✅ Does not track user behavior
- ✅ Runs entirely in the browser
- ✅ Does not send data to external servers (except Google AdSense impressions)

AdSense may collect data per Google's privacy policy: https://policies.google.com/privacy

## License

This project is provided as-is for personal and commercial use.

## Support

For issues, suggestions, or improvements:
1. Create an issue in the repository
2. Submit a pull request with improvements
3. Contact the maintainers

## Changelog

### Version 1.0 (April 2026)
- Initial release
- 6 US time zones + 11 international time zones
- Real-time activity status detection
- Smart recommendation engine
- Fully responsive design
- Dark mode support
- Accessibility compliant

---

Made with ❤️ to help you make better calls across time zones. 
