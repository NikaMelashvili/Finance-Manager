CREATE TABLE financial_data (
                                id bigint AUTO_INCREMENT PRIMARY KEY,
                                personal_no bigint,
                                name VARCHAR(100),
                                income DECIMAL(10, 2),
                                savings DECIMAL(10, 2),
                                credit_usage DECIMAL(10, 2),
                                loan_balance DECIMAL(10, 2),
                                monthly_spending DECIMAL(10, 2)
);