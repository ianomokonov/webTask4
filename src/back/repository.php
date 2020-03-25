<?php
    //обработка запросов
    include_once './dbconfig.php';
    include_once 'model.php';
    class ChatRepository{
        private $login = "nomokoiw_chat";
        private $password = "rvUjM8c%";

        public function __construct()
        {
            $this->db = new PDO("mysql:host=localhost;dbname=".$this->login.";charset=UTF8", $this->login, $this->password);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
        }

        public function SignIn($login = null){
            if($login){
                try{
                    $user = $this->LoginExists($login);
                    if($user){
                        return $user;
                    }
                    $s = $this->db->prepare("INSERT INTO users (login) VALUES (?)");
                    $s->execute(array($login));
                    $fullUser = $this->GetUserById($this->db->lastInsertId());
                    return $fullUser;
                } catch(Exception $e) {
                    http_response_code(400);
                    return array("message" => "Ошибка добавления пользователя", "error" => $e->getMessage());
                }
                
            } else {
                http_response_code(500);
                return array("message" => "Введите логин");
            }
        }

        public function CreateChat($chat){
            //return $chat;
            $s = $this->db->prepare("INSERT INTO chats (login) VALUES (?)");
            if($chat->name){
                $s->execute(array($chat->name));
                $chatId = $this->db->lastInsertId();
                $s = $this->db->prepare("INSERT INTO user_chat (userId, chatId) VALUES (?, ?)");
                $s->execute(array($chat->userId, $chatId));
                return $chatId;
            }
        }

        public function SendMessage($message){
            $s = $this->db->prepare("INSERT INTO messages (chatId, userId, message ) VALUES (?,?,?)");
            if($message->chatId){
                $s->execute(array($message->chatId, $message->userId, $message->message));
                return $this->GetMessageById($this->db->lastInsertId());
            }
        }

        public function GetUserChats($userId){
            if(!$userId){
                http_response_code(400);
                return array("message" => "Укажите id пользователя");
            }
            try{
                $sth = $this->db->prepare("SELECT c.id, c.login, c.created FROM user_chat uc JOIN chats c ON c.id = uc.chatId WHERE uc.userId = ?");
                $sth->setFetchMode(PDO::FETCH_CLASS, 'Chat');
                $sth->execute(array($userId));
                return $sth->fetchAll();
            } catch (Exception $e){
    
                // код ответа 
                http_response_code(500);
            
                // сообщение об ошибке 
                echo json_encode(array(
                    "message" => "Ошибка загрузки чатов",
                    "error" => $e->getMessage()
                ));
            }
        }

        public function GetChatMessages($chatId){
            if(!$chatId){
                http_response_code(400);
                return array("message" => "Укажите id чата");
            }
            try{
                $sth = $this->db->prepare("SELECT * FROM messages WHERE chatId = ?");
                $sth->setFetchMode(PDO::FETCH_CLASS, 'Message');
                $sth->execute(array($chatId));
                return $sth->fetchAll();
            } catch (Exception $e){
    
                // код ответа 
                http_response_code(500);
            
                // сообщение об ошибке 
                echo json_encode(array(
                    "message" => "Ошибка загрузки сообщений",
                    "error" => $e->getMessage()
                ));
            }
        }

        private function GetUserById($id){
            if($id){
                $sth = $this->db->prepare("SELECT * FROM users WHERE id = ?");
                $sth->setFetchMode(PDO::FETCH_CLASS, 'User');
                $sth->execute(array($id));
                $user = $sth->fetch();
                $user->chats = $this->GetUserChats($id);
                return $user;
            } else {
                http_response_code(500);
                return array("message" => "GetUserById -> id не может быть пустым");
            }
            
        }

        private function GetMessageById($id){
            if($id){
                $sth = $this->db->prepare("SELECT * FROM messages WHERE id = ?");
                $sth->setFetchMode(PDO::FETCH_CLASS, 'Message');
                $sth->execute(array($id));
                return $sth->fetch();
            } else {
                http_response_code(500);
                return array("message" => "GetMessageById -> id не может быть пустым");
            }
            
        }

        public function GetChatById($id){
            if($id){
                $sth = $this->db->prepare("SELECT * FROM chats WHERE id = ?");
                $sth->setFetchMode(PDO::FETCH_CLASS, 'Chat');
                $sth->execute(array($id));
                $chat = $sth->fetch();
                $chat->messages = $this->GetChatMessages($id);
                return $chat;
            } else {
                http_response_code(500);
                return array("message" => "GetChatById -> id не может быть пустым");
            }
            
        }

        private function LoginExists(string $login){
            $query = "SELECT id, login FROM users WHERE login = ?";
 
            // подготовка запроса 
            $stmt = $this->db->prepare( $query );
            $stmt->setFetchMode(PDO::FETCH_CLASS, 'User');
            // инъекция 
            $login=htmlspecialchars(strip_tags($login));
            // выполняем запрос 
            $stmt->execute(array($login));

            $user = $stmt->fetch();
            $user->chats = $this->GetUserChats($user->id);
            return $user;
        }

    }
?>
