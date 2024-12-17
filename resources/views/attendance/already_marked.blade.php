<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Telah Melakukan Absensi</title>
</head>
<style>
    .container h1 {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        margin-left: 10px;
        margin-right: 10px;
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .content p {
        font-size: 18px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .button {
        text-align: center;
        margin-top: 20px;
    }
    .button a {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007BFF;
        color: #fff;
        text-decoration: none;
        cursor: pointer;
        border-radius: 10px;
        transition: background-color 0.3s ease;
        font-size: 14px;
    }
    .button a:hover {
        background-color: #0056b3;
    }
</style>
<body>
    <div class="container">
        <h1>{{ $message }}</h1>
        <div class="content">
            <p>{{ $userName }}</p>
            <p>{{ $activityName }}</p>
        </div>
        <div class="button">
            <a href="/dashboard">Kembali</a>
        </div>
    </div>
</body>
</html>
