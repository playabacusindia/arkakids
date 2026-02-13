<?php
/**
 * Arka Kids - Inquiry Form Mailer
 * Handles both Email (SMTP) and Telegram Notifications
 */

// Basic Security
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

// SMTP Settings (for reference, using mail() for now as standard on cPanel)
$to_email = "contact@arkakids.com";
$from_email = "contact@arkakids.com";

// 1. Send Email using mail()
// Note: On cPanel, mail() usually uses the local SMTP server configured with your credentials.
$subject = "New Inquiry from Arka Kids Website";
$headers = "From: Arka Kids <$from_email>\r\n";
$headers .= "Reply-To: $from_email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$mail_sent = mail($to_email, $subject, $message_body, $headers);

// Return Status
if ($mail_sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Enquiry sent successfully.',
        'email' => true
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send enquiry via Email.'
    ]);
}
?>