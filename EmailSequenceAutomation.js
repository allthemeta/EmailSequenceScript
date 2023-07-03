// This function is used to send emails in a sequence. The sequence progresses from "" to "Intro" to "Follow Up" to "Closing".
function sendEmails() {
  // The first few lines are retrieving the data from the current active spreadsheet.
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // Get the active sheet from the active spreadsheet.
  var dataRange = sheet.getDataRange(); // Get the range of data.
  var data = dataRange.getValues(); // Convert the data range into a 2D array.

  // The first row of the sheet is used as the header row. 
  var headerRow = data[0]; // This contains the column names.
  
  // Determine the column index for each column.
  var emailColumnIndex = headerRow.indexOf("Email");
  var nameColumnIndex = headerRow.indexOf("Name");
  var stateColumnIndex = headerRow.indexOf("State");
  var introDateColumnIndex = headerRow.indexOf("Intro Email Date");
  var followUpDateColumnIndex = headerRow.indexOf("Follow Up Email Date");
  var closingDateColumnIndex = headerRow.indexOf("Closing Email Date");
  var introThreadIdColumnIndex = headerRow.indexOf("Intro Thread ID");
  var followUpThreadIdColumnIndex = headerRow.indexOf("Follow Up Thread ID");
  var closingThreadIdColumnIndex = headerRow.indexOf("Closing Thread ID");

  // Set up the current date. We need to format it properly because JavaScript Date objects store the time in the local timezone, and we want to standardize it.
  var currentDate = new Date();
  currentDate = new Date(Utilities.formatDate(currentDate, 'GMT-8', 'yyyy-MM-dd HH:mm:ss')); // Formatting the date in GMT-8 timezone.

  // Log the current date.
  Logger.log('Current date:', currentDate);

  // Iterate over each row of the data, starting from the second row (i=1) since the first row is headers.
  for (var i = 1; i < data.length; i++) {
    var row = data[i]; // The current row being processed.
    // Get the relevant pieces of data from the current row.
    var emailAddress = row[emailColumnIndex];
    var recipientName = row[nameColumnIndex];
    var currentState = row[stateColumnIndex];

    // Log who we are processing.
    Logger.log('Processing recipient:', emailAddress, recipientName, 'with current state:', currentState);

    // Variables to hold the email's subject, the body message, the next state, the date cell, and the thread ID column.
    var subject;
    var message;
    var nextState;
    var stateDateCell;
    var threadIdColumn;

    // The logic to determine the subject, message, nextState, stateDateCell, and threadIdColumn based on the current state.
    if (currentState == "") {
      subject = "Introduction Email Subject - ID: Intro";
      message = getIntroductionEmail(recipientName); // Call the helper function to get the introduction email text.
      nextState = "Intro";
      stateDateCell = introDateColumnIndex;
      threadIdColumn = introThreadIdColumnIndex;
    }
    else if (currentState == "Intro") {
      subject = "Follow Up Email Subject - ID: Follow Up";
      message = getFollowUpEmail(recipientName); // Call the helper function to get the follow-up email text.
      nextState = "Follow Up";
      stateDateCell = followUpDateColumnIndex;
      threadIdColumn = followUpThreadIdColumnIndex;
    }
    else if (currentState == "Follow Up") {
      subject = "Closing Email Subject - ID: Closing";
      message = getClosingEmail(recipientName); // Call the helper function to get the closing email text.
      nextState = "Closing";
      stateDateCell = closingDateColumnIndex;
      threadIdColumn = closingThreadIdColumnIndex;
    }
    else {
      continue; // If state is "Closing" or unknown, do not send an email and move to the next row.
    }

    // Send the email. You should replace the "from" address with your own.
    GmailApp.sendEmail(emailAddress, subject, message, {
      from: "example@gmail.com"
    });

    // Search for the sent email in the sent box and if found, get the thread ID.
    var threads = GmailApp.search('in:sent to:' + emailAddress + ' subject:' + subject);
    if (threads.length > 0) {
      var threadId = threads[0].getId();  // get the ID of the thread
      // Write the thread ID back to the sheet.
      sheet.getRange(i + 1, threadIdColumn + 1).setValue(threadId);
    }

    // Update the state and date in the sheet.
    sheet.getRange(i + 1, stateColumnIndex + 1).setValue(nextState);
    sheet.getRange(i + 1, stateDateCell + 1).setValue(Utilities.formatDate(currentDate, 'GMT-8', 'yyyy-MM-dd HH:mm:ss'));
  }
}

// Helper function to get the text for the introduction email.
function getIntroductionEmail(name) {
  return "Dear " + name + ",\n\nThis is the introduction email.\n\nBest,\nYour Name";
}

// Helper function to get the text for the follow-up email.
function getFollowUpEmail(name) {
  return "Dear " + name + ",\n\nThis is the follow-up email.\n\nBest,\nYour Name";
}

// Helper function to get the text for the closing email.
function getClosingEmail(name) {
  return "Dear " + name + ",\n\nThis is the closing email.\n\nBest,\nYour Name";
}
