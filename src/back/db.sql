CREATE TABLE IF NOT EXISTS users(
    id int PRIMARY KEY AUTO_INCREMENT,
    login char(20)
);

CREATE TABLE IF NOT EXISTS chats(
    id int PRIMARY KEY AUTO_INCREMENT,
    login varchar(255),
    created datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_chat(
    userId int,
    chatId int,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (chatId) REFERENCES chats(id),
    PRIMARY KEY (userId, chatId)
);

CREATE TABLE IF NOT EXISTS messages(
    id int PRIMARY KEY AUTO_INCREMENT,
    chatId int,
    userId int,
    created datetime DEFAULT CURRENT_TIMESTAMP,
    message varchar(255),
    FOREIGN KEY (chatId) REFERENCES chats(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);