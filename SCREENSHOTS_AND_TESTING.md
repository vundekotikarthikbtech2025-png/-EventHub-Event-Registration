# Screenshot Plan and Testing Checklist

## Screenshots to capture for the report
1. Home page — show the hero section and navigation.
2. Events section — show event cards and category filter.
3. Search result — search for a keyword such as “AI”.
4. Registration form — show the complete registration fields.
5. Successful registration — show the success toast and updated registration list.
6. My Registrations — show a saved registration.
7. Admin Login — show the login modal (do not expose passwords in the screenshot).
8. Admin Dashboard — show event and registration counts.
9. Add Event — show the admin event form filled with sample data.
10. Manage Events — show edit/delete controls.
11. Participants — show registered participants.
12. CSV Export — show the downloaded CSV opened in a spreadsheet editor.
13. Responsive view — show the website in a narrow/mobile browser viewport.

## Test cases

| ID | Test scenario | Steps / input | Expected result |
|---|---|---|---|
| TC01 | Open website | Open index.html | Home page loads without errors |
| TC02 | View events | Scroll to Events | Event cards are displayed |
| TC03 | Search events | Enter “AI” | Matching event(s) are shown |
| TC04 | Category filter | Select Technology | Only Technology events are shown |
| TC05 | Required validation | Submit registration with empty fields | Browser blocks submission |
| TC06 | Invalid email | Enter invalid email | Browser validation rejects it |
| TC07 | Invalid phone | Enter fewer than 10 digits | Validation rejects it |
| TC08 | Successful registration | Enter valid details and consent | Registration is saved and appears in My Registrations |
| TC09 | Duplicate registration | Register same email for same event again | Duplicate is prevented |
| TC10 | Capacity check | Attempt registration after all seats are filled | Registration is blocked |
| TC11 | Cancel registration | Click Cancel registration | Registration is removed |
| TC12 | Admin login success | admin / admin123 | Admin panel opens |
| TC13 | Admin login failure | Enter incorrect credentials | Error message is displayed |
| TC14 | Create event | Complete admin event form | New event appears in event list |
| TC15 | Edit event | Click Edit and save changes | Updated event is displayed |
| TC16 | Delete event | Click Delete and confirm | Event and its registrations are removed |
| TC17 | Remove participant | Remove a participant | Registration is deleted |
| TC18 | Export CSV | Click Export CSV | CSV file downloads |
| TC19 | Persistence | Refresh the page | Saved data remains in the same browser |
| TC20 | Responsive layout | Resize browser to mobile width | Navigation and cards adapt to screen |

## Testing evidence
For each test, record: Test ID, actual result, Pass/Fail, date and screenshot filename. Do not mark a test as passed until you have performed it on your computer.
