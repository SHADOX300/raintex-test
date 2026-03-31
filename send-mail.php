<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $phone   = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    $to      = "raintex@abv.bg"; // Your email
    $subject = "Ново съобщение от сайта Raintex";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $body = "Име: $name\nИмейл: $email\nТелефон: $phone\n\nСъобщение:\n$message";

    if(mail($to, $subject, $body, $headers)){
        echo "<script>alert('Съобщението е изпратено успешно!'); window.location.href='contacts.html';</script>";
    } else {
        echo "<script>alert('Възникна грешка. Опитайте пак.'); window.history.back();</script>";
    }
} else {
    header("Location: contacts.html");
    exit();
}
?>