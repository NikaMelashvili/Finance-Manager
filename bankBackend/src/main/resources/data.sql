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
                                                                                                                                                                                                                                                                        (40000.00, 5000.00, 1500.00, 15000.00, 1800.00, 2000.00, 'Low', 24, 'Employed', 'Associate', 650, 42.50, 1200.00, 600.00, 'Travel savings'),
                                                                                                                                                                                                                                                                        (85000.00, 30000.00, 5000.00, 0.00, 4000.00, 25000.00, 'High', 42, 'Employed', 'PhD', 750, 20.00, 2000.00, 2000.00, 'Early retirement'),
                                                                                                                                                                                                                                                                        (60000.00, 10000.00, 3000.00, 5000.00, 2500.00, 10000.00, 'Medium', 31, 'Employed', 'Bachelor', 700, 33.50, 1700.00, 800.00, 'Education fund'),
                                                                                                                                                                                                                                                                        (45000.00, 7000.00, 2000.00, 8000.00, 1900.00, 5000.00, 'Low', 29, 'Freelancer', 'Bachelor', 680, 38.90, 1300.00, 600.00, 'Emergency fund'),
                                                                                                                                                                                                                                                                        (95000.00, 35000.00, 4500.00, 0.00, 4200.00, 30000.00, 'High', 47, 'Employed', 'Master', 780, 18.00, 2500.00, 1700.00, 'Vacation home purchase'),
                                                                                                                                                                                                                                                                        (32000.00, 2000.00, 1000.00, 5000.00, 1500.00, 1000.00, 'Low', 22, 'Part-time', 'High School', 620, 45.80, 1100.00, 400.00, 'Further education'),
                                                                                                                                                                                                                                                                        (78000.00, 25000.00, 3000.00, 15000.00, 3200.00, 20000.00, 'Medium', 36, 'Employed', 'Bachelor', 710, 29.10, 1600.00, 1600.00, 'Stock investments'),
                                                                                                                                                                                                                                                                        (55000.00, 8000.00, 2500.00, 10000.00, 2300.00, 7000.00, 'Medium', 27, 'Employed', 'Bachelor', 725, 32.50, 1400.00, 900.00, 'Buy a car');
