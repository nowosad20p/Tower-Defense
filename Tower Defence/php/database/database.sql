DROP DATABASE tower_defense;
CREATE DATABASE tower_defense;
USE tower_defense;

CREATE TABLE users(
    user_id int PRIMARY KEY AUTO_INCREMENT NOT NULL ,
    email varchar(255) ,
    nickname varchar(25) ,
    name varchar(25) ,
    surname varchar(25) ,
    password varchar(255) 
)

CREATE TABLE maps(
    map_id int PRIMARY KEY AUTO_INCREMENT NOT NULL ,
    map_creator int ,
    map_code varchar(255) ,
    waves_code varchar(255) ,
    image varchar(25) ,
    description varchar(255),
    title varchar(25) ,
    date_of_upload date ,
    FOREIGN KEY (map_creator) REFERENCES users(user_id)

)

CREATE TABLE map_revies(
    map int,
    user int,
    map_review varchar(255),
    FOREIGN KEY (map) REFERENCES maps(map_id),
    FOREIGN KEY (user) REFERENCES users(user_id)

    
)