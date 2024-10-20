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
                      profile_picture longblob,
                      constraint foreign key (analysis_id) references analysis(id)
);

create table user_data (
                           id bigint primary key auto_increment,
                           income decimal(10, 2),
                           savings decimal(10, 2),
                           credit_usage decimal(10, 2),
                           loan_balance decimal(10, 2),
                           monthly_spending decimal(10, 2),
                           investment_portfolio decimal(10, 2),
                           risk_appetite varchar(255),
                           age int,
                           employment_status varchar(255),
                           education_level varchar(100),
                           credit_score int,
                           debt_to_income_ratio decimal(5, 2),
                           monthly_essentials decimal(10, 2),
                           monthly_discretionary decimal(10, 2),
                           long_term_goals varchar(255)
);

create table user_finances (
                               user_id bigint,
                               data_id bigint
);

alter table user_finances
    add constraint primary key (user_id, data_id);

insert into user (email, password, analysis_id)
values ("mela@gmail.com", "123", null),
       ("nika@gmail.com", "123", null),
       ("oto@gmail.com", "123", null),
       ("levan@gmail.com", "123", null),
       ("zuka@gmail.com", "123", null)

DELETE FROM user WHERE analysis_id IS NULL;



