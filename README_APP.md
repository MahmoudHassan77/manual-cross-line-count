# Manual Cross Line Count App

A React-based mobile-friendly application for tracking line crossings at stores with Excel export functionality.

## Features

### 1. Initial Setup Form
- **Store Name**: Enter the name of your store
- **Number of Lines**: Specify how many lines you want to track
- **Line Names**: Name each line for easy identification

### 2. Tracking Interface
- **Real-time Counters**: Each line displays current In, Out, and Net counts
- **Quick Actions**: Large, easy-to-tap buttons for IN and OUT events
- **Instant Recording**: Records timestamp (date and time) for each button press
- **Persistent Storage**: Data is automatically saved to browser localStorage

### 3. Data Export
Two Excel files can be downloaded:

#### Records Export
Contains all individual transactions with:
- Line Name
- Type (In/Out)
- Date (DD/MM/YYYY format)
- Time (HH:MM:SS format)

#### Summary Export
Contains aggregated totals with:
- Line Name
- Total In
- Total Out
- Net Count (In - Out)

### 4. Mobile-Optimized Design
- Responsive layout that adapts to phone screens
- Large, touch-friendly buttons
- Gradient background with modern UI
- Easy-to-read typography
- Smooth animations and transitions

## How to Use

1. **Setup Phase**:
   - Open the app
   - Enter your store name
   - Specify the number of lines to track
   - Name each line
   - Click "Start Tracking"

2. **Tracking Phase**:
   - Tap "IN" when someone crosses a line going in
   - Tap "OUT" when someone crosses a line going out
   - View real-time counters for each line
   - Data is automatically saved

3. **Export Data**:
   - Click "📊 Download Records" for detailed transaction log
   - Click "📈 Download Summary" for aggregated totals
   - Files are named with store name and current date

4. **Reset**:
   - Click the "Reset" button to clear all data and start over
   - Confirmation prompt will prevent accidental data loss

## Technical Details

### Technologies Used
- React 18
- xlsx library for Excel export
- localStorage for data persistence
- CSS3 for responsive design

### Data Storage
- All data is stored locally in the browser's localStorage
- Data persists across page refreshes
- No server or internet connection required

### Browser Compatibility
- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Fully functional on mobile devices
- Touch-optimized for smartphones and tablets

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## File Structure

```
manual-cross-line-count/
├── src/
│   ├── App.js          # Main application component
│   ├── App.css         # Styling and responsive design
│   └── index.js        # Entry point
├── package.json        # Dependencies
└── README_APP.md       # This file
```

## Future Enhancements (Optional)
- Add ability to edit/delete individual records
- Include notes field for each transaction
- Export to PDF format
- Cloud backup functionality
- Multi-store management
- Historical data visualization with charts

## Support
For issues or questions, please refer to the React documentation at https://react.dev/
