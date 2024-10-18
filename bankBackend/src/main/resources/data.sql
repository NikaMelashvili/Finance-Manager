use bank_data;

create table analysis (
    id bigint primary key auto_increment,
    predicted_discretionary_income varchar(255),
    message varchar(255)
);

create table user (
    id bigint primary key auto_increment,
    email varchar(255),
    password varchar(255),
    analysis_id bigint,
    constraint foreign key (analysis_id) references analysis(id)
);

insert into user (email, password, analysis_id)
values ("mela@gmail.com", "123", null),
       ("nika@gmail.com", "123", null),
       ("oto@gmail.com", "123", null),
       ("levan@gmail.com", "123", null),
       ("zuka@gmail.com", "123", null)

DELETE FROM user WHERE analysis_id IS NULL;

