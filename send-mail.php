<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];

    $to = "raintex@abv.bg"; // your email

    // Encode the subject in UTF-8
    $subject = "Ново съобщение от сайта Raintex";
    $subject = "=?UTF-8?B?" . base64_encode($subject) . "?=";

    $body = "Име: $name\nИмейл: $email\nТелефон: $phone\nСъобщение:\n$message";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n";

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