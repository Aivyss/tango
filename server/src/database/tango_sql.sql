-- ACCOUNT TABLES
create table USER_TABLE (
	ID INT primary KEY auto_increment
	,STRING_ID VARCHAR(60)
	,PASSWORD VARCHAR(60)
	,CREATE_DATE DATETIME default CURRENT_TIMESTAMP
	,IS_DELETED INT default 0
);
alter table user_table add PW_SALT VARCHAR(2000) not null;
alter table USER_TABLE modify PASSWORD VARCHAR(2000);

-- STUDY TABLES
create table DECK_TABLE (
	DECK_ID INT primary key auto_increment
	,CREATE_DATE DATETIME default CURRENT_TIMESTAMP
	,DECK_NAME VARCHAR(60) unique
	,USER_ID INT
	,depth INT default 0
);
ALTER table DECK_TABLE 
	add constraint 
		DECK_TABLE_USER_ID_FOREIGN_KEY
	foreign key
		(USER_ID)
	references 
		USER_TABLE(ID);
	SHOW INDEX FROM DECK_TABLE;
-- DECK_NAME DON'T NEED UNIQUE CONSTAINT. SO I CHANGED
alter table DECK_TABLE drop index DECK_NAME;

create table KIND_OF_DECK_TABLE(
		KIND_ID INT primary key auto_increment
		,CARD_NAME VARCHAR(30) not null
		,USER_ID INT not NULL
);
alter table KIND_OF_CARD_TABLE 
	add constraint 
		KIND_OF_DECK_TABLE_USER_ID_FOREIGN_KEY 
	foreign key 
		(USER_ID) 
	references 
		USER_TABLE(ID);

create table CARD_COL_TABLE (
	CARD_COL_ID INT primary key auto_increment
	,KIND_ID INT not null
	,COL_NAME VARCHAR(30) not null
);
alter table CARD_COL_TABLE 
	add constraint 
		CARD_COL_TABLE_KIND_ID_FOREIGN_KEY 
	foreign key 
		(KIND_ID) 
	references 
		KIND_OF_DECK_TABLE(KIND_ID);

create table CARD_FRONT_TABLE(
	FRONT_ID INT primary key auto_increment
	,CREATE_DATE DATETIME default CURRENT_TIMESTAMP
	,FRONT_DATA VARCHAR(2000) not null
	,DECK_ID INT not null
	,E_FACTOR DOUBLE not null default 2.5
	,REPETITION INT not null default 0
	,DUE_DATE DATETIME default current_TIMESTAMP
);
alter table CARD_FRONT_TABLE 
	add constraint 
		CARD_FRONT_TABLE_DECK_ID_FOREIGN_KEY 
	foreign key 
		(DECK_ID) 
	references 
		DECK_TABLE(DECK_ID); 
alter table CARD_FRONT_TABLE add KIND_ID INT not null;
alter table CARD_FRONT_TABLE 
	add constraint 
		CARD_FRONT_TABLE_KIND_ID_FOREIGN_KEY 
	foreign key 
		(KIND_ID) 
	references 
		KIND_OF_CARD_TABLE(KIND_ID);
		
create table CARD_BACK_TABLE(
	BACK_ID INT primary key auto_increment
	,FRONT_ID INT not null
	,CARD_COL_ID INT not null
	,BACK_DATA VARCHAR(2000)
);
alter table CARD_BACK_TABLE
	add constraint
		CARD_BACK_TABLE_FRONT_ID_FOREIGN_KEY
	foreign key
		(FRONT_ID)
	references
		CARD_FRONT_TABLE(FRONT_ID);
alter table CARD_BACK_TABLE
	add constraint
		CARD_BACK_TABLE_CARD_COL_ID_FOREIGN_KEY
	foreign key
		(CARD_COL_ID)
	references
		CARD_COL_TABLE(CARD_COL_ID);

create table CARD_BACK_TABLE(
	BACK_ID INT primary key auto_increment
	,FRONT_ID INT not null
	,CARD_COL_ID INT not null
	,BACK_DATA VARCHAR(2000)
);
alter table CARD_BACK_TABLE
	add constraint
		CARD_BACK_TABLE_FRONT_ID_FOREIGN_KEY
	foreign key
		(FRONT_ID)
	references
		CARD_FRONT_TABLE(FRONT_ID);
alter table CARD_BACK_TABLE
	add constraint
		CARD_BACK_TABLE_CARD_COL_ID_FOREIGN_KEY
	foreign key
		(CARD_COL_ID)
	references
		CARD_COL_TABLE(CARD_COL_ID);

alter table CARD_FRONT_TABLE add KIND_ID INT not null;
alter table CARD_FRONT_TABLE 
	add constraint 
		CARD_FRONT_TABLE_KIND_ID_FOREIGN_KEY 
	foreign key 
		(KIND_ID) 
	references 
		KIND_OF_CARD_TABLE(KIND_ID);

-- FORUM TABLES
CREATE TABLE BOARD_CATEG_TABLE (
	BOARD_PK INT PRIMARY KEY AUTO_INCREMENT,
	CATEG_NAME VARCHAR(30) NOT NULL
);

create table FEED_TABLE (
	FEED_PK INT primary key auto_increment,
	USER_ID INT not null,
	BOARD_PK INT not null,
	TITLE VARCHAR(100) not null,
	FEED_CONTENT VARCHAR(2000) not null
);
alter table FEED_TABLE
	add constraint FEED_TABLE_BOARD_PK_FOREIGN_KEY
	foreign key (BOARD_PK)
	references BOARD_CATEG_TABLE(BOARD_PK);
alter table feed_table 
	add constraint FEED_TABLE_USER_ID_FOREIGN_KEY
	foreign key (USER_ID)
	references USER_TABLE(ID);

create table COMMENT_TABLE (
	COMMENT_PK INT primary key auto_increment,
	FEED_PK INT not null,
	USER_ID INT not null,
	PARENT_PK INT,
	COMMENT_ORDER INT not null default 0,
	COMMENT_DEPTH INT not null default 0,
	COMMENT_TEXT VARCHAR(100) not null,
	CREATE_DATE DATETIME default CURRENT_TIMESTAMP
);
alter table comment_table 
	add constraint COMMENT_TABLE_FEED_PK_FOREIGN_KEY
	foreign key (FEED_PK)
	references FEED_TABLE(FEED_PK);
alter table comment_table 
	add constraint COMMENT_TABLE_USER_ID_FOREIGN_KEY
	foreign key (USER_ID)
	references USER_TABLE(ID);
alter table comment_table 
	add constraint COMMENT_TABLE_PARENT_PK_FOREIGN_KEY
	foreign key (PARENT_PK)
	references COMMENT_TABLE(COMMENT_PK);

-- basic board categ
insert into BOARD_CATEG_TABLE(CATEG_NAME) values ('英語');
insert into BOARD_CATEG_TABLE(CATEG_NAME) values ('中国語');
insert into BOARD_CATEG_TABLE(CATEG_NAME) values ('日本語');
insert into BOARD_CATEG_TABLE(CATEG_NAME) values ('韓国語');
insert into BOARD_CATEG_TABLE(CATEG_NAME) values ('スペイン語');
insert into BOARD_CATEG_TABLE(CATEG_NAME) values ('フランス語');
insert into BOARD_CATEG_TABLE(CATEG_NAME) values ('その他');

-- * IF YOU WANT CHANGE SOME CONSTRAINT, SEARCH LIEK THAT
-- ! SHOW INDEX FROM DECK_TABLE;
-- * AND PROCEED TO DROP CONSTRAINT
-- ! alter table DECK_TABLE drop index DECK_NAME;
