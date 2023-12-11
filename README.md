# Google Apps Script for Automated Email Sequence

This repository contains a Google Apps Script designed to automate the sending of a sequence of emails to a list of recipients. The script uses Google Sheets as a database to manage the sequence and track the progress of each recipient.

## What the script does

The script is intended to automate the sending of three emails (an Introduction email, a Follow Up email, and a Closing email) to each recipient listed in a Google Sheet. The script keeps track of which stage in the sequence each recipient is currently in, and only sends the next email in the sequence when the script is run.

The sequence for each recipient progresses as follows:
1. When a recipient is first added to the Google Sheet, they are in the blank state, and the script will send them the Introduction email.
2. The next time the script is run, if a recipient is in the "Intro" state (indicating they have received the Introduction email), the script will send them the Follow Up email.
3. The next time the script is run, if a recipient is in the "Follow Up" state (indicating they have received the Follow Up email), the script will send them the Closing email.
4. Recipients in the "Closing" state or any unknown state will not receive any further emails when the script is run.

The script also records the date and time each email was sent and the ID of the Gmail thread in which it was sent.

## How to use this script

1. Clone this repository on your local machine.
2. Open Google Sheets and create a new spreadsheet. The spreadsheet should contain columns for "Email", "Name", "Sequence Start Date", "State", "Intro Email Date", "Follow Up Email Date", "Intro Thread ID", "Follow Up Thread ID", and "Closing Thread ID".
3. Open Google Apps Script by clicking on "Extensions" -> "Apps Script" in the Google Sheets menu.
4. Delete any code in the script editor and replace it with the code from this repository.
5. Replace `"example@gmail.com"` in the `GmailApp.sendEmail()` function with the email address you want the emails to be sent from.
6. Save the project with a suitable name.
7. To run the script, click on the "Select function" drop-down in the toolbar, select `sendEmails`, and click the "Run" button (the triangle icon). You may need to authorize the script to access your Gmail and Google Sheets.
8. Add your recipients to the Google Sheet with their email address, name, and the sequence start date. Leave the "State", "Intro Email Date", "Follow Up Email Date", "Intro Thread ID", "Follow Up Thread ID", and "Closing Thread ID" columns blank - the script will fill these in.
9. Each time you want to send the next email in the sequence to your recipients, run the `sendEmails` function again.

Google Sheets Example Layout
The layout of the Google Sheets used in conjunction with the script should look as follows:

Email |	Name |	State |	Sequence Start Date |	Intro Email Date |	Follow Up Email Date |	Closing Email Date |	Intro Thread ID |	Follow Up Thread ID |	Closing Thread ID

## Column Explanations:
1. Email: The recipient's email address.
2. Name: The recipient's name.
3. State: The current state of the email sequence for this recipient (either "", "Intro", "Follow Up", or "Closing").
4. Sequence Start Date: The date when the recipient was added to the sequence.
5. Intro Email Date: The date and time the Introduction email was sent.
6. Follow Up Email Date: The date and time the Follow Up email was sent.
7. Closing Email Date: The date and time the Closing email was sent.
8. Intro Thread ID: The ID of the Gmail thread for the Introduction email.
9. Follow Up Thread ID: The ID of the Gmail thread for the Follow Up email.
10. Closing Thread ID: The ID of the Gmail thread for the Closing email.

Please remember to update this table according to the sequence progression of the emails for each recipient. When adding a new recipient, add their Email, Name and Sequence Start Date, and leave the rest of the fields empty. The script will fill them in as it sends emails.

Please make sure to review and comply with the [Google Cloud Platform Terms of Service](https://cloud.google.com/terms/) and the [Gmail Program Policies](https://developers.google.com/gmail/api/guides/policies) before using this script.


Thank you!
