package com.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import com.ecommerce.repository.ProductMongoRepository;

@Configuration
@EnableMongoRepositories(
    basePackages = "com.ecommerce.repository",
    includeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE, 
        classes = ProductMongoRepository.class
    )
)
public class MongoConfig {

    @Bean
    public ValidatingMongoEventListener validatingMongoEventListener(
            LocalValidatorFactoryBean factory) {
        return new ValidatingMongoEventListener(factory);
    }

    @Bean
    public LocalValidatorFactoryBean validator() {
        return new LocalValidatorFactoryBean();
    }
}
