<?php
//прием запросов с клиента
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");

include_once 'repository.php';

$repository = new ChatRepository();

if(isset($_GET['key'])){
    switch($_GET['key']){
        case 'sign-in':
            http_response_code(200);
            echo json_encode($repository->SignIn($_GET['login']));
            break;
        case 'get-user-chats':
            http_response_code(200);
            echo json_encode($repository->GetUserChats($_GET['user_id']));
            break;
        case 'create-chat':
            http_response_code(200);
            $data = json_decode(file_get_contents("php://input"));
            echo json_encode($repository->CreateChat($data));
            break;
        case 'get-chat-by-id':
            http_response_code(200);
            echo json_encode($repository->GetChatById($_GET['chat_id']));
            break;
        case 'send-message':
            http_response_code(200);
            $data = json_decode(file_get_contents("php://input"));
            echo json_encode($repository->SendMessage($data));
            break;
        
    }
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Отсутствует ключ запроса."));
}
?>