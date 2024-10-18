package com.melashvili.bank_backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Bank System")
                        .version("1.0")
                        .description("API documentation for TBC AI Assistant application"));
    }

    @Bean
    public GroupedOpenApi publicApiServices() {
        return GroupedOpenApi.builder()
                .group("services")
                .pathsToMatch("/rest/services/**")
                .build();
    }

    @Bean
    public GroupedOpenApi publicApiAuthentication() {
        return GroupedOpenApi.builder()
                .group("Authentication")
                .pathsToMatch("/rest/authentication/**")
                .build();
    }
}
