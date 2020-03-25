<?php
class User
{
    public $id;
    public $login;
    public $chats;
}

class Chat
{
    public $id;
    public $login;
    public $created;
    public $messages;
}

class Message
{
    public $id;
    public $chatId;
    public $userId;
    public $message;
    public $created;
}
