package com.melashvili.bank_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.melashvili.bank_backend.repositories")
public class BankBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BankBackendApplication.class, args);
    }

}
