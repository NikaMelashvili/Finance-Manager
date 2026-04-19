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
                           long_term_goals varchar(255),
                            user_id bigint,
    constraint foreign key (user_id) references user(id)
);

INSERT INTO user_data
    (income, savings, credit_usage, loan_balance, monthly_spending, investment_portfolio, risk_appetite, age, employment_status, education_level, credit_score, debt_to_income_ratio, monthly_essentials, monthly_discretionary, long_term_goals)
VALUE                                                                                                                                                                                                                                                                   (55000.00, 8000.00, 2500.00, 10000.00, 2200.00, 5000.00, 'Medium', 28, 'Employed', 'Bachelor', 720, 35.50, 1500.00, 700.00, 'Retirement savings'),                                                                                                                                                                                                                                                                   (70000.00, 20000.00, 4000.00, 20000.00, 3000.00, 15000.00, 'High', 35, 'Self-Employed', 'Master', 690, 28.75, 1800.00, 1200.00, 'Real estate investment'),
                                          