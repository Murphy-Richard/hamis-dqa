# HAPPY Program Questionnaire

Professional offline-capable data collection tool for field collectors.

## 🚀 Quick Start

### Frontend Deployment
1. Upload `index.html`, `styles.css`, and `script.js` to any static hosting (GitHub Pages, Netlify, Vercel, or local server)
2. Update `CONFIG.API_ENDPOINT` in `script.js` with your deployed Apps Script URL

### Backend Deployment (Google Apps Script)
1. Go to [script.google.com](https://script.google.com)
2. Create new project → Paste `Code.gs` and `appsscript.json` contents
3. Replace `CONFIG.SPREADSHEET_ID` with your Google Sheet ID
4. Deploy as Web App:
   - Execute as: **User deploying**
   - Who has access: **Anyone, even anonymous**
5. Copy the Web App URL and update `CONFIG.API_ENDPOINT` in frontend

### Google Sheet Setup
1. Create new Google Sheet
2. Copy the Sheet ID from URL: `docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
3. Paste into `Code.gs` as `CONFIG.SPREADSHEET_ID`
4. Run `ensureSheetsExist()` once from Apps Script editor to create sheets and headers
5. Format: Headers will auto-apply blue background with white bold text

## 📊 Google Sheet Structure

### Responses Sheet (Main)
- One row per submission
- Columns ordered by questionnaire sections
- All conditional fields included (blank if not applicable)
- Timestamp rightmost for easy sorting

### Reference Sheets (Dropdown Data)
- `Regions`: List of all regions
- `Districts`: Region-District pairs for dependent dropdowns
- `Sectors`, `Industries`, `JobTypes`, `JobRoles`: Cascading job data
- Protected ranges prevent accidental edits

## ✨ Features

### For Collectors
- ✅ No login required - simple collector name entry
- ✅ Works offline - data queues and syncs when online
- ✅ Conditional sections - only show relevant questions
- ✅ Controlled dropdowns - prevent typos and inconsistencies
- ✅ Auto-calculated fields - Age, ID generation
- ✅ Professional UI - clean, mobile-responsive design

### For Data Managers
- ✅ Real-time sync to Google Sheets
- ✅ Unique Submission ID: `REG-000001-20260502T143022Z`
- ✅ Unique Participant ID: `JOB--0000001`
- ✅ Server-side validation (phone, Ghana Card)
- ✅ Reference data management via Sheets
- ✅ Audit trail: collector name, device ID, timestamps

## 🔧 Customization

### Add New Choice Options
1. Open your Google Sheet
2. Navigate to the relevant reference sheet (e.g., `Regions`)
3. Add new values in column A (below existing entries)
4. Changes reflect immediately in the form dropdowns

### Modify Form Fields
1. Edit `index.html` to add/remove form fields
2. Update `collectFormData()` in `script.js` to include new fields
3. Update `getResponseHeaders()` and `buildResponseRow()` in `Code.gs`
4. Re-deploy Apps Script if backend logic changes

### Change Branding
- Update colors in `styles.css` (search for `#0b66c3` for primary blue)
- Replace logo SVG in `index.html` header
- Modify app title and footer text

## 🧪 Testing

1. Open the form in a browser
2. Fill Section B (General) with test data
3. Test conditional logic:
   - Select "Yes" for "Trained by partner" → Section C appears
   - Select "Yes" for "Placed by partner" → Section D appears
4. Submit and verify:
   - Success message shows with Reference ID
   - Data appears in Google Sheet Responses tab
   - Submission ID follows `REG-XXXXXX-TIMESTAMP` format
   - Participant ID follows `PARTNER--0000001` format

## 🛠 Troubleshooting

### Form not submitting
- Check browser console for errors (F12 → Console)
- Verify `CONFIG.API_ENDPOINT` matches deployed Apps Script URL
- Ensure Apps Script is deployed with "Anyone, even anonymous" access

### Data not appearing in Sheet
- Check Apps Script execution logs (View → Executions)
- Verify Sheet ID is correct and you have edit access
- Run `ensureSheetsExist()` manually to create missing sheets

### Dropdowns not populating
- Ensure reference sheets (`Regions`, `Districts`, etc.) have data
- Check that `doGet()` is deployed and accessible

## 📞 Support

For issues or enhancements, contact:
- **Murphy Richards** - MERL Manager
- Include: Browser, device type, error message, and steps to reproduce

---

*Built for the HAPPY Program • Data Collection Tool v2.0*
